import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea";
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  as = "input",
  className = "",
  id,
  ...props
}) => {
  const inputStyles = `w-full border-2 border-black bg-[#F4F4F4] px-4 py-3 text-sm font-bold uppercase placeholder:opacity-30 focus:bg-white focus:outline-none disabled:opacity-50 ${
    error ? "border-red-600 ring-2 ring-red-600" : ""
  } ${className}`;

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-[10px] md:text-xs font-black uppercase mb-1">
        {label.replace(/_/g, " ")}
      </label>
      
      {as === "textarea" ? (
        <textarea
          id={id}
          className={inputStyles}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={inputStyles}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      
      {error && (
        <div className="mt-1 text-[9px] font-black text-red-600 bg-red-50 border border-red-600 px-2 py-0.5 inline-block">
          ! {error.replace(/_/g, " ")}
        </div>
      )}
    </div>
  );
};
