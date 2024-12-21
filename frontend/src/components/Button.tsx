import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-600",
  secondary:
    "bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 focus:ring-2 focus:ring-purple-500",
};

const defaultStyles =
  "px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium flex items-center transition-all duration-300 transform text-sm md:text-base";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${
        fullWidth ? "w-full justify-center" : "justify-start"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""} hover:scale-105`}
      disabled={loading}
    >
      {startIcon && <div className="pr-2 md:pr-3">{startIcon}</div>}
      <span>{text}</span>
    </button>
  );
}
