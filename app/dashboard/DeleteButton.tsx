"use client";

import React, { useState } from "react";
import { deleteHiburan } from "@/app/lib/actions";
import { Modal } from "@/components/ui/Modal";

interface DeleteButtonProps {
  id: number;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteHiburan(id);
    if (result?.error) {
      alert(result.error);
      setIsDeleting(false);
    }
    // If success, revalidatePath in actions.ts will update the dashboard
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className="text-[10px] font-black uppercase border-2 border-red-600 text-red-600 px-3 py-1.5 hover:bg-red-600 hover:text-white transition-[background-color,color,box-shadow,transform] duration-200 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
      >
        {isDeleting ? "MENGHAPUS..." : "HAPUS"}
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="KONFIRMASI HAPUS"
        message="APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI? TINDAKAN INI TIDAK DAPAT DIBATALKAN."
        confirmText="YA, HAPUS!"
        cancelText="BATAL"
        variant="danger"
      />
    </>
  );
};
