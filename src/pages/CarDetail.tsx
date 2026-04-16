import  { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OilForm from '../components/OilForm';
import api from '../api/axios';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Car as CarIcon, 
  Hash, 
  History, 
  Loader2, 
  Trash2,
  Calendar,
  Droplets,
  Banknote,
  Gauge
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [carRes, historyRes] = await Promise.all([
        api.get(`/cars/${id}`),
        api.get(`/oil/${id}`)
      ]);
      setCar(carRes.data);
      setHistory(historyRes.data);
    } catch (error: any) {
      toast.error('Ma\'lumotlarni yuklashda xatolik yuz berdi');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteOil = async (oilId: string) => {
    if (!window.confirm('Haqiqatan ham ushbu yozuvni o\'chirmoqchimisiz?')) return;
    
    try {
      await api.delete(`/oil/${oilId}`);
      toast.success('Yozuv o\'chirildi');
      fetchData();
    } catch (error: any) {
      toast.error('O\'chirishda xatolik yuz berdi');
    }
  };

  if (isLoading && !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Orqaga qaytish
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Car Info & Form */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <CarIcon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{car?.carName}</h2>
                  <div className="mt-1 inline-block font-mono text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 uppercase">
                    {car?.carNumber}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <User size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Egasining ismi</p>
                    <p className="font-semibold">{car?.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Phone size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Telefon raqami</p>
                    <p className="font-semibold">{car?.ownerPhone}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <OilForm carId={id!} onSuccess={fetchData} />
            </motion.div>
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="text-blue-500" size={20} />
                  Moy almashtirish tarixi
                </h3>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-lg">
                  {history.length} ta yozuv
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <div key={item.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold">
                              #{history.length - index}
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white">{item.oilName}</h4>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Banknote size={14} />
                              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                {item.price?.toLocaleString()} so'm
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Gauge size={14} />
                              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                {item.currentKm?.toLocaleString()} km
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Calendar size={14} />
                              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                                {item.nextChangeKm?.toLocaleString()} km
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Calendar size={14} />
                              <span>{new Date(item.date || item.createdAt).toLocaleDateString('uz-UZ')}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteOil(item._id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors self-end sm:self-center"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center">
                    <div className="inline-flex p-4 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-300 dark:text-slate-600 mb-4">
                      <History size={40} />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Hali tarix mavjud emas</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetail;
