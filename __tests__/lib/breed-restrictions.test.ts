// @vitest-environment node
// Tests written FIRST — implementation does not exist yet (RED phase)
import { describe, it, expect } from "vitest";
import {
  checkBreedRestriction,
  BREED_RESTRICTIONS,
} from "@/lib/breed-restrictions";

// ── Data integrity ─────────────────────────────────────────────────────────────

describe("BREED_RESTRICTIONS — data integrity", () => {
  it("contains 17 countries (AU GB NZ SG DE FR IE DK AE US CA JP HK NL CH IT ES)", () => {
    expect(BREED_RESTRICTIONS).toHaveLength(17);
  });

  it("every country has a countryCode", () => {
    for (const c of BREED_RESTRICTIONS) {
      expect(c.countryCode, `Missing countryCode`).toBeTruthy();
      expect(c.countryCode).toMatch(/^[A-Z]{2}$/);
    }
  });

  it("every country has a non-empty sourceUrl", () => {
    for (const c of BREED_RESTRICTIONS) {
      expect(c.sourceUrl, `${c.countryCode} missing sourceUrl`).toBeTruthy();
    }
  });

  it("every country has lastVerified in YYYY-MM-DD format", () => {
    for (const c of BREED_RESTRICTIONS) {
      expect(c.lastVerified, `${c.countryCode} missing lastVerified`).toMatch(
        /^\d{4}-\d{2}-\d{2}$/
      );
    }
  });

  it("AU bans pit bull terrier for dogs", () => {
    const au = BREED_RESTRICTIONS.find((c) => c.countryCode === "AU");
    expect(au).toBeDefined();
    const banned = au!.dogs.banned.map((b) => b.toLowerCase());
    expect(banned.some((b) => b.includes("pit bull"))).toBe(true);
  });

  it("AU bans bengal cat for cats", () => {
    const au = BREED_RESTRICTIONS.find((c) => c.countryCode === "AU");
    expect(au!.cats.banned.map((b) => b.toLowerCase())).toContain("bengal cat");
  });

  it("GB includes xl bully in dogs banned", () => {
    const gb = BREED_RESTRICTIONS.find((c) => c.countryCode === "GB");
    const banned = gb!.dogs.banned.map((b) => b.toLowerCase());
    expect(banned.some((b) => b.includes("xl bully") || b.includes("bully"))).toBe(true);
  });

  it("US and CA have hasNationalLaw false", () => {
    const us = BREED_RESTRICTIONS.find((c) => c.countryCode === "US");
    const ca = BREED_RESTRICTIONS.find((c) => c.countryCode === "CA");
    expect(us!.hasNationalLaw).toBe(false);
    expect(ca!.hasNationalLaw).toBe(false);
  });

  it("DE has hasNationalLaw false", () => {
    const de = BREED_RESTRICTIONS.find((c) => c.countryCode === "DE");
    expect(de!.hasNationalLaw).toBe(false);
  });

  it("CH has hasNationalLaw false and subNationalNote", () => {
    const ch = BREED_RESTRICTIONS.find((c) => c.countryCode === "CH");
    expect(ch!.hasNationalLaw).toBe(false);
    expect(ch!.subNationalNote).toBeTruthy();
  });
});

// ── Allowed cases ──────────────────────────────────────────────────────────────

describe("checkBreedRestriction — allowed", () => {
  it("Golden Retriever + UK = allowed", () => {
    const result = checkBreedRestriction("Golden Retriever", "GB", "dog");
    expect(result.status).toBe("allowed");
    expect(result.countryCode).toBe("GB");
    expect(result.countryName).toBeTruthy();
  });

  it("Pit Bull + Japan = allowed", () => {
    const result = checkBreedRestriction("Pit Bull", "JP", "dog");
    expect(result.status).toBe("allowed");
  });

  it("Pit Bull + USA = allowed (federal) with subNationalNote", () => {
    const result = checkBreedRestriction("Pit Bull", "US", "dog");
    expect(result.status).toBe("allowed");
    expect(result.hasNationalLaw).toBe(false);
    expect(result.subNationalNote).toBeTruthy();
  });

  it("Any breed + Switzerland = allowed with subNationalNote", () => {
    const result = checkBreedRestriction("Labrador", "CH", "dog");
    expect(result.status).toBe("allowed");
    expect(result.subNationalNote).toBeTruthy();
  });

  it("Unknown breed (Poodle) + Germany = allowed with subNationalNote", () => {
    const result = checkBreedRestriction("Poodle", "DE", "dog");
    expect(result.status).toBe("allowed");
    expect(result.subNationalNote).toBeTruthy();
  });

  it("Labrador + Italy = allowed", () => {
    const result = checkBreedRestriction("Labrador", "IT", "dog");
    expect(result.status).toBe("allowed");
  });

  it("Domestic Shorthair + Japan = allowed (cat)", () => {
    const result = checkBreedRestriction("Domestic Shorthair", "JP", "cat");
    expect(result.status).toBe("allowed");
  });
});

// ── Banned cases ───────────────────────────────────────────────────────────────

describe("checkBreedRestriction — banned", () => {
  it("Pit Bull + UK = banned", () => {
    const result = checkBreedRestriction("Pit Bull", "GB", "dog");
    expect(result.status).toBe("banned");
    expect(result.countryCode).toBe("GB");
  });

  it("XL Bully + UK = banned", () => {
    const result = checkBreedRestriction("XL Bully", "GB", "dog");
    expect(result.status).toBe("banned");
  });

  it("American XL Bully + UK = banned", () => {
    const result = checkBreedRestriction("American XL Bully", "GB", "dog");
    expect(result.status).toBe("banned");
  });

  it("Savannah cat + AU = banned", () => {
    const result = checkBreedRestriction("Savannah", "AU", "cat");
    expect(result.status).toBe("banned");
  });

  it("Bengal cat + AU = banned", () => {
    const result = checkBreedRestriction("Bengal cat", "AU", "cat");
    expect(result.status).toBe("banned");
  });

  it("Dogo Argentino + DK = banned", () => {
    const result = checkBreedRestriction("Dogo Argentino", "DK", "dog");
    expect(result.status).toBe("banned");
  });

  it("Pit Bull Terrier + AU = banned", () => {
    const result = checkBreedRestriction("Pit Bull Terrier", "AU", "dog");
    expect(result.status).toBe("banned");
  });

  it("Fila Brasileiro + AE = banned", () => {
    const result = checkBreedRestriction("Fila Brasileiro", "AE", "dog");
    expect(result.status).toBe("banned");
  });
});

// ── Restricted cases ───────────────────────────────────────────────────────────

describe("checkBreedRestriction — restricted", () => {
  it("Rottweiler + Ireland = restricted with conditions", () => {
    const result = checkBreedRestriction("Rottweiler", "IE", "dog");
    expect(result.status).toBe("restricted");
    expect(result.conditions).toBeTruthy();
  });

  it("Bengal cat + NZ = restricted", () => {
    const result = checkBreedRestriction("Bengal cat", "NZ", "cat");
    expect(result.status).toBe("restricted");
  });

  it("Rottweiler + Singapore = restricted", () => {
    const result = checkBreedRestriction("Rottweiler", "SG", "dog");
    expect(result.status).toBe("restricted");
  });

  it("German Shepherd + Singapore = restricted", () => {
    const result = checkBreedRestriction("German Shepherd", "SG", "dog");
    expect(result.status).toBe("restricted");
  });

  it("Pit Bull + Singapore = restricted (not banned)", () => {
    const result = checkBreedRestriction("Pit Bull", "SG", "dog");
    // SG restricts but doesn't outright ban — licence + muzzle + insurance required
    expect(result.status).toBe("restricted");
  });

  it("Rottweiler + Spain = restricted (PPP)", () => {
    const result = checkBreedRestriction("Rottweiler", "ES", "dog");
    expect(result.status).toBe("restricted");
  });
});

// ── Unknown country ────────────────────────────────────────────────────────────

describe("checkBreedRestriction — unknown country", () => {
  it("returns unknown for unrecognised country code", () => {
    const result = checkBreedRestriction("Labrador", "XX", "dog");
    expect(result.status).toBe("unknown");
    expect(result.message).toBeTruthy();
  });

  it("unknown result still includes a disclaimer", () => {
    const result = checkBreedRestriction("Labrador", "XX", "dog");
    expect(result.disclaimer).toBeTruthy();
  });
});

// ── Alias matching ─────────────────────────────────────────────────────────────

describe("checkBreedRestriction — alias matching", () => {
  it("Staffy matches staffordshire bull terrier (banned in DE)", () => {
    const result = checkBreedRestriction("Staffy", "DE", "dog");
    expect(result.status).toBe("banned");
  });

  it("Staffie matches staffordshire bull terrier (banned in DE)", () => {
    const result = checkBreedRestriction("Staffie", "DE", "dog");
    expect(result.status).toBe("banned");
  });

  it("Pitbull (no space) matches pit bull terrier (banned in GB)", () => {
    const result = checkBreedRestriction("Pitbull", "GB", "dog");
    expect(result.status).toBe("banned");
  });

  it("Am Staff matches american staffordshire terrier (banned in DE)", () => {
    const result = checkBreedRestriction("Am Staff", "DE", "dog");
    expect(result.status).toBe("banned");
  });

  it("Amstaff (no space) matches american staffordshire terrier", () => {
    const result = checkBreedRestriction("Amstaff", "DE", "dog");
    expect(result.status).toBe("banned");
  });

  it("Alsatian matches german shepherd (restricted in IE)", () => {
    const result = checkBreedRestriction("Alsatian", "IE", "dog");
    expect(result.status).toBe("restricted");
  });

  it("Brazilian Mastiff matches fila brasileiro (banned in AE)", () => {
    const result = checkBreedRestriction("Brazilian Mastiff", "AE", "dog");
    expect(result.status).toBe("banned");
  });

  it("Argentinian Mastiff matches dogo argentino (banned in GB)", () => {
    const result = checkBreedRestriction("Argentinian Mastiff", "GB", "dog");
    expect(result.status).toBe("banned");
  });
});

// ── Case insensitivity ─────────────────────────────────────────────────────────

describe("checkBreedRestriction — case insensitive", () => {
  it("PIT BULL (uppercase) + GB = banned", () => {
    const result = checkBreedRestriction("PIT BULL", "GB", "dog");
    expect(result.status).toBe("banned");
  });

  it("pit bull terrier (lowercase) + GB = banned", () => {
    const result = checkBreedRestriction("pit bull terrier", "GB", "dog");
    expect(result.status).toBe("banned");
  });

  it("gb (lowercase country code) = still works", () => {
    const result = checkBreedRestriction("Pit Bull", "gb", "dog");
    expect(result.status).toBe("banned");
  });
});

// ── Result shape ───────────────────────────────────────────────────────────────

describe("checkBreedRestriction — result shape", () => {
  it("every result includes a non-empty disclaimer", () => {
    const cases: Array<[string, string, "dog" | "cat"]> = [
      ["Labrador", "JP", "dog"],
      ["Pit Bull", "GB", "dog"],
      ["Rottweiler", "IE", "dog"],
      ["Bengal cat", "NZ", "cat"],
      ["Labrador", "XX", "dog"],
    ];
    for (const [breed, code, type] of cases) {
      const result = checkBreedRestriction(breed, code, type);
      expect(result.disclaimer, `No disclaimer for ${breed}/${code}`).toBeTruthy();
      expect(result.disclaimer).toContain("general guidance");
    }
  });

  it("allowed result has correct fields", () => {
    const result = checkBreedRestriction("Labrador", "GB", "dog");
    expect(result.breed).toBe("Labrador");
    expect(result.countryCode).toBe("GB");
    expect(result.petType).toBe("dog");
    expect(result.status).toBe("allowed");
    expect(result.message).toBeTruthy();
    expect(result.sourceUrl).toBeTruthy();
    expect(result.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("banned result has a message mentioning the country", () => {
    const result = checkBreedRestriction("Pit Bull", "GB", "dog");
    expect(result.message).toContain("United Kingdom");
  });

  it("restricted result includes conditions", () => {
    const result = checkBreedRestriction("Rottweiler", "IE", "dog");
    expect(result.conditions).toBeTruthy();
  });
});
