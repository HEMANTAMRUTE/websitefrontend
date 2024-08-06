import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { MyProvider } from './Context/Context'; // Import MyProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <MyProvider> {/* Wrap App with MyProvider here */}
            <App />
          </MyProvider>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
