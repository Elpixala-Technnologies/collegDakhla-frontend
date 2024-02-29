import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import parse from "html-react-parser";
// import "react-tabs/style/react-tabs.css";

const TabComponent = ({ tabs }: { tabs: any }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    console.log("mkrfrkmk");

    setActiveTab(index);
  };

  return (
    <div className="max-w-screen-md mx-auto border mb-7 border-primary-text-light rounded-md">
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <div className="flex gap-2 p-4 border-b border-b-primary-text-light">
          <TabList className="flex gap-4">
            {tabs.map((tab: any, index: number) => (
              <Tab
                key={index}
                className={`text-center p-2 border-b-2 text-[15px] cursor-pointer ${
                  activeTab === index
                    ? "border-b-primary text-primary"
                    : "border-b-transparent text-primary-text"
                }`}
              >
                {tab.title}
              </Tab>
            ))}
          </TabList>
        </div>

        <div className="p-4">
          {tabs.map((tab: any, index: number) => (
            <TabPanel key={index}>
              {typeof tab.content === "string"
                ? parse(tab.content)
                : tab.content}
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default TabComponent;
