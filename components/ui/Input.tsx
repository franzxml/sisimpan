"use client";

import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea";
  rows?: number;
  showTogglePassword?: boolean;
  externalShowPassword?: boolean;
  onTogglePassword?: (show: boolean) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  as = "input",
  className = "",
  id,
  rows,
  type,
  showTogglePassword,
  externalShowPassword,
  onTogglePassword,
  ...props
}) => {
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  
  const isPassword = type === "password";
  const isVisible = externalShowPassword !== undefined ? externalShowPassword : internalShowPassword;
  const currentType = isPassword ? (isVisible ? "text" : "password") : type;

  const handleToggle = () => {
    if (onTogglePassword) {
      onTogglePassword(!isVisible);
    } else {
      setInternalShowPassword(!internalShowPassword);
    }
  };

  const inputStyles = `w-full border-2 border-black bg-[#F4F4F4] px-4 py-3 text-sm font-bold uppercase placeholder:opacity-70 focus:bg-white focus:outline-none disabled:opacity-50 ${
    error ? "border-red-600 ring-2 ring-red-600" : ""
  } ${className}`;

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-[10px] md:text-xs font-black uppercase mb-1">
        {label.replace(/_/g, " ")}
      </label>
      
      <div className="relative">
        {as === "textarea" ? (
          <textarea
            id={id}
            className={inputStyles}
            rows={rows}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            type={currentType}
            className={`${inputStyles} ${showTogglePassword && isPassword ? "pr-12" : ""}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {showTogglePassword && isPassword && as !== "textarea" && (
          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400"
            aria-label={isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {isVisible ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <div className="mt-1 text-[9px] font-black text-red-600 bg-red-50 border border-red-600 px-2 py-0.5 inline-block">
          ! {error.replace(/_/g, " ")}
        </div>
      )}
    </div>
  );
};
