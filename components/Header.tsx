import Link from "next/link";
import React from "react";

interface HeaderProps {
  showNav?: boolean;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  showNav = false, 
  subtitle = "APLIKASI TRACKING MEMPERMUDAH ANDA",
  rightElement
}) => {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-[#F4F4F4] px-4 md:px-6 py-3 md:py-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="border-2 border-black bg-black px-2 py-0.5 md:py-1 text-white font-black text-xs md:text-sm">
            SISIMPAN
          </Link>
          <div className="hidden sm:block text-[9px] md:text-[10px] font-bold uppercase tracking-tighter opacity-40 leading-none">
            {subtitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line} <br />
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {rightElement ? (
          rightElement
        ) : showNav && (
          <nav className="flex items-center gap-1 border-2 border-black p-0.5 md:p-1 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Link href="/login" className="px-2 md:px-4 py-1 hover:bg-black hover:text-white transition-colors text-[10px] md:text-sm font-bold uppercase">MASUK</Link>
            <div className="w-[1px] md:w-[2px] h-3 md:h-4 bg-black/20" />
            <Link href="/daftar" className="px-2 md:px-4 py-1 bg-black text-white hover:bg-white hover:text-black transition-all text-[10px] md:text-sm font-bold uppercase">DAFTAR</Link>
          </nav>
        )}
      </div>
    </header>
  );
};
