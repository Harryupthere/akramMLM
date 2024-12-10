import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { firstColor, secondColor } from "../config.js";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import {
  getLeftRightTree,
  getNestSponsorRemainingTime,
  getNodeData,
  getSponsorEarnings,
} from "../web3Service.js";
import LeaderTable from "./LeaderTable.js";
import ReactangleBox from "./ReactangleBox.js";
import {
  copyToClipboard,
  formatEpochToCustomDate,
  formatWalletAddress,
} from "./Helper/help.js";
import Loader from "./Loader/Loader.js";
import { AirdropPopup } from "./Popup/AirdopPopup.js";

const Main = ({ text }) => {
  const textAreaRef = useRef(null);
  const [leftTree, setLeftTree] = useState(null);
  const [rightTree, setRightTree] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeForNextJoiner, setTimeForNextJoiner] = useState(0);
  const [showAirdropPopup, setShowAirdropPopup] = useState(true);
  const [user, setUser] = useState({
    airdopTokens: "",
    exists: false,
    joiningTime: "",
    lastSponsorTime: "",
    left: "",
    mobile: "",
    name: "",
    right: "",
  });

  const [earning, setEarning] = useState(0); // Default earning to 0

  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    setShowAirdropPopup(false);
  };

  // Function to fetch data using web3Service
  async function fetchData() {
    setIsLoading(true);
    try {
      const nodeData = await getNodeData(address);

      if (!nodeData?.exists) {
        navigate("/register");
      }

      const sponsorEarnings = await getSponsorEarnings(address);
      const timer = await getNestSponsorRemainingTime(
        address,
        nodeData.lastSponsorTime,
        sponsorEarnings.leftSize,
        sponsorEarnings.rightSize
      );
      setTimeForNextJoiner(timer);

      console.log("timer : ", timer);

      // Start countdown if timer is available
      if (timer?.time) {
        startCountdown(timer.time);
      }

      // console.log("Timer : ", timer);

      setEarning(sponsorEarnings); // Ensure earning is not NaN or undefined

      if (nodeData) {
        setUser(nodeData);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      // toast.error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  async function otherData() {
    setIsLoading(true);
    try {
      const tree = await getLeftRightTree(address);
      setLeftTree(tree["0"]);
      setRightTree(tree["1"]);
    } catch (error) {
      toast.error("An error occurred while fetching tree data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (address && isConnected) {
      fetchData();
      otherData();
    } else {
      navigate("/");
    }
  }, [address, isConnected]);

  // Countdown logic
  // Countdown Timer Logic
  const startCountdown = (totalSeconds) => {
    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(interval);
        setTimeForNextJoiner(null);
        return;
      }

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeForNextJoiner({
        days,
        hours,
        minutes,
        seconds,
      });

      totalSeconds -= 1;
    }, 1000);
  };

  return (
    <div>
      <div>
        <img
          src={process.env.PUBLIC_URL + "/assets/profile.png"}
          className="w-100 mx-auto max-w-[300px]"
        />
      </div>
      <div
        className={`px-5 py-5 my-5 rounded-2xl bg-gradient-to-r from-[${firstColor}] to-[${secondColor}]`}
      >
        <h6 className="text-lg text-white font-bold text-center">
          My Information
        </h6>
        <div className="info-table py-5">
          <table className="text-white w-full mx-auto py-2">
            <tbody>
              <tr>
                <th className="text-left font-light border-0">Name:</th>
                <td className="text-left border-0">
                  {user?.name || "Loading..."}
                </td>
              </tr>

              <tr>
                <th className="text-left font-light border-0">Mobile:</th>
                <td className="text-left border-0">
                  {user?.mobile || "Loading..."}
                </td>
              </tr>
              <tr>
                <th className="text-left font-light border-0">Joining Date:</th>
                <td className="text-left border-0">
                  {user?.joiningTime
                    ? formatEpochToCustomDate(user.joiningTime)
                    : "Loading..."}
                </td>
              </tr>

              <tr>
                <th className="text-left font-light border-0">
                  Wallet Address:
                </th>
                <td className="flex text-left border-0  items-center">
                  <input
                    ref={textAreaRef}
                    value={address || ""}
                    readOnly
                    className="opacity-0 w-0 h-0 absolute"
                  />
                  {address ? formatWalletAddress(address, 5, 8) : "Loading..."}
                  <img
                    src={process.env.PUBLIC_URL + "/assets/copy.svg"}
                    className="ml-2 cursor-pointer"
                    alt="Copy Address"
                    onClick={() => {
                      copyToClipboard(address);
                    }}
                  />

                  <img
                    src={process.env.PUBLIC_URL + "/assets/share.svg"}
                    className="ml-2 cursor-pointer"
                    alt="Copy Address"
                    style={{ width: "16px", height: "20px" }}
                    onClick={() => {
                      copyToClipboard(
                        `http://localhost:3000?sponsor=${address}`
                      );
                    }}
                  />
                </td>
              </tr>

              {earning.airdopAmount > 0 && (
                <tr>
                  <th className="text-left font-light border-0">
                    Airdrop Amount:
                  </th>
                  <td className="text-left border-0 text-green-500 font-bold">
                    {earning.airdopAmount}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!timeForNextJoiner.isTimer &&
        (timeForNextJoiner.minutes || timeForNextJoiner.seconds) && (
          <div
            className={`px-5 py-5 my-5 rounded-2xl bg-gradient-to-r from-[${firstColor}] to-[${secondColor}] text-white`}
          >
            Refer now and get $12 bonus! Earn $6 for each joiner, plus an extra
            $6 if they join within the time limit. Hurry! Time left:{" "}
            <span>
              {`${timeForNextJoiner.days ?? 0}d: ${
                timeForNextJoiner.hours ?? 0
              }h: ${timeForNextJoiner.minutes ?? 0}m: ${
                timeForNextJoiner.seconds ?? 0
              }s`}
            </span>
          </div>
        )}

      <ReactangleBox earning={earning} setIsLoading={setIsLoading} />
      {/* Ensure earning is valid */}
      <div className="py-5 my-5">
        <img
          src={process.env.PUBLIC_URL + "/assets/pie.png"}
          className="max-w-[300px] w-full mx-auto"
        />
      </div>
      <LeaderTable title="Left Team" tree={leftTree} />
      <LeaderTable title="Right Team" tree={rightTree} />

      <div>
        {showAirdropPopup && earning.airdopAmount == 0 && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg h-[200px] w-[400px]">
            <AirdropPopup
              topic={"Airdop Popup"}
              message={
                "Referal first person to get 500 Tokens Airdrop in your wallet"
              }
              onCancel={handleCancelClick}
            />
          </div>
        )}
      </div>

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Main;
