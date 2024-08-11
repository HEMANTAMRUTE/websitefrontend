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
        
      navigate('/otpform', { state: { lng } });
  };
  const loginhistory = () => {
        
    navigate('/loginhistory');
};



    return (
      <div className='lang'>
        <button className='butt' onClick={() => changeLanguage('en')}>English</button>
        <button className='butt' onClick={() => changeLanguage('ch')}>Chinese</button>
        <button className='butt' onClick={() => changeLanguagefr('fr')}>French</button>
        <button className='butt' onClick={() => changeLanguage('hi')}>Hindi</button>
        <button className='butt' onClick={() => changeLanguage('sp')}>Spanish</button>
        <button className='butt' onClick={() => changeLanguage('po')}>Portuguese</button>
        <button className='butt1' onClick={() => loginhistory()}>LoginHistory</button>
        {/* Add more buttons for other languages */}
      </div>
    );
}

export default Languagechange;
