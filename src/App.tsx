import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  RefreshCw, 
  CloudSun,
  LayoutDashboard,
  Settings,
  History,
  HardDrive,
  Users,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { SensorCard } from './components/SensorCard';
import { ActionCard } from './components/ActionCard';
import { AnalyticsChart } from './components/AnalyticsChart';
import { CropHealthMonitor } from './components/CropHealthMonitor';
import { HistoricalFarmData } from './components/HistoricalFarmData';
import { FieldControls } from './components/FieldControls';
import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { WeatherSummary24h } from './components/WeatherSummary24h';
import { WeatherForecast } from './components/WeatherForecast';
import { Sidebar, TabType } from './components/Sidebar';
import { AgroChat } from './components/AgroChat';
import { TRANSLATIONS } from './constants';
import { Language, SensorData, WeatherData } from './types';
import { motion } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('monitor');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [sensors, setSensors] = useState<SensorData>({
    soilMoisture: 32,
    temperature: 28.4,
    humidity: 64,
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [weather, setWeather] = useState<WeatherData>({
    condition: 'Sunny',
    pop: 12,
    temp: 29,
    forecast: Array.from({ length: 3 }).map((_, i) => ({
      date: new Date(Date.now() + i * 86400000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      avgTemp: 28 - i,
      maxTemp: 32 - i,
      minTemp: 22 - i,
      avgPop: 10 + i * 20,
      hourly: Array.from({ length: 24 }).map((_, h) => ({
        time: `${h}:00`,
        temp: 24 + Math.sin((h - 6) * Math.PI / 12) * 8,
        pop: Math.max(0, Math.min(100, (i * 20) + (h > 12 ? 15 : 0))),
        windSpeed: 5 + Math.random() * 10,
        condition: h > 18 || h < 6 ? 'Clear' : 'Sunny'
      }))
    }))
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const t = TRANSLATIONS[lang];

  // IoT Simulation Hook
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setSensors(prev => ({
        soilMoisture: Math.max(0, Math.min(100, prev.soilMoisture + (Math.random() * 2 - 1.2))),
        temperature: Math.max(10, Math.min(45, prev.temperature + (Math.random() * 0.5 - 0.2))),
        humidity: Math.max(20, Math.min(95, prev.humidity + (Math.random() * 2 - 1))),
        lastUpdated: new Date().toLocaleTimeString()
      }));
      setTimeout(() => setIsRefreshing(false), 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Theme side effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen bg-bg transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        t={t}
      />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header 
            title={activeTab === 'monitor' ? t.title : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
            currentLang={lang} 
            onLangChange={setLang} 
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          <SettingsModal 
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            t={t}
          />

          {activeTab === 'monitor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:grid lg:grid-cols-12 lg:gap-8 space-y-8 lg:space-y-0"
            >
              {/* Left Column: Real-time Monitoring & Operations */}
              <div className="lg:col-span-7 space-y-8">
                <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-edge group">
                  <img 
                    src="https://picsum.photos/seed/ai-farm/1200/600" 
                    alt="Farm Hero" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-6 right-8 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{t.aiVisionActive}</p>
                  </div>
                  <div className="absolute bottom-6 left-8 flex items-end gap-2">
                    <div className="text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">{t.liveFeed}</p>
                      <h2 className="text-3xl font-black tracking-tight">{t.status}</h2>
                    </div>
                    <div className="mb-1.5 font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest">{t.aiEnhanced}</span>
                    </div>
                  </div>
                </div>

                {sensors.soilMoisture < 35 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-600 text-white p-5 rounded-[2rem] flex items-center gap-4 shadow-xl border-4 border-white/20"
                  >
                    <AlertTriangle className="w-8 h-8 shrink-0" />
                    <div>
                      <p className="font-black uppercase tracking-tight text-lg">{t.criticalDry}</p>
                      <p className="text-white/80 text-xs font-bold uppercase tracking-widest italic">{t.criticalAction}</p>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SensorCard 
                    label={t.soilMoisture}
                    value={sensors.soilMoisture.toFixed(0)}
                    unit="%"
                    icon={Droplets}
                    color="text-emerald-500"
                  />
                  <SensorCard 
                    label={t.temperature}
                    value={sensors.temperature.toFixed(1)}
                    unit="°C"
                    icon={Thermometer}
                    color="text-text-main"
                  />
                  <SensorCard 
                    label={t.humidity}
                    value={sensors.humidity.toFixed(0)}
                    unit="%"
                    icon={Wind}
                    color="text-success"
                  />
                </div>

                <ActionCard 
                  moisture={Math.round(sensors.soilMoisture)} 
                  pop={Math.round(weather.pop)}
                  t={t}
                />

                <div className="space-y-4">
                  <div className="flex justify-between items-center ml-4">
                    <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">{t.fieldControls}</h3>
                    <div className="h-px bg-edge flex-1 ml-4" />
                  </div>
                  <FieldControls t={t} />
                </div>

                <CropHealthMonitor t={t} />
              </div>

              {/* Right Column: Environment & Deep Insights */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-card backdrop-blur-xl p-8 rounded-[3rem] border border-edge shadow-xl flex justify-between items-center transition-all hover:shadow-2xl group overflow-hidden relative">
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="p-4 bg-amber-500/10 rounded-3xl text-amber-500 group-hover:scale-110 transition-transform">
                      <CloudSun className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-text-main tracking-tight uppercase italic">{weather.condition}</h4>
                      <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">{t.rainExpected}: {Math.round(weather.pop)}%</p>
                    </div>
                  </div>
                  <div className="text-right relative z-10">
                    <div className="text-5xl font-black text-text-main tracking-tighter">{weather.temp}°</div>
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
                </div>

                <WeatherForecast forecast={weather.forecast} t={t} />
                
                <WeatherSummary24h t={t} />

                {/* Deep Insights Collapsible Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center ml-4">
                    <h3 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">{t.dataInsights}</h3>
                    <div className="h-px bg-edge flex-1 ml-4" />
                  </div>
                  <div className="space-y-6 bg-white/5 dark:bg-black/5 p-4 rounded-[3rem] border border-edge/30">
                    <HistoricalFarmData t={t} />
                    <AnalyticsChart t={t} />
                  </div>
                </div>

                {/* Action Bar / Sync Info - Inside Right Column for desktop */}
                <div className="flex justify-between items-center p-6 bg-card backdrop-blur-md border border-edge rounded-[2.5rem] shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-400'}`} />
                      <span className="text-[11px] font-black text-text-main uppercase tracking-widest">
                        {t.systemLive}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-40">
                      <HardDrive className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">{t.encryptedNode}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-primary' : 'text-text-muted/30'}`} />
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      {sensors.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AgroChat t={t} />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <div className="py-12 text-center">
               <p className="text-text-muted font-bold text-sm">Theme and language settings are local to this session.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
