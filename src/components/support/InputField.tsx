// Este es un componente de campo de entrada reutilizable. Permite a los usuarios ingresar texto y maneja el estado del valor ingresado. Se puede personalizar con etiquetas, valores iniciales, funciones de cambio, marcadores de posición y requisitos.
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function InputField({ label, value, onChange, placeholder, required = true }: InputFieldProps) {
  return (
    <div>
      <label className="block text-s font-medium text-gray-800 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}