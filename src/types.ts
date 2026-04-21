export type Language = 'en' | 'hi';

export interface SensorData {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  lastUpdated: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  pop: number; // Probability of Precipitation (0-100)
  windSpeed: number;
  condition: string;
}

export interface DayForecast {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  avgPop: number;
  hourly: HourlyForecast[];
}

export interface WeatherData {
  condition: string;
  pop: number;
  temp: number;
  forecast: DayForecast[];
}

export interface HistoricalEntry {
  month: string;
  avgMoisture: number;
  waterUsage: number;
}

export interface TranslationStrings {
  title: string;
  soilMoisture: string;
  temperature: string;
  humidity: string;
  lastUpdated: string;
  optimal: string;
  criticalDry: string;
  startIrrigation: string;
  skipIrrigation: string;
  rainExpected: string;
  annualTrend: string;
  waterUsage: string;
  moistureTrend: string;
  status: string;
  settings: string;
  notifications: string;
  notifyLowMoisture: string;
  notifyRain: string;
  thresholdLabel: string;
  save: string;
  cancel: string;
  weatherSummary24h: string;
  avgTemp: string;
  totalPrecipitation: string;
  fieldControls: string;
  sprinklerStatus: string;
  manualOverride: string;
  automation: string;
  nextRun: string;
  scheduler: string;
  turnOn: string;
  turnOff: string;
  // New keys for Sidebar & Chat
  monitorTab: string;
  chatTab: string;
  videoTab: string;
  voiceTab: string;
  chatExpertHero: string;
  chatOnlineStatus: string;
  chatPlaceholder: string;
  chatDrafting: string;
  chatClearTooltip: string;
  chatWelcome: string;
  chatSubtitle: string;
  chatStarters: string[];
  // Technical Dashboard keys
  aiVisionActive: string;
  liveFeed: string;
  aiEnhanced: string;
  criticalAction: string;
  dataInsights: string;
  systemLive: string;
  encryptedNode: string;
  crops: {
    corn: string;
    wheat: string;
    tomato: string;
    apple: string;
  };
  // Weather Forecast keys
  irrigationForecastTitle: string;
  rainLabel: string;
  irrigationGuidance: string;
  rainWarning: string;
  stableConditions: string;
  windUnit: string;
  midnightToCurrent: string;
  peakWind: string;
  avgHumidity: string;
  historicalEfficiencyReport: string;
  last12Months: string;
  // Irrigation Automation keys
  irrigationAutomationTitle: string;
  smartSchedulingDescription: string;
  smartSchedulingEnabled: string;
  smartSchedulingDisabled: string;
  statusWorking: string;
  statusIdle: string;
  // Crop Health keys
  cropHealthTitle: string;
  cropHealthSubtitle: string;
  nitrogenLevel: string;
  pestRisk: string;
  hydration: string;
  low: string;
  medium: string;
  high: string;
  healthy: string;
  warning: string;
}
