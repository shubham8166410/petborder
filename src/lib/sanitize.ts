import type { TimelineInput } from "@/types/timeline";

// Patterns that look like prompt injection attempts
const INJECTION_PATTERNS = [
  /ignore\s+previous\s+instructions?/gi,
  /ignore\s+all\s+prior/gi,
  /disregard\s+(your\s+)?instructions?/gi,
  /you\s+are\s+now\s+a/gi,
  /act\s+as\s+(a|an)\s+/gi,
  /system\s*:/gi,
  /\[system\]/gi,
  /<\|.*?\|>/g,
];

export function sanitizeTextInput(input: string): string {
  if (!input) return "";

  let result = input;

  // Remove script/style tags including their content
  result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  result = result.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Remove remaining HTML tags (keep their text content)
  result = result.replace(/<[^>]*>/g, "");

  // Remove control characters (except standard whitespace)
  result = result.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Remove prompt injection patterns
  for (const pattern of INJECTION_PATTERNS) {
    result = result.replace(pattern, "");
  }

  // Trim whitespace
  result = result.trim();

  return result;
}

export function sanitizeTimelineInput(input: TimelineInput): TimelineInput {
  return {
    petType: input.petType,
    petBreed: sanitizeTextInput(input.petBreed),
    originCountry: sanitizeTextInput(input.originCountry),
    travelDate: sanitizeTextInput(input.travelDate),
  };
}
