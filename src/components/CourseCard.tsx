interface Props {
  code: string;     
  name: string;     
  sede: string;      
  onClick?: () => void;
}

export default function CourseCard({ code, name, sede, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
    >
      
      <div className="bg-primary h-52 flex items-center justify-center">
        <p className="font-primary font-bold text-white text-lg tracking-wide">{code}</p>
      </div>

    
      <div className="p-5 pt-4">
        <p className="font-primary font-bold text-primary text-[15px] leading-snug mb-1">{name}</p>
        <p className="font-secondary font-semibold text-sm text-primary/60">{sede}</p>
      </div>
    </div>
  );
}   