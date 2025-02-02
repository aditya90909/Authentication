import React, { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const SignUpPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]); // OTP input fields
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]; // Refs for OTP inputs
  const [timer, setTimer] = useState(90); // Resend OTP timer
  const [isVerified, setIsVerified] = useState(false); // OTP verification status
  const [error, setError] = useState(""); // Error message

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval;
    if (!isVerified && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [isVerified, timer]);

  // Auto-focus on the first input when the component mounts
  useEffect(() => {
    if (showOTPVerification) {
      inputRefs[0].current.focus();
    }
  }, [showOTPVerification]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input if available
      if (value && index < otp.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }

    if (e.key === "Enter") {
      handleVerify(); // Submit OTP on Enter key
    }
  };

  // Simulate OTP verification
  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === otp.length) {
      // Simulate API call for verification
      setTimeout(() => {
        if (otpCode === "1234") {
          setIsVerified(true);
          setError("");
          setTimer(0); // Stop the timer
        } else {
          setError("Invalid OTP. Please try again.");
        }
      }, 1000);
    } else {
      setError("Please enter the complete 4-digit OTP.");
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    if (!isVerified) {
      setTimer(90); // Reset timer
      setError("");
      setOtp(["", "", "", ""]); // Clear OTP fields
      inputRefs[0].current.focus(); // Focus on the first input
      alert("OTP has been resent!");
    }
  };

  // Handle phone number input and trigger OTP verification
  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setShowOTPVerification(true);
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  // Google Sign-In Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google Sign-in Success - Full Response:", credentialResponse);

    // Extract the JWT token from the credentialResponse
    const { credential } = credentialResponse;

    if (credential) {
      try {
        // Decode the JWT token
        const decoded = jwt_decode(credential);
        console.log("Decoded JWT:", decoded);
        // Use the decoded user information (e.g., name, email, etc.)
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    } else {
      console.error("No credential found in the response");
    }
  };

  // Google Sign-In Error Handler
  const handleGoogleError = (error) => {
    console.error("Google Sign-in Error:", error);
  };

  // Custom Google Sign-In Button
  const GoogleSignInButton = ({ onSuccess, onError }) => {
    const googleLogin = useGoogleLogin({
      onSuccess,
      onError,
    });

    return (
      <button
        onClick={() => googleLogin()}
        className="w-full p-3 border border-gray-300 rounded-full flex items-center justify-center gap-2"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    );
  };

  return (
    <GoogleOAuthProvider clientId="37118068303-lbisi7fco2qbnnu65iqfgof6so1ko15j.apps.googleusercontent.com">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center md:text-left">
          Sign up to Ask IT
        </h1>

        <div>
          <p className="text-sm text-gray-600 mb-2">
            Continue with Mobile Number
          </p>
          <form onSubmit={handlePhoneNumberSubmit} className="flex gap-2 mb-4">
            <select className="w-20 p-2 border-b border-gray-300 focus:outline-none focus:border-black">
              <option>+91</option>
            </select>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-black"
              placeholder="Enter your phone number"
              maxLength={10}
              required
            />
            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
        </div>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Custom Google Sign-In Button */}
        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />

        <button
          onClick={handlePhoneNumberSubmit}
          className="w-full p-3 border border-gray-300 rounded-full"
        >
          Continue with email
        </button>

        <p className="text-sm text-center text-gray-600">
          By creating an account you agree with our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>
          ,{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          , and our default{" "}
          <a href="#" className="underline">
            Notification Settings
          </a>
          .
        </p>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="#" className="text-black underline">
            Sign In
          </a>
        </p>
      </div>

      {/* OTP Verification Popup */}
      {showOTPVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-4 md:p-8 rounded-2xl w-full max-w-md mx-4 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowOTPVerification(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">
              OTP Verification
            </h2>
            <p className="text-center text-gray-600 text-xs md:text-sm mb-6">
              Please enter the OTP sent to
              <br />
              <strong className="text-gray-800">{phoneNumber}</strong>
            </p>

            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-2 md:gap-4 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-10 md:w-14 md:h-14 border border-gray-300 rounded-lg text-center text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={1}
                  disabled={isVerified} // Disable inputs after verification
                />
              ))}
            </div>

            {/* Verification Status */}
            {isVerified && (
              <p className="text-center text-green-600 text-xs md:text-sm mb-4">
                OTP verified successfully!
              </p>
            )}

            {/* Error Message */}
            {error && (
              <p className="text-center text-red-500 text-xs md:text-sm mb-4">
                {error}
              </p>
            )}

            {/* Resend Timer */}
            <p className="text-center text-xs md:text-sm text-gray-500 mb-6">
              {isVerified ? (
                "OTP verified. Resend disabled."
              ) : timer > 0 ? (
                <>
                  Resend code in{" "}
                  <span className="font-semibold text-gray-700">
                    {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, "0")}
                  </span>
                </>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Resend OTP
                </button>
              )}
            </p>

            {/* Verify Button */}
            <div className="text-center">
              <button
                onClick={handleVerify}
                disabled={isVerified}
                className="px-4 md:px-6 py-2 md:py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed text-xs md:text-sm"
              >
                {isVerified ? "Verified" : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </GoogleOAuthProvider>
  );
};

export default SignUpPage;
