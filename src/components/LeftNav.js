import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { Context } from "../context/ContextApi";
import { categories } from "../utils/Constants";

import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

function LeftNav() {
  const { selectcategories, setSelectCategories, mobileMenu, theme, setTheme } =
    useContext(Context);
  const navigate = useNavigate();

  const clickHandle = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategories(name);
      case "home":
        return setSelectCategories(name);
      case "menu":
        return false;

      default:
        break;
    }
  };
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-white dark:bg-black absolute md:relative z-10 hide translate-x-[-240px] md:translate-x-0 transition-all ${mobileMenu ? "translate-x-[0px]" : ""
        }`}
    >
      <div className="md:hidden flex ml-5 mb-2">
        <div
          onClick={handleThemeSwitch}
          className="bg-[#c5e0fb] flex items-center py-1 px-5 rounded-md cursor-pointer hover:bg-[#9dcaf7]"
        >
          {theme === "dark" ? (
            <>
              Light Mode <MdOutlineLightMode className="pl-1 text-xl" />
            </>
          ) : (
            <>
              Dark Mode <MdDarkMode className="pl-1 text-xl text-[#3a5171]" />
            </>
          )}
        </div>
      </div>
      <div className="flex px-5 flex-col">
        {categories?.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                key={item.type}
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandle(item.name, item.type);
                  navigate("/");
                }}
                className={`${selectcategories === item.name
                  ? "bg-black/[0.15] dark:bg-white/[0.15]"
                  : ""
                  }`}
              />
              {item.divider && (
                <hr className="my-5 border-white/[0.2] dark:border-black/[0.2]" />
              )}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white[0.2]" />
        <div className="text-black/[0.5] dark:text-white/[0.5] text-[12px] font-semibold">
          &#169;2023 || Shivesh
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
