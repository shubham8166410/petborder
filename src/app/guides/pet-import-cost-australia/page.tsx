import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "Pet Import Australia Cost: 2026 Complete Breakdown";
const PAGE_DESC =
  "How much does it cost to bring a pet to Australia? Full 2026 cost breakdown for all DAFF groups — permits, quarantine, RNATT test, and transport agencies.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/pet-import-cost-australia",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/pet-import-cost-australia",
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
    images: [`/api/og?title=${encodeURIComponent(PAGE_TITLE)}&description=${encodeURIComponent(PAGE_DESC)}`],
  },
};

const faqItems = [
  {
    question: "How much does it cost to bring a dog from the USA to Australia?",
    answer:
      "Bringing a dog from the USA (Group 3) typically costs AUD $5,000–$14,000 or more. Major costs include the $1,265 import permit, RNATT blood test ($300–$600), quarantine ($520–$1,560), health certificate (~$200), airline cargo ($500–$1,500), and a pet transport agency ($2,500–$8,000+). The 180-day wait can also create indirect costs around accommodation and logistics.",
  },
  {
    question: "How much is the Mickleham quarantine fee?",
    answer:
      "DAFF charges approximately $520 AUD for a 10-day stay and approximately $1,560 AUD for a 30-day stay. These are official DAFF fees and do not include transport to/from the Mickleham facility. You can qualify for 10 days (even as a Group 3 importer) by completing identity verification before the RNATT blood draw.",
  },
  {
    question: "What is the BICON import permit cost?",
    answer:
      "The BICON import permit costs $1,265 AUD, payable through DAFF's BICON online portal. It is required for Group 3 countries and is valid for 12 months from the date of issue. Group 1 (NZ, Norfolk Island) and Group 2 (UK, Ireland, Japan, etc.) do not require an import permit.",
  },
  {
    question: "Do I need a pet transport agency, and how much do they cost?",
    answer:
      "You are not legally required to use a pet transport agency, but it is strongly recommended for Group 3 importers. Agencies handle the coordination of permits, quarantine bookings, RNATT labs, and airline cargo logistics. Fees range from approximately $500–$2,000 AUD for Group 1 routes to $2,500–$8,000+ AUD for complex Group 3 routes.",
  },
  {
    question: "How can I reduce the cost of bringing my pet to Australia?",
    answer:
      "Key money-saving strategies: (1) Complete identity verification BEFORE the RNATT blood draw — this qualifies you for 10-day instead of 30-day quarantine, saving ~$1,040 AUD. (2) Book quarantine at least 6 months ahead to secure availability. (3) Choose a pet transport agency that includes BICON permit assistance. (4) Time your health certificate within 5 days of departure to avoid wasted vet fees. (5) Compare multiple pet transport agencies — pricing varies significantly.",
  },
];

export default function PetImportCostAustraliaPage() {
  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
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
          How Much Does It Cost to Bring a Pet to Australia? (2026)
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          The honest answer is: it depends dramatically on where you&apos;re coming from. A pet from New Zealand might cost a few thousand dollars to import. A pet from the USA can cost $14,000 or more. Here&apos;s the full breakdown.
        </p>
        <ShareButtons title={PAGE_TITLE} description={PAGE_DESC} />
      </div>

      {/* Table of Contents */}
      <nav className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-10" aria-label="Table of contents">
        <p className="text-sm font-semibold text-brand-700 mb-3 uppercase tracking-wide">On this page</p>
        <ol className="space-y-1 text-sm">
          {[
            ["depends-on-country", "The honest answer: it depends on your origin country"],
            ["full-breakdown", "Full cost breakdown by DAFF group"],
            ["group3-detail", "Group 3 cost breakdown in detail"],
            ["quarantine-cost", "What does pet quarantine actually cost?"],
            ["transport-agency", "Do I need a pet transport agency?"],
            ["save-money", "How to save money on pet import"],
            ["faq", "Frequently asked questions"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-brand-600 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Section 1 */}
      <section id="depends-on-country" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The honest answer: it depends on your origin country</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Australia classifies every origin country into one of three DAFF groups. Your group determines which requirements apply, and requirements directly determine costs. The difference between Group 1 (New Zealand) and Group 3 (USA, Europe) can be more than $10,000 AUD.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Here&apos;s why the cost gap is so large:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
          <li><strong>Group 1</strong> (NZ, Norfolk Island): No quarantine, no import permit, minimal documentation. Most costs are just the vet health certificate and airline cargo.</li>
          <li><strong>Group 2</strong> (UK, Ireland, Japan, Singapore): No RNATT test required, but 10-day quarantine and import permit apply. Timeline is 3–4 months.</li>
          <li><strong>Group 3</strong> (USA, Europe, most of Asia): RNATT blood test + 180-day mandatory wait + import permit + 10–30 days quarantine. Timeline is 7–12 months, and indirect costs (accommodation, delayed moves) can be substantial.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Use the full cost table below to see what applies to your specific situation.
        </p>
      </section>

      {/* Section 2 */}
      <section id="full-breakdown" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Full cost breakdown by DAFF group</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All figures in Australian dollars (AUD). Estimates based on typical 2026 costs — individual costs vary by route, vet, and agency.
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Cost Item</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Group 1<br /><span className="font-normal text-gray-500 text-xs">NZ, Norfolk Is.</span></th>
                <th className="px-4 py-3 font-semibold text-gray-700">Group 2<br /><span className="font-normal text-gray-500 text-xs">UK, Ireland, Japan…</span></th>
                <th className="px-4 py-3 font-semibold text-gray-700">Group 3<br /><span className="font-normal text-gray-500 text-xs">USA, Europe, Asia…</span></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["BICON import permit", "Not required", "Not required", "$1,265 AUD"],
                ["Rabies vaccination", "~$80–$200", "~$80–$200", "~$80–$200"],
                ["RNATT blood test", "Not required", "Not required", "~$300–$600 AUD"],
                ["RNATT approved lab fee", "Not required", "Not required", "~$200–$400 AUD"],
                ["Health certificate (vet)", "~$150–$300", "~$150–$300", "~$150–$300"],
                ["Quarantine (10 days)", "Not required", "~$520 AUD", "~$520 AUD"],
                ["Quarantine (30 days)", "Not required", "Not applicable", "~$1,560 AUD"],
                ["Pet transport agency", "$500–$2,000", "$1,500–$4,000", "$2,500–$8,000+"],
                ["Airline cargo fee", "$300–$800", "$500–$1,500", "$500–$1,500"],
                ["Microchip (if needed)", "~$50–$80", "~$50–$80", "~$50–$80"],
              ].map(([item, g1, g2, g3], idx) => (
                <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3 text-gray-700">{item}</td>
                  <td className="px-4 py-3 text-gray-600">{g1}</td>
                  <td className="px-4 py-3 text-gray-600">{g2}</td>
                  <td className="px-4 py-3 text-gray-600">{g3}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300 bg-brand-50 font-bold">
                <td className="px-4 py-3 text-gray-900">Total estimate</td>
                <td className="px-4 py-3 text-gray-900">$1,000–$3,000 AUD</td>
                <td className="px-4 py-3 text-gray-900">$3,000–$6,000 AUD</td>
                <td className="px-4 py-3 text-gray-900">$5,000–$14,000+ AUD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">
          These are estimates only. Verify current DAFF fees at{" "}
          <a href="https://www.agriculture.gov.au/biosecurity-trade/cats-dogs" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">agriculture.gov.au</a>{" "}
          before making any bookings.
        </p>
      </section>

      {/* Mid-page CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-lg font-semibold mb-2">What will it cost for your specific pet?</p>
        <p className="text-white/80 mb-5 text-sm">Get a personalised cost estimate and step-by-step timeline in 60 seconds — free.</p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised timeline →
        </Link>
      </div>

      {/* Section 3 */}
      <section id="group3-detail" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Group 3 cost breakdown in detail (USA, Europe, Asia)</h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Group 3 is the most complex and expensive pathway. Here is a detailed walkthrough of each cost item and what drives the expense:
        </p>

        <div className="space-y-5">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">BICON Import Permit — $1,265 AUD</h3>
            <p className="text-gray-700 text-sm leading-relaxed">A fixed DAFF fee payable through the BICON online portal. Non-negotiable and required before any other steps can be confirmed. Valid for 12 months from issue date.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">Rabies Vaccination — $80–$200 AUD</h3>
            <p className="text-gray-700 text-sm leading-relaxed">Cost varies by vet and country. Must be administered after the microchip is implanted. Keep all records — batch number, date, and vaccine brand are all required for the health certificate.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">RNATT Blood Test + Lab Fee — $500–$1,000 AUD total</h3>
            <p className="text-gray-700 text-sm leading-relaxed">The blood draw itself is one cost; shipping to a DAFF-approved lab is another; the lab analysis fee is a third. Combined, expect $500–$1,000 AUD. If your dog fails (titre below 0.5 IU/mL), you revaccinate and retest — resetting costs and timeline.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">The 180-Day Wait — the biggest hidden cost</h3>
            <p className="text-gray-700 text-sm leading-relaxed">This doesn&apos;t appear as a line item, but it&apos;s often the most expensive part. If you&apos;re relocating from the USA to Australia, you may need to delay your own move by 180+ days to stay with your pet. That can mean 6 months of rent in two countries, storage fees, or extended temporary accommodation. Families relocating internationally commonly cite this as the single largest cost driver.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">Quarantine — $520 or $1,560 AUD</h3>
            <p className="text-gray-700 text-sm leading-relaxed">The 10-day vs 30-day quarantine distinction is controlled by identity verification timing (see below). Qualifying for 10 days saves $1,040 AUD — one of the clearest money-saving opportunities in the entire process.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">Pet Transport Agency — $2,500–$8,000+ AUD</h3>
            <p className="text-gray-700 text-sm leading-relaxed">For Group 3 routes, a specialist agency manages BICON application, RNATT lab coordination, quarantine booking, and airline cargo booking simultaneously. The cost is high, but the expertise often prevents far more expensive mistakes. Get quotes from multiple agencies.</p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section id="quarantine-cost" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What does pet quarantine actually cost?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All cats and dogs entering Australia (except from Group 1 countries) must complete quarantine at Mickleham Post Entry Quarantine Facility in Melbourne. The cost depends on the duration:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-extrabold text-green-700 mb-1">~$520 AUD</p>
            <p className="font-semibold text-green-800 mb-2">10-day stay</p>
            <p className="text-sm text-gray-600">Group 2 always. Group 3 if identity verified BEFORE RNATT blood draw.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-extrabold text-red-700 mb-1">~$1,560 AUD</p>
            <p className="font-semibold text-red-800 mb-2">30-day stay</p>
            <p className="text-sm text-gray-600">Group 3 only. Applies if identity verified AFTER RNATT blood draw.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
          <p className="font-semibold text-amber-800 mb-2">The most important tip on this page</p>
          <p className="text-amber-700 text-sm leading-relaxed">
            For Group 3 importers: have your dog&apos;s identity verified by an Official Veterinarian <strong>before</strong> the RNATT blood draw. This single timing decision determines whether you pay $520 or $1,560 for quarantine — a $1,040 AUD difference. It must be done in the correct order to count.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-3">
          Quarantine fees are official DAFF charges and do not include transport to and from Mickleham, which is located in Melbourne&apos;s northern suburbs. Factor in one or two taxi or transport costs for the collection day.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Quarantine spots are limited. Book as soon as you have your import permit — peak season (October to February) fills months in advance.
        </p>
      </section>

      {/* Section 5 */}
      <section id="transport-agency" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Do I need a pet transport agency?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          You are not legally required to use a pet transport agency. However, for Group 3 importers, the coordination required — BICON permit, RNATT lab selection, identity verification timing, quarantine booking, airline cargo booking, and health certificate timing — is genuinely complex. Many experienced travellers still make costly mistakes attempting it alone.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          A good pet transport agency will:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-5">
          <li>Manage your BICON import permit application</li>
          <li>Coordinate RNATT lab selection and ensure sample receipt is confirmed</li>
          <li>Advise on identity verification timing to secure 10-day quarantine</li>
          <li>Book and manage Mickleham quarantine</li>
          <li>Handle airline cargo bookings (pets require specialised cargo handling)</li>
          <li>Prepare and review all documentation before departure</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended agencies</h3>
        <div className="space-y-3 mb-5">
          {[
            { name: "Petraveller", desc: "Australian-based, strong international coverage, transparent pricing." },
            { name: "Dogtainers", desc: "One of Australia's largest and most experienced pet transport companies." },
            { name: "Jetpets", desc: "Australia-wide with strong international import expertise." },
          ].map((agency) => (
            <div key={agency.name} className="border border-gray-200 rounded-lg px-4 py-3 flex gap-3 items-start">
              <span className="font-semibold text-brand-600 min-w-[100px]">{agency.name}</span>
              <span className="text-gray-600 text-sm">{agency.desc}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-sm">
          Compare agencies at{" "}
          <Link href="/dashboard/agencies" className="text-brand-600 hover:underline">
            PetBorder Agency Comparison
          </Link>{" "}
          — real pricing ranges, links, and reviews.
        </p>
      </section>

      {/* Section 6 */}
      <section id="save-money" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to save money on pet import</h2>

        <ol className="space-y-5">
          {[
            {
              num: 1,
              title: "Verify identity BEFORE the RNATT blood draw",
              body: "For Group 3 importers, this single step determines whether you pay ~$520 or ~$1,560 for quarantine. Correct timing saves $1,040 AUD. Many importers miss this because the DAFF documentation is dense — make sure your pet transport agency or vet understands this timing requirement.",
            },
            {
              num: 2,
              title: "Book quarantine at least 6 months in advance",
              body: "Mickleham has limited capacity. Late bookings often face unavailability, forcing you to delay departure — which can cascade into airline rebooking fees, extra accommodation costs, and extended permit validity concerns.",
            },
            {
              num: 3,
              title: "Compare pet transport agencies",
              body: "Agency fees vary significantly for the same route. Get quotes from at least 3 agencies. Ask specifically whether BICON permit assistance is included in the fee — some agencies charge this separately.",
            },
            {
              num: 4,
              title: "Time the health certificate carefully",
              body: "The health certificate must be completed within 5 days before export. If you book a vet appointment too early and then change your travel date, you&apos;ll need a new certificate. Coordinate the vet appointment only after your quarantine booking and airline booking are confirmed.",
            },
            {
              num: 5,
              title: "Check if your pet transport company includes BICON",
              body: "Some full-service agencies include the BICON import permit application in their fee. Others charge it separately on top. Clarify this upfront — the permit itself costs $1,265 AUD regardless, but the preparation and submission labour cost can vary.",
            },
          ].map((tip) => (
            <li key={tip.num} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
                {tip.num}
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{tip.title}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{tip.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 7 — FAQ */}
      <section id="faq" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
        <dl className="space-y-5">
          {faqItems.map((item) => (
            <div key={item.question} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
              <dt className="font-semibold text-gray-900 mb-2">{item.question}</dt>
              <dd className="text-gray-700 text-sm leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Bottom CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-xl font-bold mb-2">Get your personalised cost estimate</p>
        <p className="text-white/80 mb-5">Free in 60 seconds — see every cost and step specific to your country and pet.</p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised timeline →
        </Link>
      </div>

      {/* Internal links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link href="/guides/bringing-dog-to-australia" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Bringing a Dog to Australia: The Complete 2026 Guide</p>
        </Link>
        <Link href="/guides/australia-pet-quarantine" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Australia Pet Quarantine: The Complete Mickleham Guide</p>
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
        <strong className="text-gray-700">Disclaimer:</strong> Cost estimates are based on DAFF rules and typical agency pricing last verified March 2026. Fees can change without notice. Always verify current DAFF fees at{" "}
        <a href="https://www.agriculture.gov.au" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">agriculture.gov.au</a>{" "}
        and obtain current quotes from agencies and vets before making any bookings. PetBorder is a planning tool, not legal or financial advice.
      </div>
    </>
  );
}
