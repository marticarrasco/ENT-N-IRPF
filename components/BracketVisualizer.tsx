import React from 'react';
import { BracketResult } from '../types';

interface BracketVisualizerProps {
  bracketResult: BracketResult;
  isActive: boolean;
  isPast: boolean; // If we have already animated past this bracket
}

export const BracketVisualizer: React.FC<BracketVisualizerProps> = ({ bracketResult, isActive, isPast }) => {
  const { bracket, taxableAmount, taxAmount, isFull } = bracketResult;
  
  // Calculate percentage filled relative to the bracket's capacity
  const bracketCapacity = bracket.max ? bracket.max - bracket.min : taxableAmount * 1.5; // Visual trick for infinity
  const percentageFilled = Math.min(100, (taxableAmount / bracketCapacity) * 100);
  
  // Determine border and background styles based on state
  const containerClass = isActive 
    ? "border-indigo-500 ring-2 ring-indigo-200 bg-white scale-[1.02] shadow-lg z-10" 
    : isPast 
      ? "border-slate-300 bg-slate-50 opacity-90" 
      : "border-slate-200 bg-slate-50 opacity-50 grayscale";

  return (
    <div className={`relative flex flex-col md:flex-row border rounded-lg p-3 md:p-4 mb-3 transition-all duration-500 ease-in-out ${containerClass}`}>
      
      {/* Left Info: Range & Rate */}
      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-center mb-2 md:mb-0 pr-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Tram {bracket.id}
        </div>
        <div className="text-sm text-slate-700">
            {bracket.min.toLocaleString('ca-ES')} € - {bracket.max ? `${bracket.max.toLocaleString('ca-ES')} €` : '∞'}
        </div>
        <div className={`text-lg font-bold ${isActive || isPast ? 'text-indigo-600' : 'text-slate-400'}`}>
            {bracket.totalRate.toFixed(1)}%
        </div>
      </div>

      {/* Middle: Progress Bar / Visualizer */}
      <div className="flex-1 flex flex-col justify-center mr-4">
        <div className="relative h-8 md:h-10 w-full bg-slate-200 rounded-md overflow-hidden border border-slate-300">
            {/* The Fill Animation */}
            <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700 ease-out"
                style={{ width: `${percentageFilled}%` }}
            >
                {/* Stripe pattern for texture */}
                <div className="w-full h-full opacity-20 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzj//v37zwjjgzj/d+/eIQIzAds0EOvf6cqnAAAAAElFTkSuQmCC')]"></div>
            </div>
            
            {/* Overlay Text inside bar */}
            {taxableAmount > 0 && (
                <div className="absolute inset-0 flex items-center justify-end pr-3">
                    <span className="text-xs md:text-sm font-bold text-white drop-shadow-md">
                        {taxableAmount.toLocaleString('ca-ES')} €
                    </span>
                </div>
            )}
        </div>
        <div className="mt-1 flex justify-between text-xs text-slate-500">
             <span>Base imposable en aquest tram</span>
             {isFull && <span className="text-indigo-600 font-medium">Tram complet</span>}
        </div>
      </div>

      {/* Right: Tax Calculation */}
      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 pl-0 md:pl-4 mt-2 md:mt-0">
          <div className="text-xs text-slate-500">Impost generat</div>
          <div className={`text-xl font-mono font-bold ${isActive ? 'text-indigo-600 scale-110' : 'text-slate-800'} transition-transform duration-300`}>
              {taxAmount.toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
      </div>
    </div>
  );
};