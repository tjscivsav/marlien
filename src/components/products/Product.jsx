import React, { useState } from "react";

export default function Product({ store, itemToCart }) {
  const [variant, setVariant] = useState("");

  const onChangeVariant = (evt) => {
    setVariant(evt.target.value);
  };

  const price = (arr) => {
    const find = arr.find(({ store }) => store.gid === variant);

    if (find?.store) {
      return find?.store?.price?.toFixed(2);
    }
  };
  return (
    <div className="bg-[#eee] rounded-2xl transition-shadow duration-500 cursor-pointer group hover:shadow-xl">
      <div className="bg-[#dedddd] relative rounded-2xl overflow-hidden">
        <a
          href={`https://hiehawaii.com/products/${store?.slug?.current}`}
          target="_blank"
        >
          <img
            src={store?.previewImageUrl}
            alt=""
            className="h-full w-full aspect-square"
            loading="lazy"
          />
        </a>
        <div
          className="flex items-center text-xs md:text-sm justify-center left-0 right-0 z-10 bottom-0 absolute uppercase bg-blue-300 py-1 md:py-2 transition-all duration-500 md:translate-y-14 opacity-70 md:opacity-100 md:group-hover:translate-y-0 md:hover:text-white md:hover:bg-[#25ABE2]"
          onClick={() =>
            itemToCart(variant ? variant : store?.variants[0].store.gid)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mr-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"
            />
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
          ADD To Cart
        </div>
      </div>
      <div className="p-3">
        <a
          href={`https://hiehawaii.com/products/${store?.slug?.current}`}
          target="_blank"
        >
          <p className="font-normal text-base hover:underline">
            {store?.title}
          </p>
        </a>
        <div className="flex items-center">
          <p className="text-gray-400 font-thin w-full">
            {variant
              ? `$${price(store.variants)}`
              : store?.priceRange?.minVariantPrice ===
                store?.priceRange?.maxVariantPrice
              ? `$${store?.priceRange.maxVariantPrice.toFixed(2)}`
              : `$${store?.priceRange.minVariantPrice.toFixed(2)} -
                  $${store?.priceRange?.maxVariantPrice.toFixed(2)}`}
          </p>
          {store?.variants.length > 1 && (
            <select
              className="text-xs w-full bg-transparent outline-none"
              onChange={onChangeVariant}
              value={variant}
            >
              <option value={""}>Default First</option>
              {store.variants.map(({ store }, index) => (
                <option key={index} value={store?.gid}>
                  {store.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
