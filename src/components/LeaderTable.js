import React from "react";
import {
  copyToClipboard,
  formatEpochToCustomDate,
  formatWalletAddress,
} from "./Helper/help";
import { POWER_SIX_OF_10 } from "../config";

const LeaderTable = ({ title, tree }) => {
  return (
    <div className="text-white my-5">
      <h6 className="text-lg text-white text-center border border-[#C026D3] rounded-t-lg py-5 font-bold">
        {title}
      </h6>
      <div className="overflow-x-auto border data-table text-white rounded-b-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-white">S.N</th>
              <th className="px-6 py-4 text-sm text-white">Name</th>
              <th className="px-6 py-4 text-sm text-white">Mobile</th>
              <th className="px-6 py-4 text-sm text-white">User ID</th>
              <th className="px-6 py-4 text-sm text-white">Sponsor ID</th>
              <th className="px-6 py-4 text-sm text-white">Reward</th>
              <th className="px-6 py-4 text-sm text-white min-w-48">Date</th>
            </tr>
          </thead>
          <tbody>
            {tree?.length > 0 ? (
              tree.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {item?.name || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-sm text-white">
                    {item?.mobile || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-sm text-white">
                    <div className="flex items-center space-x-2">
                      <span>
                        {item?.userId
                          ? formatWalletAddress(item.userId, 5, 8)
                          : "N/A"}
                      </span>
                      {item?.userId && (
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/copy.svg`}
                          className="cursor-pointer"
                          alt="Copy Address"
                          onClick={() => {
                            copyToClipboard(item?.userId);
                          }}
                        />
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-white">
                    <div className="flex items-center space-x-2">
                      <span>
                        {item?.sponsorId
                          ? formatWalletAddress(item.sponsorId, 5, 8)
                          : "N/A"}
                      </span>
                      {item?.sponsorId && (
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/copy.svg`}
                          className="cursor-pointer"
                          alt="Copy Address"
                          onClick={() => {
                            copyToClipboard(item?.sponsorId);
                          }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {Number(item?.reward / POWER_SIX_OF_10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {formatEpochToCustomDate(item?.createdAt) || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-sm text-center text-white"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderTable;
