import React from "react";
import Image from "next/image";
import { Profile } from "@/Asset";
import { EditIcon } from "@/Asset";
import { ReviewIcon } from "@/Asset";
import { SupportIcon } from "@/Asset";
import { SettingIcon } from "@/Asset";
import { LogoutIcon } from "@/Asset";

interface SideBarProps {
  selectedItem: number;
  handleItemClick: (index: number) => void;
}

const menuItems = [
  { name: "Your Profile", icon: Profile },
  { name: "Your Applications", icon: EditIcon },
  { name: "Your Reviews", icon: ReviewIcon },
  { name: "Support", icon: SupportIcon },
  { name: "Account Settings", icon: SettingIcon },
  { name: "Logout", icon: LogoutIcon },
];

const SideBar: React.FC<SideBarProps> = ({ selectedItem, handleItemClick }) => {
  // const router = useRouter();
  // const dispatch = useAppDispatch();

  // const onMenuClick = (index: number) => {
  //   if (menuItems[index].name === "Logout") {
  //     dispatch(clearAuthState());
  //     router.push("/");
  //   } else {
  //     handleItemClick(index);
  //   }
  // };

  return (
    <div className="shadow-lg px-4 md:px-0 sm:py-3 py-0 rounded-lg border overflow-x-auto hide-scrollbar w-full">
      <div className="flex sm:flex-col flex-row gap-2 text-xs md:text-base text-center py-2 lg:px-4 font-work-sans capitalize cursor-pointer lg:p-2 w-full min-w-fit">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`sm:p-3 p-2 rounded-lg flex flex-row items-center gap-3 md:gap-2 justify-center md:justify-start text-sm cursor-pointer w-44 xl:w-60 ${selectedItem === index
              ? "bg-primary text-white"
              : "bg-white hover:bg-gray-300 border md:border-none"
              }`}
            onClick={() => handleItemClick(index)}
          >
            <Image src={item.icon} width={20} height={20} alt={item.name} className="inline-block sm:flex" />
            <h4 className="sm:text-base text-xs flex ">{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
