import { useState } from "react";

export default function SoportePage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    setLoading(true);
    
    // Simulación de envío al backend
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setSubject("");
      setDescription("");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 m-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div>
          <h2 className="font-primary font-bold text-2xl text-gray-800">Soporte Técnico</h2>
          <p className="font-primary text-sm text-gray-500">¿Tienes algún problema con Meetly? Reportálo aquí y lo resolveremos.</p>
        </div>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl text-center font-primary space-y-3">
          <p className="text-2xl">¡Reporte enviado con éxito!</p>
          <p className="text-sm text-emerald-600">Nuestro equipo técnico lo revisará lo antes posible. Gracias por ayudarnos a mejorar.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition"
          >
            Enviar otro reporte
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 font-primary">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Asunto / Título del problema
            </label>
            <input
              type="text"
              placeholder="Ej: No puedo visualizar los cursos matriculados"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Descripción detallada
            </label>
            <textarea
              rows={5}
              placeholder="Describe paso a paso qué sucedió o qué error te aparece en pantalla..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !subject || !description}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm text-white shadow-sm transition ${
              loading || !subject || !description
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
            }`}
          >
            {loading ? "Enviando reporte..." : "Enviar Reporte Técnico"}
          </button>
        </form>
      )}
    </div>
  );
}