import React, { useContext } from "react";
import SectionHeading from "../SectionHeading";
import { StoreContext } from "../../context/storeContext";
import Product from "./Product";

export default function Products({ data }) {
  const sectionHeading = data?.sectionHeading;
  const list = data?.productList || [];
  const { addToCart } = useContext(StoreContext);

  const itemToCart = (val) => {
    if (val) {
      addToCart(val, 1);
    } else {
      alert("Product id is missing");
    }
  };

  //   console.log("==va", variant);
  return (
    <>
      <SectionHeading data={sectionHeading} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {list.map(({ store }, index) => {
          return <Product store={store} key={index} itemToCart={itemToCart} />;
        })}
      </div>
    </>
  );
}
