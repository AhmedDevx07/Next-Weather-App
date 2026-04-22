import React from "react";
import Link from "next/link";

import { AlertCircle, RefreshCcw, MapPinOff } from "lucide-react";
const PageNotFound = () => {
  return (
    <div className="fixed inset-0 z-[300] bg-[#0a0f1a] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full animate-pulse delay-700" />

      {/* Main Container */}
      <div className="relative flex flex-col items-center max-w-2xl w-full animate-in fade-in zoom-in duration-1000">
        {/* Branding Logo - SKYCAST */}
        <div className="mb-16 flex flex-col items-center gap-3">
          <h2 className="text-3xl font-black tracking-tighter italic text-white">
            SKY<span className="text-sky-500">CAST</span>
          </h2>
          <div className="h-1 w-8 bg-sky-500/30 rounded-full" />
        </div>

        {/* Visual Identity Block */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-sky-500/20 blur-[120px] rounded-full transition-all duration-1000" />

          {/* Main Icon Container */}
          <div className="relative bg-[#161e2e]/40 backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            <div className="bg-sky-500/10 p-8 rounded-3xl border border-sky-500/20">
              <MapPinOff
                size={72}
                className="text-sky-500 stroke-[1.5] animate-bounce"
              />
            </div>

            {/* Alert Badge */}
            <div className="absolute -top-4 -right-4 bg-sky-500 p-3 rounded-2xl border-8 border-[#0a0f1a] shadow-2xl">
              <AlertCircle size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-2">
            <p className="text-sky-500 font-black text-xs uppercase tracking-[0.5em]">
              Data Retrieval Failed
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
              Location <span className="text-sky-500 italic">Lost.</span>
            </h1>
          </div>

          <p className="text-gray-400 font-bold text-base md:text-lg leading-relaxed max-w-md mx-auto italic">
            The city <span className="text-white">City</span> is currently off
            our global radar. Check your spelling or search for a more prominent
            location.
          </p>
        </div>

        {/* Restricted Action Button */}
        <Link
          href="/"
          className="group relative flex items-center gap-5 bg-sky-500 px-14 py-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95 transition-all duration-500"
        >
          <RefreshCcw
            size={22}
            className="text-white group-hover:rotate-180 transition-transform duration-700"
          />
          <span className="font-black text-sm uppercase tracking-[0.3em] text-white">
            Return to Dashboard
          </span>
        </Link>

        {/* Footer Credit */}
        <p className="mt-20 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
          Powered by AhmedDevx07 • SkyCast Pro
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
