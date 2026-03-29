import type { Metadata } from "next";
import Link from "next/link";

const PAGE_TITLE = "Pet Import Australia Guides: DAFF Compliance Library (2026)";
const PAGE_DESC =
  "Free expert guides for bringing pets to Australia. RNATT, Mickleham quarantine, costs, dog import, cat import, UK and USA rules — all based on official DAFF requirements.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides",
    type: "website",
  },
};

const guides = [
  {
    href: "/guides/bringing-dog-to-australia",
    category: "Dogs",
    title: "Bringing a Dog to Australia: The Complete DAFF Guide (2026)",
    description:
      "Every step, cost, and deadline for importing your dog — covering all three DAFF country groups, RNATT, quarantine, and breed restrictions.",
    badge: "Most popular",
    badgeColor: "bg-brand-100 text-brand-700",
  },
  {
    href: "/guides/bringing-cat-australia",
    category: "Cats",
    title: "Bringing a Cat to Australia: The Complete 2026 Guide",
    description:
      "Full guide for importing a cat — DAFF groups, the Bengal cat import ban, RNATT requirements, Mickleham quarantine, and cost breakdown.",
    badge: "Updated March 2026",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    href: "/guides/rnatt-test-australia",
    category: "RNATT",
    title: "RNATT Test Australia: Everything You Need to Know (2026)",
    description:
      "The 180-day rule explained, approved labs, titre thresholds, step-by-step process, costs, and what to do if your pet fails.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/guides/australia-pet-quarantine",
    category: "Quarantine",
    title: "Australia Pet Quarantine: The Complete Mickleham Guide",
    description:
      "How Mickleham quarantine works, booking process, 10 vs 30 day quarantine, costs, and what to expect during your pet's stay.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/guides/pet-import-cost-australia",
    category: "Costs",
    title: "Pet Import Australia Cost: 2026 Complete Breakdown",
    description:
      "Full cost comparison table across all three DAFF groups — import permit, quarantine, RNATT, agency fees, and airline cargo.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/guides/moving-to-australia-from-uk-with-pet",
    category: "By country",
    title: "Moving to Australia from the UK with a Pet: 2026 Guide",
    description:
      "UK-specific rules as a Group 2 country — no RNATT required, 10-day quarantine, tapeworm treatment, and APHA health certificate process.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/guides/moving-australia-usa-pet",
    category: "By country",
    title: "Moving to Australia from the USA with a Pet: 2026 Guide",
    description:
      "USA-specific rules as a Group 3 country — RNATT with 180-day wait, USDA APHIS endorsement, Kansas State lab, and full cost breakdown.",
    badge: null,
    badgeColor: null,
  },
  {
    href: "/guides/pet-travel-australia-faq",
    category: "FAQ",
    title: "Pet Travel Australia FAQ: 28 Questions Answered (2026)",
    description:
      "The most common questions about bringing pets to Australia — grouped by topic: basics, RNATT, quarantine, breed bans, costs, and documentation.",
    badge: null,
    badgeColor: null,
  },
];

const categories = [
  "All",
  "Dogs",
  "Cats",
  "RNATT",
  "Quarantine",
  "Costs",
  "By country",
  "FAQ",
];

export default function GuidesIndexPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 mb-4">
          All guides last updated: March 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Pet Import Australia: Complete Guide Library
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Every guide you need to bring your pet to Australia — written from
          official DAFF requirements. Free, accurate, and updated March 2026.
        </p>
      </div>

      {/* CTA Banner */}
      <div className="bg-brand-600 rounded-2xl p-6 text-white mb-10 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-lg mb-1">
            Need personalised dates?
          </p>
          <p className="text-white/80 text-sm">
            The guides are general. Get exact deadlines calculated for your
            specific origin country, pet, and travel date — free in 60 seconds.
          </p>
        </div>
        <Link
          href="/generate"
          className="flex-shrink-0 bg-white text-brand-600 font-bold px-5 py-3 rounded-xl hover:bg-brand-50 transition-colors text-sm whitespace-nowrap"
        >
          Get my free timeline →
        </Link>
      </div>

      {/* Guide grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
                {guide.category}
              </span>
              {guide.badge && guide.badgeColor && (
                <span
                  className={`text-xs font-medium rounded-full px-2.5 py-1 ${guide.badgeColor}`}
                >
                  {guide.badge}
                </span>
              )}
            </div>
            <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-brand-600 transition-colors">
              {guide.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>

      {/* About section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-gray-900 text-lg mb-3">
          About these guides
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Every guide on PetBorder is written from official DAFF (Department of
          Agriculture, Fisheries and Forestry) requirements. We do not rely on
          AI to recall rules from training — all information is sourced directly
          from DAFF publications and updated when rules change.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          The guides provide general information. For exact dates calculated for
          your specific origin country, pet, and travel date, use the{" "}
          <Link href="/generate" className="text-brand-600 hover:underline">
            free PetBorder timeline generator
          </Link>
          .
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-700">Disclaimer:</strong> Based on DAFF
        rules last verified March 2026. Requirements can change without notice.
        Always confirm current requirements directly with DAFF at{" "}
        <a
          href="https://www.agriculture.gov.au"
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          agriculture.gov.au
        </a>{" "}
        before booking travel for your pet.
      </div>
    </>
  );
}
