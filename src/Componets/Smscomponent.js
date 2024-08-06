// src/components/SmsComponent.js
import React, { useState } from 'react';
import { sendSms } from '../api/sendSms';

const Smscomponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSendSms = async () => {
        try {
            const result = await sendSms(phoneNumber, message);
            setSuccess(`Message sent: ${result.sid}`);
            setError(null);
        } catch (err) {
            setError(`Error sending SMS: ${err.message}`);
            setSuccess(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
            />
            <button onClick={handleSendSms}>Send SMS</button>
            {error && <div>Error: {error}</div>}
            {success && <div>{success}</div>}
        </div>
    );
};

export default Smscomponent;
