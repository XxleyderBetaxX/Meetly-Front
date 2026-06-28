        interface Props {
  courseCode: string;   
  paragraphs: string[]; 
}

export default function CourseDescriptionCard({ courseCode, paragraphs }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">

      {/* Encabezado con acento lateral */}
      <div className="flex items-baseline gap-4 mb-6">
        <div className="w-1 h-6 bg-secondary rounded-full flex-shrink-0" />
        <div>
          <span className="font-primary font-bold text-primary text-lg">Sobre el curso</span>
          <span className="font-secondary text-sm text-primary/50 ml-3">{courseCode}</span>
        </div>
      </div>

      {/* Párrafos */}
      <div className="flex flex-col gap-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="font-secondary text-sm text-primary/80 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

    </div>
  );
}
