import React, { useState } from "react";
import Main from "./Main";
const AppScreen = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="max-w-[500px] w-full mx-auto ">
        <TabContent activeTab={activeTab} />
        {/* <div className=" sticky bottom-tabs bg-[#040636]  bottom-0 left-0 w-full justify-between p-[10px] flex">
          <div
            className={`tab ${activeTab === "tab1" ? "active-tab" : ""}`}
            onClick={() => handleTabClick("tab1")}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/I1.svg"}
              className="w-full max-w-[30px] mx-auto"
            />
          </div>
          <div
            className={`tab ${activeTab === "tab2" ? "active-tab" : ""}`}
            onClick={() => handleTabClick("tab2")}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/I3.svg"}
              className="w-full max-w-[30px] mx-auto"
            />
          </div>

          <div
            className={`tab ${activeTab === "tab4" ? "active-tab" : ""}`}
            onClick={() => handleTabClick("tab4")}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/I4.svg"}
              className="w-full max-w-[30px] mx-auto"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AppScreen;
export const TabContent = ({ activeTab }) => {
  return (
    <>
      <div className="tab-content  bg-gradient-to-r from-[#04021F] to-[#280941] min-h-screen">
        {activeTab === "tab1" && (
          <div>
            <Main />
          </div>
        )}
      </div>
    </>
  );
};
