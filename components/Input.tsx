import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1 text-white">{label}</label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-xl bg-black/40 border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-gray-400 transition-all ${className}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
