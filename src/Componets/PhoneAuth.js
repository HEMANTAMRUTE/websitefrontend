// src/components/MobileOTP.js
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from '@mui/material';
import { auth } from '../firebase/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import PhoneInput from "react-phone-input-2";
import OTPInput from "otp-input-react";
import {  useLocation,useNavigate } from 'react-router-dom';
import { CgSpinner } from "react-icons/cg";
import { Context } from '../Context/Context';
import { useTranslation } from 'react-i18next';
import {useContext} from 'react'

const PhoneAuth = ({ open, onClose, onVerify}) => {
  const navigate=useNavigate();
  // const [isFrench, setisFrench] = useState(true);
  const { Lang, setLang } = useContext(Context);
  const [loading, setloading] = useState(false);
  const [loading1,setloading1]=useState(false);
  const { i18n } = useTranslation();
  const [ph, setPh] = useState("");
  const [ShowOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { lng } = location.state || {};
  useEffect(() => {
    if (ShowOTP) {
      setupRecaptcha();
    }
  }, [ShowOTP]);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("reCAPTCHA solved");
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log("reCAPTCHA expired");
        },
      }
    );
  };
  const onSignup = () => {
    setloading(true);
    setShowOTP(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phone = "+" + ph;
    console.log(phone);
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message.
        setConfirmationResult(confirmationResult);
        console.log("SMS sent");
        setloading(false);
        alert("Sent OTP");
      })
      .catch((error) => {
        // Error; SMS not sent
        console.error("Error during sign-in", error);
      });
  };
  const verifyCode = () => {
    setloading1(true);
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // onVerify(language);
          // User signed in successfully.
          const user = result.user;
          console.log("User signed in", user);
          setloading1(false);
          alert("Login Success");
          setShowOTP(false);
          setPh('');
          i18n.changeLanguage(lng);
          setLang(lng);
          navigate('/');


        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.error("Error verifying code", error);
        });
    }
  };

//   return (
//     <Dialog open={open} onClose={onClose}>
      
//       <div className="flex flex-col items-center w-full">
//                         <label className="font-bold text-xl text-gray-800 text-center m-4">
//                           Verify your phone number
//                         </label>

//                         <PhoneInput
//                           country={"in"}
//                           value={ph}
//                           onChange={setPh}
//                           containerStyle={{
//                             width: "80%",
//                             marginLeft: "10%",
//                             overflow: "hidden visible",
//                             margin:"15px"
//                           }}
//                           inputStyle={{
//                             width: "100%",
//                             border: "2px solid gray",
//                           }}
//                         />
//                         <div>{}</div>
//                         <div className="mt-8 w-50 flex justify-center">
                          
//                           <button
//                             onClick={onSignup}
//                             className="bg-blue-500 h-9 text-white font-bold py-2 px-4 w-50 m-5 rounded hover:bg-blue-600 flex justify-center items-center"
//                           >
//                             {loading && (
//                               <>
//                                 <CgSpinner
//                                   size={20}
//                                   className="mr-2 animate-spin"
//                                 />
//                               </>
//                             )}
//                             <span>Send code via SMS</span>
//                           </button>
//                         </div>
//                       </div>
//                       {ShowOTP && (
//                     <>
//                       <div className="flex flex-col items-center w-full my-5">
//                         <label
//                           htmlfor="otp"
//                           className="font-bold text-xl text-gray-800 text-center mb-4"
//                         >
//                           Verify your phone number
//                         </label>
//                         <OTPInput value={otp} 
//                         onChange={setOtp} 
//                         autoFocus 
//                         OTPLength={6} 
//                         otpType="number" 
//                         disabled={false} 
//                         inputStyles={{
//                           width: '3rem',
//                           height: '3rem',
//                           margin: '0 0.5rem',
//                           fontSize: '1.5rem',
//                           borderRadius: '4px',
//                           border: '2px solid black',
//                           backgroundColor: 'lightgray',
//                           color: 'black',
//                           textAlign: 'center'
//                       }}
//                         secure />
//                       </div>
//                       <div className="mt-8 w-50 flex justify-center">
                          
//                           <button
//                              onClick={() => {
//                               verifyCode();
                             
//                             }}
//                             className="bg-blue-500 h-9 text-white font-bold py-2 px-4 w-50 rounded hover:bg-blue-600 flex justify-center items-center"
//                           >
//                             {loading1 && (
//                               <>
//                                 <CgSpinner
//                                   size={20}
//                                   className="mr-2 animate-spin"
//                                 />
//                               </>
//                             )}
//                             <span>Verify</span>
//                           </button>
//                         </div>
//                     </>
//                   )}
//     </Dialog>
//   )
// }
return (

    <div style={styles.container}>
      <label style={styles.label}>Verify your phone number</label>

      <PhoneInput
        country="IN"
        value={ph}
        onChange={setPh}
        containerStyle={styles.phoneInputContainer}
        inputStyle={styles.phoneInput}
      />

      <div style={styles.buttonContainer}>
        <button onClick={onSignup} style={styles.button}>
          {loading && <CgSpinner size={20} style={styles.spinner} />}
          <span>Send code via SMS</span>
        </button>
      </div>

      {ShowOTP && (
        <>
          <div style={styles.otpContainer}>
            <label htmlFor="otp" style={styles.label}>Enter OTP</label>
            <OTPInput
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              inputStyles={styles.otpInput}
              secure
            />
          </div>
          <div style={styles.buttonContainer}>
            <button onClick={verifyCode} style={styles.button}>
              {loading1 && <CgSpinner size={20} style={styles.spinner} />}
              <span>Verify</span>
            </button>
          </div>
        </>
      )}
    </div>

);
};

const styles = {
  dialog: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,  
  },
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    border: '2px solid black',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '300px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  phoneInputContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  phoneInput: {
    width: '100%',
    padding: '10px',
    border: '2px solid gray',
  },
  otpContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',  // Ensures wrapping of OTP inputs if necessary
  },
  otpInput: {
    width: '2.5rem',    // Reduced width to fit within the container
    height: '2.5rem',   // Adjusted height to match width
    margin: '0 0.25rem', // Reduced margin to prevent overflow
    fontSize: '1.5rem',
    borderRadius: '4px',
    border: '2px solid black',
    backgroundColor: 'lightgray',
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  spinner: {
    marginRight: '8px',
  },
};


export default PhoneAuth;
