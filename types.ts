export interface TaxBracket {
  id: number;
  min: number;
  max: number | null; // null represents infinity
  stateRate: number;
  autonomicRate: number;
  totalRate: number;
}

export interface BracketResult {
  bracket: TaxBracket;
  taxableAmount: number; // The amount of money in this specific bracket
  taxAmount: number; // The tax to pay for this specific bracket
  isFull: boolean; // Whether the income fills this bracket completely
}

export interface CalculationResult {
  grossIncome: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  marginalRate: number;
  bracketBreakdown: BracketResult[];
}