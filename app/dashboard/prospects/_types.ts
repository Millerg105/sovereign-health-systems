export type ProspectStage =
  | "pending_enrichment"
  | "enriched"
  | "approved"
  | "built"
  | "sent"
  | "replied"
  | "converted"
  | "dead";

export type ProspectNiche =
  | "garden-rooms"
  | "plumbing"
  | "landscape"
  | "pt"
  | "pod"
  | "accountant"
  | "agency"
  | "bookings"
  | "other";

export type ProspectTemplate =
  | "tranquil-garden-rooms"
  | "gibson-plumbing"
  | "cg-paving-mock"
  | "alfie-freeman"
  | "sikpix"
  | "tk-tax"
  | "sovereign-system"
  | "sovereign-bookings"
  | "other";

export type PostCadence = "active" | "dormant" | "dead";

export interface Prospect {
  id: string;
  user_id: string;
  business_name: string;
  google_maps_url: string | null;
  niche: ProspectNiche | null;
  template_match: ProspectTemplate | null;
  city: string | null;
  owner_first_name: string | null;
  current_website: string | null;
  platform: string | null;
  review_count: number | null;
  review_rating: number | null;
  gap_score: number | null;
  priority: number | null;
  stage: ProspectStage;
  intel_report: string | null;
  socials_active: boolean | null;
  last_post_date: string | null;
  post_cadence: PostCadence | null;
  created_at?: string;
}

export const STAGE_ORDER: ProspectStage[] = [
  "pending_enrichment",
  "enriched",
  "approved",
  "built",
  "sent",
  "replied",
  "converted",
  "dead",
];

export const STAGE_LABELS: Record<ProspectStage, string> = {
  pending_enrichment: "Pending Enrichment",
  enriched: "Enriched",
  approved: "Approved",
  built: "Built",
  sent: "Sent",
  replied: "Replied",
  converted: "Converted",
  dead: "Dead",
};
