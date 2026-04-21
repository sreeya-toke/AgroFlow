import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ComposedChart, 
  Area,
  Line,
  Legend
} from 'recharts';
import { HISTORICAL_DATA } from '../constants';
import { TranslationStrings } from '../types';

interface AnalyticsChartProps {
  t: TranslationStrings;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ t }) => {
  return (
    <div className="bg-card backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-edge">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-text-main font-bold text-lg tracking-tight">{t.annualTrend}</h3>
          <p className="text-text-muted text-xs font-medium uppercase tracking-widest mt-1">{t.last12Months}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">{t.soilMoisture}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">{t.waterUsage}</span>
          </div>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={HISTORICAL_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} 
              dy={15}
            />
            {/* Left Y Axis for Moisture */}
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#2563eb', fontSize: 10, fontWeight: 800 }} 
              unit="%"
            />
            {/* Right Y Axis for Water Usage */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#f97316', fontSize: 10, fontWeight: 800 }} 
              unit="L"
            />
            <Tooltip 
              contentStyle={{ 
                border: 'none', 
                borderRadius: '16px', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
                fontWeight: '800'
              }}
              cursor={{ stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '4 4' }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="avgMoisture" 
              stroke="#2563eb" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorMoisture)" 
              name={t.soilMoisture}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="waterUsage"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
              name={t.waterUsage}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
