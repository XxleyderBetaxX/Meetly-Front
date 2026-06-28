interface Props {
  name: string;
  email: string;
}

export default function TeacherInfoCard({ name, email }: Props) {
  return (
    <div className="flex items-center gap-4 bg-secondary/10 rounded-2xl px-5 py-4 w-fit">

      {/* Avatar placeholder */}
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <svg className="w-7 h-7 text-white" viewBox="0 0 448 512" fill="currentColor">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
        </svg>
      </div>

      {/* Info */}
      <div>
        <p className="font-secondary text-xs text-secondary uppercase tracking-wider mb-0.5">
          Docente
        </p>
        <p className="font-primary font-bold text-primary text-[15px] leading-snug">{name}</p>
        <p className="font-secondary text-xs text-primary/60 mt-0.5">
          Correo electrónico: {email}
        </p>
      </div>

    </div>
  );
}
