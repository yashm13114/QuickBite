// pages/verification-success.js
import React from 'react';

const VerificationSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Email Verified!</h1>
            <p className="mt-4 text-lg">Your email has been successfully verified.</p>
            <svg className="mt-6 w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5.49 7.75l-5.75 5.75-2.25-2.25a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6-6a.75.75 0 00-1.06-1.06z" clipRule="evenodd" />
            </svg>
            <a href="/" className="mt-4 text-blue-500">Go to Home</a>
        </div>
    );
};

export default VerificationSuccess;
