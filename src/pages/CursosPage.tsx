import { useState } from "react";
import { useAuth } from "../context/authContext"; // <-- Importamos tu contexto de autenticación
import { useCourses, useCourseAvailability } from "../hooks/useBackend";
import type { Course } from "../hooks/useBackend";
import CourseCard from "../components/CourseCard";
import TeacherInfoCard from "../components/TeacherInfoCard";
import CourseDescriptionCard from "../components/CourseDescriptionCard";
import type { Page } from "../App";

interface Props {
  navigate: (page: Page) => void;
}

const DAY_LABELS: Record<number, string> = {
  0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles",
  4: "Jueves",  5: "Viernes", 6: "Sábado",
};

function CourseDetail({ course, onBack }: { course: Course; onBack: () => void }) {
  const { availability, loading } = useCourseAvailability(course.id);

  const byDay = availability.reduce<Record<number, string[]>>((acc, slot) => {
    if (!slot.is_available) return acc;
    if (!acc[slot.day_of_week]) acc[slot.day_of_week] = [];
    acc[slot.day_of_week].push(slot.start_time);
    return acc;
  }, {});

  return (
    <div className="p-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-secondary font-semibold text-primary/60 hover:text-primary mb-6 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 320 512" fill="currentColor">
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        Volver a Mis Cursos
      </button>

      <h1 className="font-primary font-bold text-xl text-primary mb-6">Descripción del curso</h1>

      <TeacherInfoCard name="Docente del curso" email="docente@ucr.ac.cr" />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <CourseDescriptionCard
            courseCode={course.code}
            paragraphs={course.description ? [course.description] : ["Sin descripción disponible."]}
          />
        </div>

        <div className="bg-soft/20 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="font-primary font-bold text-primary text-base">Horario de Atención</h2>
            <svg className="w-5 h-5 text-secondary" viewBox="0 0 448 512" fill="currentColor">
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"/>
            </svg>
          </div>

          {loading && <p className="font-secondary text-sm text-primary/50">Cargando horarios...</p>}

          {!loading && Object.keys(byDay).length === 0 && (
            <p className="font-secondary text-sm text-primary/50">Sin horarios disponibles.</p>
          )}

          {!loading && Object.entries(byDay).map(([day, slots]) => (
            <div key={day}>
              <p className="font-secondary font-bold text-[10px] tracking-widest text-primary/50 uppercase mb-2">
                {DAY_LABELS[Number(day)]}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button key={slot} className="py-2 px-1 bg-secondary text-white rounded-lg font-secondary text-xs font-semibold hover:bg-primary transition-colors">
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button className="mt-auto w-full py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-primary font-bold transition-colors">
            Agendar cita
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CursosPage({ navigate: _navigate }: Props) {
  const { user } = useAuth(); // <-- Extraemos el usuario actual de tu AuthContext
  const { courses, loading, error } = useCourses(user?.id); // <-- Pasamos el id para filtrar por matrícula
  const [selected, setSelected] = useState<Course | null>(null);

  if (selected) {
    return <CourseDetail course={selected} onBack={() => setSelected(null)} />;
  }

  if (loading || error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className={`font-secondary ${error ? "text-red-400" : "text-primary/50"}`}>
          {loading ? "Cargando cursos..." : error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="font-primary font-bold text-xl text-primary mb-8">Mis Cursos</h1>

      {courses.length === 0 ? (
        <p className="font-secondary text-primary/50">No tienes cursos matriculados en este momento.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              id={c.id}
              code={`Curso ${c.code}`}
              name={c.name}
              sede="Sede Regional del Pacífico"
              onVerDetalle={() => setSelected(c)}
              onAgendar={() => setSelected(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 