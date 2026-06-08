import { useDashboardData } from "../hooks/coursesData";
import StatCard from "../components/StatCard";
import UpcomingSessionItem from "../components/UpcomingSessionItem";
import CourseCard from "../components/CourseCard";
import historial from "../assets/img/historial.png";
import type { Page } from "../App";

interface Props {
  navigate: (page: Page) => void;
}


function NextSessionCard({ title, date, time }: { title: string; date: string; time: string }) {
  return (
    <div className="bg-success rounded-2xl p-7 flex flex-col gap-3 shadow-sm">
      <p className="font-secondary text-xs text-white/60 uppercase tracking-wider">
        Próxima sesión
      </p>
      <p className="font-primary font-bold text-white text-lg leading-snug">{title}</p>
      <div className="flex items-center gap-2 mt-auto">
        <img src={historial} alt="Hora" className="w-4 h-4 brightness-0 invert opacity-70" />
        <p className="font-secondary text-sm text-white/80">{date}, {time}</p>
      </div>
    </div>
  );
}

export default function InicioPage({ navigate }: Props) {
  const { dashboardData, loading, error } = useDashboardData();

  
  if (loading || error || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className={`font-secondary ${error ? "text-red-400" : "text-primary/50"}`}>
          {loading ? "Cargando..." : error ?? "Error al cargar datos."}
        </p>
      </div>
    );
  }

  const { student, stats, nextSession, courses, sessions } = dashboardData;

  return (
    <div className="p-10">

      
      <div className="mb-8">
        <h1 className="font-primary font-bold text-xl text-primary">
          ¡Hola {student.name}! Que bueno verte de nuevo
        </h1>
        <p className="font-secondary text-sm text-primary/60 mt-1">
          Tienes {sessions.length} sesiones programadas para esta semana. Sigue así con tu progreso.
        </p>
      </div>

       <div className="grid grid-cols-3 gap-6 mb-10">
        <StatCard
  label="Cursos activos"
  value={stats.activeCourses}
/>

<StatCard
  label="Horas completadas"
  value={stats.completedHours}
/>
       <NextSessionCard {...nextSession} />
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
          <div className="flex justify-end mb-4">
            <button onClick={() => navigate("cursos")} className="font-secondary text-sm text-primary/60 hover:text-accent transition-colors font-semibold">
              Ver todos
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {courses.map((c) => (
              <CourseCard key={c.id} code={`Curso ${c.code}`} name={c.name} sede={c.sede} onClick={() => navigate("cursos")} />
            ))}
          </div>
        </div>

        <div>
           <h2 className="font-primary font-bold text-base text-primary mb-4">Próximas sesiones</h2>
           <div className="flex flex-col gap-3">
            {sessions.map((s) => (
              <UpcomingSessionItem key={s.title} dayLabel={s.dayLabel} day={s.day} title={s.title} teacher={`Docente: ${s.teacher}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}