import { TaxBracket } from './types';

// Brackets based on the PRD for Catalonia (General Tax Base)
// Rates are percentages (e.g., 20.0 means 20%)
export const TAX_BRACKETS: TaxBracket[] = [
  {
    id: 1,
    min: 0,
    max: 12450,
    stateRate: 9.5,
    autonomicRate: 10.5,
    totalRate: 20.0,
  },
  {
    id: 2,
    min: 12450,
    max: 20200,
    stateRate: 12.0,
    autonomicRate: 14.0,
    totalRate: 26.0,
  },
  {
    id: 3,
    min: 20200,
    max: 33000,
    stateRate: 15.0,
    autonomicRate: 15.0,
    totalRate: 30.0,
  },
  {
    id: 4,
    min: 33000,
    max: 53000,
    stateRate: 18.5,
    autonomicRate: 18.8,
    totalRate: 37.3,
  },
  {
    id: 5,
    min: 53000,
    max: 90000,
    stateRate: 22.5,
    autonomicRate: 21.5,
    totalRate: 44.0,
  },
  {
    id: 6,
    min: 90000,
    max: 120000,
    stateRate: 22.5,
    autonomicRate: 23.5,
    totalRate: 46.0,
  },
  {
    id: 7,
    min: 120000,
    max: 300000,
    stateRate: 22.5,
    autonomicRate: 25.5,
    totalRate: 48.0,
  },
  {
    id: 8,
    min: 300000,
    max: null, // Infinity
    stateRate: 24.5,
    autonomicRate: 25.5,
    totalRate: 50.0,
  },
];

export const MAX_DEFAULT_INCOME = 150000;
export const STEP_INCOME = 500;