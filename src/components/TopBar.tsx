import Bell   from "../assets/img/bell.png";
import Chat   from "../assets/img/chat.png";
import Search from "../assets/img/search.png";
import type { Page } from "../App"; // <-- Importamos los tipos de página

interface TopBarProps {
  navigate: (page: Page) => void; // <-- Recibimos la función de navegación
}

export default function TopBar({ navigate }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-10 py-5 bg-background">

      {/* Buscador */}
      <div className="relative flex items-center">
        <span className="absolute left-4 pointer-events-none">
          <img src={Search} alt="buscar" className="w-[18px] h-[18px] opacity-40" />
        </span>
        <input
          type="text"
          placeholder="Buscar Cursos..."
          className="bg-soft/30 rounded-full pl-11 pr-6 py-2.5 w-72 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary/30 font-secondary"
        />
      </div>

      {/* Iconos de la derecha */}
      <div className="flex items-center gap-5">
        {/* Botón de Notificaciones */}
        <button className="p-1.5 rounded-lg hover:bg-soft/20 transition-all opacity-80 hover:opacity-100 cursor-pointer">
          <img
            src={Bell}
            alt="notificaciones"
            className="w-6 h-6"
          />
        </button>

        {/* ¡BOTÓN DEL CHAT INTERACTIVO! */}
        <button 
          onClick={() => navigate("chat" as Page)} // <-- Nos manda directito al chat
          className="p-1.5 rounded-lg hover:bg-soft/20 transition-all opacity-80 hover:opacity-100 cursor-pointer hover:scale-105 active:scale-95"
          title="Abrir mensajes"
        >
          <img
            src={Chat}
            alt="chat"
            className="w-6 h-6"
          />
        </button>

        {/* Avatar de Usuario */}
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-primary font-bold text-sm select-none">
          L
        </div>
      </div>
    </header>
  );
}