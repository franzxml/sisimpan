"use client";

import React, { useEffect } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "KONFIRMASI",
  cancelText = "BATAL",
  variant = "danger",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-md border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform transition-all duration-300 scale-100 opacity-100">
        <div className="mb-6">
          <div className={`mb-4 inline-block border-2 border-black px-3 py-1 text-[10px] font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
            variant === "danger" ? "bg-red-600" : variant === "warning" ? "bg-yellow-400 text-black" : "bg-blue-600"
          }`}>
            SISTEM NOTIFIKASI
          </div>
          <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter">
            {title}
          </h3>
        </div>
        
        <p className="mb-8 text-sm font-bold uppercase leading-relaxed opacity-70">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onClose} 
            variant="secondary" 
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            variant={variant} 
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
