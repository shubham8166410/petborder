import { z } from "zod";
import { getCountryByCode } from "@/lib/countries";

// Input schema for the timeline generation request
export const timelineInputSchema = z.object({
  petType: z.enum(["dog", "cat"]),

  petBreed: z
    .string()
    .trim()
    .min(1, "Pet breed is required")
    .max(100, "Pet breed must be 100 characters or less"),

  originCountry: z
    .string()
    .refine(
      (code) => getCountryByCode(code) !== undefined,
      { message: "Please select a valid origin country" }
    ),

  travelDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Travel date must be in YYYY-MM-DD format")
    .refine(
      (date) => {
        const travel = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return travel > today;
      },
      { message: "Travel date must be in the future" }
    )
    .refine(
      (date) => {
        const travel = new Date(date);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 2);
        return travel <= maxDate;
      },
      { message: "Travel date must be within the next 2 years" }
    ),
}).superRefine((data, ctx) => {
  // Bengal cats are banned from import to Australia as of March 2026
  if (
    data.petType === "cat" &&
    /bengal/i.test(data.petBreed)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["petBreed"],
      message:
        "Bengal cats are banned from import to Australia as of March 2026 under DAFF regulations. This breed cannot be brought into the country.",
    });
  }
});

// Individual cost item in a timeline step
const costItemSchema = z.object({
  description: z.string(),
  amountAUD: z.number().nonnegative(),
  notes: z.string().optional(),
});

// Single step in the compliance timeline
const timelineStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  daysFromNow: z.number().int(),
  category: z.enum([
    "vaccination",
    "testing",
    "documentation",
    "logistics",
    "quarantine",
  ]),
  isCompleted: z.boolean(),
  estimatedCost: costItemSchema.optional(),
});

// Warning attached to a timeline
const timelineWarningSchema = z.object({
  severity: z.enum(["critical", "warning", "info"]),
  message: z.string(),
});

// Full output from Claude timeline generation
export const timelineOutputSchema = z.object({
  steps: z.array(timelineStepSchema),
  warnings: z.array(timelineWarningSchema),
  totalEstimatedCostAUD: z.number().nonnegative(),
  originGroup: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  quarantineDays: z.number().int().nonnegative(),
  earliestTravelDate: z.string(),
  summary: z.string(),
});

export type TimelineInputSchema = z.infer<typeof timelineInputSchema>;
export type TimelineOutputSchema = z.infer<typeof timelineOutputSchema>;
