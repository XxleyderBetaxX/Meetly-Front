interface Props {
  dayLabel: string;   
  day: number | string;
  title: string;
  teacher: string;
}

export default function UpcomingSessionItem({ dayLabel, day, title, teacher }: Props) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
      {/* Fecha */}
      <div className="w-9 text-center flex-shrink-0 border-l-2 border-secondary pl-2">
        <p className="font-primary font-bold text-[8px] tracking-widest uppercase text-secondary">
          {dayLabel}
        </p>
        <p className="font-primary font-bold text-xl text-primary leading-tight">{day}</p>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-primary font-bold text-sm text-primary leading-snug truncate">
          {title}
        </p>
        <p className="font-secondary text-xs  text-primary/50 truncate">{teacher}</p>
      </div>

      {/* Chevron */}
      <svg
        className="w-3 h-3 text-primary/30 flex-shrink-0"
        viewBox="0 0 320 512"
        fill="currentColor"
      >
        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
      </svg>
    </div>
  );
}