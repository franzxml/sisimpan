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
      // Revalidation is handled by updateStatusAction (server-side)
      setStatus(formData.get("status") as string);
    } else {
      alert(result.error || "Gagal mengupdate status.");
    }
    
    setIsUpdating(false);
  }

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <label className="text-xs text-gray-500 font-medium">Update Status:</label>
      <div className="flex gap-2">
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isUpdating}
          className="text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 bg-white flex-grow disabled:bg-gray-100"
        >
          <option value="belummulai">Belum Mulai</option>
          <option value="sedangdalamprogres">Sedang dalam Progres</option>
          <option value="selesai">Selesai</option>
        </select>
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-gray-800 text-white text-xs px-3 py-1 rounded hover:bg-gray-700 transition-colors disabled:bg-gray-400 min-w-[60px]"
        >
          {isUpdating ? "..." : "Update"}
        </button>
      </div>
    </form>
  );
}
