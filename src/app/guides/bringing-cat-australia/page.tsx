import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "Bringing a Cat to Australia: The Complete 2026 Guide";
const PAGE_DESC =
  "Everything about importing a cat to Australia in 2026 — DAFF groups, Bengal cat ban, RNATT, quarantine, costs. Avoid the most common (and costly) mistakes.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/bringing-cat-australia",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/bringing-cat-australia",
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

const faqItems = [
  {
    question: "Are Bengal cats still allowed into Australia?",
    answer:
      "No. As of March 2026, Bengal cats are banned from import into Australia. The previous partial exemption for 5th-generation (F5+) Bengals has been removed. No Bengals — regardless of generation — may be imported. If you have a Bengal, you cannot bring it to Australia under the current rules.",
  },
  {
    question: "What breeds of cats are banned from import to Australia?",
    answer:
      "Bengal cats (banned March 2026) and Savannah cats (banned regardless of generation) cannot be imported into Australia. Confirm your cat's breed eligibility with DAFF before beginning any preparation.",
  },
  {
    question: "Do cats need the RNATT blood test?",
    answer:
      "Yes — cats importing from Group 3 countries (USA, Canada, most of Europe, Asia, Africa, South America, Middle East) require the RNATT rabies titre test with a mandatory 180-day wait from lab receipt date. Cats from Group 1 (New Zealand) and Group 2 (UK, Japan, Singapore, etc.) do not need the RNATT.",
  },
  {
    question: "Can my cat fly into Sydney instead of Melbourne?",
    answer:
      "No. All cats (and dogs) must enter Australia through Melbourne Airport — Tullamarine. No other airport is approved for pet import, regardless of your flight route or final destination in Australia.",
  },
  {
    question: "How long does it take to bring a cat to Australia from the USA?",
    answer:
      "From the USA (Group 3), you should budget 7–12 months minimum. The 180-day RNATT wait is the longest single step. Add time for the initial vaccination course, identity verification, RNATT result processing (2–4 weeks), import permit application, and quarantine booking. Starting earlier is always better.",
  },
  {
    question: "Do cats have to go to Mickleham quarantine?",
    answer:
      "Yes — all cats entering Australia from Group 2 or Group 3 countries must complete quarantine at the Mickleham Post Entry Quarantine Facility in Melbourne. Group 2 cats complete 10 days. Group 3 cats complete 10 days (if identity was verified before RNATT) or 30 days (if verified after). Group 1 cats (New Zealand) have no quarantine.",
  },
  {
    question: "Can I visit my cat during quarantine at Mickleham?",
    answer:
      "No. Visits to pets during quarantine at the Mickleham facility are not permitted. Your cat will be in an individual enclosure with daily welfare checks and access to veterinary care if needed. You can collect your cat after the quarantine period ends and DAFF issues clearance.",
  },
];

export default function BringingCatAustraliaPage() {
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
          Bringing a Cat to Australia: The Complete DAFF Guide (2026)
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          Importing a cat to Australia involves the same strict DAFF biosecurity
          process as dogs — but with one important difference: Bengal cats are
          now banned from import as of March 2026. This guide covers every
          requirement, the breed ban details, and the complete step-by-step
          process.
        </p>
        <ShareButtons title={PAGE_TITLE} description={PAGE_DESC} />
      </div>

      {/* Bengal ban alert */}
      <div className="bg-red-50 border border-red-300 rounded-xl p-5 mb-8">
        <p className="font-bold text-red-800 mb-2">
          Bengal cat import ban — effective March 2026
        </p>
        <p className="text-red-700 text-sm leading-relaxed">
          As of March 2026, <strong>Bengal cats are banned from import into Australia</strong>. The
          previous partial exemption for F5+ (5th generation and beyond) Bengals
          has been removed. No Bengals may be imported under the current rules.
          Savannah cats also remain banned regardless of generation. If you have
          either breed, you cannot bring them to Australia under current DAFF
          legislation.
        </p>
      </div>

      {/* Table of Contents */}
      <nav
        className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-10"
        aria-label="Table of contents"
      >
        <p className="text-sm font-semibold text-brand-700 mb-3 uppercase tracking-wide">
          On this page
        </p>
        <ol className="space-y-1 text-sm">
          {[
            ["can-i-bring", "Can I bring my cat to Australia?"],
            ["banned-breeds", "Banned breeds: Bengal and Savannah cats"],
            ["daff-groups", "The 3 DAFF country groups"],
            ["step-by-step", "Step-by-step: How to bring your cat"],
            ["quarantine", "Mickleham quarantine for cats"],
            ["costs", "How much does it cost?"],
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
      <section id="can-i-bring" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Can I bring my cat to Australia?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Yes — most cats can be imported into Australia, subject to DAFF
          biosecurity requirements. Australia is rabies-free, and DAFF enforces
          strict rules to maintain this status. The rules for cats are largely
          identical to those for dogs, with two key differences: the breed ban
          list includes Bengal and Savannah cats, and there is no tapeworm
          treatment requirement (unlike UK dogs).
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          The critical upfront facts:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>
            <strong>
              All cats must enter Australia through Melbourne Airport only
            </strong>{" "}
            — Tullamarine. No other airport is approved.
          </li>
          <li>
            Bengal cats and Savannah cats are banned from import under current
            DAFF rules.
          </li>
          <li>
            Your cat&apos;s requirements depend on which of three DAFF country
            groups you&apos;re importing from.
          </li>
          <li>
            The process takes 3–4 months minimum from Group 2 countries, and
            7–12 months minimum from Group 3 countries.
          </li>
          <li>
            Quarantine spaces at Mickleham are limited — book well in advance.
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section id="banned-breeds" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Banned cat breeds: Bengal and Savannah cats
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Australia restricts the import of cat breeds with wild cat ancestry
          due to biosecurity and environmental concerns. The two currently banned
          breeds are:
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-1">
              Bengal cats — banned from March 2026
            </h3>
            <p className="text-red-700 text-sm leading-relaxed">
              Previously, Bengals of the 5th generation (F5) or later could be
              imported under specific conditions. This exemption has been
              removed. As of March 2026, no Bengal cats may be imported into
              Australia, regardless of generation. This applies to cats already
              in transit — if a Bengal&apos;s import application is pending or
              in progress after the ban date, it will be refused.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-1">
              Savannah cats — permanently banned
            </h3>
            <p className="text-red-700 text-sm leading-relaxed">
              Savannah cats (a hybrid of domestic cats and African servals) are
              banned from import regardless of generation. No Savannah cat, at
              any generation level, may be imported into Australia.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-3">
          If you own a mixed-breed cat that may have Bengal or Savannah
          ancestry, DAFF may require a breed assessment or genetic testing before
          approving import. Confirm with DAFF before beginning any preparation.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Attempting to import a banned breed will result in refusal at the
          border. The cat may be required to leave Australia or be euthanised at
          the owner&apos;s expense.
        </p>
      </section>

      {/* Section 3 */}
      <section id="daff-groups" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The 3 DAFF country groups
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          DAFF classifies all countries into three groups. Your group determines
          the requirements, timeline, and costs:
        </p>

        <div className="mb-6 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-1">
              Group 1 — Simplest process
            </h3>
            <p className="text-sm text-green-700">
              New Zealand, Norfolk Island, Cocos Islands
            </p>
            <p className="text-gray-700 text-sm mt-2">
              No quarantine. No import permit. Minimal documentation. Timeline: a
              few weeks.
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-1">
              Group 2 — Moderate process
            </h3>
            <p className="text-sm text-yellow-700">
              UK, Ireland, Hawaii, Guam, Japan, Singapore, Taiwan, Hong Kong,
              Cyprus, Malta, Mauritius
            </p>
            <p className="text-gray-700 text-sm mt-2">
              10-day quarantine at Mickleham. Import permit required. No RNATT
              blood test. Timeline: 3–4 months minimum.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-1">
              Group 3 — Most complex process
            </h3>
            <p className="text-sm text-red-700">
              USA, Canada, most of Europe, Asia, South America, Africa, Middle
              East
            </p>
            <p className="text-gray-700 text-sm mt-2">
              RNATT blood test + mandatory 180-day wait + import permit ($1,265
              AUD) + 10–30 days quarantine. Timeline: 7–12 months minimum.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Group
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Quarantine
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Import Permit
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  RNATT
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Min. Timeline
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Est. Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Group 1", "None", "No", "No", "~4 weeks", "$800–$3k AUD"],
                [
                  "Group 2",
                  "10 days",
                  "Yes",
                  "No",
                  "~4 months",
                  "$2.5k–$6k AUD",
                ],
                [
                  "Group 3",
                  "10–30 days",
                  "Yes",
                  "Yes",
                  "7–12 months",
                  "$4k–$12k AUD",
                ],
              ].map(([group, q, permit, rnatt, timeline, cost], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {group}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{q}</td>
                  <td className="px-4 py-3 text-gray-600">{permit}</td>
                  <td className="px-4 py-3 text-gray-600">{rnatt}</td>
                  <td className="px-4 py-3 text-gray-600">{timeline}</td>
                  <td className="px-4 py-3 text-gray-600">{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mid-page CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-lg font-semibold mb-2">
          Get your cat&apos;s personalised DAFF timeline
        </p>
        <p className="text-white/80 mb-5 text-sm">
          Enter your origin country, travel date, and cat details — get exact
          dates and deadlines for every step.
        </p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised cat import timeline →
        </Link>
      </div>

      {/* Section 4 */}
      <section id="step-by-step" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Step-by-step: How to bring your cat to Australia
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          The following steps apply to Group 3 importers (the most complex
          case). Group 1 and Group 2 importers skip several steps as noted.
        </p>

        <ol className="space-y-5">
          {[
            {
              num: 1,
              title: "ISO-compliant microchip (before everything else)",
              body: "Your cat must have an ISO 11784/11785 compliant microchip implanted before the rabies vaccination is administered. The microchip must be readable and confirmed at the time of vaccination. Inserting the microchip after the vaccination invalidates that vaccination — you will need to restart.",
            },
            {
              num: 2,
              title: "Rabies vaccination",
              body: "Administer a DAFF-compliant rabies vaccination course after microchip confirmation. Keep all vaccination documentation: date, vaccine brand, batch number, and vet details.",
            },
            {
              num: 3,
              title:
                "Identity verification BEFORE the RNATT blood draw (Group 3)",
              body: "A DAFF-approved Official Veterinarian must confirm your cat's identity (microchip matches vaccination records) BEFORE the RNATT blood is drawn. Doing this after the blood draw increases your cat's quarantine from 10 days to 30 days — adding 20 days and approximately $1,040 AUD.",
            },
            {
              num: 4,
              title: "RNATT blood draw and laboratory submission (Group 3)",
              body: "Your vet draws blood and ships it to a DAFF-approved RNATT laboratory. Use a trackable courier. The 180-day mandatory wait begins on the date the laboratory RECEIVES the sample — not the draw date. Confirm receipt and keep the confirmation permanently.",
            },
            {
              num: 5,
              title: "Wait 180 days from lab receipt date (Group 3)",
              body: "Your cat must remain in the origin country during the 180-day wait. This period cannot be shortened. Use this time to apply for the import permit via BICON and book Mickleham quarantine.",
            },
            {
              num: 6,
              title: "Apply for import permit via BICON (Group 2 and 3)",
              body: "Apply for an import permit through DAFF's BICON portal. Cost: $1,265 AUD. Valid for 12 months from issue. Allow processing time and apply before your target travel date.",
            },
            {
              num: 7,
              title: "Book Mickleham quarantine",
              body: "Book your cat's quarantine at Mickleham Post Entry Quarantine Facility via the DAFF website. You need the import permit number, microchip number, and confirmed arrival date. Book early — spaces are limited, especially October through February.",
            },
            {
              num: 8,
              title: "Health certificate within 5 days of export",
              body: "Within 5 days of your departure date, a DAFF-approved Official Veterinarian must complete and sign the official health certificate. This window is strict and cannot be done earlier.",
            },
            {
              num: 9,
              title: "Fly to Melbourne — your cat travels as cargo",
              body: "All pets travel as manifest cargo. Book well in advance. Confirm your airline accepts cats on your specific route and aircraft type. Cats must be in an IATA-compliant travel crate.",
            },
            {
              num: 10,
              title: "Quarantine at Mickleham, then collection",
              body: "DAFF collects your cat at Melbourne Airport and transfers them to Mickleham. Quarantine duration: 0 days (Group 1), 10 days (Group 2 or Group 3 with early identity verification), or 30 days (Group 3 with late identity verification). You cannot visit during quarantine.",
            },
          ].map((step) => (
            <li key={step.num} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
                {step.num}
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{step.title}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 5 */}
      <section id="quarantine" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Mickleham quarantine for cats
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Mickleham Post Entry Quarantine Facility, located in Melbourne&apos;s
          northern suburbs, is the only approved pet quarantine facility in
          Australia. All cats from Group 2 and Group 3 countries must complete
          their quarantine here.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Cats are housed in individual enclosures designed for feline comfort —
          separate from dogs. Each cat receives daily welfare checks, food, and
          water. Veterinary care is available if needed. Visits are not
          permitted during the quarantine period.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Quarantine duration and cost
        </h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Scenario
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Duration
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Approx. Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Group 1 (New Zealand)", "None", "—"],
                ["Group 2 (UK, Japan, etc.)", "10 days", "~$520 AUD"],
                [
                  "Group 3 — identity verified BEFORE RNATT",
                  "10 days",
                  "~$520 AUD",
                ],
                [
                  "Group 3 — identity verified AFTER RNATT",
                  "30 days",
                  "~$1,560 AUD",
                ],
              ].map(([scenario, duration, cost], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}
                >
                  <td className="px-4 py-3 text-gray-700">{scenario}</td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {duration}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">
          Costs in AUD. Estimates only — verify current DAFF fees before
          booking. These fees cover quarantine only, not transport to/from the
          facility.
        </p>
      </section>

      {/* Section 6 */}
      <section id="costs" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How much does it cost to bring a cat to Australia?
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Cost Item
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Group 1 (NZ)
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Group 2 (UK etc.)
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Group 3 (USA etc.)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Import permit (BICON)", "—", "$1,265", "$1,265"],
                ["Quarantine at Mickleham", "—", "~$520", "~$520–$1,560"],
                ["RNATT blood test", "—", "—", "~$300–$600"],
                ["Health certificate", "~$150", "~$150", "~$150"],
                ["Pet transport agency", "$600–$2,500", "$2,000–$4,500", "$2,500–$7,000+"],
                ["Airline cargo fee", "$200–$600", "$400–$1,200", "$400–$1,200"],
                [
                  "Total estimate",
                  "$800–$3,000 AUD",
                  "$2,500–$6,000 AUD",
                  "$4,000–$12,000+ AUD",
                ],
              ].map(([item, g1, g2, g3], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""} ${idx === 6 ? "font-semibold" : ""}`}
                >
                  <td className="px-4 py-3 text-gray-700">{item}</td>
                  <td className="px-4 py-3 text-gray-600">{g1}</td>
                  <td className="px-4 py-3 text-gray-600">{g2}</td>
                  <td className="px-4 py-3 text-gray-600">{g3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">
          All figures in AUD. Estimates only — individual costs vary
          significantly by route, agent, and cat size.
        </p>
      </section>

      {/* Section 7 — FAQ */}
      <section id="faq" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently asked questions
        </h2>
        <dl className="space-y-5">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
            >
              <dt className="font-semibold text-gray-900 mb-2">
                {item.question}
              </dt>
              <dd className="text-gray-700 text-sm leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Bottom CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-xl font-bold mb-2">
          Get your personalised cat import timeline
        </p>
        <p className="text-white/80 mb-5">
          Free in 60 seconds. Every step, deadline, and cost for your exact
          situation.
        </p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised cat import timeline →
        </Link>
      </div>

      {/* Internal links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link
          href="/guides/rnatt-test-australia"
          className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
        >
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">
            RNATT Test Australia: The Complete 2026 Guide
          </p>
        </Link>
        <Link
          href="/guides/australia-pet-quarantine"
          className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
        >
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">
            Australia Pet Quarantine: The Complete Mickleham Guide
          </p>
        </Link>
        <Link
          href="/guides/pet-import-cost-australia"
          className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
        >
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">
            Pet Import Australia Cost: 2026 Complete Breakdown
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
