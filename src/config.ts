import { FeaturesOptionType, FloorLevelOptionType, PremiumType } from "./types";

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  alert("VITE_SUPABASE_ANON_KEY is required");
  throw new Error("VITE_SUPABASE_ANON_KEY is required");
}

if (!import.meta.env.VITE_SUPABASE_URL) {
  alert("VITE_SUPABASE_URL is required");
  throw new Error("VITE_SUPABASE_URL is required");
}

// console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
// console.log(import.meta.env.VITE_SUPABASE_URL);
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

export const floorLevelOptions: FloorLevelOptionType[] = [
  { value: "basement", label: "Basement" },
  { value: "ground", label: "Ground" },
  { value: "first", label: "First" },
  { value: "second", label: "Second" },
  { value: "third", label: "Third" },
  { value: "ground and first", label: "Ground and First" },
  { value: "first and second", label: "First and Second" },
  { value: "second and third", label: "Second and Third" },
];


export const featuresOptions: FeaturesOptionType[] = [
  { value: "no garden", label: "No Garden" },
  { value: "a private garden", label: "Private Garden" },
  { value: "a communal garden", label: "Communal Garden" },
  { value: "a patio", label: "Patio" },
  { value: "a terrace", label: "Terrace" },
  { value: "a garage", label: "Garage" },
  { value: "a garden and off road parking", label: "A Garden and Off Road Parking" },
];

export const extensionYears = 90;

export const getRemainingYears = (startDate: Date, endDate: Date) => {
  try {
    if (endDate <= startDate) {
      return 0;
    }
    const timeDiff = endDate.getTime() - startDate.getTime();
    const durationInYears = timeDiff / (1000 * 60 * 60 * 24 * 365.25);

    return durationInYears;
  } catch (error) {
    console.error("Error parsing date:", error);
    return 0;
  }
}

export const getStringOfRemainingYears = (startDate: Date, endDate: Date) => {
  if (!endDate) return {
    status: false,
    result: 'You should select lease end date at first'
  };
  if (!startDate) return {
    status: false,
    result: 'You should select valuation date at first'
  };

  const numberOfYearsRemainingVal = getRemainingYears(startDate, endDate);

  if (numberOfYearsRemainingVal <= 0) {
    return {
      status: false,
      result: 'Error in parsing date'
    }
  } else {
    return {
      status: true,
      result: `Years remaining on your lease: ${numberOfYearsRemainingVal.toFixed(2)}`
    }
  }
}

export const calculatePremium = (years: number, groundRent: number, propertyValue: number, yieldRate: number, defermentRate: number, level: number) => {
  // Lost Rent
  const lostRent = ((1 - (1 / Math.pow(1 + yieldRate / 100, years))) / (yieldRate / 100)) * groundRent;

  // Remainder Term
  const remainderTerm = propertyValue / Math.pow(1 + defermentRate / 100, years);
  const remainderNinetyTerm = propertyValue / Math.pow(1 + defermentRate / 100, years + 90);
  const landlordValue = remainderTerm - remainderNinetyTerm;

  // Land Current Interest
  const landCurrentInterest = lostRent + remainderTerm;

  // Hypothetical logic from your code
  let talentedCurrentInterest;
  if (years > 95) {
    talentedCurrentInterest = propertyValue * 0.972;
  } else {
    talentedCurrentInterest = (
      (0.106 + 0.894 * (1 - Math.pow(0.972, years))) -
      ((-0.002 * years) + 0.1706)
    ) * propertyValue * level;
  }

  const beforeMarriageValue = landCurrentInterest + talentedCurrentInterest;
  const landTotal = propertyValue + remainderNinetyTerm;
  const difference = landTotal - beforeMarriageValue;
  const marriageValue = years > 80 ? 0 : difference / 2;

  // Premium
  const premium = {
    lostRent,
    landlordValue,
    marriageValue,
  };

  return premium;
}

export const getPremiumValue = (premium: PremiumType) => {
  const {
    lostRent,
    landlordValue,
    marriageValue,
  } = premium;

  return lostRent + landlordValue + marriageValue;
}

export const formatAndRoundToTens = (numString: string) => {
  // Remove commas
  let raw = numString.replace(/,/g, '');
  // Parse number
  let num = parseFloat(raw);
  if (isNaN(num)) return numString; // fallback

  // Round to nearest tens
  num = Math.round(num / 10) * 10;

  // Re-apply commas
  return num.toLocaleString('en-GB');
}

export const levels = {
  low: 1.01,
  medium: 1,
  high: 0.99,
}

export const premiumCalculationYears = [
  1,
  2,
  5,
  10,
];

export const getRelativityRate = async (durationInYears: number) => {
  if (durationInYears >= 80) {
    return {
      status: false,
      result: "Not applicable / No marriage value",
      value: 0,
    };
  }

  try {
    // Load CSV
    // @ts-ignore
    const d3 = window.d3;
    const data = await d3.csv("/relativity.csv");

    // Parse terms from data
    const terms = data.map((d: any) => parseFloat(d.Term));

    // Find lower and upper bounding rows
    const lower = Math.max(...terms.filter((item: any) => item <= durationInYears));
    const upper = Math.min(...terms.filter((item: any) => item >= durationInYears));

    const lowerRow = data.find((row: any) => parseFloat(row.Term) === lower);
    const upperRow = data.find((row: any) => parseFloat(row.Term) === upper);

    let relativityRate;
    if (lowerRow && upperRow && lower !== upper) {
      // Interpolate
      const ratio = (durationInYears - lower) / (upper - lower);
      const lowerRel = parseFloat(lowerRow.Relativity);
      const upperRel = parseFloat(upperRow.Relativity);
      relativityRate = lowerRel + ratio * (upperRel - lowerRel);
    } else if (lowerRow) {
      // Exact match
      relativityRate = parseFloat(lowerRow.Relativity);
    } else {
      relativityRate = 0;
    }

    const result = {
      status: true,
      result: `Relativity Rate: ${relativityRate.toFixed(2)}% (${durationInYears.toFixed(2)} yrs)`,
      value: relativityRate,
    };

    return result; // ✅ This properly returns the value

  } catch (error) {
    console.error("CSV load error:", error);
    return {
      status: false,
      result: "There was an error in loading csv",
      value: 0,
    };
  }
};