// Este es un componente de botón naranja reutilizable. Puede mostrar un estado de carga y deshabilitarse mientras se realiza una acción. Se puede personalizar con texto, texto de carga, un controlador de clics y el tipo de botón.
import React from "react";

interface OrangeButtonProps {
  loading?: boolean;
  text: string;
  loadingText?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function OrangeButton({ loading, text, loadingText, onClick, type = "submit" }: OrangeButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F2994A] hover:bg-[#e0883b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2994A] disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-colors"
    >
      {loading ? loadingText : text}
    </button>
  );
}