import logo     from "../assets/img/Logo.png";
import home     from "../assets/img/home.png";
import courses  from "../assets/img/courses.png";
import agenda   from "../assets/img/agenda.png";
import historial from "../assets/img/historial.png";
import settings from "../assets/img/settings.png";
import support  from "../assets/img/support.png";
import type { Page } from "../App";

interface Props {
  currentPage: Page;
  navigate: (page: Page) => void;
}


const NAV: { page: Page; label: string; icon: string }[] = [
  { page: "inicio",    label: "Inicio",    icon: home      },
  { page: "cursos",    label: "Cursos",    icon: courses   },
  { page: "agenda",    label: "Agenda",    icon: agenda    },
  { page: "historial", label: "Historial", icon: historial },
];

const BOTTOM: { page: Page; label: string; icon: string }[] = [
  { page: "ajustes", label: "Ajustes", icon: settings },
  { page: "soporte", label: "Soporte", icon: support  },
];

function NavBtn({ item, active, navigate }: { item: (typeof NAV)[0]; active: boolean; navigate: (p: Page) => void }) {
  return (
    <button
      onClick={() => navigate(item.page)}
      className={[
        "w-full flex items-center gap-4 px-5 py-[14px] rounded-xl text-left transition-colors duration-150",
        "font-secondary font-semibold text-[17px]",
        active ? "bg-secondary text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      <img src={item.icon} alt={item.label} className="w-5 h-5 flex-shrink-0" />
      {item.label}
    </button>
  );
}

export default function Sidebar({ currentPage, navigate }: Props) {
  return (
    <aside className="w-[328px] min-h-screen bg-primary flex flex-col flex-shrink-0">

      <div className="px-10 pt-8 pb-10">
        <img src={logo} alt="Meetly" className="h-10 object-contain object-left brightness-0 invert" />
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-5">
        {NAV.map((item) => (
          <NavBtn key={item.page} item={item} active={currentPage === item.page} navigate={navigate} />
        ))}
      </nav>

      <div className="mx-6 my-4 border-t border-white/20" />

      <nav className="flex flex-col gap-1 px-5 pb-8">
        {BOTTOM.map((item) => (
          <NavBtn key={item.page} item={item} active={currentPage === item.page} navigate={navigate} />
        ))}
      </nav>

    </aside>
  );
}