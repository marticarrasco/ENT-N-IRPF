export interface CountryTaxProfile {
  id: string; // ISO-3 Code
  numericId: string; // ISO Numeric Code (string, matching TopoJSON id)
  name: string;
  flag: string;
  description: string;
  // Function to calculate estimated tax based on gross income
  calculateTax: (income: number) => number;
}

export const COUNTRY_DATA: CountryTaxProfile[] = [
  {
    id: "AND",
    numericId: "020", // Andorra
    name: "Andorra",
    flag: "🇦🇩",
    description: "Un dels sistemes fiscals més baixos d'Europa. Tipus màxim del 10%.",
    calculateTax: (income) => {
      if (income <= 24000) return 0;
      if (income <= 40000) return (income - 24000) * 0.05;
      return (16000 * 0.05) + ((income - 40000) * 0.10);
    }
  },
  {
    id: "ARE",
    numericId: "784", // United Arab Emirates
    name: "Emirats Àrabs (Dubai)",
    flag: "🇦🇪",
    description: "Sense impost sobre la renda personal. L'estat es finança amb petroli i turisme.",
    calculateTax: () => 0
  },
  {
    id: "SWE",
    numericId: "752", // Sweden
    name: "Suècia",
    flag: "🇸🇪",
    description: "Estat del benestar fort amb impostos alts. Molt progressiu.",
    calculateTax: (income) => {
      const municipal = income * 0.32;
      const stateTax = income > 55000 ? (income - 55000) * 0.20 : 0;
      return municipal + stateTax;
    }
  },
  {
    id: "USA",
    numericId: "840", // United States of America
    name: "Estats Units (NY)",
    flag: "🇺🇸",
    description: "Sistema complex (Federal + Estatal). Ingressos alts, impostos mitjans-alts.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.35, Math.max(0.10, (income / 200000) * 0.35));
      return income * effectiveRate;
    }
  },
  {
    id: "EST",
    numericId: "233", // Estonia
    name: "Estònia",
    flag: "🇪🇪",
    description: "Famosa per la seva simplicitat digital. Tipus pla (Flat Tax) del 20%.",
    calculateTax: (income) => {
      const exemption = 7848;
      const taxable = Math.max(0, income - exemption);
      return taxable * 0.20;
    }
  },
  {
    id: "CHE",
    numericId: "756", // Switzerland
    name: "Suïssa (Zürich)",
    flag: "🇨🇭",
    description: "Impostos cantonals baixos comparats amb la UE, però cost de vida molt alt.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.25, Math.max(0.05, (income / 150000) * 0.20));
      return income * effectiveRate;
    }
  },
  {
    id: "GBR",
    numericId: "826", // United Kingdom
    name: "Regne Unit",
    flag: "🇬🇧",
    description: "Sistema similar a l'espanyol però amb trams diferents.",
    calculateTax: (income) => {
      const allowance = 12570;
      if (income <= allowance) return 0;
      let taxable = income - allowance;

      if (taxable <= 37700) return taxable * 0.20;

      let tax = 37700 * 0.20;
      let remaining = taxable - 37700;
      return tax + (remaining * 0.40);
    }
  },
  {
    id: "PRT",
    numericId: "620", // Portugal
    name: "Portugal",
    flag: "🇵🇹",
    description: "Tipus progressius similars a Espanya. Incentius per residents no habituals.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.48, Math.max(0.14, (income / 100000) * 0.45));
      return income * effectiveRate;
    }
  },
  {
    id: "DEU",
    numericId: "276", // Germany
    name: "Alemanya",
    flag: "🇩🇪",
    description: "Sistema progressiu complex. Càrrega fiscal similar o superior a Catalunya.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.45, Math.max(0, (income / 80000) * 0.40));
      return income * effectiveRate;
    }
  },
  {
    id: "FRA",
    numericId: "250", // France
    name: "França",
    flag: "🇫🇷",
    description: "Impostos alts, però amb sistema de 'quocient familiar' que beneficia famílies.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.45, Math.max(0, (income / 90000) * 0.38));
      return income * effectiveRate;
    }
  },
  {
    id: "ESP",
    numericId: "724", // Spain
    name: "Madrid (Espanya)",
    flag: "🇪🇸",
    description: "Comparació dins l'estat. Madrid té el tram autonòmic més baix d'Espanya.",
    calculateTax: (income) => {
      const effectiveRateCurve = Math.min(0.44, Math.max(0.18, (income / 300000) * 0.44));
      return income * effectiveRateCurve * 0.92;
    }
  },
  {
    id: "AUS",
    numericId: "036", // Australia
    name: "Austràlia",
    flag: "🇦🇺",
    description: "Impostos elevats però salaris generalment més alts.",
    calculateTax: (income) => {
      if (income < 18200) return 0;
      if (income < 45000) return (income - 18200) * 0.19;
      let tax = (45000 - 18200) * 0.19;
      return tax + (income - 45000) * 0.325;
    }
  },
  {
    id: "JPN",
    numericId: "392", // Japan
    name: "Japó",
    flag: "🇯🇵",
    description: "Impostos locals i nacionals. Molt cultural sobre la contribució social.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.50, Math.max(0.15, (income / 150000) * 0.40));
      return income * effectiveRate;
    }
  },
  {
    id: "CAN",
    numericId: "124", // Canada
    name: "Canadà (Ontario)",
    flag: "🇨🇦",
    description: "Federal + Provincial. Serveis públics robustos.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.53, Math.max(0.20, (income / 120000) * 0.35));
      return income * effectiveRate;
    }
  },
  {
    id: "ARG",
    numericId: "032", // Argentina
    name: "Argentina",
    flag: "🇦🇷",
    description: "Pressió fiscal molt alta en relació als serveis. Sistema complex.",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.35, Math.max(0.05, (income / 20000) * 0.35));
      return income * effectiveRate;
    }
  },

  // --- More selectable countries (UN M49 numeric ids) ---
  {
    id: "ITA",
    numericId: "380", // Italy
    name: "Itàlia",
    flag: "🇮🇹",
    description: "Sistema progressiu (estat + regions/municipis). Trams alts a partir d'ingressos mitjans.",
    calculateTax: (income) => {
      if (income <= 15000) return income * 0.23;
      if (income <= 28000) return (15000 * 0.23) + ((income - 15000) * 0.25);
      if (income <= 50000) return (15000 * 0.23) + (13000 * 0.25) + ((income - 28000) * 0.35);
      return (15000 * 0.23) + (13000 * 0.25) + (22000 * 0.35) + ((income - 50000) * 0.43);
    }
  },
  {
    id: "NLD",
    numericId: "528", // Netherlands
    name: "Països Baixos",
    flag: "🇳🇱",
    description: "Tram principal amb tipus moderat-alt, i un tram superior més alt.",
    calculateTax: (income) => {
      const threshold = 75518;
      if (income <= threshold) return income * 0.3697;
      return (threshold * 0.3697) + ((income - threshold) * 0.495);
    }
  },
  {
    id: "IRL",
    numericId: "372", // Ireland
    name: "Irlanda",
    flag: "🇮🇪",
    description: "Tipus bàsic i tram alt (simplificat). Sovint atractiu per salaris i mercat laboral.",
    calculateTax: (income) => {
      const allowance = 18000;
      if (income <= allowance) return 0;
      const taxable = income - allowance;
      const band = 42000;
      if (taxable <= band) return taxable * 0.20;
      return (band * 0.20) + ((taxable - band) * 0.40);
    }
  },
  {
    id: "NOR",
    numericId: "578", // Norway
    name: "Noruega",
    flag: "🇳🇴",
    description: "Impostos alts per finançar un estat del benestar extens (estimació simplificada).",
    calculateTax: (income) => {
      const base = income * 0.22;
      const surtax = income > 70000 ? (income - 70000) * 0.10 : 0;
      return base + surtax;
    }
  },
  {
    id: "DNK",
    numericId: "208", // Denmark
    name: "Dinamarca",
    flag: "🇩🇰",
    description: "Càrrega fiscal elevada amb serveis públics molt amplis (simplificat).",
    calculateTax: (income) => {
      const base = income * 0.37;
      const top = income > 65000 ? (income - 65000) * 0.15 : 0;
      return base + top;
    }
  },
  {
    id: "FIN",
    numericId: "246", // Finland
    name: "Finlàndia",
    flag: "🇫🇮",
    description: "Progressiu moderat-alt amb fort component municipal (simplificat).",
    calculateTax: (income) => {
      const municipal = income * 0.30;
      const state = income > 65000 ? (income - 65000) * 0.12 : 0;
      return municipal + state;
    }
  },
  {
    id: "BEL",
    numericId: "056", // Belgium
    name: "Bèlgica",
    flag: "🇧🇪",
    description: "Un dels sistemes amb tipus marginals alts a Europa (estimació per trams).",
    calculateTax: (income) => {
      if (income <= 15200) return income * 0.25;
      if (income <= 26830) return (15200 * 0.25) + ((income - 15200) * 0.40);
      if (income <= 46440) return (15200 * 0.25) + (11630 * 0.40) + ((income - 26830) * 0.45);
      return (15200 * 0.25) + (11630 * 0.40) + (19610 * 0.45) + ((income - 46440) * 0.50);
    }
  },
  {
    id: "AUT",
    numericId: "040", // Austria
    name: "Àustria",
    flag: "🇦🇹",
    description: "Progressiu amb exempt inicial i trams alts per ingressos elevats (simplificat).",
    calculateTax: (income) => {
      if (income <= 11000) return 0;
      if (income <= 18000) return (income - 11000) * 0.20;
      if (income <= 31000) return (7000 * 0.20) + ((income - 18000) * 0.30);
      if (income <= 60000) return (7000 * 0.20) + (13000 * 0.30) + ((income - 31000) * 0.41);
      if (income <= 90000) return (7000 * 0.20) + (13000 * 0.30) + (29000 * 0.41) + ((income - 60000) * 0.48);
      return (7000 * 0.20) + (13000 * 0.30) + (29000 * 0.41) + (30000 * 0.48) + ((income - 90000) * 0.50);
    }
  },
  {
    id: "POL",
    numericId: "616", // Poland
    name: "Polònia",
    flag: "🇵🇱",
    description: "Dos grans trams. Exempció/llindar inicial important (simplificat).",
    calculateTax: (income) => {
      const allowance = 30000;
      if (income <= allowance) return 0;
      const taxable = income - allowance;
      const threshold = 120000;
      if (taxable <= threshold) return taxable * 0.12;
      return (threshold * 0.12) + ((taxable - threshold) * 0.32);
    }
  },
  {
    id: "CZE",
    numericId: "203", // Czechia
    name: "Txèquia",
    flag: "🇨🇿",
    description: "Relativament simple comparat amb altres sistemes europeus (estimació simplificada).",
    calculateTax: (income) => {
      const allowance = 15000;
      if (income <= allowance) return 0;
      const taxable = income - allowance;
      const threshold = 80000;
      if (taxable <= threshold) return taxable * 0.15;
      return (threshold * 0.15) + ((taxable - threshold) * 0.23);
    }
  },
  {
    id: "HUN",
    numericId: "348", // Hungary
    name: "Hongria",
    flag: "🇭🇺",
    description: "Famosa per un impost de tipus pla (Flat Tax) (simplificat).",
    calculateTax: (income) => {
      const taxable = Math.max(0, income - 12000);
      return taxable * 0.15;
    }
  },
  {
    id: "GRC",
    numericId: "300", // Greece
    name: "Grècia",
    flag: "🇬🇷",
    description: "Progressiu amb trams que pugen força en ingressos mitjans-alts (simplificat).",
    calculateTax: (income) => {
      if (income <= 10000) return income * 0.09;
      if (income <= 20000) return (10000 * 0.09) + ((income - 10000) * 0.22);
      if (income <= 30000) return (10000 * 0.09) + (10000 * 0.22) + ((income - 20000) * 0.28);
      if (income <= 40000) return (10000 * 0.09) + (10000 * 0.22) + (10000 * 0.28) + ((income - 30000) * 0.36);
      return (10000 * 0.09) + (10000 * 0.22) + (10000 * 0.28) + (10000 * 0.36) + ((income - 40000) * 0.44);
    }
  },
  {
    id: "ISL",
    numericId: "352", // Iceland
    name: "Islàndia",
    flag: "🇮🇸",
    description: "Càrrega fiscal alta però mercat petit i salaris sovint elevats (simplificat).",
    calculateTax: (income) => {
      const base = income * 0.31;
      const top = income > 85000 ? (income - 85000) * 0.14 : 0;
      return base + top;
    }
  },
  {
    id: "LUX",
    numericId: "442", // Luxembourg
    name: "Luxemburg",
    flag: "🇱🇺",
    description: "Sistema progressiu amb salaris sovint alts i moltes particularitats (simplificat).",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.42, Math.max(0.08, (income / 120000) * 0.35));
      return income * effectiveRate;
    }
  },
  {
    id: "MEX",
    numericId: "484", // Mexico
    name: "Mèxic",
    flag: "🇲🇽",
    description: "Progressiu amb tipus màxim moderat-alt (estimació simplificada).",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.35, Math.max(0.08, (income / 90000) * 0.30));
      return income * effectiveRate;
    }
  },
  {
    id: "BRA",
    numericId: "076", // Brazil
    name: "Brasil",
    flag: "🇧🇷",
    description: "Sistema progressiu amb límit màxim al voltant del 27,5% (simplificat).",
    calculateTax: (income) => {
      if (income <= 20000) return 0;
      if (income <= 40000) return (income - 20000) * 0.15;
      if (income <= 70000) return (20000 * 0.15) + ((income - 40000) * 0.225);
      return (20000 * 0.15) + (30000 * 0.225) + ((income - 70000) * 0.275);
    }
  },
  {
    id: "CHL",
    numericId: "152", // Chile
    name: "Xile",
    flag: "🇨🇱",
    description: "Progressiu amb trams que poden arribar a tipus alts en rendes elevades (simplificat).",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.40, Math.max(0.04, (income / 110000) * 0.32));
      return income * effectiveRate;
    }
  },
  {
    id: "COL",
    numericId: "170", // Colombia
    name: "Colòmbia",
    flag: "🇨🇴",
    description: "Progressiu amb molta casuística segons deduccions (estimació simplificada).",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.39, Math.max(0.03, (income / 90000) * 0.30));
      return income * effectiveRate;
    }
  },
  {
    id: "ZAF",
    numericId: "710", // South Africa
    name: "Sud-àfrica",
    flag: "🇿🇦",
    description: "Progressiu amb tipus màxim elevat i llindar exempt (simplificat).",
    calculateTax: (income) => {
      const allowance = 9500;
      if (income <= allowance) return 0;
      const taxable = income - allowance;
      const effectiveRate = Math.min(0.45, Math.max(0.12, (taxable / 120000) * 0.35));
      return taxable * effectiveRate;
    }
  },
  {
    id: "IND",
    numericId: "356", // India
    name: "Índia",
    flag: "🇮🇳",
    description: "Sistema progressiu amb opcions de règim i moltes deduccions (simplificat).",
    calculateTax: (income) => {
      const allowance = 12000;
      if (income <= allowance) return 0;
      const taxable = income - allowance;
      const effectiveRate = Math.min(0.30, Math.max(0.05, (taxable / 100000) * 0.22));
      return taxable * effectiveRate;
    }
  },
  {
    id: "CHN",
    numericId: "156", // China
    name: "Xina",
    flag: "🇨🇳",
    description: "Progressiu amb molts detalls locals i bonificacions (estimació simplificada).",
    calculateTax: (income) => {
      const allowance = 10000;
      if (income <= allowance) return 0;
      const taxable = income - allowance;
      const effectiveRate = Math.min(0.45, Math.max(0.08, (taxable / 150000) * 0.35));
      return taxable * effectiveRate;
    }
  },
  {
    id: "SGP",
    numericId: "702", // Singapore
    name: "Singapur",
    flag: "🇸🇬",
    description: "Impost sobre la renda relativament baix, molt orientat a atraure talent (simplificat).",
    calculateTax: (income) => {
      if (income <= 20000) return 0;
      if (income <= 30000) return (income - 20000) * 0.02;
      if (income <= 70000) return (10000 * 0.02) + ((income - 30000) * 0.07);
      if (income <= 120000) return (10000 * 0.02) + (40000 * 0.07) + ((income - 70000) * 0.115);
      return (10000 * 0.02) + (40000 * 0.07) + (50000 * 0.115) + ((income - 120000) * 0.18);
    }
  },
  {
    id: "HKG",
    numericId: "344", // Hong Kong
    name: "Hong Kong",
    flag: "🇭🇰",
    description: "Sistema simple i relativament baix (estimació simplificada amb límit efectiu).",
    calculateTax: (income) => {
      const allowance = 15000;
      if (income <= allowance) return 0;
      const taxable = income - allowance;
      return Math.min(taxable * 0.15, income * 0.17);
    }
  },
  {
    id: "NZL",
    numericId: "554", // New Zealand
    name: "Nova Zelanda",
    flag: "🇳🇿",
    description: "Progressiu per trams, sense la complexitat d'alguns sistemes europeus (simplificat).",
    calculateTax: (income) => {
      if (income <= 14000) return income * 0.105;
      if (income <= 48000) return (14000 * 0.105) + ((income - 14000) * 0.175);
      if (income <= 70000) return (14000 * 0.105) + (34000 * 0.175) + ((income - 48000) * 0.30);
      if (income <= 180000) return (14000 * 0.105) + (34000 * 0.175) + (22000 * 0.30) + ((income - 70000) * 0.33);
      return (14000 * 0.105) + (34000 * 0.175) + (22000 * 0.30) + (110000 * 0.33) + ((income - 180000) * 0.39);
    }
  },
  {
    id: "KOR",
    numericId: "410", // South Korea
    name: "Corea del Sud",
    flag: "🇰🇷",
    description: "Progressiu amb tipus màxim alt, però amb moltes deduccions i particularitats (simplificat).",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.45, Math.max(0.06, (income / 140000) * 0.33));
      return income * effectiveRate;
    }
  },
  {
    id: "ISR",
    numericId: "376", // Israel
    name: "Israel",
    flag: "🇮🇱",
    description: "Progressiu amb trams alts i crèdits/deduccions habituals (estimació simplificada).",
    calculateTax: (income) => {
      const effectiveRate = Math.min(0.50, Math.max(0.10, (income / 150000) * 0.38));
      return income * effectiveRate;
    }
  },
  {
    id: "QAT",
    numericId: "634", // Qatar
    name: "Qatar",
    flag: "🇶🇦",
    description: "En general, sense impost sobre la renda personal (simplificat).",
    calculateTax: () => 0
  },
  {
    id: "KWT",
    numericId: "414", // Kuwait
    name: "Kuwait",
    flag: "🇰🇼",
    description: "En general, sense impost sobre la renda personal (simplificat).",
    calculateTax: () => 0
  },
  {
    id: "SAU",
    numericId: "682", // Saudi Arabia
    name: "Aràbia Saudita",
    flag: "🇸🇦",
    description: "En general, sense impost sobre la renda personal (simplificat).",
    calculateTax: () => 0
  }
];

export const getTaxColorScale = (effectiveRate: number) => {
  // 0% -> Green, 25% -> Yellow, 50% -> Red
  if (effectiveRate <= 25) {
    const t = effectiveRate / 25;
    return interpolateColor("#22c55e", "#eab308", t);
  } else {
    const t = Math.min(1, (effectiveRate - 25) / 25);
    return interpolateColor("#eab308", "#ef4444", t);
  }
};

function interpolateColor(color1: string, color2: string, factor: number) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color1);
  const result2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color2);

  if (!result || !result2) return color1;

  let r1 = parseInt(result[1], 16);
  let g1 = parseInt(result[2], 16);
  let b1 = parseInt(result[3], 16);

  let r2 = parseInt(result2[1], 16);
  let g2 = parseInt(result2[2], 16);
  let b2 = parseInt(result2[3], 16);

  let r = Math.round(r1 + factor * (r2 - r1));
  let g = Math.round(g1 + factor * (g2 - g1));
  let b = Math.round(b1 + factor * (b2 - b1));

  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}