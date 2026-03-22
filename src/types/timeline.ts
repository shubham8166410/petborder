export type PetType = "dog" | "cat";

export type DaffGroup = 1 | 2 | 3;

export type StepCategory =
  | "vaccination"
  | "testing"
  | "documentation"
  | "logistics"
  | "quarantine";

export interface Country {
  name: string;
  code: string;
  group: DaffGroup;
  notes?: string;
}

export interface TimelineInput {
  petType: PetType;
  petBreed: string;
  originCountry: string;
  travelDate: string; // ISO date string YYYY-MM-DD
}

export interface CostItem {
  description: string;
  amountAUD: number;
  notes?: string;
}

export interface TimelineStep {
  stepNumber: number;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  daysFromNow: number;
  category: StepCategory;
  isCompleted: boolean;
  estimatedCost?: CostItem;
  // Accuracy system fields — added in accuracy system
  sourceUrl?: string;
  urgency?: "immediate" | "soon" | "planned" | "final";
  canBeCompletedByOwner?: boolean;
  requiresVet?: boolean;
  requiresGovernmentPortal?: boolean;
  estimatedCostAUD?: number | null;
}

export type WarningSeverity = "critical" | "warning" | "info" | "success";

export interface TimelineWarning {
  severity: WarningSeverity;
  message: string;
  sourceUrl?: string;
}

export interface TimelineCostEstimate {
  biconPermit: number;
  quarantine: number;
  vetEstimateMin: number;
  vetEstimateMax: number;
  totalMin: number;
  totalMax: number;
  currency: "AUD";
  disclaimer: string;
}

export interface TimelineOutput {
  steps: TimelineStep[];
  warnings: TimelineWarning[];
  totalEstimatedCostAUD: number;
  originGroup: DaffGroup;
  quarantineDays: number;
  earliestTravelDate: string; // ISO date string
  summary: string;
  // Accuracy system fields — added in accuracy system
  daffGroup?: DaffGroup;
  minimumLeadTimeWeeks?: number;
  isBreedRestricted?: boolean;
  breedRestrictionNote?: string | null;
  isTravelDateFeasible?: boolean;
  travelDateWarning?: string | null;
  costEstimate?: TimelineCostEstimate;
  disclaimer?: string;
  dataLastVerified?: string;
  verifyAtUrl?: string;
}

export interface ApiErrorResponse {
  error: string;
  code: string;
}
