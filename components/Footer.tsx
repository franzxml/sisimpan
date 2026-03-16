import React from "react";

interface FooterProps {
  showDetails?: boolean;
  statusText?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  showDetails = false,
  statusText = `©franzxml | SISIMPAN OS LOG STAMP ${new Date().getFullYear()}`
}) => {
  return (
    <footer className="mx-auto w-full max-w-[1400px] border-x-0 md:border-x-2 border-black bg-white p-6 md:p-16 mt-12">
      {showDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-24">
          <div className="sm:col-span-2">
            <div className="text-xl md:text-2xl font-black mb-4 md:mb-6 uppercase">SISIMPAN CORE</div>
            <p className="max-w-md text-[9px] md:text-[10px] font-black uppercase leading-relaxed opacity-50">
              SISIMPAN ADALAH PROYEK OPEN-SOURCE UNTUK MANAJEMEN KOLEKSI DIGITAL. SELURUH DATA DISIMPAN SECARA AMAN PADA INFRASTRUKTUR CLOUD NEON POSTGRESQL.
            </p>
          </div>
        </div>
      )}
      
      <div className={`${showDetails ? "pt-8 border-t-2 border-black" : ""} flex flex-col md:flex-row justify-between items-center gap-6`}>
         <div className="text-[9px] md:text-[10px] font-black uppercase text-center md:text-left opacity-30">
           {statusText}
         </div>
         <div className="flex gap-4">
            <div className="h-3 md:h-4 w-3 md:w-4 bg-black" />
            <div className="h-3 md:h-4 w-3 md:w-4 bg-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
            <div className="h-3 md:h-4 w-3 md:w-4 bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
         </div>
      </div>
    </footer>
  );
};
