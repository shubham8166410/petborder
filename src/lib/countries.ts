import type { Country, DaffGroup } from "@/types/timeline";

// Official DAFF country classifications for pet import to Australia
// Source: https://www.agriculture.gov.au/biosecurity-trade/cats-dogs
export const COUNTRIES: readonly Country[] = [
  // ── GROUP 1 ─────────────────────────────────────────────────────────────
  // No quarantine, no import permit required
  { code: "CC", name: "Cocos (Keeling) Islands", group: 1 },
  { code: "NZ", name: "New Zealand", group: 1 },
  { code: "NF", name: "Norfolk Island", group: 1 },

  // ── GROUP 2 ─────────────────────────────────────────────────────────────
  // Rabies-free, simplified process, 10-day quarantine
  // Hawaii treated as a separate region because US mainland is Group 3
  { code: "HI", name: "Hawaii (USA)", group: 2, notes: "Hawaii only — not mainland USA" },
  { code: "GB", name: "United Kingdom", group: 2 },
  { code: "IE", name: "Ireland", group: 2 },
  { code: "CY", name: "Cyprus", group: 2 },
  { code: "MT", name: "Malta", group: 2 },
  { code: "JP", name: "Japan", group: 2 },
  { code: "SG", name: "Singapore", group: 2 },
  { code: "TW", name: "Taiwan", group: 2 },
  { code: "HK", name: "Hong Kong", group: 2 },
  { code: "MU", name: "Mauritius", group: 2 },
  { code: "RE", name: "Réunion", group: 2 },
  { code: "NC", name: "New Caledonia", group: 2 },
  { code: "PF", name: "French Polynesia", group: 2 },
  { code: "GU", name: "Guam", group: 2 },

  // ── GROUP 3 ─────────────────────────────────────────────────────────────
  // Requires RNATT blood test, 180-day wait, import permit ($1,265 AUD),
  // 10–30 days quarantine at Mickleham, Melbourne
  // Americas
  { code: "US", name: "United States (mainland)", group: 3, notes: "For Hawaii, select Hawaii (USA) — Group 2" },
  { code: "CA", name: "Canada", group: 3 },
  { code: "MX", name: "Mexico", group: 3 },
  { code: "BR", name: "Brazil", group: 3 },
  { code: "AR", name: "Argentina", group: 3 },
  { code: "CL", name: "Chile", group: 3 },
  { code: "CO", name: "Colombia", group: 3 },
  { code: "PE", name: "Peru", group: 3 },
  { code: "VE", name: "Venezuela", group: 3 },
  { code: "EC", name: "Ecuador", group: 3 },
  { code: "BO", name: "Bolivia", group: 3 },
  { code: "PY", name: "Paraguay", group: 3 },
  { code: "UY", name: "Uruguay", group: 3 },
  { code: "GY", name: "Guyana", group: 3 },
  { code: "SR", name: "Suriname", group: 3 },
  { code: "GT", name: "Guatemala", group: 3 },
  { code: "HN", name: "Honduras", group: 3 },
  { code: "SV", name: "El Salvador", group: 3 },
  { code: "NI", name: "Nicaragua", group: 3 },
  { code: "CR", name: "Costa Rica", group: 3 },
  { code: "PA", name: "Panama", group: 3 },
  { code: "CU", name: "Cuba", group: 3 },
  { code: "JM", name: "Jamaica", group: 3 },
  { code: "TT", name: "Trinidad and Tobago", group: 3 },
  { code: "DO", name: "Dominican Republic", group: 3 },
  { code: "HT", name: "Haiti", group: 3 },

  // Europe (mainland)
  { code: "AT", name: "Austria", group: 3 },
  { code: "BE", name: "Belgium", group: 3 },
  { code: "BG", name: "Bulgaria", group: 3 },
  { code: "HR", name: "Croatia", group: 3 },
  { code: "CZ", name: "Czech Republic", group: 3 },
  { code: "DK", name: "Denmark", group: 3 },
  { code: "EE", name: "Estonia", group: 3 },
  { code: "FI", name: "Finland", group: 3 },
  { code: "FR", name: "France", group: 3 },
  { code: "DE", name: "Germany", group: 3 },
  { code: "GR", name: "Greece", group: 3 },
  { code: "HU", name: "Hungary", group: 3 },
  { code: "IS", name: "Iceland", group: 3 },
  { code: "IT", name: "Italy", group: 3 },
  { code: "LV", name: "Latvia", group: 3 },
  { code: "LT", name: "Lithuania", group: 3 },
  { code: "LU", name: "Luxembourg", group: 3 },
  { code: "NL", name: "Netherlands", group: 3 },
  { code: "NO", name: "Norway", group: 3 },
  { code: "PL", name: "Poland", group: 3 },
  { code: "PT", name: "Portugal", group: 3 },
  { code: "RO", name: "Romania", group: 3 },
  { code: "SK", name: "Slovakia", group: 3 },
  { code: "SI", name: "Slovenia", group: 3 },
  { code: "ES", name: "Spain", group: 3 },
  { code: "SE", name: "Sweden", group: 3 },
  { code: "CH", name: "Switzerland", group: 3 },
  { code: "UA", name: "Ukraine", group: 3 },
  { code: "TR", name: "Turkey", group: 3 },
  { code: "RU", name: "Russia", group: 3 },
  { code: "RS", name: "Serbia", group: 3 },
  { code: "BA", name: "Bosnia and Herzegovina", group: 3 },
  { code: "AL", name: "Albania", group: 3 },
  { code: "MK", name: "North Macedonia", group: 3 },
  { code: "ME", name: "Montenegro", group: 3 },
  { code: "MD", name: "Moldova", group: 3 },
  { code: "BY", name: "Belarus", group: 3 },

  // Middle East & Africa
  { code: "ZA", name: "South Africa", group: 3 },
  { code: "EG", name: "Egypt", group: 3 },
  { code: "NG", name: "Nigeria", group: 3 },
  { code: "KE", name: "Kenya", group: 3 },
  { code: "ET", name: "Ethiopia", group: 3 },
  { code: "GH", name: "Ghana", group: 3 },
  { code: "TZ", name: "Tanzania", group: 3 },
  { code: "UG", name: "Uganda", group: 3 },
  { code: "MZ", name: "Mozambique", group: 3 },
  { code: "ZW", name: "Zimbabwe", group: 3 },
  { code: "ZM", name: "Zambia", group: 3 },
  { code: "AO", name: "Angola", group: 3 },
  { code: "CM", name: "Cameroon", group: 3 },
  { code: "CI", name: "Côte d'Ivoire", group: 3 },
  { code: "SN", name: "Senegal", group: 3 },
  { code: "IL", name: "Israel", group: 3 },
  { code: "AE", name: "United Arab Emirates", group: 3 },
  { code: "SA", name: "Saudi Arabia", group: 3 },
  { code: "QA", name: "Qatar", group: 3 },
  { code: "KW", name: "Kuwait", group: 3 },
  { code: "BH", name: "Bahrain", group: 3 },
  { code: "OM", name: "Oman", group: 3 },
  { code: "JO", name: "Jordan", group: 3 },
  { code: "LB", name: "Lebanon", group: 3 },
  { code: "IR", name: "Iran", group: 3 },
  { code: "IQ", name: "Iraq", group: 3 },

  // Asia-Pacific
  { code: "KR", name: "South Korea", group: 3 },
  { code: "CN", name: "China", group: 3 },
  { code: "MY", name: "Malaysia", group: 3 },
  { code: "TH", name: "Thailand", group: 3 },
  { code: "ID", name: "Indonesia", group: 3 },
  { code: "PH", name: "Philippines", group: 3 },
  { code: "VN", name: "Vietnam", group: 3 },
  { code: "IN", name: "India", group: 3 },
  { code: "PK", name: "Pakistan", group: 3 },
  { code: "BD", name: "Bangladesh", group: 3 },
  { code: "LK", name: "Sri Lanka", group: 3 },
  { code: "NP", name: "Nepal", group: 3 },
  { code: "MM", name: "Myanmar", group: 3 },
  { code: "KH", name: "Cambodia", group: 3 },
  { code: "LA", name: "Laos", group: 3 },
  { code: "MN", name: "Mongolia", group: 3 },
  { code: "KZ", name: "Kazakhstan", group: 3 },
  { code: "UZ", name: "Uzbekistan", group: 3 },
  { code: "MO", name: "Macau", group: 3 },
  { code: "KP", name: "North Korea", group: 3 },
  { code: "FJ", name: "Fiji", group: 3 },
  { code: "PG", name: "Papua New Guinea", group: 3 },
  { code: "WS", name: "Samoa", group: 3 },
  { code: "TO", name: "Tonga", group: 3 },
  { code: "VU", name: "Vanuatu", group: 3 },
  { code: "SB", name: "Solomon Islands", group: 3 },
] as const;

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(
    (c) => c.code.toLowerCase() === code.toLowerCase()
  ) as Country | undefined;
}

export function getCountriesByGroup(group: DaffGroup): Country[] {
  return COUNTRIES.filter((c) => c.group === group) as Country[];
}

export function getAllCountries(): Country[] {
  return [...COUNTRIES].sort((a, b) =>
    a.name.localeCompare(b.name)
  ) as Country[];
}

export function searchCountries(query: string): Country[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllCountries();
  return getAllCountries().filter((c) => c.name.toLowerCase().includes(q));
}
