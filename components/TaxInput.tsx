import React from 'react';
import { MAX_DEFAULT_INCOME, STEP_INCOME } from '../constants';

interface TaxInputProps {
  income: number;
  onIncomeChange: (value: number) => void;
  disabled: boolean;
}

export const TaxInput: React.FC<TaxInputProps> = ({ income, onIncomeChange, disabled }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onIncomeChange(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    // Allow empty string handling implicitly by input, but strict number here
    if (!isNaN(val) && val >= 0) {
      onIncomeChange(val);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <label htmlFor="income-input" className="block text-lg font-semibold text-slate-800 mb-2">
        Ingressos Bruts Anuals (€)
      </label>
      <p className="text-slate-500 text-sm mb-4">
        Introdueix el teu salari brut abans d'impostos per començar el càlcul.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-1/3">
          <input
            id="income-input"
            type="number"
            min="0"
            step={STEP_INCOME}
            value={income === 0 ? '' : income}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder="Ex: 30000"
            className="w-full pl-4 pr-4 py-3 text-2xl font-bold text-slate-800 bg-slate-50 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">€</span>
        </div>

        <div className="w-full md:w-2/3">
          <input
            type="range"
            min="0"
            max={MAX_DEFAULT_INCOME}
            step={STEP_INCOME}
            value={income > MAX_DEFAULT_INCOME ? MAX_DEFAULT_INCOME : income}
            onChange={handleSliderChange}
            disabled={disabled}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0 €</span>
            <span>{MAX_DEFAULT_INCOME.toLocaleString('ca-ES')} € +</span>
          </div>
        </div>
      </div>
    </div>
  );
};