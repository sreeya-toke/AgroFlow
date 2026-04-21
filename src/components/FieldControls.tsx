import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Power, Calendar, Sparkles, Clock, Droplets, ToggleLeft, ToggleRight } from 'lucide-react';
import { TranslationStrings } from '../types';

interface FieldControlsProps {
  t: TranslationStrings;
}

export const FieldControls: React.FC<FieldControlsProps> = ({ t }) => {
  const [isSprinklerOn, setIsSprinklerOn] = useState(false);
  const [isAutoEnabled, setIsAutoEnabled] = useState(true);
  const [isSmartEnabled, setIsSmartEnabled] = useState(true);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Power Control Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-edge relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Power className="w-6 h-6" />
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isSprinklerOn ? 'bg-emerald-100 text-emerald-700' : 'bg-text-muted/10 text-text-muted'}`}>
              {isSprinklerOn ? t.statusWorking : t.statusIdle}
            </div>
          </div>
          
          <h3 className="text-text-main font-black text-xl tracking-tight mb-1">{t.fieldControls}</h3>
          <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-6">{t.manualOverride}</p>

          <button 
            onClick={() => setIsSprinklerOn(!isSprinklerOn)}
            className={`w-full py-4 rounded-3xl font-black text-sm transition-all flex items-center justify-center gap-3 shadow-lg ${
              isSprinklerOn 
                ? 'bg-red-500 text-white shadow-red-500/20' 
                : 'bg-primary text-white shadow-primary/20 hover:scale-[1.02]'
            }`}
          >
            <Droplets className="w-5 h-5" />
            {isSprinklerOn ? t.turnOff : t.turnOn}
          </button>
        </motion.div>

        {/* Scheduler Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-edge"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
              <Calendar className="w-6 h-6" />
            </div>
            <button 
              onClick={() => setIsAutoEnabled(!isAutoEnabled)}
              className="text-text-muted hover:text-primary transition-colors"
            >
              {isAutoEnabled ? (
                <ToggleRight className="w-8 h-8 text-primary" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>

          <h3 className="text-text-main font-black text-xl tracking-tight mb-1">{t.scheduler}</h3>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{t.automation}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-text-muted/5 rounded-2xl border border-edge">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-text-muted" />
                <span className="text-xs font-bold text-text-main">{t.nextRun}</span>
              </div>
              <span className="text-xs font-black text-primary">06:00 AM</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-text-muted/5 rounded-2xl border border-edge opacity-60">
              <div className="flex items-center gap-3">
                <Droplets className="w-4 h-4 text-text-muted" />
                <span className="text-xs font-bold text-text-main font-mono">20 Liters</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter text-text-muted">Target</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Irrigation Automation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-edge group"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-3xl text-primary group-hover:rotate-12 transition-transform">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-text-main font-black text-xl tracking-tight">{t.irrigationAutomationTitle}</h3>
              <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{t.smartSchedulingDescription}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsSmartEnabled(!isSmartEnabled)}
            className={`flex items-center gap-4 pl-6 pr-4 py-3 rounded-2xl border-2 transition-all ${
              isSmartEnabled 
                ? 'bg-primary/5 border-primary/20 text-primary' 
                : 'bg-text-muted/5 border-edge text-text-muted'
            }`}
          >
            <span className="text-xs font-black uppercase tracking-widest">
              {isSmartEnabled ? t.smartSchedulingEnabled : t.smartSchedulingDisabled}
            </span>
            {isSmartEnabled ? (
              <ToggleRight className="w-8 h-8" />
            ) : (
              <ToggleLeft className="w-8 h-8" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
