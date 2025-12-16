import { TAX_BRACKETS } from '../constants';
import { BracketResult, CalculationResult } from '../types';

export const calculateTax = (income: number): CalculationResult => {
  let remainingIncome = income;
  let totalTax = 0;
  let marginalRate = 0;
  const bracketBreakdown: BracketResult[] = [];

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) {
      // Create empty bracket entries for visualization consistency
      bracketBreakdown.push({
        bracket,
        taxableAmount: 0,
        taxAmount: 0,
        isFull: false
      });
      continue;
    }

    // Calculate how much income fits in this bracket
    // If bracket.max is null, it's infinity, so it takes all remaining
    const bracketSize = bracket.max ? bracket.max - bracket.min : Infinity;
    
    // The amount of money in this specific bucket
    const incomeInBracket = Math.min(remainingIncome, bracketSize);
    
    const taxInBracket = incomeInBracket * (bracket.totalRate / 100);
    
    totalTax += taxInBracket;
    remainingIncome -= incomeInBracket;
    
    // Update marginal rate to the rate of the highest bracket with income
    if (incomeInBracket > 0) {
      marginalRate = bracket.totalRate;
    }

    bracketBreakdown.push({
      bracket,
      taxableAmount: incomeInBracket,
      taxAmount: taxInBracket,
      isFull: incomeInBracket >= bracketSize
    });
  }

  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

  return {
    grossIncome: income,
    totalTax,
    netIncome: income - totalTax,
    effectiveRate,
    marginalRate,
    bracketBreakdown,
  };
};