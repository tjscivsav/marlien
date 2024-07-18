import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { client } from "../utils/shopify-client";
const defaultValues = {
  cart: [],
  isOpen: false,
  loading: true,
  updating: false,
  setCart: () => {},
  onQtyChange: () => {},
  addToCart: () => {},
  removeLineItem: () => {},
  updateCart: () => {},
  getCheckout: () => {},
  checkout: {},
};

export const StoreContext = React.createContext(defaultValues);

const isBrowser = typeof window !== `undefined`;
const localStorageKey = `meleana_shopify_cart_id`;

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const setCheckoutId = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout?.id);
    }
  };

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null;

      if (existingCheckoutID && existingCheckoutID !== "null") {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          );
          if (existingCheckout) {
            setCheckoutId(existingCheckout);

            setCheckout(existingCheckout);
            setLoading(false);
            return;
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null);
        }
      }
      const newCheckout = await client.checkout.create();
      setCheckout(newCheckout);

      setCheckoutId(newCheckout);
    };

    initializeCheckout();
  }, []);

  useEffect(() => {
    if (checkout) {
      const list = checkout?.lineItems?.map((i) => {
        return {
          id: i.id,
          title: i.title,
          quantity: i.quantity,
          variant: i.variant,
        };
      });

      setCart(list);
      setLoading(false);
    }
  }, [checkout]);
  /**
   *
   * @param {*} lineItemID
   * @returns
   */
  const removeLineItem = async (lineItemID) => {
    const toastId = toast.loading("Removing...");
    setUpdating(true);

    const checkoutId = checkout.id;
    const lineItemIdsToRemove = [lineItemID];
    const response = await client.checkout.removeLineItems(
      checkoutId,
      lineItemIdsToRemove
    );
    if (response) {
      toast.dismiss(toastId);
      setCheckout(response);
      setUpdating(false);
      toast.success("Item successfully removed");
      return;
    }
    setUpdating(false);
  };

  /**
   * update product quatity
   * @param {*} lineItemID
   * @param {*} quantity
   * @param {*} sellingPlanId
   * @returns
   */
  const updateCart = async (id, lineItemID, quantity) => {
    const toastId = toast.loading("Updating Cart...");
    setUpdating(true);

    const cartID = checkout.id;

    const lineItemsToUpdate = cart.map((i) => {
      return {
        id: i.id,
        quantity: i.quantity,
      };
    });
    const response = await client.checkout.updateLineItems(
      cartID,
      lineItemsToUpdate
    );
    if (response) {
      toast.dismiss(toastId);
      setCheckout(response);
      setUpdating(false);
      toast.success("Cart has been updated");
      return;
    }
    setUpdating(false);
  };

  /**
   *
   * @returns
   */
  const getCheckout = async () => {
    setLoading(true);
    // const cartID = checkout.id;
    // const response = await fetchCart(cartID);
    // if (response) {
    //   setLoading(false);
    //   return;
    // }
    setLoading(false);
  };

  /**
   * update product quatity
   * @param {*} variantId
   * @param {*} quantity
   * @returns
   */
  const addToCart = async (variantId, quantity) => {
    const toastId = toast.loading("Adding...");
    setUpdating(true);
    const checkoutId = checkout?.id;
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity),
      },
    ];
    const response = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );

    console.log(response);
    if (response) {
      toast.dismiss(toastId);
      setCheckout(response);
      setUpdating(false);
      toast.success("Item Successfully added");
      return;
    }
    setUpdating(false);
    toast.dismiss(toastId);
  };

  const onQtyChange = (variantId, type) => {
    let item = cart.find((i) => i.id === variantId);

    if (item) {
      if (type === "increment") {
        item = {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        if (item.quantity > 1) {
          item = {
            ...item,
            quantity: item.quantity - 1,
          };
        }
      }
      const newList = cart.map((obj) => (item.id === obj.id ? item : obj));

      setCart(newList);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addToCart,
        getCheckout,
        removeLineItem,
        onQtyChange,
        updateCart,
        cart,
        checkout,
        loading,
        updating,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
