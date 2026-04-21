"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchInput() {
  const [city, setCity] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("city", city.trim());
    router.push(`/?${params.toString()}`);
    setCity("");
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full group">
      <div className="absolute inset-0 bg-sky-500/5 blur-2xl rounded-3xl group-focus-within:bg-sky-500/10 transition-all" />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="relative w-full bg-[#161e2e]/60 border border-white/10 rounded-2xl py-4 px-6 pl-14 focus:outline-none focus:border-sky-500/40 focus:ring-4 focus:ring-sky-500/5 transition-all text-sm backdrop-blur-xl placeholder:text-gray-600 font-bold"
      />
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-sky-500 transition-colors" size={20} />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-90 shadow-lg shadow-sky-500/20">
        Search
      </button>
    </form>
  );
}