import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { COUNTRY_DATA, getTaxColorScale, CountryTaxProfile } from '../data/countryData';

// Higher resolution map (50m) to ensure smaller countries like Andorra/Estonia/UAE are clickable
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface TaxComparisonSectionProps {
  grossIncome: number;
  cataloniaTax: number;
}

export const TaxComparisonSection: React.FC<TaxComparisonSectionProps> = ({ grossIncome, cataloniaTax }) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

  const cataloniaEffectiveRate = (cataloniaTax / grossIncome) * 100;

  // Memoize country map for performance using NUMERIC IDs for matching
  const countryMap = useMemo(() => {
    return COUNTRY_DATA.reduce((acc, country) => {
      // Clean numeric id: parseInt to match potential integer or string mismatch in geojson
      const cleanId = parseInt(country.numericId, 10).toString();
      acc[cleanId] = country;
      return acc;
    }, {} as Record<string, CountryTaxProfile>);
  }, []);

  // For the selected logic, we also need to look up by ID
  const selectedCountry = useMemo(() => {
    if(!selectedCountryId) return null;
    return countryMap[parseInt(selectedCountryId, 10).toString()];
  }, [selectedCountryId, countryMap]);

  // Calculate comparison if a country is selected
  const comparisonData = useMemo(() => {
    if (!selectedCountry) return null;
    const foreignTax = selectedCountry.calculateTax(grossIncome);
    const diff = cataloniaTax - foreignTax;
    const isCheaperHere = diff < 0; 
    const isCheaperThere = diff > 0;

    return {
      foreignTax,
      foreignEffectiveRate: (foreignTax / grossIncome) * 100,
      diff,
      isCheaperHere,
      isCheaperThere
    };
  }, [selectedCountry, grossIncome, cataloniaTax]);

  return (
    <div className="mt-16 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">🌍 Què passaria si visqués a...?</h2>
        <p className="text-slate-600 mt-2">
            Fes clic als països acolorits per comparar els teus impostos actuals amb altres llocs del món.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* MAPA */}
        <div className="w-full lg:w-2/3 h-[400px] bg-slate-50 rounded-lg border border-slate-100 relative overflow-hidden">
          <ComposableMap projectionConfig={{ scale: 147 }} className="w-full h-full">
            <ZoomableGroup center={[0, 20]} minZoom={1} maxZoom={4}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    // Match based on numeric ID from World Atlas
                    const geoId = geo.id ? geo.id.toString() : "";
                    const cleanGeoId = parseInt(geoId, 10).toString();
                    
                    const profile = countryMap[cleanGeoId];
                    const isInteractable = !!profile;
                    const isSelected = selectedCountryId === geoId;
                    
                    let fillColor = "#E2E8F0"; // Default slate-200
                    let hoverColor = "#CBD5E1"; // Slate-300
                    let strokeColor = "#fff";
                    
                    if (isInteractable) {
                        const tax = profile.calculateTax(grossIncome);
                        const rate = (tax / grossIncome) * 100;
                        fillColor = getTaxColorScale(rate);
                        hoverColor = "#4f46e5"; // Indigo for selection hover
                        
                        if (isSelected) {
                            strokeColor = "#1e293b"; // Dark slate border for selected
                        }
                    } else if (cleanGeoId === "724") { // Spain (Catalonia context)
                        fillColor = "#94a3b8"; // Darker grey for Spain base
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                            if (isInteractable) setSelectedCountryId(geoId);
                        }}
                        style={{
                          default: {
                            fill: fillColor,
                            outline: "none",
                            stroke: strokeColor,
                            strokeWidth: isSelected ? 2 : 0.5,
                            transition: "all 250ms"
                          },
                          hover: {
                            fill: hoverColor,
                            outline: "none",
                            cursor: isInteractable ? "pointer" : "default",
                            stroke: isInteractable ? "#fff" : strokeColor
                          },
                          pressed: {
                            fill: "#312e81",
                            outline: "none"
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
          <div className="absolute bottom-2 left-2 text-[10px] text-slate-400">
             Scroll per fer zoom • Drag per moure
          </div>
        </div>

        {/* PANELL LATERAL */}
        <div className="w-full lg:w-1/3 flex flex-col">
          {selectedCountry && comparisonData ? (
            <div className="h-full flex flex-col justify-between animate-fade-in">
                <div>
                    <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                        <span className="text-4xl">{selectedCountry.flag}</span>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">{selectedCountry.name}</h3>
                            <div className="flex gap-2 text-xs font-mono mt-1">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                    {grossIncome.toLocaleString()}€
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 italic mb-6">
                        "{selectedCountry.description}"
                    </p>

                    <div className="space-y-4">
                        {/* Comparison Bars */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-500">Catalunya</span>
                                <span className="font-bold">{cataloniaEffectiveRate.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-400" style={{ width: `${Math.min(100, cataloniaEffectiveRate)}%`}}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-800 font-medium">{selectedCountry.name}</span>
                                <span className="font-bold" style={{ color: getTaxColorScale(comparisonData.foreignEffectiveRate) }}>
                                    {comparisonData.foreignEffectiveRate.toFixed(1)}%
                                </span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full transition-all duration-500" 
                                    style={{ 
                                        width: `${Math.min(100, comparisonData.foreignEffectiveRate)}%`,
                                        backgroundColor: getTaxColorScale(comparisonData.foreignEffectiveRate)
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mt-6 p-4 rounded-lg border ${comparisonData.isCheaperThere ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                    <div className="text-center">
                        <p className="text-sm text-slate-500 uppercase tracking-wide font-bold mb-1">Diferència Anual</p>
                        <p className={`text-3xl font-bold ${comparisonData.isCheaperThere ? 'text-red-600' : 'text-green-600'}`}>
                            {comparisonData.isCheaperThere ? '+' : ''}
                            {Math.round(comparisonData.diff * -1).toLocaleString()} €
                        </p>
                        <p className="text-sm text-slate-600 mt-2">
                            {comparisonData.isCheaperThere 
                                ? `A ${selectedCountry.name} pagaries MENYS impostos i tindries més net.`
                                : `A ${selectedCountry.name} pagaries MÉS impostos que a Catalunya.`
                            }
                        </p>
                    </div>
                </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                <svg className="w-12 h-12 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Selecciona un país al mapa per veure la comparativa fiscal.</p>
            </div>
          )}
        </div>

      </div>
      <p className="text-center text-[10px] text-slate-400 mt-2">
          * Estimacions simplificades basades en ingressos bruts sense deduccions específiques de cada país.
      </p>
    </div>
  );
};