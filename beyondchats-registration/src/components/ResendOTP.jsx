import React, { useState, useEffect } from 'react';

const ResendOTP = ({ onResend }) => {
    const [countdown, setCountdown] = useState(60);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            setIsDisabled(true);
            return () => clearInterval(timer);
        } else {
            setIsDisabled(false);
        }
    }, [countdown]);

    const handleResend = () => {
        onResend();
        setCountdown(60);
    };

    return (
        <div className="resend-otp">
            <button onClick={handleResend} disabled={isDisabled}>
                {isDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
        </div>
    );
};

export default ResendOTP;