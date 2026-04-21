import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line,
  ComposedChart,
  Cell
} from 'recharts';
import { HISTORICAL_DATA } from '../constants';
import { TranslationStrings } from '../types';

interface HistoricalFarmDataProps {
  t: TranslationStrings;
}

export const HistoricalFarmData: React.FC<HistoricalFarmDataProps> = ({ t }) => {
  return (
    <div className="bg-card backdrop-blur-xl p-8 rounded-[2.5rem] shadow-sm border border-edge">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          <h3 className="text-text-main font-black text-xl tracking-tight leading-none">
            {t.annualTrend}
          </h3>
        </div>
        <p className="text-text-muted text-xs font-bold uppercase tracking-[0.2em] ml-4">
          {t.historicalEfficiencyReport}
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={HISTORICAL_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }} 
              dy={15}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#2563eb', fontSize: 10, fontWeight: 800 }} 
              unit="%"
            />
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
                borderRadius: '20px', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
                fontWeight: '900',
                padding: '12px 16px'
              }}
              cursor={{ fill: '#f8fafc' }}
            />
            
            {/* Water Usage as Bars - representing "Energy/Input" */}
            <Bar 
              yAxisId="right"
              dataKey="waterUsage" 
              fill="#f97316" 
              radius={[6, 6, 0, 0]} 
              barSize={20}
              name={t.waterUsage}
            >
              {HISTORICAL_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fillOpacity={entry.waterUsage > 500 ? 1 : 0.6} />
              ))}
            </Bar>

            {/* Moisture as a Line - representing "Outcome/State" */}
            <Line
              yAxisId="left"
              type="stepAfter"
              dataKey="avgMoisture"
              stroke="#2563eb"
              strokeWidth={5}
              dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
              name={t.moistureTrend}
              animationDuration={2000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-6 mt-8 pt-6 border-t border-edge justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-primary shadow-sm" />
          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{t.soilMoisture}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-orange-500 shadow-sm" />
          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{t.waterUsage}</span>
        </div>
      </div>
    </div>
  );
};
