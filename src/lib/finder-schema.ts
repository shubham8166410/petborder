import { z } from "zod/v4";

const VALID_AU_STATES = ["VIC", "NSW", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;

export const vetQuerySchema = z.object({
  state: z
    .string()
    .transform((s) => s.toUpperCase())
    .pipe(z.enum(VALID_AU_STATES))
    .optional(),
});

export const labQuerySchema = z.object({
  country: z
    .string()
    .trim()
    .min(1, "Country cannot be empty")
    .max(10, "Country code too long")
    .regex(/^[A-Za-z]{2,3}$/, "Country must be a 2- or 3-letter code")
    .optional(),
});

export const agencyQuerySchema = z.object({
  state: z
    .string()
    .transform((s) => s.toUpperCase())
    .pipe(z.enum(VALID_AU_STATES))
    .optional(),
});

export type VetQuery = z.infer<typeof vetQuerySchema>;
export type LabQuery = z.infer<typeof labQuerySchema>;
export type AgencyQuery = z.infer<typeof agencyQuerySchema>;
