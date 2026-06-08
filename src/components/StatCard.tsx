type StatCardProps = {
  label: string;
  value: number ;
 };  

export default function StatCard({ label,value,}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
           <p className="font-secondary text-sm text-primary/60 mb-2">
           {label}
           </p>

      <p className="font-primary font-bold text-2xl text-primary">
          {value}
        </p>
    </div>
  );
}