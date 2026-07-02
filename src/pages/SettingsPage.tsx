import React, { useState } from "react";
import OrangeButton from "../components/support/orangeButton";
import type { Page } from "../App"; 

// Definimos la interfaz para las props del componente AjustesPage
interface AjustesPageProps {
  setPage: (page: Page) => void;
  onLogout: () => void; // Función para manejar el cierre de sesión
}

export default function AjustesPage({ setPage, onLogout }: AjustesPageProps) {
  const [reminders, setReminders] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    onLogout(); 
    setPage("login" as Page); 
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 mt-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Ajustes de la Cuenta</h2>
        <p className="font-primary text-sm text-gray-500 mt-1">Gestiona tu información personal, notificaciones y seguridad.</p>
      </div>

      {/* --- SECCIÓN 1: EDITAR PERFIL --- */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Editar Perfil</h3>
          <p className="text-sm text-gray-500">Modifica tus nombres, apellidos y tu foto de perfil.</p>
        </div>
        <button 
          onClick={() => setPage("editar-perfil" as Page)} 
          className="px-4 py-2 bg-[#F2994A] text-white rounded-md text-sm font-medium hover:bg-[#e0883b] transition-colors cursor-pointer text-center"
        >
          Editar Perfil
        </button>
      </section>

      {/* --- SECCIÓN 2: NOTIFICACIONES --- */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Notificaciones</h3>
          <p className="text-sm text-gray-500">Configura cómo y cuándo recibir notificaciones.</p>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between py-2">
            <div>
              <label className="text-base font-semibold text-gray-800 block cursor-pointer" htmlFor="reminders">Recordatorios de citas</label>
              <span className="text-sm text-gray-500">Recibe avisos antes de tus tutorías agendadas.</span>
            </div>
            <input id="reminders" type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100 pt-4">
            <div>
              <label className="text-base font-semibold text-gray-800 block cursor-pointer" htmlFor="updates">Actualizaciones de cursos</label>
              <span className="text-sm text-gray-500">Infórmate cuando un profesor cambie un horario o curso.</span>
            </div>
            <input id="updates" type="checkbox" checked={courseUpdates} onChange={(e) => setCourseUpdates(e.target.checked)} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: GESTIÓN DE CUENTA --- */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Seguridad y Cuenta</h3>
          <p className="text-sm text-gray-500">Cambia tu contraseña y gestiona tu cuenta.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="w-48">
            <OrangeButton type="button" text="Cambiar Contraseña" onClick={() => setPage("cambiar-password" as Page)} />
          </div>
          
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 cursor-pointer transition-colors h-[38px] flex items-center"
          >
            Cerrar Sesión
          </button>
        </div>
      </section>
    </div>
  );
}