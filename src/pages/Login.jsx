// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUpProvider, forgotPassword } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6">
          Login To NawafGPT
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="• • • • • • • •"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <button type="button" onClick={() => forgotPassword(email)} className="hover:underline">
              Forgot password?
            </button>
            <Link to="/register" className="hover:underline">
              Create account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="px-4 text-gray-500 dark:text-gray-400">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>
        <button
          onClick={signUpProvider}
          className="w-full flex items-center justify-center py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <FcGoogle className="mr-2" size={20} /> Continue with Google
        </button>
      </div>
    </div>
  );
}