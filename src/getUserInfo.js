import axios from 'axios';

const getUserInfo = async () => {
  const ipResponse = await axios.get('https://api.ipify.org?format=json');
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  const browser = (() => {
    if (userAgent.indexOf('Edg') > -1) return 'Edge';
    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) return 'Chrome';
    if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
    if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) return 'Safari';
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return 'Opera';
    if (userAgent.indexOf('Trident') > -1) return 'Internet Explorer';
    if (userAgent.indexOf('SamsungBrowser') > -1) return 'Samsung Internet';
    return 'Other';
  })();

  const os = (() => {
    if (platform.indexOf('Win') > -1) return 'Windows';
    if (platform.indexOf('Mac') > -1) return 'MacOS';
    if (platform.indexOf('Linux') > -1) return 'Linux';
    if (platform.indexOf('Android') > -1) return 'Android';
    if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
    return 'Other';
  })();

  const device = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';

  return {
    ipAddress: ipResponse.data.ip,
    browser,
    os,
    device,
    email: '', // Add email or other user-related info if needed
  };
};

export default getUserInfo;
