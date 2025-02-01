import React from 'react';

const GoogleSignIn = () => {
    const handleGoogleSignIn = () => {
        // Logic for initiating Google sign-in
        console.log("Google sign-in initiated");
    };

    return (
        <div className="google-signin">
            <button onClick={handleGoogleSignIn} className="google-signin-button">
                Sign in with Google
            </button>
        </div>
    );
};

export default GoogleSignIn;