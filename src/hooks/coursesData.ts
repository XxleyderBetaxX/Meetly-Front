import { useState, useEffect } from "react";

interface Course {
  id: number;
  code: string;
  name: string;
  sede: string;
}

interface Session {
  dayLabel: string;
  day: number;
  title: string;
  teacher: string;
}

interface DashboardData {
  student: { name: string };
  stats: { activeCourses: number; completedHours: number };
  nextSession: { title: string; date: string; time: string };
  courses: Course[];
  sessions: Session[];
}

interface UseDashboardDataResult {
  dashboardData: DashboardData | null;
  loading: boolean;
  error: string | null;
}

export function useDashboardData(): UseDashboardDataResult {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDashboardData() {
      try {
        const response = await fetch("http://localhost:3000/api/courses", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load data (HTTP ${response.status})`);
        }

        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
    return () => controller.abort();
  }, []);

  return { dashboardData, loading, error };
}