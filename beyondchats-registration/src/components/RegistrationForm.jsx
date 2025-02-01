import React, { useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
import OTPInput from './OTPInput';
import ResendOTP from './ResendOTP';
import './registration.css';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registration submitted:', { name, email, password });
        setIsOTPSent(true);
    };

    const handleOTPSubmit = (otp) => {
        // Handle OTP submission logic here
        console.log('OTP submitted:', otp);
    };

    return (
        <div className="registration-form">
            <h2>Register for BeyondChats</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <GoogleSignIn />
            {isOTPSent && (
                <div>
                    <OTPInput onSubmit={handleOTPSubmit} />
                    <ResendOTP />
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;