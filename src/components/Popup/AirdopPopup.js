import React from "react";

export const AirdropPopup = ({ topic, message, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[350px] mx-4">
        {/* Title */}
        <h5 className="text-xl text-black font-bold roboto text-center">
          {topic}
        </h5>
        <br />

        {/* Message */}
        <p className="text-lg text-black roboto text-center">{message}</p>
        <br />

        {/* Centered Button */}
        <div className="flex flex-col items-center mt-3">
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
