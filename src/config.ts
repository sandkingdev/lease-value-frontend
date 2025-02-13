import { FeaturesOption, FloorLevelOptionType } from "./types";

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


export const featuresOptions: FeaturesOption[] = [
  { value: "no garden", label: "No Garden" },
  { value: "a private garden", label: "Private Garden" },
  { value: "a communal garden", label: "Communal Garden" },
  { value: "a patio", label: "Patio" },
  { value: "a terrace", label: "Terrace" },
  { value: "a garage", label: "Garage" },
  { value: "a garden and off road parking", label: "A Garden and Off Road Parking" },
];