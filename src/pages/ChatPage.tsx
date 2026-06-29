import { useState, useEffect } from "react";
// Importamos el contexto de Leyder
import { useAuth } from "../context/authContext"; 

// Importamos tus tres componentes nuevos
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";

// 🛠️ Actualizamos la interfaz aquí para que coincida exactamente con el Sidebar
interface Contact {
  id: string;
  name: string;
  first_last_name?: string; // <-- Opcional por si no lo tienen configurado
  role: string;
  unread_count: number;     // <-- ¡Obligatorio para que no llore TypeScript!
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

export default function ChatPage() {
  // Jalamos los datos del usuario logueado y el token desde el contexto global
  const { user, token } = useAuth(); 
  
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // 1. FUNCIÓN PARA TRAER LOS MENSAJES (GET)
  const fetchMessages = async () => {
    if (!activeContact || !token) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/chat/history/${activeContact.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error al traer el historial:", error);
    }
  };

  // 2. FUNCIÓN PARA ENVIAR UN MENSAJE (POST)
  const handleSendMessage = async (content: string) => {
    if (!activeContact || !token) return;

    try {
      const response = await fetch("http://localhost:3000/api/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          receiver_id: activeContact.id,
          content: content
        }
      )});

      if (response.ok) {
        const newMessage = await response.json();
        // Lo agregamos de inmediato a la pantalla para que no espere al temporizador
        setMessages((prev) => [...prev, newMessage]); 
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  // ESTRUCTURA EFECTO: Trae mensajes cada 3 segundos cuando seleccionas un contacto
  useEffect(() => {
    fetchMessages(); // Carga inicial al dar clic al contacto

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000); // Revisa cada 3 segundos si hay textos nuevos

    return () => clearInterval(interval); // Limpia el reloj si cambias de contacto o cierras la página
  }, [activeContact]);

  // Si por alguna razón no está logueado, le tiramos un aviso lindo
  if (!user) {
    return (
      <div className="p-10 text-center text-gray-500 font-primary">
        Por favor, inicia sesión para acceder al chat. 🔑
      </div>
    );
  }

  return (
    <div className="flex h-[85vh] bg-white rounded-2xl shadow-sm overflow-hidden m-4 border border-gray-100">
      
      {/* Columna Izquierda: Lista de contactos */}
      <ChatSidebar 
        activeContact={activeContact} 
        onSelectContact={setActiveContact} 
      />

      {/* Columna Derecha: Contenedor principal del Chat */}
      <div className="w-2/3 flex flex-col h-full justify-between bg-white">
        
        {/* Ventana de burbujas */}
        <ChatWindow 
          activeContact={activeContact} 
          messages={messages} 
          currentUserId={user.id} 
        />

        {/* Solo muestra la barra si hay un contacto seleccionado */}
        {activeContact && (
          <MessageInput onSendMessage={handleSendMessage} />
        )}
      </div>

    </div>
  );
}