// src/api/sendSms.js
export const sendSms = async (to, body) => {
    try {
        const response = await fetch('http://localhost:5000/api/sms/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, body }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error sending SMS');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};
