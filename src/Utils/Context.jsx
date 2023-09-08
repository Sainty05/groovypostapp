import React, { useContext, useState } from "react";
import axiosBaseUrl from "./axiosBaseUrl";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [postData, setPostdata] = useState([]);

  const posts = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axiosBaseUrl
      .get("/drive/feed-list/64fab057e0e0f77534becf07", config)
      .then((res) => {
        setPostdata(res.data.data);
      });
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        postData,
        setPostdata,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
