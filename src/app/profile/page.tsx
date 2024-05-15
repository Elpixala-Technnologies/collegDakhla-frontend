// "use client";
// import React, { useState } from "react";
// import SideBar from "../../components/LoginComp/SideBar";
// import YourProfile from "./YourInformation";
// import YourApplications from "./YourApplication";
// import YourReviews from "./YourReviews";
// import Support from "./YourSupport";
// import AccountSettings from "./YourAccountSetting";

// const componentsNames = [
//   "Your Profile",
//   "Your Applications",
//   "Your Reviews",
//   "Support",
//   "Account Settings",
//   "Logout",
// ];

// const ProfilePage = () => {
//   const [selectedItem, setSelectedItem] = useState(0);

//   const handleItemClick = (index: number) => {
//     setSelectedItem(index);
//   };
//   const components = [
//     <YourProfile />,
//     <YourApplications />,
//     <YourReviews />,
//     <Support />,
//     <AccountSettings />,
//   ];

//   return (
   
//       <div className="max-w-screen-xl mx-auto m-2 mt-10">
//         <section className="navbar-landingPage-responsive">
//           <span className="text-lg px-4">{componentsNames[selectedItem]}</span>
//         </section>
//         <section className="mt-5 p-2 sm:flex sm:flex-row flex-col lg:gap-5 gap-1 items-start justify-center ">
//           <div className="sm:w-auto w-full">
//             <SideBar
//               selectedItem={selectedItem}
//               handleItemClick={handleItemClick}
//             />
//           </div>
//           <div className="flex w-full">{components[selectedItem]}</div>
//         </section>
//         <section className="max-w-screen-xl mx-auto px-4 my-12">
          
//         </section>
//       </div>
//   );
// };

// export default ProfilePage;

"use client";
import React, { useState } from "react";
import SideBar from "../../components/LoginComp/SideBar";
import YourProfile from "./YourInformation";
import YourApplications from "./YourApplication";
import YourReviews from "./YourReviews";
import Support from "./YourSupport";
import AccountSettings from "./YourAccountSetting";

const componentsNames = [
  "Your Profile",
  "Your Applications",
  "Your Reviews",
  "Support",
  "Account Settings",
  "Logout",
];

const ProfilePage = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  const components = [
    <YourProfile key="profile" />,
    <YourApplications key="applications" />,
    <YourReviews key="reviews" />,
    <Support key="support" />,
    <AccountSettings key="settings" />,
  ];

  return (
    <div className="max-w-screen-xl mx-auto m-2 mt-10">
      <section className="navbar-landingPage-responsive">
        <span className="text-lg px-4">{componentsNames[selectedItem]}</span>
      </section>
      <section className="mt-5 p-2 sm:flex sm:flex-row flex-col lg:gap-5 gap-1 items-start justify-center">
        <div className="sm:w-auto w-full">
          <SideBar selectedItem={selectedItem} handleItemClick={handleItemClick} />
        </div>
        <div className="flex w-full">
          {components[selectedItem]}
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto px-4 my-12">
        {/* Additional content can go here */}
      </section>
    </div>
  );
};

export default ProfilePage;
