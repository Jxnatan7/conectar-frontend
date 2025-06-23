import React from "react";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={props.id}
    >
      {label}
    </label>
    <input
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);
