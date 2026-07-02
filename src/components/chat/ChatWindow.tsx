// Este es un componente de ventana de chat que muestra los mensajes entre el usuario actual y un contacto activo. Maneja el desplazamiento automático, el formateo de la hora y la visualización de mensajes enviados y recibidos.
import { useEffect, useRef } from "react";

interface Contact {
  id: string;
  name: string;
  first_last_name?: string;
  role: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

interface ChatWindowProps {
  activeContact: Contact | null;
  messages: Message[];
  currentUserId: string;
}

export default function ChatWindow({ activeContact, messages, currentUserId }: ChatWindowProps) {
  // Referencia para controlar el scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Efecto que hace scroll automático cada vez que cambian los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Función auxiliar para formatear la hora de manera bonita
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  if (!activeContact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-400">
        <p className="font-primary text-sm">Selecciona un contacto para iniciar una conversación</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Encabezado del Chat */}
      <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
        <div>
          <h3 className="font-primary font-bold text-gray-800">
            {activeContact.name} {activeContact.first_last_name || ""}
          </h3>
          <span className="text-xs font-primary px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 capitalize">
            {activeContact.role === "teacher" ? "Profesor" : "Estudiante"}
          </span>
        </div>
      </div>

      {/* Cuerpo de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-xs font-primary my-8">
            No hay mensajes anteriores. ¡Dile holis!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-2xl shadow-sm relative ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                  }`}
                >
                  <p className="font-primary text-sm whitespace-pre-wrap break-words pr-2">
                    {msg.content}
                  </p>
                  <span
                    className={`block text-[10px] text-right mt-1 ${
                      isMe ? "text-indigo-200" : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.created_at)}
                  </span>
                </div>
              </div>
            );
          })
        )}
        {/* Punto de anclaje para el scroll invisible */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}