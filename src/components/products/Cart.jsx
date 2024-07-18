import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import CartItem from "./CartItem";

export default function Cart({ color = "#fff" }) {
  const [openCart, setOpenCart] = useState(false);
  const { cart, checkout, updating, removeLineItem, onQtyChange, updateCart } =
    useContext(StoreContext);
  const toggleCart = () => {
    setOpenCart(!openCart);
  };
  const itemRemove = (id) => {
    removeLineItem(id);
  };
  return (
    <div className=" absolute right-8 top-8 z-20">
      {cart.length > 0 && (
        <div
          className="ml-[7.5px] cursor-pointer relative"
          onClick={toggleCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill={color}
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
          <span className="absolute text-[10px] text-white h-[18px] w-[18px] -top-[10px] flex justify-center items-baseline -right-[10px] bg-red-400 rounded-full">
            {cart.length}
          </span>
        </div>
      )}
      {/* Cart */}
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 transition-all duration-300 delay-100 ${
          openCart ? "visible opacity-100" : "invisible opacity-0"
        } bg-white/35 z-50 backdrop-blur-md`}
      >
        <div
          className={`${
            openCart ? "translate-x-0" : " -translate-x-[1000px]"
          } bg-white max-w-[400px] transition-transform duration-500 h-full overflow-auto relative shadow-2xl`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="black"
            className="absolute right-4 top-2 cursor-pointer"
            onClick={toggleCart}
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>

          <div className="py-10 px-5">
            <p className="text-lg font-semibold uppercase mb-10">
              Your Cart Items
            </p>
            {cart?.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <CartItem
                    data={item}
                    key={index}
                    state={updating}
                    onRemove={itemRemove}
                    qtyChange={onQtyChange}
                  />
                ))}
                <div className="flex items-center justify-between border-t pt-4">
                  <p className="uppercase">Cart Total</p>
                  <p>
                    $
                    {parseInt(checkout?.totalPriceV2?.amount) > 0
                      ? parseInt(checkout?.totalPriceV2?.amount).toFixed(2)
                      : "0.00"}
                  </p>
                </div>

                <button
                  disable={updating}
                  onClick={updateCart}
                  className="uppercase py-2 rounded-sm transition-colors duration-300 hover:bg-[#25abe2] hover:text-white border border-[#25abe2] text-[#25abe2] mt-5 bg-transparent  w-full"
                >
                  Update Cart
                </button>
                <span className="text-xs text-gray-400">
                  You should update the cart after a quantity change.
                </span>
                <button
                  disable={updating}
                  className="uppercase py-2 rounded-sm transition-colors duration-300 hover:bg-white hover:text-[#25abe2] border hover:border-[#25abe2] text-white mt-5 bg-[#25abe2] w-full"
                >
                  <a href={checkout?.webUrl}>Proceed Checkout</a>
                </button>
              </>
            ) : (
              <div className="text-xl uppercase text-center">
                Your Cart is empty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
