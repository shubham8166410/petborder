import { z } from "zod/v4";

// ── DAFF Rules Knowledge Base ─────────────────────────────────────────────────
//
// This file is the single source of truth for all stable DAFF compliance rules.
// It is injected into every Claude API call — the AI never guesses from training.
//
// When DAFF publishes rule changes:
//   1. Update the relevant rule below
//   2. Update lastVerified dates
//   3. Update DAFF_RULES.lastVerified at the top level
//
// Source: https://www.agriculture.gov.au/biosecurity-trade/cats-dogs
// Last verified: 2026-03-22

export const DAFF_RULES = {
  lastVerified: "2026-03-22",
  sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",

  generalRules: [
    {
      id: "entry-airport",
      rule: "All pets must enter Australia through Melbourne Airport only",
      exception:
        "Pets from New Zealand or Norfolk Island may enter through other airports",
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import",
      lastVerified: "2026-03-22",
    },
    {
      id: "microchip-timing",
      rule: "Microchip must be implanted BEFORE rabies vaccination and BEFORE any blood sampling",
      exception: null,
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import",
      lastVerified: "2026-03-22",
    },
    {
      id: "rnatt-wait",
      rule: "180-day mandatory wait after RNATT blood sample arrives at approved laboratory",
      detail:
        "Wait starts from lab receipt date, NOT the date blood was drawn",
      exception: "Does not apply to Group 1 and Group 2 countries",
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import/step-by-step-guides/category-3-step-by-step-guide-for-dogs",
      lastVerified: "2026-03-22",
    },
    {
      id: "identity-verification-timing",
      rule: "Identity verification must be completed BEFORE RNATT blood draw to qualify for 10-day quarantine",
      detail:
        "If identity verified after RNATT, minimum quarantine increases from 10 to 30 days",
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import",
      lastVerified: "2026-03-22",
    },
    {
      id: "health-certificate-timing",
      rule: "Veterinary health certificate must be completed within 5 days before export date",
      exception: null,
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import",
      lastVerified: "2026-03-22",
    },
    {
      id: "bicon-permit-cost",
      rule: "Import permit costs AUD $1,265 payable via BICON portal",
      detail: "Permit valid for 12 months from issue date",
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import/permit",
      lastVerified: "2026-03-22",
    },
    {
      id: "quarantine-booking",
      rule: "Quarantine at Mickleham Post Entry Quarantine Facility must be booked in advance",
      detail:
        "Airline will not accept pet without confirmed quarantine booking",
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/post-entry-quarantine",
      lastVerified: "2026-03-22",
    },
  ],

  breedRestrictions: [
    {
      breed: "Bengal cat",
      status: "banned" as const,
      effectiveDate: "2026-03-01",
      notes: "Previous exemption for 5th generation removed",
      sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
      lastVerified: "2026-03-22",
    },
    {
      breed: "Savannah cat",
      status: "banned" as const,
      effectiveDate: null,
      notes: "Banned regardless of generation",
      sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
      lastVerified: "2026-03-22",
    },
    {
      breed: "Pit Bull Terrier",
      status: "banned" as const,
      effectiveDate: null,
      notes: "Includes American Pit Bull",
      sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
      lastVerified: "2026-03-22",
    },
    {
      breed: "Dogo Argentino",
      status: "banned" as const,
      effectiveDate: null,
      notes: null,
      sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
      lastVerified: "2026-03-22",
    },
    {
      breed: "Fila Brasileiro",
      status: "banned" as const,
      effectiveDate: null,
      notes: null,
      sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
      lastVerified: "2026-03-22",
    },
    {
      breed: "Japanese Tosa",
      status: "banned" as const,
      effectiveDate: null,
      notes: null,
      sourceUrl: "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
      lastVerified: "2026-03-22",
    },
  ],

  groupRules: {
    group1: {
      countries: ["New Zealand", "Norfolk Island", "Cocos Islands"],
      quarantineDays: 0,
      requiresImportPermit: false,
      requiresRNATT: false,
      minimumLeadTimeWeeks: 4,
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import",
      lastVerified: "2026-03-22",
    },
    group2: {
      countries: [
        "United Kingdom",
        "Ireland",
        "Hawaii",
        "Guam",
        "Japan",
        "Singapore",
        "Taiwan",
        "Hong Kong",
        "Cyprus",
        "Malta",
        "Mauritius",
        "Reunion",
        "New Caledonia",
        "French Polynesia",
      ],
      quarantineDays: 10,
      requiresImportPermit: true,
      requiresRNATT: false,
      minimumLeadTimeWeeks: 16,
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import",
      lastVerified: "2026-03-22",
    },
    group3: {
      quarantineDaysWithIdentityVerification: 10,
      quarantineDaysWithoutIdentityVerification: 30,
      requiresImportPermit: true,
      requiresRNATT: true,
      rnattWaitDays: 180,
      minimumLeadTimeWeeks: 32,
      sourceUrl:
        "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import/step-by-step-guides/category-3-step-by-step-guide-for-dogs",
      lastVerified: "2026-03-22",
    },
  },

  costs: {
    biconImportPermit: 1265,
    quarantine10Days: 520,
    quarantine30Days: 1560,
    currency: "AUD" as const,
    sourceUrl:
      "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import/permit",
    lastVerified: "2026-03-22",
    disclaimer:
      "Costs are estimates only. Verify current fees with DAFF before travel.",
  },
} as const;

// ── Derived types ─────────────────────────────────────────────────────────────

type Group1Rules = typeof DAFF_RULES.groupRules.group1;
type Group2Rules = typeof DAFF_RULES.groupRules.group2;
type Group3Rules = typeof DAFF_RULES.groupRules.group3;

// ── Helper functions ──────────────────────────────────────────────────────────

/** Returns the list of banned breed names. */
export function getBannedBreeds(): string[] {
  return DAFF_RULES.breedRestrictions.map((b) => b.breed);
}

/**
 * Case-insensitive substring match against all banned breed names.
 * e.g. isBreedBanned('bengal') → true, isBreedBanned('labrador') → false
 */
export function isBreedBanned(breed: string): boolean {
  if (!breed) return false;
  const lower = breed.toLowerCase();
  return DAFF_RULES.breedRestrictions.some((b) =>
    b.breed.toLowerCase().includes(lower) || lower.includes(b.breed.toLowerCase())
  );
}

/**
 * Returns the full DAFF_RULES object serialised as a formatted JSON string,
 * ready to be injected into a Claude API system prompt.
 */
export function getRulesAsContext(): string {
  return JSON.stringify(DAFF_RULES, null, 2);
}

/**
 * Returns the group-specific rules for the given DAFF group number.
 * Groups 1 and 2 include `quarantineDays`; Group 3 splits by identity verification.
 */
export function getGroupRules(group: 1): Group1Rules;
export function getGroupRules(group: 2): Group2Rules;
export function getGroupRules(group: 3): Group3Rules;
export function getGroupRules(group: 1 | 2 | 3): Group1Rules | Group2Rules | Group3Rules {
  switch (group) {
    case 1: return DAFF_RULES.groupRules.group1;
    case 2: return DAFF_RULES.groupRules.group2;
    case 3: return DAFF_RULES.groupRules.group3;
  }
}

// ── Zod schema ────────────────────────────────────────────────────────────────

const GeneralRuleSchema = z.object({
  id: z.string().min(1),
  rule: z.string().min(1),
  exception: z.string().nullable().optional(),
  detail: z.string().optional(),
  sourceUrl: z.string().min(1).url(),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const BreedRestrictionSchema = z.object({
  breed: z.string().min(1),
  status: z.literal("banned"),
  effectiveDate: z.string().nullable(),
  notes: z.string().nullable(),
  sourceUrl: z.string().min(1).url(),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const Group1Schema = z.object({
  countries: z.array(z.string()),
  quarantineDays: z.number(),
  requiresImportPermit: z.boolean(),
  requiresRNATT: z.boolean(),
  minimumLeadTimeWeeks: z.number(),
  sourceUrl: z.string().min(1).url(),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const Group2Schema = Group1Schema;

const Group3Schema = z.object({
  quarantineDaysWithIdentityVerification: z.number(),
  quarantineDaysWithoutIdentityVerification: z.number(),
  requiresImportPermit: z.boolean(),
  requiresRNATT: z.boolean(),
  rnattWaitDays: z.number(),
  minimumLeadTimeWeeks: z.number(),
  sourceUrl: z.string().min(1).url(),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const CostsSchema = z.object({
  biconImportPermit: z.number(),
  quarantine10Days: z.number(),
  quarantine30Days: z.number(),
  currency: z.literal("AUD"),
  sourceUrl: z.string().min(1).url(),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  disclaimer: z.string().min(1),
});

export const DaffRulesSchema = z.object({
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sourceUrl: z.string().min(1).url(),
  generalRules: z.array(GeneralRuleSchema),
  breedRestrictions: z.array(BreedRestrictionSchema),
  groupRules: z.object({
    group1: Group1Schema,
    group2: Group2Schema,
    group3: Group3Schema,
  }),
  costs: CostsSchema,
});

export type DaffRules = z.infer<typeof DaffRulesSchema>;
