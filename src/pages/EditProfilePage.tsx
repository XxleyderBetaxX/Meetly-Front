import React, { useState, useEffect } from "react";
import InputField from "../components/support/InputField";
import OrangeButton from "../components/support/orangeButton";
import type { Page } from "../App";

// Este es un componente de página de edición de perfil. Permite a los usuarios actualizar su información personal, incluyendo nombre, apellidos y URL de la foto de perfil. El formulario maneja el estado de carga, errores y confirmación de éxito al actualizar el perfil.
interface EditarPerfilPageProps {
  setPage: (page: Page) => void;
}

// Componente principal de la página de edición de perfil
export default function EditarPerfilPage({ setPage }: EditarPerfilPageProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


// useEffect para cargar los datos del perfil cuando el componente se monta
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
// Si la respuesta no es exitosa, lanzamos un error con el mensaje del servidor
        if (!response.ok) throw new Error(data.message);

        setEmail(data.email);
        setName(data.name);
        setSecondName(data.second_name || "");
        setFirstLastName(data.first_last_name);
        setSecondLastName(data.second_last_name || "");
        setAvatarUrl(data.avatar_url || "https://via.placeholder.com/150");
      } catch (err: any) {
        setError("No se pudieron cargar los datos del perfil.");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);
// Función para manejar el envío del formulario de actualización de perfil
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
// Intentamos enviar los datos actualizados al servidor
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          second_name: secondName,
          first_last_name: firstLastName,
          second_last_name: secondLastName,
          avatar_url: avatarUrl,
        }),
      });
// Obtenemos la respuesta del servidor y verificamos si fue exitosa
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al actualizar.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center mt-10">Cargando perfil...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Volvemos usando tu setPage */}
      <button onClick={() => setPage("ajustes" as Page)} className="text-sm text-gray-500 hover:underline mb-4 block cursor-pointer bg-transparent border-none">
        ← Volver a Ajustes
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Perfil Personal</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        {success && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">¡Perfil actualizado con éxito!</div>}

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-[#F2994A]" />
          <div className="flex-1">
            <InputField
              label="URL de tu Foto de Perfil"
              value={avatarUrl}
              onChange={setAvatarUrl}
              placeholder="https://enlace-a-tu-foto.com/imagen.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-400 mb-1">Correo Electrónico (No se puede cambiar)</label>
          <input type="text" value={email} disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-400 rounded-md shadow-sm cursor-not-allowed" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Primer Nombre" value={name} onChange={setName} />
          <InputField label="Segundo Nombre (Opcional)" value={secondName} onChange={setSecondName} required={false} />
          <InputField label="Primer Apellido" value={firstLastName} onChange={setFirstLastName} />
          <InputField label="Segundo Apellido (Opcional)" value={secondLastName} onChange={setSecondLastName} required={false} />
        </div>

        <div className="pt-2">
          <OrangeButton loading={loading} text="Actualizar Perfil" loadingText="Guardando..." />
        </div>
      </form>
    </div>
  );
}