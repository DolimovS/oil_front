import   'react';
import { Car, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsProps {
  totalCars: number;
  dueCars: number;
}

const Stats: React.FC<StatsProps> = ({ totalCars, dueCars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800">
        <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Jami mashinalar</p>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{totalCars}</h3>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800">
        <p className="text-[13px] font-bold text-rose-500 uppercase tracking-wider mb-2">Vaqti kelganlar</p>
        <h3 className="text-3xl font-bold text-rose-500">{dueCars}</h3>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800">
        <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Bugungi xizmatlar</p>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">0</h3>
      </div>
    </div>
  );
};

export default Stats;
