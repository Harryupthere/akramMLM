import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppScreen, { TabContent } from "./AppScreen";

const Transfer = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <>
      <div className=" text-white ">
        <img
          src={process.env.PUBLIC_URL + "/assets/left.png"}
          className="px-5 pt-4 cursor-pointer"
          onClick={handleNavigate}
        />
        <h2 className="text-white text-center font-bold">Transfer</h2>
        <div className="max-w-[400px] w-full mx-auto py-5  my-[3rem]">
          <Link to="/direct-reward">
            <div className="flex items-center gap-4 flex-wrap py-2 mb-5  px-4 bg-gradient-to-r from-[#157AC8] to-[#BC28D3] rounded-full">
              <div className="bg-white rounded-full h-[50px] w-[50px] grid place-items-center px-3">
                <img
                  src={process.env.PUBLIC_URL + "/assets/direct.svg"}
                  className="max-w-[30px] w-full mx-auto"
                />
              </div>
              <div>
                <h3 className="font-bold">Direct Reward</h3>
              </div>
            </div>
          </Link>

          <Link to="/level-reward">
            <div className="flex items-center gap-4 flex-wrap py-2 px-4 mb-5 bg-gradient-to-r from-[#157AC8] to-[#BC28D3] rounded-full">
              <div className="bg-white rounded-full h-[50px] w-[50px] grid place-items-center px-3">
                <img
                  src={process.env.PUBLIC_URL + "/assets/level.svg"}
                  className="max-w-[30px] w-full mx-auto"
                />
              </div>
              <div>
                <h3 className="font-bold">Level Reward</h3>
              </div>
            </div>
          </Link>
          <Link to="/Matching-reward">
            <div className="flex items-center gap-4 flex-wrap py-2 px-4 bg-gradient-to-r from-[#157AC8] to-[#BC28D3] rounded-full">
              <div className="bg-white rounded-full h-[50px] w-[50px] grid place-items-center px-3">
                <img
                  src={process.env.PUBLIC_URL + "/assets/matching.svg"}
                  className="max-w-[30px] w-full mx-auto"
                />
              </div>
              <div>
                <h3 className="font-bold">Matching Reward</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Transfer;
