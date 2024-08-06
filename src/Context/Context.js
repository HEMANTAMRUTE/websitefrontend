// context.js
import React, { createContext, useState, useEffect } from 'react';
import getUserInfo from '../getUserInfo';

export const Context = createContext();

export const MyProvider = ({ children }) => {
  const [Lang, setLang] = useState("en");
  const [browser, setBrowser] = useState("");
  const [device, setDevice] = useState("");
  const [verifyWindow, setVerifyWindow] = useState(false);
  const [showcomp, setshowcomp] = useState(false);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = getUserInfo();
      setBrowser(info.browser);
      setDevice(info.device);
      setBrowser(browser);
      if (info.browser === 'Edge') {

        setVerifyWindow(false);

       
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Context.Provider value={{ Lang, setLang, browser, setBrowser, device, setDevice, verifyWindow, setVerifyWindow ,showcomp,setshowcomp}}>
      {children}
    </Context.Provider>
  );
};
