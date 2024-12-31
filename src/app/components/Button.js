import React from "react";

const Button = ({ children, variant = "primary", ...props }) => {
    const baseStyles =
        "px-4 py-2 rounded font-semibold text-sm transition-colors duration-200";
    const variantStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        outline:
            "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
