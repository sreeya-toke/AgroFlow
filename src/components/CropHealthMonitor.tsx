import React from 'react';
import { motion } from 'motion/react';
import { Activity, Bug, Droplet, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { TranslationStrings } from '../types';

interface CropHealthMonitorProps {
  t: TranslationStrings;
}

export const CropHealthMonitor: React.FC<CropHealthMonitorProps> = ({ t }) => {
  const cropData = [
    { 
      name: t.crops.corn, 
      health: 92, 
      nitrogen: 85, 
      pests: 12, 
      hydration: 78,
      status: 'healthy',
      icon: '🌽'
    },
    { 
      name: t.crops.wheat, 
      health: 88, 
      nitrogen: 70, 
      pests: 22, 
      hydration: 65,
      status: 'warning',
      icon: '🌾'
    },
    { 
      name: t.crops.tomato, 
      health: 95, 
      nitrogen: 90, 
      pests: 5, 
      hydration: 92,
      status: 'healthy',
      icon: '🍅'
    },
    { 
      name: t.crops.apple, 
      health: 84, 
      nitrogen: 65, 
      pests: 35, 
      hydration: 55,
      status: 'warning',
      icon: '🍎'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ml-4">
        <div>
          <h3 className="text-text-main font-black text-xl tracking-tight leading-none uppercase italic">
            {t.cropHealthTitle}
          </h3>
          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            {t.cropHealthSubtitle}
          </p>
        </div>
        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
          <Activity className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cropData.map((crop, idx) => (
          <motion.div
            key={crop.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card backdrop-blur-xl p-6 rounded-[2.5rem] border border-edge shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">
                  {crop.icon}
                </span>
                <div>
                  <h4 className="font-black text-text-main uppercase tracking-widest">{crop.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {crop.status === 'healthy' ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                    )}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      crop.status === 'healthy' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {crop.status === 'healthy' ? t.healthy : t.warning}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-text-main tracking-tighter">{crop.health}%</span>
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Global Health</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span className="text-[9px] font-black text-text-muted uppercase">{t.nitrogenLevel}</span>
                </div>
                <div className="h-1.5 w-full bg-edge rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${crop.nitrogen}%` }}
                    className="h-full bg-yellow-500 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Bug className="w-3 h-3 text-red-500" />
                  <span className="text-[9px] font-black text-text-muted uppercase">{t.pestRisk}</span>
                </div>
                <div className="h-1.5 w-full bg-edge rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${crop.pests}%` }}
                    className={`h-full rounded-full ${crop.pests > 30 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Droplet className="w-3 h-3 text-blue-500" />
                  <span className="text-[9px] font-black text-text-muted uppercase">{t.hydration}</span>
                </div>
                <div className="h-1.5 w-full bg-edge rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${crop.hydration}%` }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Subtle background wash */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-5 pointer-events-none ${
              crop.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
            }`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
