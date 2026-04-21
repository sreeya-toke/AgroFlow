import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface SensorCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({ label, value, unit, icon: Icon, color }) => {
  const isOptimal = color === 'text-text-main' || color === 'text-success';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card backdrop-blur-xl p-6 rounded-[2rem] shadow-sm border border-edge flex flex-col items-center text-center transition-all hover:shadow-md"
    >
      <div className={`p-4 rounded-3xl ${color.replace('text-', 'bg-').replace('text-main', 'bg-text-muted')} bg-opacity-10 mb-4`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      
      <div className="space-y-1">
        <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest">{label}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-4xl font-black tracking-tighter ${color}`}>
            {value}
          </span>
          <span className="text-lg font-bold text-text-muted">{unit}</span>
        </div>
      </div>
      
      <div className={`mt-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isOptimal ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
        {isOptimal ? 'Good' : 'Check'}
      </div>
    </motion.div>
  );
};
