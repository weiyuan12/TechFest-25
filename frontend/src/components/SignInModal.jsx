import React, { useState } from 'react';

const SignInModal = ({ isOpen, onClose, callbackUserName }) => {
  const [username, setUsername] = useState('');


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark semi-transparent background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* White modal box (fully opaque) */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Username input */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        {/* Sign in button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mb-4" onClick={() => callbackUserName(username)}>
          Sign In
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Singpass Banner */}
        <div className="mb-4">
          <button className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
              <rect width="24" height="24" rx="4" fill="currentColor" />
              <path d="M7 12H17M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Log in with Singpass
          </button>
          <p className="mt-2 text-xs text-gray-500 text-center">
            For Singapore Citizens and Residents
          </p>
        </div>

        {/* Additional options */}
        <div className="text-center text-sm text-gray-600">
          <span>Don't have an account? </span>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;