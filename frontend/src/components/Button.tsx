import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-purple-800 text-white hover:bg-purple-700",
    "secondary": "bg-gray-700 text-purple-300 hover:bg-gray-600",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center transition-all";

export function Button({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps) {
    return (
        <button 
            onClick={onClick} 
            className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full justify-center" : ""} ${loading ? "opacity-45" : ""}`}
            disabled={loading}
        >
            <div className="pr-2">
                {startIcon}
            </div>
            {text}
        </button>
    );
}
