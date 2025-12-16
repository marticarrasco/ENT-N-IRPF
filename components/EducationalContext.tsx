import React from 'react';

export const EducationalContext: React.FC = () => {
  return (
    <div className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Conceptes Clau per Entendre l'IRPF</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-3">Progressivitat</h3>
          <p className="text-slate-600 leading-relaxed">
            L'IRPF és un impost progressiu. Això vol dir que <strong>no pagues el mateix percentatge per tots els teus diners</strong>. Els primers euros que guanyes paguen pocs impostos (o cap), i a mesura que guanyes més, només la part "nova" o "extra" paga un percentatge més alt.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-3">El Mite del "Salt de Tram"</h3>
          <p className="text-slate-600 leading-relaxed">
            Molta gent pensa: <em>"Si guanyo 1€ més i salto de tram, cobraré menys en net"</em>. <strong>Això és fals.</strong> Quan saltes de tram, el tipus més alt només s'aplica a aquell euro extra, no a tot el teu sou anterior. Guanyar més brut sempre significa guanyar més net.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-l-4 border-orange-500 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Tipus Marginal vs. Tipus Efectiu</h3>
            <ul className="space-y-2 text-slate-600">
                <li>
                    <strong>Tipus Marginal:</strong> És el percentatge que s'aplica a l'últim euro que has guanyat (el tram més alt on has arribat).
                </li>
                <li>
                    <strong>Tipus Efectiu:</strong> És la mitjana real. Es calcula dividint el total d'impostos entre el total d'ingressos. Aquest és el percentatge que realment "et treuen" del sou.
                </li>
            </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Part Estatal i Autonòmica</h3>
            <p className="text-slate-600 leading-relaxed">
                A Catalunya, l'IRPF es divideix en dues parts: una que va a l'Estat (Espanya) i una altra a la Generalitat (tram autonòmic). La suma de les dues forma el percentatge total que veus a la simulació.
            </p>
        </div>
      </div>
    </div>
  );
};