import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import copy from "copy-to-clipboard";
import { useAccount } from "wagmi";
import {
  copyToClipboard,
  formatEpochToCustomDate,
  formatWalletAddress,
} from "./Helper/help";
import { POWER_SIX_OF_10 } from "../config";

const History = () => {
  const [userInfo, setUserInfo] = useState("");
  const [levelReward, setLevelReward] = useState("");
  const { address, isDisconnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { data } = location.state || {}; // Access the data sent via navigation

  console.log("yourData : ", data);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-[500px] w-full mx-auto ">
      <div className="bg-gradient-to-r from-[#04021F] to-[#280941] text-white min-h-screen ">
        <img
          src={process.env.PUBLIC_URL + "/assets/left.png"}
          className="px-5 pt-4 cursor-pointer"
          onClick={handleNavigate}
        />

        <h2 className="text-white text-center font-bold">History</h2>
        <div className="max-w-[450px] w-full mx-auto py-5 md:px-0 px-4">
          <div className="flex items-center gap-4 flex-wrap py-2 px-4 mb-5 bg-gradient-to-r from-[#157AC8] to-[#BC28D3] rounded-full">
            <div className="bg-white rounded-full h-[50px] w-[50px] grid place-items-center px-3">
              <img
                src={process.env.PUBLIC_URL + "/assets/level.svg"}
                className="max-w-[30px] w-full mx-auto"
              />
            </div>
            <div>
              <h3 className="font-bold">{data?.title}</h3>
              {/* <p>Amount: {data?.amount}</p> */}
            </div>
          </div>

          <div className="border border-[#C026D3] rounded-2xl py-5 px-5 bg-[#00011B] my-[3rem]">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className=" w-full inline-block align-middle">
                  <div className="overflow-x-auto border data-table text-white rounded-b-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-4 text-sm font-medium text-white">
                            S.N
                          </th>
                          <th className="px-6 py-4 text-sm text-white">Name</th>

                          <th className="px-6 py-4 text-sm text-white">
                            Mobile
                          </th>
                          <th className="px-6 py-4 text-sm text-white">
                            Reward
                          </th>
                          <th className="px-6 py-4 text-sm text-white">
                            User ID
                          </th>

                          <th className="px-6 py-4 text-sm text-white">
                            Sponsor ID
                          </th>
                          <th className="px-6 py-4 text-sm text-white min-w-48">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.history?.length > 0 ? (
                          data?.history.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 text-sm font-medium text-white">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 text-sm text-white">
                                {item?.name}
                              </td>

                              <td className="px-6 py-4 text-sm text-white">
                                {item?.mobile}
                              </td>
                              <td className="px-6 py-4 text-sm text-white">
                                {Number(item?.reward) / POWER_SIX_OF_10}
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
                                      ? formatWalletAddress(
                                          item.sponsorId,
                                          5,
                                          8
                                        )
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
                                {formatEpochToCustomDate(item?.createdAt)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
