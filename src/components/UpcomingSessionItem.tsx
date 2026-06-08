interface Props {
  dayLabel: string;   
  day: number | string;
  title: string;
  teacher: string;
}

export default function UpcomingSessionItem({ dayLabel, day, title, teacher }: Props) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
    
      <div className="w-9 text-center flex-shrink-0 border-l-2 border-secondary pl-2">
         <p className="font-primary font-bold text-[8px] tracking-widest uppercase text-secondary">
            {dayLabel}
        </p>
        <p className="font-primary font-bold text-xl text-primary">{day}</p>
      </div>

    
      <div className="flex-1 min-w-0">
        <p className="font-primary font-bold text-sm text-primary ">
            {title}
        </p>
        <p className="font-secondary text-xs  text-primary/50 ">{teacher}</p>
      </div>
    </div>
  );
}