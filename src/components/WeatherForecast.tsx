import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudRain, 
  Thermometer, 
  Wind, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  Clock,
  Droplets
} from 'lucide-react';
import { DayForecast, TranslationStrings } from '../types';

interface WeatherForecastProps {
  forecast: DayForecast[];
  t: TranslationStrings;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, t }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center ml-4">
        <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">{t.irrigationForecastTitle}</h3>
        <div className="h-px bg-edge flex-1 ml-4" />
      </div>

      <div className="space-y-3">
        {forecast.map((day, idx) => (
          <div 
            key={day.date}
            className="bg-card backdrop-blur-xl rounded-3xl border border-edge overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <button
              onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
              className="w-full p-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-text-main uppercase tracking-tight">{day.date}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-text-muted">
                      <Thermometer className="w-3 h-3" />
                      {day.minTemp}° – {day.maxTemp}°C
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500">
                      <CloudRain className="w-3 h-3" />
                      {day.avgPop}% {t.rainLabel}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {day.avgPop > 40 && (
                  <div className="hidden sm:flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/30">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{t.skipIrrigation}</span>
                  </div>
                )}
                {expandedDay === idx ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
              </div>
            </button>

            <AnimatePresence>
              {expandedDay === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-edge"
                >
                  <div className="p-4 overflow-x-auto">
                    <div className="flex gap-3 min-w-max pb-2">
                      {day.hourly.filter((_, hIdx) => hIdx % 3 === 0).map((hour) => (
                        <div 
                          key={hour.time}
                          className="flex flex-col items-center gap-2 p-3 bg-text-muted/5 rounded-2xl border border-edge/50 min-w-[80px]"
                        >
                          <span className="text-[9px] font-black text-text-muted uppercase tracking-tighter flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {hour.time}
                          </span>
                          <span className="text-base font-black text-text-main">{Math.round(hour.temp)}°</span>
                          <div className="space-y-1 w-full">
                            <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-blue-500">
                              <CloudRain className="w-2.5 h-2.5" />
                              {hour.pop}%
                            </div>
                            <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-emerald-500">
                              <Wind className="w-2.5 h-2.5" />
                              {Math.round(hour.windSpeed)} {t.windUnit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`px-6 py-4 flex items-center gap-4 border-t border-edge ${
                    day.avgPop > 50 ? 'bg-blue-500/5' : 'bg-emerald-500/5'
                  }`}>
                     <div className={`p-2.5 rounded-xl shadow-sm border ${
                       day.avgPop > 50 
                        ? 'bg-blue-50 border-blue-100 text-blue-600' 
                        : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                     }`}>
                        <Droplets className="w-5 h-5" />
                     </div>
                     <div className="flex-1">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${
                          day.avgPop > 50 ? 'text-blue-600' : 'text-emerald-600'
                        }`}>
                          {t.irrigationGuidance}
                        </span>
                        <p className="text-[11px] font-bold text-text-main leading-relaxed">
                          {day.avgPop > 50 ? t.rainWarning : t.stableConditions}
                        </p>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
