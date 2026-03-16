"use client";

import { useState } from "react";
import { updateStatusAction } from "@/app/lib/actions";

interface StatusSelectorProps {
  id: number;
  initialStatus: string;
}

export default function StatusSelector({ id, initialStatus }: StatusSelectorProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUpdating(true);
    
    const formData = new FormData(event.currentTarget);
    const result = await updateStatusAction(formData);
    
    if (result.success) {
      setStatus(formData.get("status") as string);
    } else {
      alert(result.error || "Gagal mengupdate status.");
    }
    
    setIsUpdating(false);
  }

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-2 mt-4 pt-4 border-t-2 border-black/10">
      <input type="hidden" name="id" value={id} />
      <label className="text-[10px] font-black uppercase opacity-50">UPDATE STATUS:</label>
      <div className="flex gap-2">
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isUpdating}
          className="text-[10px] font-bold uppercase border-2 border-black bg-[#F4F4F4] px-2 py-1.5 outline-none focus:bg-white flex-grow disabled:opacity-50 appearance-none cursor-pointer"
        >
          <option value="belummulai">BELUM MULAI</option>
          <option value="sedangdalamprogres">SEDANG PROGRES</option>
          <option value="selesai">SELESAI</option>
        </select>
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-black text-white text-[10px] font-black uppercase px-4 py-1.5 border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
        >
          {isUpdating ? "..." : "SET"}
        </button>
      </div>
    </form>
  );
}
