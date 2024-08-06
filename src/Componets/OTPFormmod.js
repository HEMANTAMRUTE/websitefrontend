import React, { useState, useContext } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OTPFormmod.module.css'; // Import the CSS module
import { Context } from '../Context/Context'; // Correct the import path if needed
import getUserInfo from '../getUserInfo'; // Import the utility function
import axios from 'axios';

const OTPFormmod = ({ onVerify }) => {
  const handleVerification = () => {
    onVerify(true); // Notify App component that OTP is verified
  };

  const navigate = useNavigate();
  const { Lang, setLang } = useContext(Context);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();
  const { lng } = location.state || {}; // Get the language code from the state

  const sendOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/otp/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedOtp = data.otp;

      const templateParams = {
        to_email: email,
        otp: generatedOtp,
      };

      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
        .then((result) => {
          console.log(result.text);
          setMessage('OTP sent');
          setOtpSent(true);
        }, (error) => {
          console.log(error.text);
          setMessage('Failed to send OTP');
          alert('fail');
        });

      // Fetch and store user info
      alert('sended');
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/otp/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      setMessage(data);
      if (data === 'OTP verified') {
        i18n.changeLanguage(lng);
        setLang(lng);
        const userInfo = await getUserInfo();
        await axios.post('http://localhost:5000/api/Login/storeUserInfo', { userInfo });

        handleVerification();
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('Failed to verify OTP');
    }
  };

  return (
    <div className={styles.otpContainer}>
      <h2 className={styles.otpTitle}>OTP Verification</h2>
      <div>
        <label className={styles.otpLabel}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.otpInput}
        />
      </div>
      {otpSent && (
        <div className={styles.otpField}>
          <label className={styles.otpLabel}>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.otpInput}
          />
        </div>
      )}
      <button onClick={otpSent ? verifyOtp : sendOtp} className={styles.otpButton}>
        {otpSent ? 'Verify OTP' : 'Send OTP'}
      </button>
      {message && <p className={styles.otpMessage}>{message}</p>}
    </div>
  );
};

export default OTPFormmod;
