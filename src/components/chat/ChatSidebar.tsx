import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

interface Contact {
  id: string;
  name: string;
  first_last_name?: string;
  role: string;
  unread_count: number; // <-- Propiedad real de la DB
}

interface ChatSidebarProps {
  activeContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export default function ChatSidebar({ activeContact, onSelectContact }: ChatSidebarProps) {
  const { token } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:3000/api/chat/contacts", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error al traer contactos reales:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trae los contactos inicialmente y se actualiza cada 3 segundos para refrescar las bolitas de notificación
  useEffect(() => {
    fetchContacts();
    const interval = setInterval(() => {
      fetchContacts();
    }, 3000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="w-1/3 border-r border-gray-100 flex flex-col bg-slate-50/50">
      <div className="p-5 border-b border-gray-100 bg-white">
        <h1 className="font-primary font-bold text-xl text-primary">Mensajes</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading && contacts.length === 0 ? (
          <p className="text-center text-xs text-gray-400 mt-4">Cargando contactos...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-xs text-gray-400 mt-4">No tienes compañeros o profesores registrados en tus cursos.</p>
        ) : (
          contacts.map((contact) => {
            const isSelected = activeContact?.id === contact.id;
            return (
              <button 
                key={contact.id}
                onClick={() => onSelectContact(contact)}
                className={`w-full text-left p-4 rounded-xl transition-all flex flex-col gap-1 ${
                  isSelected 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "bg-white hover:bg-gray-100 border border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold text-sm">
                    {contact.name} {contact.first_last_name || ""}
                  </span>
                  
                  {/* BOLITA REAL: Si hay mensajes sin leer y el chat no está abierto, muestra el número */}
                  {!isSelected && contact.unread_count > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center animate-pulse">
                      {contact.unread_count}
                    </span>
                  )}
                </div>
                <span className={`text-xs ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                  {contact.role === "teacher" ? "Profesor" : "Estudiante"}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}