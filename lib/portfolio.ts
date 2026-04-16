import { readdir } from "node:fs/promises";
import path from "node:path";

export type PortfolioImage = {
  src: string;
  alt: string;
  exists: boolean;
};

export type PortfolioProject = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  typeLabel: string;
  summaryTitle?: string;
  paragraphs: string[];
  siteLabel: string;
  siteHref?: string;
  heroImage: PortfolioImage;
  supportingImages: PortfolioImage[];
};

export type PortfolioShowcaseGroup = {
  id: string;
  label: string;
  siteLabel: string;
  siteHref?: string;
  heroImage: PortfolioImage;
};

export type PortfolioPageData = {
  coverImage: PortfolioImage;
  projects: PortfolioProject[];
  showcaseGroups: PortfolioShowcaseGroup[];
};

type ProjectDefinition = Omit<PortfolioProject, "heroImage" | "supportingImages"> & {
  imageNames: string[];
};

const SHOWCASE_ORDER = [
  { id: "sovereign", label: "Sovereign Systems", imageNames: ["sovereign-1.png", "sovereign-2.png", "sovereign-3.png", "sovereign-4.png", "sovereign-5.png"] },
  { id: "cg-paving", label: "CG Paving", imageNames: ["cg-paving-1.png", "cg-paving-2.png", "cg-paving-3.png", "cg-paving-4.png", "cg-paving-5.png", "cg-paving-6.png", "cg-paving-7.png"] },
  { id: "tktax", label: "TK Tax", imageNames: ["tktax-1.png", "tktax-2.png", "tktax-3.png", "tktax-4.png"] },
  { id: "gibson", label: "Gibson Plumbing", imageNames: ["gibson-1.png", "gibson-2.png", "gibson-3.png", "gibson-4.png"] },
  { id: "sikpix", label: "SikPix", imageNames: ["sikpix-1.png", "sikpix-2.png", "sikpix-3.png", "sikpix-4.png"] },
  { id: "alf", label: "ALFIE - Personal Trainer", imageNames: ["alf-1.png", "alf-2.png", "alf-3.png", "alf-4.png", "alf-5.png"] },
];

const PROJECTS: ProjectDefinition[] = [
  {
    id: "tktax",
    number: "01",
    name: "TK TAX",
    subtitle: "Accountancy Practice",
    typeLabel: "LIVE CLIENT",
    summaryTitle: "Project Summary",
    siteLabel: "View TK Tax Demo",
    siteHref: "https://tk-tax.vercel.app/",
    imageNames: ["tktax-1.png", "tktax-2.png", "tktax-3.png", "tktax-4.png"],
    paragraphs: [
      "First commercial client - a local accountancy practice delivered to professional standard.",
      "Custom-designed platform including professional branding, service pages, and fully mobile-responsive design.",
      "Delivered at high speed with zero bloat - the client described the result as outstanding.",
      "Live at tktax.co.uk. Proof of commercial delivery - brief to completion, on time, to a standard that wins repeat business.",
    ],
  },
  {
    id: "cg-paving",
    number: "02",
    name: "CG PAVING",
    subtitle: "Landscaping & Paving",
    typeLabel: "MASTER DEMO",
    summaryTitle: "Project Summary",
    siteLabel: "View CG Paving Demo",
    siteHref: "https://cg-paving-mock.vercel.app",
    imageNames: ["cg-paving-1.png", "cg-paving-2.png", "cg-paving-3.png", "cg-paving-4.png", "cg-paving-5.png", "cg-paving-6.png", "cg-paving-7.png"],
    paragraphs: [
      "Full-fidelity master template built in one week to prove out the Sovereign Systems infrastructure.",
      "Includes automated booking, SMS reminders, AI receptionist concept, lead capture, and property audit tool.",
      "This was the platform shown on a screenshare that received the reaction: 'It's actually mega.'",
      "Demonstrates exactly how fast we execute when modern performance engineering meets a business website.",
    ],
  },
  {
    id: "gibson",
    number: "03",
    name: "GIBSON PLUMBING",
    subtitle: "Plumbing Services",
    typeLabel: "NICHE ADAPTATION",
    summaryTitle: "Project Summary",
    siteLabel: "View Gibson Plumbing Demo",
    siteHref: "https://gibson-plumbing.vercel.app/",
    imageNames: ["gibson-1.png", "gibson-2.png", "gibson-3.png", "gibson-4.png"],
    paragraphs: [
      "Built using the Sovereign Systems pipeline to show how elite-quality infrastructure adapts across industries.",
      "Full automation suite - booking, SMS, lead capture, missed-call text-back - tailored for plumbing.",
      "Proves the pipeline's versatility: same quality, different audience, rapid deployment.",
      "New platforms customised and deployed within days, not weeks.",
    ],
  },
  {
    id: "sikpix",
    number: "04",
    name: "SIKPIX",
    subtitle: "Photography & Creative",
    typeLabel: "NICHE DEMO",
    summaryTitle: "Project Summary",
    siteLabel: "View SikPix Demo",
    siteHref: "https://sikpix.vercel.app/",
    imageNames: ["sikpix-1.png", "sikpix-2.png", "sikpix-3.png", "sikpix-4.png"],
    paragraphs: [
      "Demo platform built for a photography and creative services business.",
      "Showcases high-impact portfolio galleries, booking integration, and brand-first design language tailored for visual professionals.",
      "Demonstrates that the Sovereign Systems pipeline extends across industries - same automation backbone, completely different aesthetic.",
    ],
  },
  {
    id: "alf",
    number: "05",
    name: "ALFIE - Personal Trainer",
    subtitle: "Personal Training & Fitness",
    typeLabel: "NICHE DEMO",
    summaryTitle: "Project Summary",
    siteLabel: "View ALFIE Demo",
    siteHref: "https://app-iota-drab.vercel.app/",
    imageNames: ["alf-1.png", "alf-2.png", "alf-3.png", "alf-4.png", "alf-5.png"],
    paragraphs: [
      "Platform built for a personal trainer showcasing training programmes, transformation galleries, client booking, and fitness-first brand design.",
      "Built to capture leads from social media traffic and convert them into booked consultations automatically.",
      "Proves the pipeline handles health, wellness, and lifestyle businesses with the same precision as any other sector.",
    ],
  },
  {
    id: "sovereign",
    number: "06",
    name: "SOVEREIGN SYSTEMS",
    subtitle: "Agency Platform",
    typeLabel: "LIVE SITE",
    summaryTitle: "Project Summary",
    siteLabel: "Visit sovereignsystem.co.uk",
    siteHref: "https://sovereignsystem.co.uk",
    imageNames: ["sovereign-1.png", "sovereign-2.png", "sovereign-3.png", "sovereign-4.png", "sovereign-5.png"],
    paragraphs: [
      "The public face of Sovereign Systems - built to the same standard as every client delivery.",
      "Showcases portfolio, services, and professional identity.",
      "Built on Next.js 16, React 19, TypeScript, Tailwind v4, Framer Motion, and GSAP.",
      "This is live proof that the quality is real - sovereignsystem.co.uk.",
    ],
  },
];

function createImage(src: string, exists: boolean, alt: string): PortfolioImage {
  return { src, exists, alt };
}

async function readAvailableImages() {
  const directory = path.join(process.cwd(), "public", "copy-puff");

  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return new Set(
      entries
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name.toLowerCase())
    );
  } catch {
    return new Set<string>();
  }
}

function buildProjectImage(fileName: string, availableImages: Set<string>, alt: string) {
  const normalized = fileName.toLowerCase();
  return createImage(`/copy-puff/${normalized}`, availableImages.has(normalized), alt);
}

export async function getPortfolioPageData(): Promise<PortfolioPageData> {
  const availableImages = await readAvailableImages();

  const projects = PROJECTS.map((project) => {
    const [heroName, ...supportingNames] = project.imageNames;

    return {
      id: project.id,
      number: project.number,
      name: project.name,
      subtitle: project.subtitle,
      typeLabel: project.typeLabel,
      summaryTitle: project.summaryTitle,
      paragraphs: project.paragraphs,
      siteLabel: project.siteLabel,
      siteHref: project.siteHref,
      heroImage: buildProjectImage(heroName, availableImages, `${project.name} primary screenshot`),
      supportingImages: supportingNames.map((fileName, index) =>
        buildProjectImage(fileName, availableImages, `${project.name} supporting screenshot ${index + 1}`)
      ),
    } satisfies PortfolioProject;
  });

  const showcaseGroups = SHOWCASE_ORDER.map((group) => ({
    id: group.id,
    label: group.label,
    siteLabel: projects.find((project) => project.id === group.id)?.siteLabel ?? "Demo - available on request",
    siteHref: projects.find((project) => project.id === group.id)?.siteHref,
    heroImage: buildProjectImage(group.imageNames[0], availableImages, `${group.label} showcase hero screenshot`),
  }));

  return {
    coverImage: buildProjectImage("sovereign-1.png", availableImages, "Sovereign Systems cover screenshot"),
    projects,
    showcaseGroups,
  };
}
