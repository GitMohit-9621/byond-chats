# BeyondChats Registration

This project is a user registration interface for BeyondChats, featuring user registration, Google sign-in, email verification, and OTP functionalities.

## Features

- User registration form with fields for name, email, and password.
- Google sign-in integration.
- OTP input fields with automatic filling after 2 seconds.
- Resend OTP functionality with a 60-second countdown.

## Project Structure

```
beyondchats-registration
├── public
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Application favicon
├── src
│   ├── components          # React components
│   │   ├── GoogleSignIn.jsx
│   │   ├── OTPInput.jsx
│   │   ├── RegistrationForm.jsx
│   │   └── ResendOTP.jsx
│   ├── styles              # CSS styles
│   │   ├── animations.css
│   │   ├── index.css
│   │   └── registration.css
│   ├── App.jsx             # Main application component
│   ├── index.jsx           # Entry point for the React application
│   └── utils               # Utility functions
│       └── otpUtils.js
├── package.json            # npm configuration file
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd beyondchats-registration
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000` to access the registration interface.
- Fill in the registration form or use Google sign-in to register.
- Enter the OTP sent to your email for verification.
- If you do not receive the OTP, you can resend it after the countdown.

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes.