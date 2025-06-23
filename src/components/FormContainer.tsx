import React, { ReactNode } from "react";

export const FormContainer: React.FC<{
  children: ReactNode;
  title: string;
}> = ({ title, children }) => (
  <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
    <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
    {children}
  </div>
);
