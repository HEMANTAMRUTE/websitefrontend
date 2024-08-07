import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const OTPVerification = ({ email, setEmail, userInfo, lng, setLang }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { i18n } = useTranslation();

  const sendOtp = async () => {
    try {
      const response = await fetch('https://websitebackend-v27m.onrender.com/api/otp/generate-otp', {
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
          alert('success');
        }, (error) => {
          console.log(error.text);
          setMessage('Failed to send OTP');
          alert('fail');
        });
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('https://websitebackend-v27m.onrender.com/api/otp/verify-otp', {
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
        
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessage('Failed to verify OTP');
    }
  };

  return (
    <div className='cont'>
      <h2>OTP Verification</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {otpSent && (
        <div className='OTP'>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
      )}
      <button onClick={otpSent ? verifyOtp : sendOtp}>
        {otpSent ? 'Verify OTP' : 'Send OTP'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPVerification;
