// Este es un componente de botón de envío que maneja el estado de carga. Muestra un texto diferente cuando está cargando y desactiva el botón para evitar envíos múltiples.
interface SubmitButtonProps {
  loading: boolean;
  text: string;
  loadingText: string;
}

export default function SubmitButton({ loading, text, loadingText }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-colors"
    >
      {loading ? loadingText : text}
    </button>
  );
}

