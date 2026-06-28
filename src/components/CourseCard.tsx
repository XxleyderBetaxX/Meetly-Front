interface Props {
  id: string;
  code: string;
  name: string;
  sede: string;
  onVerDetalle: (id: string) => void;
  onAgendar: (id: string) => void;
}

export default function CourseCard({ id, code, name, sede, onVerDetalle, onAgendar }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">

      {/* Thumbnail — clic lleva a descripción */}
      <button
        onClick={() => onVerDetalle(id)}
        className="bg-primary h-52 flex items-center justify-center hover:bg-secondary transition-colors"
      >
        <p className="font-primary font-bold text-white text-lg tracking-wide">{code}</p>
      </button>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="font-primary font-bold text-primary text-[15px] leading-snug">{name}</p>
          <p className="font-secondary font-semibold text-sm text-primary/60 mt-1">{sede}</p>
        </div>

        {/* Botón agendar */}
        <button
          onClick={() => onAgendar(id)}
          className="mt-auto w-full py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-primary font-bold text-sm transition-colors"
        >
          Agendar cita
        </button>
      </div>

    </div>
  );
}
