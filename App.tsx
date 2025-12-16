import React, { useState, useEffect, useRef } from 'react';
import { TaxInput } from './components/TaxInput';
import { BracketVisualizer } from './components/BracketVisualizer';
import { SummaryMetrics } from './components/SummaryMetrics';
import { EducationalContext } from './components/EducationalContext';
import { TaxComparisonSection } from './components/TaxComparisonSection';
import { calculateTax } from './services/taxService';
import { CalculationResult } from './types';

const INITIAL_INCOME = 30000;

function App() {
  const [income, setIncome] = useState<number>(INITIAL_INCOME);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  
  // Animation State
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleBracketIndex, setVisibleBracketIndex] = useState(-1);
  const [showSummary, setShowSummary] = useState(false);

  // Determine if we should show the "Start" overlay
  const [hasStarted, setHasStarted] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const startCalculation = () => {
    setHasStarted(true);
    setIsAnimating(true);
    setVisibleBracketIndex(-1); // Reset
    setShowSummary(false); // Reset summary
    
    const result = calculateTax(income);
    setCalculationResult(result);

    // Start animation loop
    let step = 0;
    const interval = setInterval(() => {
      setVisibleBracketIndex(step);
      step++;
      
      // Stop when we reach the end of brackets or the last relevant bracket
      // Logic: Stop if the current bracket has 0 taxable amount AND we've shown at least one empty one (for context)
      // Actually, let's just animate all brackets that have money, plus one empty one if available.
      
      const relevantBracketsCount = result.bracketBreakdown.filter(b => b.taxableAmount > 0).length;
      // Show up to the last filled one, plus maybe one more to show where they stopped
      const maxStepsToShow = Math.min(result.bracketBreakdown.length, relevantBracketsCount + 1);

      if (step >= maxStepsToShow) {
        clearInterval(interval);
        setTimeout(() => {
            setIsAnimating(false);
            setShowSummary(true);
            // Smooth scroll to summary on mobile if needed
        }, 600);
      }
    }, 800); // 800ms per bracket for educational pacing
  };

  const handleIncomeChange = (newIncome: number) => {
    setIncome(newIncome);
    // If the user changes income after already calculating, we reset the view state partially
    // but maybe not trigger a full animation automatically to avoid annoyance?
    // Let's prompt them to "Recalculate".
    if (hasStarted && !isAnimating) {
        setShowSummary(false); // Hide summary until recalculated
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold">
                IRPF
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              Entén els teus Impostos
              <span className="hidden md:inline font-normal text-slate-500 ml-2">| Catalunya</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Introduction */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Com funciona l'impost sobre la renda?
          </h2>
          <p className="text-lg text-slate-600">
            Introdueix el teu salari anual brut i descobreix pas a pas com es calculen els teus impostos segons els trams de Catalunya.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
            <TaxInput 
                income={income} 
                onIncomeChange={handleIncomeChange} 
                disabled={isAnimating}
            />
            
            <div className="mt-6 flex justify-center">
                <button
                    onClick={startCalculation}
                    disabled={isAnimating || income <= 0}
                    className={`
                        px-8 py-4 rounded-full text-lg font-bold shadow-lg transform transition-all duration-200
                        ${isAnimating 
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 hover:shadow-xl active:scale-95'}
                    `}
                >
                    {isAnimating ? 'Calculant...' : hasStarted ? 'Recalcular' : 'Calcular i Entendre'}
                </button>
            </div>
        </div>

        {/* Dynamic Calculation Area */}
        <div ref={resultsRef} className="scroll-mt-24">
            {calculationResult && hasStarted && (
                <div className="flex flex-col gap-8">
                    
                    {/* Bracket Waterfall Animation */}
                    <div>
                        <div className="flex justify-between items-end mb-4 px-2">
                            <h3 className="text-xl font-bold text-slate-800">Càlcul per Trams</h3>
                            {isAnimating && (
                                <span className="text-sm text-indigo-600 animate-pulse font-medium">
                                    Omplint les guardioles...
                                </span>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            {calculationResult.bracketBreakdown.map((bracketRes, index) => {
                                // Only render if we should have reached this bracket in the animation
                                if (index > visibleBracketIndex && visibleBracketIndex !== -1) return null;
                                // Or if not animating, show all (fallback, though we control logic via state)
                                
                                const isActive = index === visibleBracketIndex;
                                const isPast = index < visibleBracketIndex;

                                // Optimization: Only mount/show up to the current index during animation
                                if (visibleBracketIndex === -1) return null; // Shouldn't happen if logic is correct

                                return (
                                    <div key={bracketRes.bracket.id} className="animate-fade-in">
                                        <BracketVisualizer 
                                            bracketResult={bracketRes} 
                                            isActive={isActive}
                                            isPast={isPast}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Final Results */}
                    {showSummary && (
                        <div className="animate-fade-in-up">
                             <div className="border-t border-slate-200 pt-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">Resum Final</h3>
                                <SummaryMetrics result={calculationResult} />
                            </div>
                            
                            {/* New Interactive Map Section */}
                            <TaxComparisonSection 
                                grossIncome={income} 
                                cataloniaTax={calculationResult.totalTax} 
                            />

                            <EducationalContext />
                        </div>
                    )}
                </div>
            )}
        </div>

      </main>

      <footer className="bg-white border-t border-slate-200 mt-20 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p className="mb-2">
                <strong>Nota:</strong> Càlculs basats en la Base General de l'IRPF a Catalunya (2024/2025 aprox).
            </p>
            <p>
                Aquesta eina és merament informativa i educativa. No constitueix assessorament fiscal professional.
                Les quotes de la Seguretat Social i les deduccions personals/familiars no s'han inclòs per simplificar l'explicació.
            </p>
        </div>
      </footer>
    </div>
  );
}

export default App;