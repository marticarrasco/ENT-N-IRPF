import React from 'react';
import { CalculationResult } from '../types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SummaryMetricsProps {
  result: CalculationResult;
}

export const SummaryMetrics: React.FC<SummaryMetricsProps> = ({ result }) => {
  const data = [
    { name: 'Impostos (IRPF)', value: result.totalTax, color: '#ef4444' }, // Red-500
    { name: 'Net Disponible', value: result.netIncome, color: '#22c55e' }, // Green-500
  ];

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-1">Total a Pagar (IRPF)</h3>
          <p className="text-3xl font-bold text-red-500">
            {result.totalTax.toLocaleString('ca-ES', { maximumFractionDigits: 0 })} €
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Suma de les quotes de tots els trams.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500">Sou Net Anual (Aprox)</h3>
            <p className="text-3xl font-bold text-green-600">
                {result.netIncome.toLocaleString('ca-ES', { maximumFractionDigits: 0 })} €
            </p>
             <p className="text-xs text-slate-400 mt-2">
                Ingressos bruts menys l'IRPF calculat.
             </p>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-1">Tipus Efectiu (Real)</h3>
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-800">
                    {result.effectiveRate.toFixed(2)}%
                </p>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-tight">
                El percentatge real que pagues sobre el total dels teus ingressos.
            </p>
        </div>

        <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
            <h3 className="text-sm font-medium text-indigo-700 mb-1">Tipus Marginal (Màxim)</h3>
             <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-indigo-800">
                    {result.marginalRate.toFixed(1)}%
                </p>
             </div>
             <p className="text-xs text-indigo-600 mt-2 leading-tight">
                El percentatge que pagaries per cada euro extra que guanyessis ara mateix.
            </p>
        </div>
      </div>

      {/* Pie Chart Visualization */}
      <div className="bg-white p-6 rounded-xl shadow border border-slate-200 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-slate-700 mb-4 w-full text-left">Distribució dels Ingressos</h3>
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number) => `${value.toLocaleString('ca-ES')} €`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-slate-500 mt-2">
            De cada 100€ que guanyes, et quedes amb <strong>{(100 - result.effectiveRate).toFixed(1)}€</strong>.
        </p>
      </div>
    </div>
  );
};