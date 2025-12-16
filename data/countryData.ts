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
    
    if(!result || !result2) return color1;

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