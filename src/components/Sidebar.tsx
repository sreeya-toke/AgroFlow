import React from 'react';
import { 
  LayoutDashboard as Monitor, 
  MessageSquare,
  Video, 
  Mic, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationStrings } from '../types';

export type TabType = 'monitor' | 'chat' | 'video' | 'voice' | 'settings';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  t: TranslationStrings;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed,
  isDarkMode,
  toggleDarkMode,
  t,
}) => {
  const menuItems = [
    { id: 'monitor', label: t.monitorTab, icon: Monitor },
    { id: 'chat', label: t.chatTab, icon: MessageSquare },
    { id: 'video', label: t.videoTab, icon: Video },
    { id: 'voice', label: t.voiceTab, icon: Mic },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-sidebar/80 backdrop-blur-xl text-white flex flex-col sticky top-0 z-40 transition-all duration-300 ease-in-out border-r border-white/10"
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 mb-8 mt-4 overflow-hidden">
        <div className="min-w-[40px] h-[40px] bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="font-black text-white text-xl">A</span>
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-4"
          >
            <h1 className="text-xl font-black tracking-tight leading-none text-white">AgroFlow</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary mt-1 opacity-80">Smart Ecosystem</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={`w-full flex items-center p-3 rounded-2xl transition-all duration-200 group relative ${
              activeTab === item.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/10' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className={`min-w-[24px] w-6 h-6 ${activeTab === item.id ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-4 font-bold text-sm tracking-tight"
              >
                {item.label}
              </motion.span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-16 bg-sidebar border border-white/10 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl pointer-events-none text-xs font-bold">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex gap-2">
          <button
            onClick={toggleDarkMode}
            className="flex-1 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-colors text-white/60"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-300" />}
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex-1 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-colors text-white/60"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
