import React, { useState } from "react";

export const Popup = ({ topic, message, onConfirm, onCancel, type }) => {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    onConfirm(type, amount);
  };

  return (
    <div className="flex max-w-[350px] items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h5 className="text-xl text-black font-bold roboto text-center">
          {topic}
        </h5>
        <br />
        <p className="text-xl text-black roboto text-center">{message}</p>
        <br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="block w-full p-2 border border-gray-300 rounded-lg text-black mb-4"
        />
        <div className="flex justify-between mt-3 gap-2">
          <button
            className="bg-gradient-to-r from-[#157AC8] to-[#BC28D3] rounded-full text-white px-5 text-sm py-3"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gradient-to-r from-[#157AC8] to-[#BC28D3] rounded-full text-white px-5 text-sm py-3"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
