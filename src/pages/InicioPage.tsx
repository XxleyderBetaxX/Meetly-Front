import { useAuth } from "../context/authContext";
import { useCourses, useAppointments } from "../hooks/useBackend";
import StatCard from "../components/StatCard";
import UpcomingSessionItem from "../components/UpcomingSessionItem";
import CourseCard from "../components/CourseCard";
import historial from "../assets/img/historial.png";
import type { Page } from "../App";

interface Props {
  navigate: (page: Page) => void;
}

function formatAppointment(date: string, time: string) {
  const [year, month, day] = date.split("-");
  return { date: `${day}/${month}/${year}`, time };
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

const DAY_LABELS: Record<number, string> = {
  0: "DOM", 1: "LUN", 2: "MAR", 3: "MIÉ", 4: "JUE", 5: "VIE", 6: "SÁB",
};

export default function InicioPage({ navigate }: Props) {
  const { user } = useAuth();
  
  // Enviamos user?.id para que calcule los datos basándose en sus matrículas reales:
  const { courses, loading: loadingCourses } = useCourses(user?.id); 
  const { appointments, loading: loadingAppts } = useAppointments(user?.id);

  const loading = loadingCourses || loadingAppts;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-secondary text-primary/50">Cargando...</p>
      </div>
    );
  }

  const nextAppt = appointments.find(a => a.status === "pending" || a.status === "confirmed");
  const nextCourse = nextAppt ? courses.find(c => c.id === nextAppt.course_id) : null;

  const upcomingSessions = appointments.slice(0, 3).map(appt => {
    const course = courses.find(c => c.id === appt.course_id);
    const dateObj = new Date(appt.appointment_date);
    return {
      dayLabel: DAY_LABELS[dateObj.getDay()] ?? "---",
      day: dateObj.getDate(),
      title: course?.name ?? "Curso",
      teacher: "Docente del curso",
    };
  });

  const previewCourses = courses.slice(0, 2);

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="font-primary font-bold text-xl text-primary">
          ¡Hola {user?.name}! Que bueno verte de nuevo
        </h1>
        <p className="font-secondary text-sm text-primary/60 mt-1">
          Tienes {appointments.length} sesiones programadas. Sigue así con tu progreso.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Este valor cambia ahora dinámicamente según las asignaturas matriculadas */}
        <StatCard label="Cursos activos"    value={courses.length} />
        <StatCard label="Citas pendientes"  value={appointments.filter(a => a.status === "pending").length} />

        {nextAppt && nextCourse ? (
          <NextSessionCard
            title={nextCourse.name}
            {...formatAppointment(nextAppt.appointment_date, nextAppt.start_time)}
          />
        ) : (
          <div className="bg-success rounded-2xl p-7 flex items-center justify-center shadow-sm">
            <p className="font-secondary text-sm text-white/77">Sin sesiones próximas</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("cursos")}
              className="font-secondary text-sm text-primary/60 hover:text-accent transition-colors font-semibold"
            >
              Ver todos
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {previewCourses.map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                code={`Curso ${c.code}`}
                name={c.name}
                sede="Sede Regional del Pacífico"
                onVerDetalle={() => navigate("cursos")}
                onAgendar={() => navigate("cursos")}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-primary font-bold text-base text-primary mb-4">
            Próximas sesiones
          </h2>
          <div className="flex flex-col gap-3">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((s, i) => (
                <UpcomingSessionItem
                  key={i}
                  dayLabel={s.dayLabel}
                  day={s.day}
                  title={s.title}
                  teacher={s.teacher}
                />
              ))
            ) : (
              <p className="font-secondary text-sm text-primary/50">Sin sesiones próximas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}