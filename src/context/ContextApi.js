import { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/Api";

export const Context = createContext();
 
export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectcategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    fetchSelectedCategoryData(selectcategories);
  },// eslint-disable-next-line
   [selectcategories]);

  const fetchSelectedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
      // console.log(contents);
      setSearchResult(contents);
      setLoading(false); 
    });
  }; 
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  }, [theme]);

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResult,
        selectcategories,
        setSelectCategories,
        mobileMenu,
        setMobileMenu,
        theme,
        setTheme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
