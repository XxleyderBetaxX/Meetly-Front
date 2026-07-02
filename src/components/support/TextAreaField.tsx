// Este es un componente de campo de área de texto reutilizable. Permite a los usuarios ingresar texto en varias líneas y maneja el estado del valor ingresado. Se puede personalizar con etiquetas, valores iniciales, funciones de cambio, marcadores de posición, requisitos y número de filas.
interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function TextAreaField({ label, value, onChange, placeholder, required = true, rows = 5 }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-s font-medium text-gray-800 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}