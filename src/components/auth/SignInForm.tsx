'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignInForm() {
  const [useMobile, setUseMobile] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#141416] rounded-2xl p-8 backdrop-blur-xl border border-white/[0.08] shadow-xl">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-orange-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.1277 15.6171 19.0724 16.3081 19.2321 16.9584C19.3918 17.6087 19.7584 18.1869 20.27 18.61L20.33 18.67C20.7429 19.0832 21.0732 19.5774 21.3033 20.1223C21.5334 20.6672 21.6591 21.2527 21.6738 21.8473C21.6886 22.4418 21.592 23.0338 21.3895 23.5905C21.187 24.1473 20.8824 24.6579 20.4916 25.0916C20.1009 25.5253 19.6321 25.8756 19.1115 26.1246C18.5909 26.3736 18.0279 26.5165 17.4547 26.5458C16.8815 26.5751 16.3085 26.4902 15.7673 26.2962C15.2261 26.1022 14.7268 25.8026 14.3 25.41L14.24 25.35C13.8169 24.8384 13.2387 24.4718 12.5884 24.3121C11.9381 24.1524 11.2471 24.2077 10.63 24.48C10.0256 24.7433 9.51931 25.1754 9.17604 25.7187C8.83278 26.262 8.66767 26.8926 8.69997 27.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-white text-center mb-2">Welcome to EventWave</h1>
          <p className="text-neutral-400 text-sm text-center mb-8">Please sign in or sign up below.</p>

          {/* Email/Mobile toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white">Email</span>
            <button 
              onClick={() => setUseMobile(!useMobile)}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Use Mobile Number
            </button>
          </div>

          {/* Input field */}
          <div className="mb-4">
            <input
              type={useMobile ? "tel" : "email"}
              placeholder={useMobile ? "+1 (555) 000-0000" : "you@email.com"}
              className="w-full px-4 py-3 rounded-lg bg-[#1C1C1E] border border-white/[0.08] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Continue button */}
          <button className="w-full bg-white text-black font-medium px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors mb-4">
            Continue with Email
          </button>

          {/* Google sign in */}
          <button className="w-full bg-[#1C1C1E] text-white font-medium px-4 py-3 rounded-lg border border-white/[0.08] hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
} 