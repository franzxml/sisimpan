import Link from "next/link";
import React from "react";
import StatusSelector from "./StatusSelector";
import { DeleteButton } from "./DeleteButton";

interface HiburanCardProps {
  item: any;
  getStatusLabel: (status: string) => string;
  getStatusColor: (status: string) => string;
}

export const HiburanCard: React.FC<HiburanCardProps> = ({ item, getStatusLabel, getStatusColor }) => {
  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-[transform,box-shadow,background-color] duration-200 flex flex-col group will-change-transform">
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-black/10">
        <span className="text-[10px] font-black uppercase border-2 border-black px-2 py-0.5 bg-[#F4F4F4]">
          MOD TYPE: {item.tipe.toUpperCase()}
        </span>
        <span className={`text-[10px] font-black uppercase border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${getStatusColor(item.status)}`}>
          {getStatusLabel(item.status)}
        </span>
      </div>
      
      <h2 className="text-2xl font-black uppercase leading-[0.9] mb-4 tracking-tighter group-hover:text-blue-600 transition-colors">
        {item.nama}
      </h2>
      <div className="text-[9px] font-bold uppercase opacity-40 mb-4">OWNER SIGN: {item.pemilik}</div>
      
      {item.komentar && (
        <div className="border-2 border-black bg-[#F4F4F4] p-4 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-4 w-4 bg-black/5 rotate-45 translate-x-2 -translate-y-2" />
          <p className="text-[10px] font-bold uppercase leading-relaxed italic opacity-70">
            "{item.komentar}"
          </p>
        </div>
      )}
      
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black uppercase text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 px-3 py-1.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
          >
            BUKA LINK ↗
          </a>
          <div className="flex gap-2">
            <Link
              href={`/edit-hiburan/${item.id}`}
              className="text-[10px] font-black uppercase border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              EDIT
            </Link>
            <DeleteButton id={item.id} />
          </div>
        </div>
        
        <StatusSelector id={item.id} initialStatus={item.status} />
      </div>
    </div>
  );
};
