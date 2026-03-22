import { z } from "zod/v4";

const dobField = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
  .refine((d) => new Date(d) <= new Date(), "Date of birth cannot be in the future")
  .optional();

export const petCreateSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(50, "Name must be 50 characters or fewer"),
    type: z.enum(["dog", "cat"]),
    breed: z.string().trim().min(1, "Breed is required").max(100, "Breed must be 100 characters or fewer"),
    // ISO 11784/11785 microchip numbers are exactly 15 digits
    microchip_number: z
      .string()
      .trim()
      .regex(/^\d{15}$/, "Microchip number must be 15 digits (ISO 11784/11785)")
      .optional(),
    date_of_birth: dobField,
  })
  .refine(
    (data) => !(data.type === "cat" && /bengal/i.test(data.breed)),
    { message: "Bengal cats are banned from import to Australia (effective March 2026)", path: ["breed"] }
  );

/**
 * Schema for partial pet updates (PATCH).
 *
 * NOTE: The Bengal cat check here only fires when `type` is explicitly included
 * in the update body. If the client sends `{ breed: "Bengal" }` alone and the
 * existing DB record already has `type: "cat"`, the schema cannot detect the
 * violation — it has no access to stored data. The API route handler MUST
 * fetch the existing record and merge it before applying the Bengal check.
 * See: POST /api/pets/[id] handler.
 */
export const petUpdateSchema = z
  .object({
    name: z.string().trim().min(1).max(50).optional(),
    type: z.enum(["dog", "cat"]).optional(),
    breed: z.string().trim().min(1).max(100).optional(),
    microchip_number: z
      .string()
      .trim()
      .regex(/^\d{15}$/, "Microchip number must be 15 digits (ISO 11784/11785)")
      .optional(),
    date_of_birth: dobField,
  })
  .refine(
    // Only catches the case where type is also in the patch body.
    // Full Bengal enforcement happens in the API route after fetching the record.
    (data) => !(data.type === "cat" && data.breed && /bengal/i.test(data.breed)),
    { message: "Bengal cats are banned from import to Australia (effective March 2026)", path: ["breed"] }
  );

export type PetCreate = z.infer<typeof petCreateSchema>;
export type PetUpdate = z.infer<typeof petUpdateSchema>;
