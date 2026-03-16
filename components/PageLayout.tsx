import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex min-h-screen flex-col bg-[#F4F4F4] text-black selection:bg-black selection:text-white font-mono overflow-x-hidden ${className}`}>
      {/* Sistem Kisi Latar Belakang */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      {children}
    </div>
  );
};
