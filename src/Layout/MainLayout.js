import React, { useState } from "react";
import Main from "../components/Main";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="">
        <TabContent activeTab={activeTab} />
        <div className="bottom-tabs bg-[#040636] fixed bottom-0 left-0 w-full justify-between p-[10px] flex">
          <div className="tab" onClick={() => handleTabClick("tab1")}>
            <img
              src={process.env.PUBLIC_URL + "/assets/a1.png"}
              className="w-full max-w-[40px] mx-auto"
            />
          </div>
          <div className="tab" onClick={() => handleTabClick("tab2")}>
            <img
              src={process.env.PUBLIC_URL + "/assets/a2.png"}
              className="w-full max-w-[40px] mx-auto"
            />
          </div>
          <div className="tab" onClick={() => handleTabClick("tab3")}>
            <img
              src={process.env.PUBLIC_URL + "/assets/a3.png"}
              className="w-full max-w-[40px] mx-auto"
            />
          </div>
          <div className="tab" onClick={() => handleTabClick("tab4")}>
            <img
              src={process.env.PUBLIC_URL + "/assets/a4.png"}
              className="w-full max-w-[40px] mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;

export const TabContent = ({ activeTab }) => {
  return (
    <>
      <div className="tab-content  bg-gradient-to-r from-[#04021F] to-[#280941]">
        {activeTab === "tab1" && (
          <div>
            <Main />
          </div>
        )}
        {activeTab === "tab2" && <div>Content for Tab 2</div>}
        {activeTab === "tab3" && <div>Content for Tab 3</div>}
        {activeTab === "tab4" && <div>Content for Tab 3</div>}
      </div>
    </>
  );
};
