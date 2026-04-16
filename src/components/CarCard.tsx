import   'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Car as CarIcon, ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface CarCardProps {
  car: {
    _id: string;
    ownerName: string;
    ownerPhone: string;
    carName: string;
    carNumber: string;
    lastOilKm?: number;
    nextOilKm?: number;
  };
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  const isDue = car.lastOilKm && car.nextOilKm && car.lastOilKm >= car.nextOilKm;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => navigate(`/car/${car._id}`)}
      className="group bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 cursor-pointer transition-all flex justify-between items-center"
    >
      <div className="car-info">
        <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1">{car.ownerName}</h4>
        <p className="text-[13px] text-slate-500 dark:text-slate-400">{car.carName}</p>
        <div className="mt-2 inline-block font-mono text-sm font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-300">
          {car.carNumber}
        </div>
      </div>

      <div className="text-right">
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-2",
          isDue 
            ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20" 
            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
        )}>
          <span className={cn(
            "w-2.5 h-2.5 rounded-full",
            isDue ? "bg-orange-600" : "bg-emerald-600"
          )} />
          {isDue ? "Almashtirish vaqti" : "Holat yaxshi"}
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] text-slate-500 dark:text-slate-400">Keyingi km</span>
          <span className="text-[15px] font-bold text-slate-800 dark:text-white">
            {car.nextOilKm?.toLocaleString() || '---'} km
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
