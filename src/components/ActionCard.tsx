import React from 'react';
import { Settings, Droplets, CloudRain, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { TranslationStrings } from '../types';

interface ActionCardProps {
  moisture: number;
  pop: number;
  t: TranslationStrings;
}

export const ActionCard: React.FC<ActionCardProps> = ({ moisture, pop, t }) => {
  let status: 'optimal' | 'dry' | 'rain' = 'optimal';
  
  if (moisture < 35 && pop < 60) {
    status = 'dry';
  } else if (pop >= 60) {
    status = 'rain';
  } else if (moisture >= 40) {
    status = 'optimal';
  }

  const configs = {
    optimal: {
      bg: 'bg-emerald-50/10 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-600',
      title: 'SMART RECOMMENDATION',
      desc: t.optimal,
      primaryColor: 'text-emerald-800 dark:text-emerald-100'
    },
    dry: {
      bg: 'bg-primary-soft',
      border: 'border-primary',
      icon: Droplets,
      iconBg: 'bg-primary',
      title: 'SMART RECOMMENDATION',
      desc: 'Start Irrigation Cycle — Soil moisture is at ' + moisture + '%. No rain forecasted for the next 24 hours.',
      primaryColor: 'text-blue-900 dark:text-blue-100'
    },
    rain: {
      bg: 'bg-blue-50/10 dark:bg-blue-500/10',
      border: 'border-blue-200 dark:border-blue-500/30',
      icon: CloudRain,
      iconBg: 'bg-blue-600',
      title: 'SMART RECOMMENDATION',
      desc: 'Skip Irrigation (Rain Expected) — ' + pop + '% chance of precipitation today.',
      primaryColor: 'text-blue-900 dark:text-blue-100'
    }
  };

  const current = configs[status];
  const Icon = current.icon;

  return (
    <motion.div
      layout
      className={`${current.bg} backdrop-blur-xl border ${current.border} p-6 rounded-2xl flex items-center gap-6 shadow-sm`}
    >
      <div className={`${current.iconBg} p-4 rounded-full text-white shadow-md`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-primary text-[11px] font-black uppercase tracking-[0.15em] mb-1">
          {current.title}
        </h3>
        <p className={`text-[15px] font-semibold leading-snug ${current.primaryColor}`}>
          {current.desc}
        </p>
      </div>
    </motion.div>
  );
};
