// Este es un componente de entrada de mensaje que permite a los usuarios escribir y enviar mensajes. Maneja el estado del texto ingresado y llama a una función de envío cuando se envía el formulario.
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText(""); // Limpia el input
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-3 bg-white">
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all"
      />
      <button 
        type="submit" 
        className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all shadow-sm"
      >
        Enviar
      </button>
    </form>
  );
}