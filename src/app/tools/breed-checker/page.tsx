import type { Metadata } from "next";
import Link from "next/link";
import { BreedChecker } from "@/components/ui/BreedChecker";

export const metadata: Metadata = {
  title: "Dog & Cat Breed Checker — Is My Pet Allowed in My Destination? | PetBorder",
  description:
    "Check if your dog or cat breed is allowed, restricted or banned in 17 countries. Instant results based on official breed restriction laws.",
  openGraph: {
    title: "Dog & Cat Breed Checker | PetBorder",
    description:
      "Instantly check if your pet's breed is allowed, restricted or banned before you travel.",
    url: "https://petborder.com/tools/breed-checker",
  },
};

// ── FAQ Schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are mixed breeds affected by breed bans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — many countries use visual and physical assessment, not just pedigree papers. A mixed breed that resembles a banned breed may still be refused entry or subject to restrictions.",
      },
    },
    {
      "@type": "Question",
      name: "What if my breed is not in the list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your breed is not listed as banned or restricted it is generally allowed at the national level. Always verify with the destination country directly, especially if the country has sub-national restrictions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get an exemption for a banned breed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most countries no. A small number of countries allow service or assistance dogs that would otherwise be banned breeds. Contact the destination authority directly for the most current information.",
      },
    },
    {
      "@type": "Question",
      name: "Do airline breed restrictions apply as well?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — separately from country laws, airlines have their own breed restrictions, particularly for snub-nosed (brachycephalic) breeds in cargo. Check your specific airline as well as the destination country.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BreedCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Is My Pet&apos;s Breed Allowed?
          </h1>
          <p className="text-gray-500 mt-2">
            Check breed restrictions for 17 countries before you travel.
          </p>
        </div>

        {/* Checker widget */}
        <div className="bg-white border border-card-border rounded-2xl p-6 mb-8">
          <BreedChecker mode="standalone" />
        </div>

        {/* CTA to outbound planner */}
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-12 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-brand-900">Also need an export compliance timeline?</p>
            <p className="text-sm text-brand-700 mt-0.5">
              Get a full step-by-step plan for taking your pet from Australia.
            </p>
          </div>
          <Link
            href="/outbound"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors min-h-[44px]"
          >
            Outbound planner →
          </Link>
        </div>

        {/* FAQ section */}
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-gray-900 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-5">
            {faqSchema.mainEntity.map((item) => (
              <div
                key={item.name}
                className="border border-card-border rounded-2xl p-5"
              >
                <h3 className="font-semibold text-gray-900 text-sm">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
