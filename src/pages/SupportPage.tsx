import React, { useState } from "react";
import InputField from "../components/support/InputField";
import TextAreaField from "../components/support/TextAreaField";
import SubmitButton from "../components/support/SubmitButton";


// Esto es un componente de página de soporte técnico. Permite a los usuarios enviar reportes de problemas al equipo de soporte. El formulario incluye campos para el asunto y la descripción del problema, y maneja el estado de envío, errores y confirmación de envío.
export default function SoportePage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al enviar el reporte.");

      setSubmitted(true);
      setSubject("");
      setDescription("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-1 text-gray-800">Soporte Técnico</h2>
      <p className="font-primary text-sm text-gray-500 mb-6">
        ¿Tienes algún problema con Meetly? Reportálo aquí y lo resolveremos.
      </p>
      
      {submitted ? (
        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
          <span className="font-medium">¡Reporte enviado!</span> Muchas gracias por tu mensaje, lo revisaremos pronto.
          <button 
            onClick={() => setSubmitted(false)} 
            className="block mt-3 text-sm font-semibold text-green-800 underline hover:text-green-900 cursor-pointer"
          >
            Enviar otro reporte
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}

          <InputField 
            label="Asunto"
            value={subject}
            onChange={setSubject}
            placeholder="Ej: No puedo ver mi curso de diseño de sitios web"
          />

          <TextAreaField 
            label="Descripción del problema"
            value={description}
            onChange={setDescription}
            placeholder="Describe detalladamente qué sucede..."
          />

          <SubmitButton 
            loading={loading}
            text="Enviar Reporte"
            loadingText="Enviando..."
          />
        </form>
      )}
    </div>
  );
}