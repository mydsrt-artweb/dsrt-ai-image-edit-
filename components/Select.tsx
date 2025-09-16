import { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export default function Select({ label, error, children, className = "", ...props }: SelectProps) {
  return (
    <div className="w-full mb-4">
      {label && <label className="block text-sm font-medium mb-1 text-white">{label}</label>}
      <select
        {...props}
        className={`w-full px-4 py-2 rounded-xl bg-black/40 border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white transition-all ${className}`}
      >
        {children}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
