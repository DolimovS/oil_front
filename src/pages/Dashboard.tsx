// import React, { useState, useEffect, useCallback } from 'react';
import { useState, useEffect ,useCallback } from "react";
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import CarCard from '../components/CarCard';
import AddCarModal from '../components/AddCarModal';
import api from '../api/axios';
import { Search, Plus, Filter, Loader2, Car as CarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'due'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);


  
  const fetchCars = useCallback(async () => {
    setIsLoading(true);
    try {
      let url = '/cars';
      const params: any = {};
      
      if (activeTab === 'due') {
        params.filter = 'due';
      }
      
      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await api.get(url, { params });
      setCars(response.data);
    } catch (error: any) {
      toast.error('Ma\'lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCars();
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [fetchCars]);

  const stats = {
    total: cars.length, // This might need a separate API call if filtered, but for now we use the list
    due: cars.filter(c => c.lastOilKm && c.nextOilKm && c.lastOilKm >= c.nextOilKm).length
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Boshqaruv paneli</h1>
            <p className="text-slate-500 dark:text-slate-400">Mijozlaringiz va ularning mashinalarini boshqaring</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus size={20} />
            Mashina qo'shish
          </button>
        </div>

        <Stats totalCars={stats.total} dueCars={stats.due} />

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Qidirish: Mashina raqami yoki ism..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>
            
            <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 lg:border-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`relative py-2 text-sm font-bold transition-all ${
                  activeTab === 'all'
                    ? 'text-blue-600 after:absolute after:bottom-[-1px] lg:after:bottom-[-16px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Barcha mashinalar
              </button>
              <button
                onClick={() => setActiveTab('due')}
                className={`relative py-2 text-sm font-bold transition-all ${
                  activeTab === 'due'
                    ? 'text-blue-600 after:absolute after:bottom-[-1px] lg:after:bottom-[-16px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Vaqti kelganlar
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-medium">Ma'lumotlar yuklanmoqda...</p>
          </div>
        ) : cars.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-300 dark:text-slate-600 mb-4">
              <CarIcon size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Mashinalar topilmadi</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs text-center">
              Qidiruv natijasida hech qanday mashina topilmadi yoki hali mashina qo'shilmagan.
            </p>
          </div>
        )}
      </main>

      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCars}
      />
    </div>
  );
};

export default Dashboard;
