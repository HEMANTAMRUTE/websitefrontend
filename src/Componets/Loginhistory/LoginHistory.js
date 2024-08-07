import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getUserInfo from '../../getUserInfo';
import './Loginhistory.css'; // Import CSS file for styling

const LoginHistory = () => {
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      const response = await axios.get('https://websitebackend-v27m.onrender.com/api/Login/login-history');
      console.log('Login History Data:', response.data);
      setLoginHistory(response.data);
    };

    fetchLoginHistory();
  }, []);

  return (
    <div>
      <h1>Login History</h1>
      <table>
        <thead>
          <tr>
            <th>Browser</th>
            <th>OS</th>
            <th>Device</th>
            <th>IP Address</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {loginHistory.map((login, index) => (
            <tr key={index}>
              <td>{login.browser}</td>
              <td>{login.os}</td>
              <td>{login.device}</td>
              <td>{login.ipAddress}</td>
              <td>{new Date(login.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginHistory;
