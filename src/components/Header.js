import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytlogo from "../images/logo.png";
import ytlogo2 from "../images/logo2.png";
import logo from "../images/youtube.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { CgClose } from "react-icons/cg";

import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

import { Context } from "../context/ContextApi";
import Loader from "../shared/loader";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu, theme, setTheme } = useContext(Context);

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  const [isListening, setIsListening] = useState(false);
  const handleMicrophoneClick = () => {

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      console.log(transcript);
    };

    recognition.start();
  };

  return (
    <div className="sticky top-0 z-20 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            className="flex md:hidden md:mr-6 mr-2 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#8888]/[0.6]"
            onClick={mobileMenuToggle}
          >
            {mobileMenu ? (
              <CgClose className="dark:text-white text-black text-xl" />
            ) : (
              <SlMenu className="dark:text-white text-black text-xl" />
            )}
          </div>
        )}
        <Link to="/" className="flex h-5 items-center">
          <img
            className="hidden dark:hidden md:block h-8"
            src={ytlogo}
            alt="Youtube"
          />
          <img
            className=" hidden dark:md:block h-16"
            src={ytlogo2}
            alt="Youtube"
          />
          <img className="md:hidden h-6 mr-4" src={logo} alt="Youtube" />
        </Link>
      </div>
      <div className="group flex items-center my-1 mr-4">
        <div className="flex h-8 md:h-10 md:ml-8 md:pl-5 border border-[#888888] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-black dark:text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-black dark:text-white pr-5 pl-5  md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder="Search"
            value={searchQuery}
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#888888] rounded-r-3xl bg-white/[0.1] dark:bg-black/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-black dark:text-white text-xl" />
        </button>
        <button
          className="ml-4 md:ml-1 p-1.5 border border-l-r border-[#636363] rounded-3xl bg-white/[0.1] dark:bg-black/[0.1]"
          onClick={handleMicrophoneClick}
        >
          {isListening ? <i style={{ padding: '5px ' }} className="fa-solid fa-microphone fa-xl dark:text-white"></i> : <i style={{ padding: '14px 4px ' }} className="fa-solid fa-microphone fa-xl dark:text-white"></i>}
        </button>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex">
          <div
            onClick={handleThemeSwitch}
            // className="flex justify-center items-center ml-2 h-10 w-10 rounded-full hover:bg-black/[0.2] dark:hover:bg-[#303030]/[0.6]"
            className="bg-[#c5e0fb] dark:bg-black flex items-center py-1 px-3 rounded-md cursor-pointer hover:bg-[#9dcaf7]"
          >
            {theme === "dark" ? (
              <>
               <MdOutlineLightMode className="text-white text-xl cursor-pointer" /> <p className="text-white pl-2">Light mode</p>
              </>
            ) : (
              <>
              
              <MdDarkMode className="text-[#3a5171] text-xl cursor-pointer" /> <p className="text-[#3a5171] pl-2">Dark mode</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Header;
