import { Clock, AlertCircle, XCircle } from "lucide-react";
import { headers } from "next/headers";

// Define the shape of our data
export type PainPoint = {
    id: string;
    icon: string;
    title: string;
    symptom: string;
    cost: string;
    proof_angles: string[];
    copy_blocks: {
        headline: string;
        subhead: string;
        bullet_ideas: string[];
    };
};

export type ContentData = {
    niche: string;
    updated_at: string;
    pain_points: PainPoint[];
    hero: {
        headline: string;
        subhead: string;
        cta: string;
    };
};

// Map icon strings to actual components
export const IconMap: Record<string, any> = {
    Clock,
    AlertCircle,
    XCircle,
};

export async function getContent(): Promise<ContentData> {
    // In a real app, we might fetch this from an API or database.
    // For now, we import the JSON file directly.
    // We use a dynamic import to ensure it's loaded on the server side.
    const data = await import("@/content/painpoints.json");
    return data.default as ContentData;
}
