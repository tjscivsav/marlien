import React from "react";

export default function CartItem({ data, state, onRemove, qtyChange }) {
  return (
    <div className="flex mb-4 last:mb-0">
      <div className="bg-gray-200 h-[70px] w-[70px] rounded-sm overflow-hidden">
        <img
          src={data.variant?.image?.src}
          width={70}
          height={70}
          alt="item"
          className="h-[70px] w-[70px] object-cover"
        />
      </div>
      <div className="ml-4">
        <p>{data.title}</p>
        {data?.variant?.title?.toLowerCase() !== "default title" && (
          <span className="text-[10px] text-gray-400 -mt-[2px] block">
            {data?.variant?.title}
          </span>
        )}
        <div className="flex items-center">
          <p className="text-sm text-gray-400">
            $
            {(
              parseInt(data.quantity) * parseInt(data.variant.priceV2.amount)
            ).toFixed(2)}
            {/* ${data.variant.priceV2.amount} */}
          </p>
          <p
            className="text-xs text-red-500 ml-5 uppercase cursor-pointer hover:text-red-700"
            onClick={() => onRemove(data.id)}
          >
            Remove
          </p>
        </div>
        <div className="flex w-[120px] items-center mt-2 border rounded-sm border-gray-300 justify-around">
          <button
            className="block bg-[#25abe2] text-white w-full"
            disabled={state}
            onClick={() => qtyChange(data.id, "decrement")}
          >
            -
          </button>
          <span className="block w-full  text-center text-sm">
            {data.quantity}
          </span>
          <button
            className="block bg-[#25abe2] text-white w-full"
            disabled={state}
            onClick={() => qtyChange(data.id, "increment")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
