import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import getUserInfo from '../getUserInfo';
import axios from 'axios';
import OTPVerification from '../Componets/OTPFormmod';


const BrowserFilter = () => {
    const navigate = useNavigate();
  const { Lang, setLang, } = useContext(Context);
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState('');
  const {browser,setbrowser}=useContext(Context);
  const {device,setdevice}=useContext(Context);
  const {showcomp,setshowcomp}=useContext(Context);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = getUserInfo();
      setUserInfo(info);
      
      // Fetch and store user info
     // await axios.post(`http://localhost:5000/api/Login/storeUserInfo`, { userInfo: info });
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (browser === 'Edge') {
      setMessage('No authentication required for Microsoft Edge');
      
      showcomp(true);
      navigate('/home');
       // Redirect to home or appropriate page
    } else if (device === 'mobile') {
      const currentHour = new Date().getHours();
      if (currentHour >= 10 && currentHour <= 13) {
        setMessage('OTP verification required for mobile devices');
        alert('OTP verification required for mobile devices');
        

      } else {
        setMessage('Access restricted to 10 AM - 1 PM on mobile devices');
         // Redirect to restricted access page
         alert('Access restricted to 10 AM - 1 PM on mobile devices');
      }
    }
  }, [userInfo]);

  return (
    <div>
      {message && <p>{message}</p>}
      {userInfo.browser !== 'Microsoft Edge' && userInfo.device !== 'mobile' && (
        <OTPVerification
          
        />
      )}
    </div>
  );
};

export default BrowserFilter;
