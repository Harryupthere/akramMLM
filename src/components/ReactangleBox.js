import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  firstColor,
  secondColor,
  POWER_SIX_OF_10,
  MATCH_TYPE,
  DIRECT_TYPE,
} from "../config";
import {
  claimDirectReward,
  claimMatchingReward,
  getJoiningDays,
  getSponsorCount,
} from "../web3Service";
import { useAccount } from "wagmi";
import { Popup } from "./Popup/Popup";
import { toast } from "react-toastify";

const RectangleBox = ({ earning, setIsLoading }) => {
  const navigate = useNavigate();
  const [directReferals, setDirectReferals] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [joiningDays, setJoiningDays] = useState(0);
  const [popupData, setPopupData] = useState({
    topic: "",
    message: "",
  });
  const [type, setType] = useState(null);
  const { address, isConnected } = useAccount();

  async function fetchDirectRewardHistory() {
    const sCount = await getSponsorCount(address);
    console.log("SCount : ", sCount);
    setDirectReferals(sCount);
  }

  async function fetchJoiningDays() {
    const days = await getJoiningDays(address);
    console.log("days : ", days);

    setJoiningDays(days);
  }

  useEffect(() => {
    if (address && isConnected) {
      fetchDirectRewardHistory();
      fetchJoiningDays();
    }
  }, [address, isConnected, setIsLoading]);

  const handleConfirmClick = async (type, inputAmount) => {
    setShowConfirmation(false);

    if (type === MATCH_TYPE) {
      setIsLoading(true);
      await claimMatchingReward(address, inputAmount * POWER_SIX_OF_10);
      setIsLoading(false);
    } else if (type === DIRECT_TYPE) {
      setIsLoading(true);
      await claimDirectReward(address, inputAmount * POWER_SIX_OF_10);
      setIsLoading(false);
    } else {
      alert("Invalid type");
    }
  };

  const handleCancelClick = () => {
    setShowConfirmation(false);
  };

  const Card = ({ imgSrc, value, buttonText, onClick, isGradient }) => (
    <div
      className={`min-h-[100px] md:min-h-[200px] min-w-[200px] md:min-w-[200px] flex-1 
        ${
          isGradient
            ? `bg-gradient-to-r from-[${firstColor}] to-[${secondColor}]`
            : "border border-[#C026D3] bg-[#00011B]"
        } rounded-lg py-5 px-5`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/${imgSrc}`}
        className="max-w-[80px] w-full mx-auto"
        alt={buttonText}
      />
      <h1 className="text-white text-center text-lg py-5">{value}</h1>
      <div className="text-center">
        <button
          onClick={onClick}
          className={`${
            isGradient
              ? "bg-white text-[#C026D3]"
              : `bg-gradient-to-r from-[${firstColor}] to-[${secondColor}]`
          } rounded-full px-5 py-3 text-sm cursor-pointer`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center">
      <Card
        imgSrc="R1.svg"
        value={(Number(earning?.directEarn) / POWER_SIX_OF_10).toFixed(2)}
        buttonText="Direct Earned"
        onClick={() =>
          navigate("/history", {
            state: {
              data: {
                title: "Direct Reward",
                amount: 10,
                subTitle: "History Of Direct Reward",
                history: directReferals,
              },
            },
          })
        }
      />
      <Card
        imgSrc="R2.svg"
        value={(Number(earning?.directRemaining) / POWER_SIX_OF_10).toFixed(2)}
        buttonText="Direct Remaining"
        onClick={() => {
          setShowConfirmation(true);

          setPopupData({
            topic: "Claim Direct Reward",
            message: "Do you want to claim your reward?",
          });

          setType(DIRECT_TYPE);
        }}
      />
      <Card
        imgSrc="R3.svg"
        value={(Number(earning?.matchEarning) / POWER_SIX_OF_10).toFixed(2)}
        buttonText="Match Earned"
      />
      <Card
        imgSrc="R4.svg"
        value={(Number(earning?.matchRemaining) / POWER_SIX_OF_10).toFixed(2)}
        buttonText="Match Remaining"
        onClick={() => {
          setShowConfirmation(true);
          setPopupData({
            topic: "Claim Match Reward",
            message: "Do you want to claim your reward?",
          });
          setType(MATCH_TYPE);
        }}
      />
      <Card
        imgSrc="R5.svg"
        value={(Number(earning?.totalEarning) / POWER_SIX_OF_10).toFixed(2)}
        buttonText="Total Reward"
        isGradient
      />
      <Card
        imgSrc="R6.svg"
        value={
          Number(joiningDays) > 0
            ? Number(earning?.airdopAmount) > 0
              ? 5 * Number(joiningDays) + Number(earning?.airdopAmount)
              : Number(earning?.airdopAmount) || 0 // Default to 0 if airdopAmount is undefined or null
            : 0 // Default to 0 if joiningDays is not greater than 0
        }
        buttonText="Daily 1% Reward"
        onClick={() => {
          toast.error("Airdop cliam not available");
        }}
      />
      <div>
        {showConfirmation && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg h-[200px]">
            {/* <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 rounded-lg h-[200px]"> */}
            <Popup
              topic={popupData.topic}
              message={popupData.message}
              onConfirm={handleConfirmClick}
              onCancel={handleCancelClick}
              type={type}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RectangleBox;
