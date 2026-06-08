interface Props {
  onLogout: () => void;
}

export default function AjustesPage({ onLogout }: Props) {
  return (
    <div className="p-10">
      <h1 className="font-primary font-bold text-2xl text-primary">Ajustes</h1>
      <button
        onClick={onLogout}
        className="mt-6 px-6 py-3 bg-accent text-white font-primary font-bold rounded-xl hover:bg-accent/90 transition-colors"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}