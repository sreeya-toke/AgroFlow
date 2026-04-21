import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Bell, X, ShieldAlert, CloudRain } from 'lucide-react';
import { TranslationStrings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationStrings;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, t }) => {
  const [notifyLow, setNotifyLow] = useState(true);
  const [notifyRain, setNotifyRain] = useState(true);
  const [threshold, setThreshold] = useState(35);

  const handleSave = () => {
    // In a real app, this would save to a backend or localStorage
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card rounded-[2.5rem] shadow-2xl overflow-hidden border border-edge"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-text-main tracking-tight">{t.settings}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-text-muted/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-text-muted" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-text-main">{t.notifications}</h3>
                </div>

                {/* Notification Toggles */}
                 <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-text-muted/5 rounded-2xl border border-edge">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-text-main text-sm">{t.notifyLowMoisture}</span>
                    </div>
                    <button 
                      onClick={() => setNotifyLow(!notifyLow)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${notifyLow ? 'bg-primary' : 'bg-text-muted/20'}`}
                    >
                      <motion.div 
                        animate={{ x: notifyLow ? 26 : 2 }}
                        className="absolute top-1 left-0 w-4 h-4 bg-card rounded-full shadow-sm"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-text-muted/5 rounded-2xl border border-edge">
                    <div className="flex items-center gap-3">
                      <CloudRain className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-text-main text-sm">{t.notifyRain}</span>
                    </div>
                    <button 
                      onClick={() => setNotifyRain(!notifyRain)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${notifyRain ? 'bg-primary' : 'bg-text-muted/20'}`}
                    >
                      <motion.div 
                        animate={{ x: notifyRain ? 26 : 2 }}
                        className="absolute top-1 left-0 w-4 h-4 bg-card rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                </div>

                {/* Threshold Slider */}
                <div className="p-6 bg-text-muted/5 rounded-3xl border border-edge">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-text-main text-sm">{t.thresholdLabel}</span>
                    <span className="font-black text-primary text-xl font-mono">{threshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={threshold}
                    onChange={(e) => setThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-text-muted/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    <span>10%</span>
                    <span>35% (Default)</span>
                    <span>60%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 rounded-2xl border border-edge text-text-muted font-bold text-sm hover:bg-text-muted/5 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
