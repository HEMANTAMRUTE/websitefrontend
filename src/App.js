import './App.css';
import Footer from './Componets/Footerr/Footer';
import Home from './Componets/Home/Home';
import Navbar from './Componets/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Register from './Componets/auth/Register';
import Intern from "./Componets/Internships/Intern";
import JobAvl from "./Componets/Job/JobAvl";
import JobDetail from './Componets/Job/JobDetail';
import InternDeatil from "./Componets/Internships/InternDeatil";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "./Feature/Userslice";
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from "./Admin/ViewAllApplication";
import Postinternships from './Admin/Postinternships';
import PostJob from './Admin/PostJob';
import Otpform from "./Componets/OTPForm/OTPForm.js";
import DeatilApplication from './Applications/DeatilApplication';
import UserApplicatiom from './profile/UserApplicatiom';
import UserapplicationDetail from "./Applications/DeatilApplicationUser";
import PhoneAuth from './Componets/PhoneAuth.js';
import OTPFormmod from './Componets/OTPFormmod.js';
import getUserInfo from './getUserInfo.js';
import BrowserFilter from './BrowserFilter.js/BrowserFilter.js';
import LoginHistory from './Componets/Loginhistory/LoginHistory.js';
import axios from 'axios';

function App() {
  const [isOTPVerified, setIsOTPVerified] = useState(false); // State to track OTP verification
  const [showNavbar, setShowNavbar] = useState(true); // State to manage Navbar visibility
  const [showCannotAccessMessage, setShowCannotAccessMessage] = useState(false); // State to manage access message
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo();
        // console.log('User Info:', info); // Debugging: Log user info

        const currentHour = new Date().getHours();
        const isMobile = info.device === 'Mobile';
        const isWithinTimeRange = (currentHour >=10 && currentHour < 13);
        console.log(isWithinTimeRange ); // Between 10 AM and 5 PM

        if (info.browser === 'Edge') {
          setIsOTPVerified(true);
          await axios.post('https://websitebackend-v27m.onrender.com/api/Login/storeUserInfo', { userInfo: info });
        } 
        else if (isMobile && isWithinTimeRange) {
          setIsOTPVerified(false); // Show OTP form
        }
        else if (isMobile) {
          setShowCannotAccessMessage(true); // Show access message
        }else if (info.browser === 'Chrome') {
          setIsOTPVerified(true);
        }   else {
          setIsOTPVerified(true); // Default case
        }
      } catch (error) {
        console.error('Error fetching user info:', error); // Handle errors
      }
    };

    fetchUserInfo();

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          name: authUser.displayName,
          email: authUser.email,
          phoneNumber: authUser.phoneNumber
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [dispatch]);

  const handleOTPVerification = (status) => {
    setIsOTPVerified(status); // Update OTP verification state
  };

  return (
    <div className="App">
      {showCannotAccessMessage ? (
        <div className="access-message">
          <h2>Access Restricted</h2>
          <p>You can only access this page between 10 AM and 1 PM.</p>
        </div>
      ) : !isOTPVerified ? (
        <OTPFormmod onVerify={handleOTPVerification} /> // Show OTPVerification if not verified
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/BrowserFilter' element={<BrowserFilter />} />
            <Route path='/loginhistory' element={<LoginHistory />} />
            <Route path='/register' element={<Register />} />
            <Route path='/internship' element={<Intern />} />
            <Route path='/otpform' element={<Otpform />} />
            <Route path='/Jobs' element={<JobAvl />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/detailjob' element={<JobDetail />} />
            <Route path='/detailInternship' element={<InternDeatil />} />
            <Route path='/detailApplication' element={<DeatilApplication />} />
            <Route path='/adminLogin' element={<AdminLogin />} />
            <Route path='/adminepanel' element={<Adminpanel />} />
            <Route path='/postInternship' element={<Postinternships />} />
            <Route path='/postJob' element={<PostJob />} />
            <Route path='/phoneAuth' element={<PhoneAuth />} />
            <Route path='/applications' element={<ViewAllApplication />} />
            <Route path='/UserapplicationDetail' element={<UserapplicationDetail />} />
            <Route path='/userapplication' element={<UserApplicatiom />} />
            <Route path="/login-history" element={<LoginHistory />} />
            <Route path="/otp" element={<OTPFormmod />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
