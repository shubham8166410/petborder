import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "Pet Travel Australia FAQ: 28 Questions Answered (2026)";
const PAGE_DESC =
  "The most common questions about bringing pets to Australia answered — DAFF groups, RNATT, Mickleham quarantine, Bengal ban, costs, timelines, and more.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/pet-travel-australia-faq",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/pet-travel-australia-faq",
    type: "article",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(PAGE_TITLE)}&description=${encodeURIComponent(PAGE_DESC)}`,
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [
      `/api/og?title=${encodeURIComponent(PAGE_TITLE)}&description=${encodeURIComponent(PAGE_DESC)}`,
    ],
  },
};

const faqSections = [
  {
    id: "basics",
    title: "The basics",
    items: [
      {
        question: "Can I bring my pet to Australia?",
        answer:
          "Yes — dogs and cats can be imported into Australia, subject to DAFF (Department of Agriculture, Fisheries and Forestry) biosecurity requirements. Most common breeds are eligible. However, certain breeds are banned: Pit Bull Terriers, Dogo Argentino, Fila Brasileiro, and Japanese Tosa (dogs); Bengal cats and Savannah cats (cats). Confirm your pet's breed eligibility with DAFF before beginning any preparation.",
      },
      {
        question: "Which airport do pets enter Australia through?",
        answer:
          "All pets (dogs and cats) must enter Australia through Melbourne Airport — Tullamarine. No other airport is approved for pet import, regardless of where you fly from or where you plan to live in Australia. If you are moving to Sydney, Brisbane, Perth or another city, your pet must still arrive through Melbourne and complete quarantine at Mickleham before being transported to your final destination.",
      },
      {
        question: "What are the 3 DAFF country groups?",
        answer:
          "DAFF classifies all countries into three groups based on rabies and disease status. Group 1 (New Zealand, Norfolk Island): simplest process, no quarantine, no import permit. Group 2 (UK, Ireland, Hawaii, Japan, Singapore, and others): 10-day quarantine, import permit required, no RNATT. Group 3 (USA, Canada, most of Europe, Asia, South America, Africa, Middle East): RNATT blood test + 180-day wait + import permit ($1,265 AUD) + 10–30 days quarantine. Check agriculture.gov.au or use PetBorder's timeline tool to confirm your country's group.",
      },
      {
        question: "How long does the process take?",
        answer:
          "Timeline depends on your country group. Group 1 (New Zealand): a few weeks. Group 2 (UK, Japan, etc.): 3–4 months minimum. Group 3 (USA, Europe, most of Asia): 7–12 months minimum, due to the mandatory 180-day RNATT wait. Always start the process as early as possible — quarantine spaces at Mickleham are limited and errors can reset your timeline.",
      },
      {
        question: "Can I bring both a dog and a cat to Australia together?",
        answer:
          "Yes. Each pet is processed individually — separate microchip, vaccination records, health certificates, and (for Group 3) separate RNATT blood tests with their own 180-day waits. The waits run in parallel if the blood samples are drawn and received by the lab on the same day. Plan logistics carefully if importing multiple pets simultaneously.",
      },
    ],
  },
  {
    id: "rnatt",
    title: "RNATT blood test",
    items: [
      {
        question: "What is the RNATT?",
        answer:
          "RNATT stands for Rabies Neutralising Antibody Titre Test. It is a blood test that measures the level of rabies-neutralising antibodies in your pet's blood, confirming that the rabies vaccination has produced adequate immunity. A titre of ≥0.5 IU/mL is required to pass. DAFF requires it for all Group 3 country imports because these countries are not considered rabies-free.",
      },
      {
        question: "When does the 180-day wait start?",
        answer:
          "The 180-day mandatory wait starts from the date the blood sample is RECEIVED by the DAFF-approved laboratory — not the date the blood was drawn from your pet, and not the date the result was issued. Postal delays push the clock start forward. Always confirm the exact lab receipt date in writing and keep this record permanently.",
      },
      {
        question: "What titre level is required?",
        answer:
          "Your pet must achieve a titre of ≥0.5 IU/mL (international units per millilitre). This is the DAFF minimum. Most well-vaccinated healthy adult pets pass on the first test. Young pets, immunocompromised animals, or those with a poorly administered vaccination course may fall below this threshold.",
      },
      {
        question: "What happens if my pet fails the RNATT?",
        answer:
          "If the titre is below 0.5 IU/mL, you must revaccinate and wait at least 30 days before retesting. If the retest passes, a new 180-day wait begins from the new lab receipt date. The original failed test's 180-day clock does not count — it resets entirely.",
      },
      {
        question: "Which labs are approved for the RNATT?",
        answer:
          "DAFF publishes a list of approved laboratories at agriculture.gov.au. Key labs include: Kansas State University Rabies Laboratory (USA), Auburn University Rabies Laboratory (USA), ANSES Laboratoire de Nancy (France), University of Ghent (Belgium), and APHA Weybridge (UK). Always verify approval status on DAFF's website before booking — the list can change.",
      },
      {
        question: "Do cats need the RNATT?",
        answer:
          "Yes — cats from Group 3 countries require the RNATT under the same rules as dogs: ≥0.5 IU/mL titre, 180-day wait from lab receipt, and a DAFF-approved laboratory. Note: Bengal cats are banned from import as of March 2026, so the RNATT question is moot for that breed.",
      },
    ],
  },
  {
    id: "quarantine",
    title: "Mickleham quarantine",
    items: [
      {
        question: "Where is the quarantine facility in Australia?",
        answer:
          "The Mickleham Post Entry Quarantine Facility, located in Melbourne's northern suburbs (approximately 25km from Melbourne Airport), is the only approved pet quarantine facility in Australia. All dogs and cats entering from Group 2 or Group 3 countries must complete quarantine there.",
      },
      {
        question: "How long is quarantine?",
        answer:
          "Group 1 (New Zealand): no quarantine. Group 2 (UK, Japan, etc.): always 10 days. Group 3: 10 days if identity verification was completed before the RNATT blood draw; 30 days if identity verification was done after. The 10 vs 30 day distinction for Group 3 is controlled entirely by the timing of identity verification.",
      },
      {
        question: "How much does quarantine cost?",
        answer:
          "Approximately $520 AUD for 10-day quarantine. Approximately $1,560 AUD for 30-day quarantine. These are DAFF fees for the quarantine stay itself. Transport to and from Mickleham is additional.",
      },
      {
        question: "Can I visit my pet during quarantine?",
        answer:
          "No — visits are not permitted at Mickleham during the quarantine period. Your pet will be in an individual kennel (dogs) or enclosure (cats) with daily welfare checks, food, water, and access to veterinary care if needed. You collect your pet once DAFF issues clearance after the quarantine period ends.",
      },
      {
        question: "How do I book Mickleham quarantine?",
        answer:
          "Book through the DAFF website at agriculture.gov.au. You need: your import permit number, your pet's microchip number, and your confirmed Melbourne arrival date. Book as early as possible — quarantine spaces are limited and peak periods (October–February) fill months in advance. You cannot confirm an airline cargo booking without a confirmed quarantine slot.",
      },
    ],
  },
  {
    id: "breeds",
    title: "Breed restrictions",
    items: [
      {
        question: "Are Bengal cats banned from Australia?",
        answer:
          "Yes. As of March 2026, all Bengal cats are banned from import into Australia. The previous partial exemption for F5+ (5th generation and beyond) Bengals has been removed. No Bengals, regardless of generation, may be imported under current rules.",
      },
      {
        question: "Which dog breeds are banned from import to Australia?",
        answer:
          "The following dog breeds are banned from import under Australian law: Pit Bull Terrier (including American Pit Bull), Dogo Argentino, Fila Brasileiro, and Japanese Tosa. Mixed-breed dogs with visible characteristics of these breeds may require a DAFF breed assessment.",
      },
      {
        question: "Are Savannah cats allowed into Australia?",
        answer:
          "No. Savannah cats are banned from import into Australia regardless of generation. This restriction has been in place for many years and applies to all Savannah cats — F1 through F8 and beyond.",
      },
    ],
  },
  {
    id: "costs",
    title: "Costs",
    items: [
      {
        question: "How much does it cost to bring a dog to Australia?",
        answer:
          "Costs depend heavily on your origin country. Group 1 (New Zealand): $1,000–$3,500 AUD. Group 2 (UK, Japan, etc.): $3,000–$6,000 AUD. Group 3 (USA, Europe, Asia): $5,000–$14,000+ AUD. The main cost items are the import permit ($1,265 AUD), quarantine ($520–$1,560), RNATT testing ($300–$700 for Group 3), pet transport agency fees ($2,000–$8,000+), and airline cargo fees ($400–$1,500).",
      },
      {
        question: "How much does the Australian import permit cost?",
        answer:
          "The import permit via DAFF's BICON portal costs $1,265 AUD. It is valid for 12 months from the issue date. Group 1 countries (New Zealand) do not need an import permit. Groups 2 and 3 both require one.",
      },
      {
        question: "Do I need a pet transport agency?",
        answer:
          "Not legally required, but strongly recommended for Group 2 and Group 3 countries. The process involves coordinating permits, RNATT labs, quarantine bookings, and airline cargo logistics simultaneously across multiple timezones. Specialist agencies such as Petraveller, Dogtainers, and Jetpets handle these processes daily and significantly reduce the risk of costly mistakes. A single error (e.g., identity verification after RNATT) can cost an extra $1,040 AUD and 20 extra days in quarantine.",
      },
    ],
  },
  {
    id: "documentation",
    title: "Documentation",
    items: [
      {
        question: "What is the health certificate window?",
        answer:
          "The official veterinary health certificate must be completed and signed by a DAFF-approved Official Veterinarian within 5 days before your export date. This window is strict — it cannot be done earlier. For US-based pet owners, the certificate must also be endorsed by USDA APHIS Animal Care within that same 5-day window.",
      },
      {
        question: "What microchip does my pet need?",
        answer:
          "Your pet must have an ISO 11784/11785 compliant 15-digit microchip. It must be implanted BEFORE the rabies vaccination is administered. If the microchip is implanted after the vaccination, that vaccination does not count and the sequence must restart. The microchip number must appear on every subsequent document: vaccination records, RNATT results, health certificate, and import permit.",
      },
      {
        question: "Can I transit through another country on the way to Australia?",
        answer:
          "Yes, but the transit country's rules may add requirements. Some countries require health documentation for pets even in transit. Check with your airline and any transit country's biosecurity authority before booking. Direct or minimal-stop routes to Melbourne are generally preferable for pet welfare and documentation simplicity.",
      },
    ],
  },
];

// Flatten for JSON-LD
const allFaqItems = faqSections.flatMap((s) => s.items);

export default function PetTravelAustraliaFaqPage() {
  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 mb-4">
          Last updated: March 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Pet Travel Australia: 28 Most Common Questions Answered (2026)
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          Everything you need to know about bringing a pet to Australia —
          grouped by topic. From the basics through RNATT, quarantine, breed
          bans, and documentation. Every answer is based on current DAFF rules
          verified March 2026.
        </p>
        <ShareButtons title={PAGE_TITLE} description={PAGE_DESC} />
      </div>

      {/* Table of Contents */}
      <nav
        className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-10"
        aria-label="Table of contents"
      >
        <p className="text-sm font-semibold text-brand-700 mb-3 uppercase tracking-wide">
          Jump to section
        </p>
        <ol className="space-y-1 text-sm">
          {faqSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-brand-600 hover:underline"
              >
                {section.title} ({section.items.length} questions)
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* FAQ Sections */}
      {faqSections.map((section, sIdx) => (
        <section key={section.id} id={section.id} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            {section.title}
          </h2>
          <dl className="space-y-6">
            {section.items.map((item) => (
              <div
                key={item.question}
                className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
              >
                <dt className="font-semibold text-gray-900 mb-2 text-base">
                  {item.question}
                </dt>
                <dd className="text-gray-700 text-sm leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>

          {/* Mid-FAQ CTA after costs section */}
          {sIdx === 2 && (
            <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mt-8">
              <p className="text-lg font-semibold mb-2">
                Get a personalised answer for your specific situation
              </p>
              <p className="text-white/80 mb-5 text-sm">
                General FAQs are a start — but your exact deadlines depend on
                your country and travel date. Get a free personalised timeline
                in 60 seconds.
              </p>
              <Link
                href="/generate"
                className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
              >
                Get your free personalised timeline →
              </Link>
            </div>
          )}
        </section>
      ))}

      {/* Bottom CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-xl font-bold mb-2">
          Still have questions? Get your personalised timeline
        </p>
        <p className="text-white/80 mb-5">
          Enter your origin country, pet type, and travel date — get exact dates
          for every DAFF step, free in 60 seconds.
        </p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised timeline →
        </Link>
      </div>

      {/* Internal links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link
          href="/guides/rnatt-test-australia"
          className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
        >
          <p className="text-xs text-gray-500 mb-1">Deep dive</p>
          <p className="font-semibold text-brand-600 text-sm">
            RNATT Test Australia: The Complete 2026 Guide
          </p>
        </Link>
        <Link
          href="/guides/australia-pet-quarantine"
          className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
        >
          <p className="text-xs text-gray-500 mb-1">Deep dive</p>
          <p className="font-semibold text-brand-600 text-sm">
            Australia Pet Quarantine: The Complete Mickleham Guide
          </p>
        </Link>
        <Link
          href="/guides/bringing-dog-to-australia"
          className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
        >
          <p className="text-xs text-gray-500 mb-1">Deep dive</p>
          <p className="font-semibold text-brand-600 text-sm">
            Bringing a Dog to Australia: The Complete DAFF Guide
          </p>
        </Link>
      </div>

      {/* External link */}
      <p className="text-sm text-gray-500 mb-6">
        Official source:{" "}
        <a
          href="https://www.agriculture.gov.au/biosecurity-trade/cats-dogs"
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          DAFF — Bringing cats and dogs to Australia
        </a>
      </p>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-700">Disclaimer:</strong> Based on DAFF
        rules last verified March 2026. Requirements can change without notice.
        Always confirm current requirements directly with the Australian
        Department of Agriculture, Fisheries and Forestry (DAFF) at{" "}
        <a
          href="https://www.agriculture.gov.au"
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          agriculture.gov.au
        </a>{" "}
        before booking travel for your pet. PetBorder is a planning tool, not
        legal or veterinary advice.
      </div>
    </>
  );
}
