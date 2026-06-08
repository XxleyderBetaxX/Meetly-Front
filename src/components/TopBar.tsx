import Bell   from "../assets/img/bell.png";
import Chat   from "../assets/img/chat.png";
import Search from "../assets/img/search.png";


export default function TopBar() {
  return (
    <header className="flex items-center justify-between px-10 py-5 bg-background">

   
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

     <div className="flex items-center gap-5">
  <img
    src={Bell}
    alt="notificaciones"
    className="w-6 h-6 opacity-80"
  />

  <img
    src={Chat}
    alt="chat"
    className="w-6 h-6 opacity-80"
  />

  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-primary font-bold text-sm">
    L
  </div>
</div>
    </header>
  );
}