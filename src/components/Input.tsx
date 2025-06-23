import React, { useState } from "react";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const toggleShow = () => setShowPassword((prev) => !prev);

  return (
    <div className="mb-4 relative">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={props.id}
      >
        {label}
      </label>

      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${isPassword ? "pr-10" : ""}`}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          onClick={toggleShow}
          className="pt-3 flex items-center text-gray-500"
          tabIndex={-1}
        >
          {showPassword ? "Esconder senha" : "Mostrar senha"}
        </button>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
