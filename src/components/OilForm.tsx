import  { useState } from 'react';
import { Loader2, Droplets, Banknote, Gauge, Calendar } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'sonner';
import { log } from 'console';

interface OilFormProps {
  carId: string;
  onSuccess: () => void;
}

const OilForm: React.FC<OilFormProps> = ({ carId, onSuccess }) => {
  const [formData, setFormData] = useState({
    oilName: '',
    price: '',
    currentKm: '',
    nextChangeKm: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('/oil', {
        ...formData,
        carId,
        price: Number(formData.price),
        currentKm: Number(formData.currentKm),
        nextChangeKm: Number(formData.nextChangeKm),
      });
      toast.success('Moy almashtirish ma\'lumoti qo\'shildi');
      onSuccess();
      setFormData({ oilName: '', price: '', currentKm: '', nextChangeKm: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Droplets className="text-blue-500" size={20} />
        Yangi moy almashtirish
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Moy nomi</label>
          <div className="relative">
            <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              required
              type="text"
              value={formData.oilName}
              onChange={(e) => setFormData({ ...formData, oilName: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
              placeholder="Masalan: Shell Helix 5W-30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Narxi (so'm)</label>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                required
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                placeholder="450000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hozirgi KM</label>
            <div className="relative">
              <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                required
                type="number"
                value={formData.currentKm}
                onChange={(e) => setFormData({ ...formData, currentKm: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                placeholder="125000"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Keyingi almashtirish KM</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              required
              type="number"
              value={formData.nextChangeKm}
              onChange={(e) => setFormData({ ...formData, nextChangeKm: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
              placeholder="132000"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default OilForm;
