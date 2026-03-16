import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-[10px] md:text-xs font-black uppercase mb-1">
        {label}
      </label>
      <select
        id={id}
        className={`w-full border-2 border-black bg-[#F4F4F4] px-4 py-3 text-sm font-bold uppercase focus:bg-white focus:outline-none disabled:opacity-50 appearance-none cursor-pointer ${
          error ? "border-red-600 ring-2 ring-red-600" : ""
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="mt-1 text-[9px] font-black text-red-600 bg-red-50 border border-red-600 px-2 py-0.5 inline-block">
          ! {error}
        </div>
      )}
    </div>
  );
};
