import { useState, useEffect } from "react";
import { apiClient } from "../services/api";
 
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string | null;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}
 
export interface Appointment {
  id: string;
  student_id: string;
  course_id: string;
  appointment_date: string;
  start_time: string;
  status: string;
  topic: string;
  created_at: string;
  updated_at: string;
}
 
export interface Availability {
  id: string;
  course_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}
 
// ── Hook: Cursos (Soporta filtrado por estudiante vía Enrollments) ──
export function useCourses(studentId?: string) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
 
  useEffect(() => {
    // Si necesitas cursos por estudiante pero el id aún no está listo, 
    // detenemos la ejecución para evitar pegarle al servidor con un "undefined"
    if (studentId === undefined) {
      // Nota: Si permites que useCourses() funcione de forma global sin parámetros,
      // puedes quitar este if, pero si obligatoriamente requiere el usuario logueado:
      // return; 
    }

    const url = studentId ? `/enrollments/${studentId}` : "/courses";

    apiClient.get<{ data: Course[] }>(url)
      .then(res => setCourses(res.data.data))
      .catch(err => setError(err.response?.data?.message ?? "Error al cargar cursos"))
      .finally(() => setLoading(false));
  }, [studentId]);
 
  return { courses, loading, error };
}
 
// ── Hook: Citas de un estudiante ──────────────────────────────────
export function useAppointments(studentId: string | undefined) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
 
  useEffect(() => {
    if (!studentId) { setLoading(false); return; }
 
    apiClient.get<{ data: Appointment[] }>(`/appointments/${studentId}`)
      .then(res => setAppointments(res.data.data))
      .catch(err => setError(err.response?.data?.message ?? "Error al cargar citas"))
      .finally(() => setLoading(false));
  }, [studentId]);
 
  return { appointments, loading, error };
}
 
// ── Hook: Disponibilidad de un curso ─────────────────────────────
export function useCourseAvailability(courseId: string | null) {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState<string | null>(null);
 
  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
 
    apiClient.get<{ data: Availability[] }>(`/courses/${courseId}/availability`)
      .then(res => setAvailability(res.data.data))
      .catch(err => setError(err.response?.data?.message ?? "Error al cargar horarios"))
      .finally(() => setLoading(false));
  }, [courseId]);
 
  return { availability, loading, error };
}