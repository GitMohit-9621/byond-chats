export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

export const validateOTP = (inputOTP, generatedOTP) => {
    return inputOTP === generatedOTP; // Validates the input OTP against the generated OTP
};

export const startOTPTimer = (setTimer, setCanResend) => {
    let countdown = 60;
    setCanResend(false);
    const timer = setInterval(() => {
        if (countdown <= 0) {
            clearInterval(timer);
            setCanResend(true);
        } else {
            setTimer(countdown);
            countdown -= 1;
        }
    }, 1000);
};