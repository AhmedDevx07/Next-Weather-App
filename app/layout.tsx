import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  title: "SkyCast Pro | AhmedDevx07",
  description: "Advanced Weather Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0f1a] text-white min-h-screen custom-scrollbar overflow-x-hidden">
        <Sidebar />

        <main className="flex-1 ml-0 lg:ml-72 min-h-screen transition-all duration-300 ease-in-out pt-20 lg:pt-0 px-4 md:px-8 lg:px-10">
          <div className="max-w-[1600px] mx-auto w-full py-6 md:py-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
