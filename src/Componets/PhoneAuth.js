import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import OTPInput from 'otp-input-react';
import { auth } from '../firebase/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Context } from '../Context/Context';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@mui/material';

const PhoneAuth = ({ open, onClose, onVerify }) => {
  const navigate = useNavigate();
  const { Lang, setLang } = useContext(Context);
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [ph, setPh] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (showOTP) {
      setupRecaptcha();
    }
  }, [showOTP]);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA solved');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
      }
    }, auth);
  };

  const onSignup = () => {
    setLoading(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phone = '+' + ph;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setLoading(false);
        setShowOTP(true);
        alert('OTP sent successfully');
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        alert('Error sending OTP: ' + error.message);
        setLoading(false);
      });
  };

  const verifyCode = () => {
    setLoading1(true);
    if (confirmationResult) {
      confirmationResult.confirm(otp)
        .then((result) => {
          const user = result.user;
          console.log('User signed in', user);
          alert('Login Success');
          setShowOTP(false);
          setPh('');
          setLang('fr');
          i18n.changeLanguage('fr');
          navigate('/');
        })
        .catch((error) => {
          console.error('Error verifying code:', error);
          alert('Error verifying OTP: ' + error.message);
          setLoading1(false);
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={styles.container}>
        <label style={styles.label}>Verify your phone number</label>

        <PhoneInput
          country="IN"
          value={ph}
          onChange={setPh}
          containerStyle={styles.phoneInputContainer}
          inputStyle={styles.phoneInput}
        />

        <div id="recaptcha-container"></div>

        <div style={styles.buttonContainer}>
          <button onClick={onSignup} style={styles.button}>
            {loading && <CgSpinner size={20} style={styles.spinner} />}
            <span>Send code via SMS</span>
          </button>
        </div>

        {showOTP && (
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
    </Dialog>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
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
  },
  otpInput: {
    width: '3rem',
    height: '3rem',
    margin: '0 0.5rem',
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
  spinner: {
    marginRight: '8px',
  },
};

export default PhoneAuth;
