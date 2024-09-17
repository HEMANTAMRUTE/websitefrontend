import React from 'react';
import { useTranslation } from 'react-i18next';
import './lang.css';
import { Link, useNavigate } from 'react-router-dom';
import  { useContext } from 'react';
import { Context } from '../../Context/Context.js'
function Languagechange() {
  const { Lang, setLang } = useContext(Context);
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (lng) => {
        
         navigate('/PhoneAuth', { state: { lng } });
    };
    const changeLanguagefr = (lng) => {
        
      i18n.changeLanguage(lng);
 };
    const changeLanguagehi = (lng) => {
        
      navigate('/otpform', { state: { lng } });
  };
  const loginhistory = () => {
        
    navigate('/loginhistory');
};
const Phone = () => {
        
  navigate('/PhoneAuth');
};



    return (
      <div className='lang'>
        <button className='butt' onClick={() => changeLanguagefr('en')}>English</button>
        <button className='butt' onClick={() => changeLanguagefr('ch')}>Chinese</button>
        <button className='butt' onClick={() => changeLanguagefr('fr')}>French</button>
        <button className='butt' onClick={() => changeLanguagefr('hi')}>Hindi</button>
        <button className='butt' onClick={() => changeLanguagefr('sp')}>Spanish</button>
        <button className='butt' onClick={() => changeLanguagefr('po')}>Portuguese</button>
        <button className='butt1' onClick={() => loginhistory()}>LoginHistory</button>
        <button className='butt2' onClick={() => Phone()}>PhoneLogin</button>
        {/* Add more buttons for other languages */}
      </div>
    );
}

export default Languagechange;
