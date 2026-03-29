import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "Moving to Australia from the USA with a Pet: 2026 Guide";
const PAGE_DESC =
  "The complete guide to moving to Australia from the USA with a dog or cat. RNATT blood test, 180-day wait, USDA APHIS endorsement, Mickleham quarantine, and costs.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/moving-australia-usa-pet",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/moving-australia-usa-pet",
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
    question: "How long does it take to move a pet from the USA to Australia?",
    answer:
      "Budget a minimum of 7–12 months from the USA. The 180-day RNATT wait is the longest step. Add 4–6 weeks for the initial vaccination course, 2–4 weeks for RNATT result processing, and time for import permit approval, quarantine booking, and USDA endorsement. Start planning at least 10 months before your target travel date.",
  },
  {
    question: "Does the USA require a USDA APHIS endorsement for pet export?",
    answer:
      "Yes. The USA requires that your official veterinary health certificate be endorsed by a USDA-accredited veterinarian and then endorsed (apostilled) by USDA APHIS Animal Care before DAFF will accept it. This endorsement must be obtained within the same 5-day health certificate window before export. Work with an accredited vet familiar with this process.",
  },
  {
    question: "Which airport must my pet fly into?",
    answer:
      "All pets entering Australia must fly into Melbourne Airport (Tullamarine). No other airport is approved for pet import. If you are moving to Sydney, Brisbane, or another city, your pet must still fly into Melbourne and complete quarantine at Mickleham before you can transport them to your final destination.",
  },
  {
    question: "What is the RNATT titre threshold?",
    answer:
      "Your pet must achieve a titre of ≥0.5 IU/mL. The recommended DAFF-approved labs in the USA are Kansas State University Rabies Laboratory and Auburn University Rabies Laboratory. Allow 10–14 days for results from these labs.",
  },
  {
    question: "Can I visit my pet during quarantine at Mickleham?",
    answer:
      "No. Visits are not permitted during quarantine at Mickleham. Your pet will be in an individual kennel (dogs) or enclosure (cats) with daily welfare checks and veterinary access. You collect your pet once DAFF issues clearance after the quarantine period ends.",
  },
  {
    question: "How much does it cost to move a pet from the USA to Australia?",
    answer:
      "Budget $6,000–$14,000 AUD for the full process from the USA. This includes the $1,265 AUD import permit, $520 quarantine (10-day), RNATT testing ($300–$600), health certificate + USDA endorsement, pet transport agency fees ($3,000–$8,000+), and airline cargo fees. Using a specialist agency is strongly recommended for USA imports.",
  },
  {
    question: "Do I need a pet transport agency for a USA to Australia move?",
    answer:
      "Not legally required, but strongly recommended. The USA-to-Australia process involves coordinating USDA-accredited vets, DAFF-approved RNATT labs, BICON permit applications, Mickleham quarantine bookings, and airline cargo logistics across multiple timezones. Specialist agencies such as Petraveller, Dogtainers, and Jetpets handle this daily and significantly reduce the risk of costly errors.",
  },
];

export default function MovingAustraliaUsaPetPage() {
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
          Moving to Australia from the USA with a Pet: The Complete 2026 Guide
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          Moving a pet from the USA to Australia is one of the most
          documentation-intensive animal import processes in the world. The USA
          is a DAFF Group 3 country — meaning your pet requires the RNATT blood
          test, a 180-day wait, USDA APHIS endorsement, an import permit, and
          quarantine at Mickleham. This guide explains every step.
        </p>
        <ShareButtons title={PAGE_TITLE} description={PAGE_DESC} />
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
            ["usa-group-3", "USA is a Group 3 country — what that means"],
            ["timeline", "How long does the process take?"],
            ["step-by-step", "Step-by-step process from the USA"],
            ["usda-aphis", "USDA APHIS endorsement explained"],
            ["rnatt", "RNATT: The 180-day rule for USA pets"],
            ["quarantine", "Mickleham quarantine"],
            ["costs", "Full cost breakdown"],
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
      <section id="usa-group-3" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The USA is a DAFF Group 3 country
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Australia&apos;s Department of Agriculture, Fisheries and Forestry
          (DAFF) classifies all countries into three groups based on their rabies
          and disease status. The USA is classified as Group 3 — the most
          complex category — because it is not considered rabies-free.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Group 3 status means your pet must complete:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-5">
          <li>
            <strong>RNATT rabies titre test</strong> at a DAFF-approved
            laboratory, with a result of ≥0.5 IU/mL
          </li>
          <li>
            <strong>180-day mandatory wait</strong> from the date the lab
            receives the blood sample
          </li>
          <li>
            <strong>Import permit via BICON</strong> — $1,265 AUD, applied for
            through DAFF&apos;s online portal
          </li>
          <li>
            <strong>USDA APHIS endorsement</strong> of the official health
            certificate
          </li>
          <li>
            <strong>Quarantine at Mickleham</strong> — minimum 10 days (or 30
            days if identity verification was done after the RNATT blood draw)
          </li>
          <li>
            <strong>Entry through Melbourne Airport only</strong> — no other
            airport is approved
          </li>
        </ul>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="font-semibold text-amber-800 mb-1">
            Hawaii is different — it is Group 2
          </p>
          <p className="text-amber-700 text-sm leading-relaxed">
            Hawaii is classified separately from the mainland USA as a Group 2
            country. Pets from Hawaii do not require the RNATT or the 180-day
            wait. The process is significantly simpler and takes 3–4 months
            instead of 7–12.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section id="timeline" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How long does the process take from the USA?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The total timeline from the USA is typically 7–12 months. The 180-day
          RNATT wait dominates, but there are important steps before and after
          it. Here is a realistic timeline working backwards from a target
          travel date:
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Step</th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  When to Complete
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "ISO microchip implanted",
                  "10+ months before travel",
                  "Must be before rabies vaccination",
                ],
                [
                  "Rabies vaccination course",
                  "10 months before travel",
                  "Full course required",
                ],
                [
                  "Identity verification by OV",
                  "9–10 months before travel",
                  "Must be BEFORE RNATT blood draw",
                ],
                [
                  "RNATT blood drawn and shipped",
                  "9 months before travel",
                  "KSU or Auburn lab recommended",
                ],
                [
                  "Lab receives sample (Day 0 of 180)",
                  "~9 months before travel",
                  "180-day clock starts here",
                ],
                [
                  "RNATT result received",
                  "~8.5 months before travel",
                  "~2 weeks after lab receipt",
                ],
                [
                  "Apply for import permit (BICON)",
                  "7–8 months before travel",
                  "$1,265 AUD, valid 12 months",
                ],
                [
                  "Book Mickleham quarantine",
                  "6–8 months before travel",
                  "Book early — limited spaces",
                ],
                [
                  "180-day wait ends",
                  "~3 months before travel",
                  "Travel window opens after this",
                ],
                [
                  "Book airline cargo",
                  "2–3 months before travel",
                  "Must confirm quarantine slot first",
                ],
                [
                  "Health certificate + USDA APHIS endorsement",
                  "Within 5 days of departure",
                  "Cannot be done earlier",
                ],
                [
                  "Fly to Melbourne",
                  "Travel date",
                  "Melbourne Airport only",
                ],
                [
                  "Quarantine at Mickleham",
                  "Travel date + 10–30 days",
                  "10 or 30 days depending on IV timing",
                ],
              ].map(([step, when, notes], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {step}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{when}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mid-page CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-lg font-semibold mb-2">
          Get exact dates for your USA → Australia move
        </p>
        <p className="text-white/80 mb-5 text-sm">
          Enter your travel date and pet details — get a personalised step-by-step
          timeline with every DAFF deadline calculated for you.
        </p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised timeline →
        </Link>
      </div>

      {/* Section 3 */}
      <section id="step-by-step" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Step-by-step: Moving your pet from the USA to Australia
        </h2>

        <ol className="space-y-5">
          {[
            {
              num: 1,
              title: "ISO microchip — must be first",
              body: "Your pet must have an ISO 11784/11785 compliant microchip implanted before the rabies vaccination. US-standard 15-digit microchips are generally ISO compliant. If your pet already has a microchip, confirm it meets the ISO standard with your vet. The microchip number must be recorded on every subsequent document.",
            },
            {
              num: 2,
              title: "Rabies vaccination",
              body: "After microchip confirmation, your vet administers the rabies vaccination. The vaccine must be a DAFF-approved type. Keep full records: vaccination date, vaccine brand, lot number, and administering vet's name and USDA accreditation number.",
            },
            {
              num: 3,
              title: "Identity verification BEFORE the blood draw",
              body: "A DAFF-approved Official Veterinarian (OV) must verify your pet's identity (microchip matches all vaccination records) BEFORE the RNATT blood is drawn. In the USA, this is typically done by a USDA-accredited veterinarian. Doing this after the blood draw increases quarantine to 30 days — adding $1,040 AUD and 20 extra days.",
            },
            {
              num: 4,
              title: "RNATT blood draw — use a DAFF-approved US lab",
              body: "Your vet draws blood and ships it to a DAFF-approved laboratory. For US-based pets, the recommended labs are Kansas State University Rabies Laboratory (Manhattan, Kansas) or Auburn University Rabies Laboratory (Alabama). Use a trackable courier service for the shipment. Confirm the lab's receipt date — this is Day 0 of your 180-day wait.",
            },
            {
              num: 5,
              title: "Wait 180 days from KSU/Auburn lab receipt date",
              body: "The 180-day wait cannot be shortened. Your pet must remain in the USA during this period. Use this time to apply for the BICON import permit and book Mickleham quarantine. Note: you cannot physically move to Australia with your pet until the 180 days is complete and all other documentation is finalised.",
            },
            {
              num: 6,
              title: "Apply for BICON import permit",
              body: "Apply for an import permit via DAFF's BICON portal at bicon.agriculture.gov.au. Cost: $1,265 AUD. Valid for 12 months from issue date. You will need: your pet's microchip number, RNATT result, rabies vaccination records, and your intended arrival date in Melbourne.",
            },
            {
              num: 7,
              title: "Book Mickleham quarantine",
              body: "Book your pet's quarantine stay through the DAFF website. You need the import permit number, microchip number, and confirmed Melbourne arrival date. Book as early as possible — spaces are limited, particularly October through February. Airlines will not confirm your pet's cargo booking without a confirmed quarantine slot number.",
            },
            {
              num: 8,
              title: "Health certificate + USDA APHIS endorsement (within 5 days of departure)",
              body: "Within 5 days of your departure, a USDA-accredited veterinarian completes the official DAFF health certificate. This must then be endorsed by USDA APHIS Animal Care — your vet arranges this, but allow time for USDA processing (typically 1–3 days). This entire process must be completed within the 5-day window before your flight.",
            },
            {
              num: 9,
              title: "Book and confirm airline cargo",
              body: "All pets travel as manifest cargo, not in the cabin. Contact airlines well in advance — only some operate pet freight services, and not all aircraft types accept live animals. Qantas, United, and other major carriers operate Australia routes with pet cargo, but bookings fill quickly. Confirm your pet meets the airline's crate size and weight requirements.",
            },
            {
              num: 10,
              title: "Quarantine at Mickleham, then collection",
              body: "Your pet arrives at Melbourne Airport, where DAFF staff collect and transfer them to Mickleham. Minimum quarantine: 10 days (if identity was verified before RNATT) or 30 days (if after). You cannot visit during quarantine. After clearance, you collect your pet from Mickleham.",
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

      {/* Section 4 */}
      <section id="usda-aphis" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          USDA APHIS endorsement — a USA-specific requirement
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The USA adds an extra step that many other countries don&apos;t
          require: the official DAFF health certificate must be endorsed by USDA
          APHIS (Animal and Plant Health Inspection Service) Animal Care before
          DAFF will accept it. This is not a DAFF requirement — it is a US
          export requirement.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Here is how it works:
        </p>
        <ol className="space-y-3 mb-5">
          {[
            "A USDA-accredited veterinarian completes the DAFF-approved health certificate form within 5 days of your departure.",
            "The USDA-accredited vet submits the certificate to USDA APHIS Animal Care for endorsement (apostille). This can be done in person at a USDA APHIS Regional Office or electronically via the VS-17 system.",
            "USDA APHIS endorses the certificate — typically within 1–3 business days.",
            "You travel with the endorsed certificate. DAFF requires the original endorsed certificate on arrival.",
          ].map((step, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-700 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="font-semibold text-amber-800 mb-1">
            Allow enough time for USDA endorsement
          </p>
          <p className="text-amber-700 text-sm leading-relaxed">
            The 5-day health certificate window is tight. Your vet completes the
            cert, USDA endorses it, and you travel — all within 5 days. Work
            with a vet who has experience with Australian pet exports and has
            existing USDA APHIS processing channels. A pet transport agency can
            coordinate this entire sequence efficiently.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section id="rnatt" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          RNATT: The 180-day rule for USA pets
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The most critical detail in the RNATT process is when the 180-day
          wait starts. Most people assume it starts from the blood draw date —
          it does not.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
          <p className="font-semibold text-red-800 mb-1">
            The 180 days starts from LAB RECEIPT — not blood draw date
          </p>
          <p className="text-red-700 text-sm leading-relaxed">
            A sample drawn Monday and received by Kansas State University on
            Wednesday means your 180-day wait starts Wednesday — not Monday.
            Shipping delays extend this further. Always use overnight or 2-day
            trackable courier to the lab, and confirm the receipt date in
            writing immediately.
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-3">
          DAFF-approved labs for USA-based pets:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Kansas State University Rabies Laboratory</strong> —
            Manhattan, Kansas. Processing time: 10–14 days.
          </li>
          <li>
            <strong>Auburn University Rabies Laboratory</strong> — Auburn,
            Alabama. Processing time: 10–14 days.
          </li>
        </ul>
      </section>

      {/* Section 6 */}
      <section id="quarantine" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Mickleham quarantine for USA pets
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          All pets from the USA (Group 3) must complete quarantine at the
          Mickleham Post Entry Quarantine Facility in Melbourne. The duration
          depends entirely on when identity verification was performed:
        </p>
        <div className="space-y-3 mb-5">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-800 mb-1">
              10-day quarantine — if identity verified BEFORE RNATT blood draw
            </p>
            <p className="text-green-700 text-sm">
              Cost: approximately $520 AUD. This is the standard outcome when
              the process is done in the correct order.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-800 mb-1">
              30-day quarantine — if identity verified AFTER RNATT blood draw
            </p>
            <p className="text-red-700 text-sm">
              Cost: approximately $1,560 AUD. An extra $1,040 AUD and 20 extra
              days away from your pet — all avoided by doing the identity
              verification in the correct order.
            </p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Book Mickleham as early as possible once you have the RNATT result and
          import permit number. Spaces fill quickly, particularly in peak
          travel months. Airlines will not confirm your pet&apos;s cargo booking
          without a confirmed quarantine slot.
        </p>
      </section>

      {/* Section 7 */}
      <section id="costs" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Full cost breakdown: USA to Australia
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Cost Item
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Typical Range (AUD)
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["BICON import permit", "$1,265", "Fixed DAFF fee"],
                ["Quarantine at Mickleham (10 days)", "~$520", "If identity verified before RNATT"],
                ["Quarantine at Mickleham (30 days)", "~$1,560", "If identity verified after RNATT"],
                ["RNATT test + lab fee + courier", "$400–$800", "KSU or Auburn lab"],
                ["Health certificate + USDA APHIS endorsement", "$300–$600", "USDA-accredited vet + APHIS fee"],
                ["Pet transport agency", "$3,000–$8,000+", "Strongly recommended for US moves"],
                ["Airline cargo fee", "$500–$1,500", "Varies by route, airline, pet size"],
                ["Vaccinations + vet visits", "$400–$800", "Full course + wellness checks"],
                ["IATA travel crate", "$100–$500", "Required for airline cargo"],
                ["Total estimate", "$6,000–$14,000+ AUD", "Wide range based on pet size and agency"],
              ].map(([item, cost, notes], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""} ${idx === 9 ? "font-semibold" : ""}`}
                >
                  <td className="px-4 py-3 text-gray-700">{item}</td>
                  <td className="px-4 py-3 text-gray-600">{cost}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">
          All figures in AUD. Estimates only — verify current DAFF fees and get
          quotes from transport agencies. Costs vary significantly by route, pet
          size, and service level.
        </p>
      </section>

      {/* Section 8 — FAQ */}
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
          Get your personalised USA → Australia pet timeline
        </p>
        <p className="text-white/80 mb-5">
          Free in 60 seconds. Every DAFF deadline calculated — blood draw date,
          180-day end date, quarantine window, and more.
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
        Official sources:{" "}
        <a
          href="https://www.agriculture.gov.au/biosecurity-trade/cats-dogs"
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          DAFF — Bringing cats and dogs to Australia
        </a>
        {" · "}
        <a
          href="https://www.aphis.usda.gov/pet-travel"
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          USDA APHIS — Pet travel
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
        and USDA APHIS before booking travel for your pet. PetBorder is a
        planning tool, not legal or veterinary advice.
      </div>
    </>
  );
}
