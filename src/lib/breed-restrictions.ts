/**
 * Breed Restriction Knowledge Base
 *
 * Hardcoded, verified breed restriction data for 15 countries.
 * Same principle as daff-rules.ts — never use AI training data,
 * always inject as context.
 *
 * IMPORTANT: Do not add breeds not listed in the verified source data.
 * Every entry has a sourceUrl and lastVerified date.
 * Update only after human review of official government sources.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type RestrictionLevel = "banned" | "restricted" | "allowed";

export interface CountryBreedRules {
  countryCode: string;
  countryName: string;
  hasNationalLaw: boolean;
  subNationalNote?: string;
  dogs: {
    banned: string[];
    restricted: string[];
    restrictedConditions?: Record<string, string>;
  };
  cats: {
    banned: string[];
    restricted: string[];
    restrictedConditions?: Record<string, string>;
  };
  notes?: string;
  sourceUrl: string;
  lastVerified: string;
  officialContact?: string;
}

export interface BreedCheckResult {
  breed: string;
  countryCode: string;
  countryName: string;
  petType: "dog" | "cat";
  status: "allowed" | "restricted" | "banned" | "unknown";
  message: string;
  conditions?: string;
  notes?: string;
  hasNationalLaw: boolean;
  subNationalNote?: string;
  sourceUrl: string;
  lastVerified: string;
  officialContact?: string;
  disclaimer: string;
}

// ── Disclaimer (always shown) ─────────────────────────────────────────────────

const DISCLAIMER =
  "Breed restriction laws change frequently and may vary by state, city or airline. " +
  "This is general guidance only — always verify with the destination country's official " +
  "authority before travel. PetBorder accepts no liability for refused entry.";

// ── Alias map — common alternative names and spellings ────────────────────────
// Keys are canonical names used in the restrictions lists.
// Values include the key itself plus all common aliases.

const COMMON_BREED_ALIASES: Record<string, string[]> = {
  "xl bully": ["xl bully", "american xl bully", "american bully xl", "xl bully type"],
  "pit bull terrier": [
    "pit bull",
    "pitbull",
    "pit-bull",
    "american pit bull",
    "pit bull terrier",
    "american pit bull terrier",
    "american pitbull",
    "pit bull type",
  ],
  "american staffordshire terrier": [
    "american staffordshire terrier",
    "american staffordshire",
    "am staff",
    "amstaff",
    "am-staff",
  ],
  "staffordshire bull terrier": [
    "staffordshire bull terrier",
    "staffordshire bull",
    "staffy",
    "staffie",
    "staffie bull",
  ],
  "german shepherd": ["german shepherd", "alsatian", "gsd", "german shepherd dog"],
  "belgian malinois": [
    "belgian malinois",
    "malinois",
    "belgian shepherd",
    "mechelen shepherd",
  ],
  "dogo argentino": ["dogo argentino", "argentinian mastiff", "argentine dogo"],
  "fila brasileiro": [
    "fila brasileiro",
    "brazilian mastiff",
    "brazilian fila",
    "fila",
  ],
};

// ── Knowledge base — 15 countries ────────────────────────────────────────────

export const BREED_RESTRICTIONS: CountryBreedRules[] = [
  // ── AU — Australia ──────────────────────────────────────────────────────────
  // Source: agriculture.gov.au/biosecurity-trade/cats-dogs
  {
    countryCode: "AU",
    countryName: "Australia",
    hasNationalLaw: true,
    dogs: {
      banned: [
        "pit bull terrier",
        "american pit bull terrier",
        "japanese tosa",
        "dogo argentino",
        "fila brasileiro",
        "perro de presa canario",
        "wolf hybrid",
        "czechoslovakian wolfdog",
        "saarloos wolfhound",
        "kunming wolfdog",
      ],
      restricted: [],
    },
    cats: {
      banned: ["bengal cat", "savannah cat", "hybrid species"],
      restricted: [],
    },
    sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
    lastVerified: "2026-03-26",
  },

  // ── GB — United Kingdom ─────────────────────────────────────────────────────
  // Source: gov.uk/control-dog-public
  {
    countryCode: "GB",
    countryName: "United Kingdom",
    hasNationalLaw: true,
    dogs: {
      banned: [
        "pit bull terrier",
        "japanese tosa",
        "dogo argentino",
        "fila brasileiro",
        "xl bully",
        "american xl bully",
      ],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "XL Bully banned from February 2024. Dogs resembling banned breeds may also be seized — visual assessment applies.",
    sourceUrl: "https://www.gov.uk/control-dog-public",
    lastVerified: "2026-03-26",
  },

  // ── NZ — New Zealand ────────────────────────────────────────────────────────
  // Source: mpi.govt.nz
  {
    countryCode: "NZ",
    countryName: "New Zealand",
    hasNationalLaw: true,
    dogs: {
      banned: [
        "american pit bull terrier",
        "brazilian fila",
        "dogo argentino",
        "japanese tosa",
        "perro de presa canario",
      ],
      restricted: [],
    },
    cats: {
      banned: ["hybrid species"],
      restricted: ["bengal cat"],
      restrictedConditions: {
        "bengal cat":
          "Must be 5 or more generations removed from wild cat ancestry. Pedigree documentation confirming domestic ancestry required.",
      },
    },
    sourceUrl: "https://www.mpi.govt.nz",
    lastVerified: "2026-03-26",
  },

  // ── SG — Singapore ──────────────────────────────────────────────────────────
  // Source: nparks.gov.sg
  {
    countryCode: "SG",
    countryName: "Singapore",
    hasNationalLaw: true,
    dogs: {
      banned: [],
      restricted: [
        "pit bull terrier",
        "rottweiler",
        "dobermann",
        "bull mastiff",
        "german shepherd",
        "belgian malinois",
      ],
      restrictedConditions: {
        default:
          "Requires HDB approval (if living in public housing), third-party liability insurance, muzzling in public, and sterilisation. Additional licence from NParks may be required.",
      },
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Singapore restricts 62 breeds. Restricted breeds require HDB approval, third-party liability insurance, muzzling in public and sterilisation.",
    sourceUrl: "https://www.nparks.gov.sg",
    lastVerified: "2026-03-26",
  },

  // ── DE — Germany ────────────────────────────────────────────────────────────
  // Source: bundesrecht.juris.de
  {
    countryCode: "DE",
    countryName: "Germany",
    hasNationalLaw: false,
    subNationalNote:
      "Germany's breed restrictions vary by state (Bundesland). Some states ban specific breeds nationally while others have different rules. Always check the specific state you are moving to.",
    dogs: {
      // Federal import ban — applies nationwide
      banned: [
        "pit bull terrier",
        "american staffordshire terrier",
        "staffordshire bull terrier",
        "bull terrier",
      ],
      restricted: ["rottweiler", "dobermann", "german shepherd", "malinois"],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    sourceUrl: "https://bundesrecht.juris.de",
    lastVerified: "2026-03-26",
  },

  // ── FR — France ─────────────────────────────────────────────────────────────
  // Source: service-public.fr
  {
    countryCode: "FR",
    countryName: "France",
    hasNationalLaw: true,
    dogs: {
      // Category 1 — banned
      banned: ["pit bull terrier", "boerboel", "tosa"],
      // Category 2 — conditions apply
      restricted: [
        "rottweiler",
        "american staffordshire terrier",
        "staffordshire bull terrier",
      ],
      restrictedConditions: {
        default:
          "Category 2 (Chiens de 2ème catégorie): owner must be 18+, hold no criminal record, dog must be sterilised, tattooed or microchipped, covered by liability insurance, and muzzled in public.",
      },
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Category 2 dogs require: owner 18+, no criminal record, dog sterilised, tattooed/chipped, liability insurance, muzzled in public.",
    sourceUrl: "https://www.service-public.fr",
    lastVerified: "2026-03-26",
  },

  // ── IE — Ireland ────────────────────────────────────────────────────────────
  // Source: gov.ie/en/publication/control-of-dogs-act
  {
    countryCode: "IE",
    countryName: "Ireland",
    hasNationalLaw: true,
    dogs: {
      banned: [],
      restricted: [
        "american pit bull terrier",
        "english bull terrier",
        "staffordshire bull terrier",
        "bull mastiff",
        "dobermann",
        "german shepherd",
        "rhodesian ridgeback",
        "rottweiler",
        "japanese akita",
        "japanese tosa",
        "bandog",
      ],
      restrictedConditions: {
        default:
          "Must be muzzled and on a short lead (maximum 2 metres) in public at all times. Owner must be 16 years or older.",
      },
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Ireland restricts rather than bans. All listed breeds must be muzzled and on a short lead (max 2m) in public. Owner must be 16 or older.",
    sourceUrl: "https://www.gov.ie/en/publication/control-of-dogs-act",
    lastVerified: "2026-03-26",
  },

  // ── DK — Denmark ───────────────────────────────────────────────────────────
  // Source: retsinformation.dk
  {
    countryCode: "DK",
    countryName: "Denmark",
    hasNationalLaw: true,
    dogs: {
      banned: [
        "pit bull terrier",
        "tosa inu",
        "american staffordshire terrier",
        "fila brasileiro",
        "dogo argentino",
        "american bulldog",
        "boerboel",
        "kangal",
        "central asian shepherd",
        "caucasian shepherd",
        "south russian shepherd",
        "tornjak",
        "sarplaninac",
      ],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Denmark has one of the most extensive breed ban lists in Europe. Crossbreeds of banned breeds are also banned.",
    sourceUrl: "https://www.retsinformation.dk",
    lastVerified: "2026-03-26",
  },

  // ── AE — UAE ────────────────────────────────────────────────────────────────
  // Source: moccae.gov.ae
  {
    countryCode: "AE",
    countryName: "United Arab Emirates",
    hasNationalLaw: true,
    dogs: {
      banned: [
        "pit bull terrier",
        "japanese tosa",
        "dogo argentino",
        "fila brasileiro",
      ],
      restricted: ["rottweiler", "dobermann", "bullmastiff", "german shepherd"],
      restrictedConditions: {
        default:
          "Requires prior approval from the relevant municipality before import. Special permit required.",
      },
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "UAE regulations apply across all Emirates. Restricted breeds require prior approval from the relevant municipality.",
    sourceUrl: "https://www.moccae.gov.ae",
    lastVerified: "2026-03-26",
  },

  // ── US — United States ──────────────────────────────────────────────────────
  // Source: aphis.usda.gov
  {
    countryCode: "US",
    countryName: "United States",
    hasNationalLaw: false,
    subNationalNote:
      "The USA has no federal breed ban. Restrictions vary dramatically by state, county and city. Check the specific city and state you are moving to. Some US military bases ban Pit Bulls and Rottweilers regardless of state law.",
    dogs: {
      banned: [],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    sourceUrl: "https://www.aphis.usda.gov",
    lastVerified: "2026-03-26",
  },

  // ── CA — Canada ─────────────────────────────────────────────────────────────
  // Source: inspection.canada.ca
  {
    countryCode: "CA",
    countryName: "Canada",
    hasNationalLaw: false,
    subNationalNote:
      "Canada has no federal breed ban. Ontario province bans Pit Bulls. Other provinces have varying rules. Check the specific province you are moving to.",
    dogs: {
      banned: [],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    sourceUrl: "https://inspection.canada.ca",
    lastVerified: "2026-03-26",
  },

  // ── JP — Japan ──────────────────────────────────────────────────────────────
  // Source: maff.go.jp
  {
    countryCode: "JP",
    countryName: "Japan",
    hasNationalLaw: true,
    dogs: {
      banned: [],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Japan has no national breed ban. One of the most open countries for dog breeds. Import health requirements still apply.",
    sourceUrl: "https://www.maff.go.jp",
    lastVerified: "2026-03-26",
  },

  // ── HK — Hong Kong ──────────────────────────────────────────────────────────
  // Source: afcd.gov.hk
  {
    countryCode: "HK",
    countryName: "Hong Kong",
    hasNationalLaw: true,
    dogs: {
      banned: [],
      restricted: ["pit bull terrier"],
      restrictedConditions: {
        "pit bull terrier":
          "Requires a licence from the Agriculture, Fisheries and Conservation Department (AFCD), muzzle in public, and third-party liability insurance.",
      },
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Hong Kong restricts rather than bans pit bull type dogs. A licence from AFCD is required.",
    sourceUrl: "https://www.afcd.gov.hk",
    lastVerified: "2026-03-26",
  },

  // ── NL — Netherlands ────────────────────────────────────────────────────────
  // Source: government.nl
  {
    countryCode: "NL",
    countryName: "Netherlands",
    hasNationalLaw: true,
    dogs: {
      banned: [],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "The Netherlands lifted its pit bull ban in 2008. No national breed ban currently exists. Some municipalities may have local restrictions.",
    sourceUrl: "https://www.government.nl",
    lastVerified: "2026-03-26",
  },

  // ── CH — Switzerland ────────────────────────────────────────────────────────
  // Source: blv.admin.ch
  {
    countryCode: "CH",
    countryName: "Switzerland",
    hasNationalLaw: false,
    subNationalNote:
      "Switzerland has no federal breed ban. Restrictions vary by canton (state). Geneva and other cantons have their own breed lists. Check the specific canton you are moving to.",
    dogs: {
      banned: [],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    sourceUrl: "https://www.blv.admin.ch",
    lastVerified: "2026-03-26",
  },

  // ── IT — Italy ──────────────────────────────────────────────────────────────
  // Source: salute.gov.it
  {
    countryCode: "IT",
    countryName: "Italy",
    hasNationalLaw: true,
    dogs: {
      banned: [],
      restricted: [],
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Italy revoked its 92-breed ban in 2009. No national breed ban currently. Owners of any breed must carry liability insurance.",
    sourceUrl: "https://www.salute.gov.it",
    lastVerified: "2026-03-26",
  },

  // ── ES — Spain ──────────────────────────────────────────────────────────────
  // Source: boe.es
  {
    countryCode: "ES",
    countryName: "Spain",
    hasNationalLaw: true,
    dogs: {
      banned: [],
      restricted: [
        "pit bull terrier",
        "staffordshire terrier",
        "american staffordshire",
        "rottweiler",
        "dogo argentino",
        "fila brasileiro",
        "tosa inu",
        "akita inu",
      ],
      restrictedConditions: {
        default:
          "Classified as PPP (Perros Potencialmente Peligrosos — Potentially Dangerous Dogs). Owner must be 18+, hold no criminal record, carry third-party liability insurance, muzzle dog in public, and ensure microchip and registration are current.",
      },
    },
    cats: {
      banned: [],
      restricted: [],
    },
    notes:
      "Spain classifies these breeds as PPP (Perros Potencialmente Peligrosos). All PPP dogs must be muzzled in public and owners must hold liability insurance.",
    sourceUrl: "https://www.boe.es",
    lastVerified: "2026-03-26",
  },
];

// ── Matching helpers ──────────────────────────────────────────────────────────

function normalizeBreed(breed: string): string {
  return breed.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Returns all known name variants for a breed input.
 * Expands via the alias table so "pitbull" → "pit bull terrier" etc.
 */
function getBreedVariants(breed: string): Set<string> {
  const normalized = normalizeBreed(breed);
  const variants = new Set<string>([normalized]);

  for (const aliases of Object.values(COMMON_BREED_ALIASES)) {
    const normalizedAliases = aliases.map(normalizeBreed);
    // If the input matches any alias in this group, add all variants
    const inputMatchesGroup = normalizedAliases.some(
      (a) => a === normalized || normalized.includes(a) || a.includes(normalized)
    );
    if (inputMatchesGroup) {
      normalizedAliases.forEach((a) => variants.add(a));
    }
  }

  return variants;
}

/**
 * Returns true if inputBreed matches restrictedBreed, accounting for:
 * - Case insensitivity (both normalized to lowercase)
 * - Aliases (e.g. pitbull → pit bull terrier)
 * - Partial matches (e.g. "american pit bull" → "pit bull terrier")
 */
function breedsMatch(inputBreed: string, restrictedBreed: string): boolean {
  const inputVariants = getBreedVariants(inputBreed);
  const restrictedVariants = getBreedVariants(restrictedBreed);

  for (const iv of inputVariants) {
    for (const rv of restrictedVariants) {
      if (iv === rv || iv.includes(rv) || rv.includes(iv)) {
        return true;
      }
    }
  }
  return false;
}

// ── Main check function ───────────────────────────────────────────────────────

/**
 * Check whether a breed is allowed, restricted, or banned in a destination country.
 *
 * Uses the hardcoded BREED_RESTRICTIONS knowledge base — no AI inference.
 * Always include the disclaimer in the result before showing to users.
 */
export function checkBreedRestriction(
  breed: string,
  countryCode: string,
  petType: "dog" | "cat"
): BreedCheckResult {
  const country = BREED_RESTRICTIONS.find(
    (c) => c.countryCode === countryCode.toUpperCase()
  );

  if (!country) {
    return {
      breed,
      countryCode: countryCode.toUpperCase(),
      countryName: countryCode.toUpperCase(),
      petType,
      status: "unknown",
      message: `We don't have verified breed restriction data for ${countryCode.toUpperCase()}. Please check directly with the destination country's official veterinary or biosecurity authority before travel.`,
      hasNationalLaw: true,
      sourceUrl: "",
      lastVerified: "",
      disclaimer: DISCLAIMER,
    };
  }

  const restrictions = petType === "dog" ? country.dogs : country.cats;

  // ── 1. Check banned list first ─────────────────────────────────────────────
  for (const bannedBreed of restrictions.banned) {
    if (breedsMatch(breed, bannedBreed)) {
      return {
        breed,
        countryCode: country.countryCode,
        countryName: country.countryName,
        petType,
        status: "banned",
        message: `${breed} cannot enter ${country.countryName}. This breed is banned under ${country.countryName} law. Your pet would be refused entry or returned.`,
        notes: country.notes,
        hasNationalLaw: country.hasNationalLaw,
        subNationalNote: country.subNationalNote,
        sourceUrl: country.sourceUrl,
        lastVerified: country.lastVerified,
        officialContact: country.officialContact,
        disclaimer: DISCLAIMER,
      };
    }
  }

  // ── 2. Check restricted list ───────────────────────────────────────────────
  for (const restrictedBreed of restrictions.restricted) {
    if (breedsMatch(breed, restrictedBreed)) {
      // Look up breed-specific conditions, then default conditions
      const conditions =
        restrictions.restrictedConditions?.[restrictedBreed] ??
        restrictions.restrictedConditions?.["default"] ??
        country.notes;

      return {
        breed,
        countryCode: country.countryCode,
        countryName: country.countryName,
        petType,
        status: "restricted",
        message: `${breed} is allowed in ${country.countryName} with conditions.`,
        conditions,
        notes: country.notes,
        hasNationalLaw: country.hasNationalLaw,
        subNationalNote: country.subNationalNote,
        sourceUrl: country.sourceUrl,
        lastVerified: country.lastVerified,
        officialContact: country.officialContact,
        disclaimer: DISCLAIMER,
      };
    }
  }

  // ── 3. Allowed (no match in either list) ───────────────────────────────────
  return {
    breed,
    countryCode: country.countryCode,
    countryName: country.countryName,
    petType,
    status: "allowed",
    message: `${breed} is welcome in ${country.countryName}. No breed restrictions apply.`,
    notes: country.notes,
    hasNationalLaw: country.hasNationalLaw,
    subNationalNote: country.subNationalNote,
    sourceUrl: country.sourceUrl,
    lastVerified: country.lastVerified,
    officialContact: country.officialContact,
    disclaimer: DISCLAIMER,
  };
}
