import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "border-2 border-black font-black uppercase transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 text-sm py-4 px-6";
  
  const variantStyles = {
    primary: "bg-black text-white hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]",
    secondary: "bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    danger: "bg-white text-red-600 hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(220,38,38,0.2)]",
    success: "bg-black text-white hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]",
    warning: "bg-yellow-300 text-black hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
