import React from 'react';
import { motion } from 'motion/react';
import { Thermometer, CloudRain, Wind, Clock } from 'lucide-react';
import { TranslationStrings } from '../types';

interface WeatherSummary24hProps {
  t: TranslationStrings;
}

export const WeatherSummary24h: React.FC<WeatherSummary24hProps> = ({ t }) => {
  // Mock 24h data
  const data = {
    avgTemp: 27.5,
    totalPrecip: 2.4,
    maxWind: 14,
    humidity: 68
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-edge overflow-hidden relative"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-text-main font-black text-lg tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {t.weatherSummary24h}
          </h3>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mt-1">
            {t.midnightToCurrent}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50/10 p-4 rounded-3xl border border-blue-100/20 flex items-center gap-4">
          <div className="p-3 bg-card rounded-2xl shadow-sm text-blue-600">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{t.avgTemp}</p>
            <p className="text-xl font-black text-text-main">{data.avgTemp}°C</p>
          </div>
        </div>

        <div className="bg-orange-50/10 p-4 rounded-3xl border border-orange-100/20 flex items-center gap-4">
          <div className="p-3 bg-card rounded-2xl shadow-sm text-orange-600">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{t.totalPrecipitation}</p>
            <p className="text-xl font-black text-text-main">{data.totalPrecip} mm</p>
          </div>
        </div>
      </div>

      {/* Micro-stats bar */}
      <div className="flex gap-8 mt-6 pt-4 border-t border-edge">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-text-muted" />
          <span className="text-[11px] font-bold text-text-main">{data.maxWind} {t.windUnit}</span>
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">{t.peakWind}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-bold text-text-main">{data.humidity}%</span>
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">{t.avgHumidity}</span>
        </div>
      </div>
      
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <Wind className="w-32 h-32 text-text-main rotate-12" />
      </div>
    </motion.div>
  );
};
