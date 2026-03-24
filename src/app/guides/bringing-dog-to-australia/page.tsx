import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "Bringing a Dog to Australia: The Complete 2026 Guide";
const PAGE_DESC =
  "Everything you need to know about bringing your dog to Australia in 2026. DAFF groups, RNATT blood test, quarantine, costs and exact timelines explained.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/bringing-dog-to-australia",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/bringing-dog-to-australia",
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
    question: "Which airport do dogs enter Australia through?",
    answer:
      "All dogs (and cats) must enter Australia through Melbourne Airport only — Tullamarine. No other airport is approved for pet import, regardless of where you fly from.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "It depends on your origin country. Group 1 (New Zealand): a few weeks. Group 2 (UK, Ireland, Hawaii, Japan, Singapore): 3–4 months minimum. Group 3 (USA, Europe, most of Asia): 7–12 months minimum, due to the 180-day RNATT wait.",
  },
  {
    question: "Can I bring multiple dogs to Australia?",
    answer:
      "Yes. Each dog requires its own documentation — separate microchip, rabies vaccination record, health certificate, and (for Group 3) its own RNATT blood test with its own 180-day wait period. Plan well ahead if bringing multiple pets.",
  },
  {
    question: "What is the RNATT test?",
    answer:
      "RNATT stands for Rabies Neutralising Antibody Titre Test. It measures antibodies to confirm your dog has sufficient immunity from its rabies vaccination. DAFF requires it for all Group 3 countries. Critically, the mandatory 180-day wait starts from the date the blood sample is received by a DAFF-approved laboratory — not the date it was drawn.",
  },
  {
    question: "How do I book Mickleham quarantine?",
    answer:
      "Quarantine at Mickleham Post Entry Quarantine Facility must be booked through the DAFF website / BICON portal. You need your import permit number, your pet's microchip number, and your confirmed arrival date. Book as early as possible — spaces are limited and peak periods fill months in advance.",
  },
  {
    question: "Do I need a pet transport agency?",
    answer:
      "Not strictly required, but strongly recommended for Group 3 countries. The process involves coordinating permits, RNATT labs, quarantine bookings, and airline cargo logistics simultaneously. Experienced agencies such as Petraveller, Dogtainers, and Jetpets handle this daily and significantly reduce the risk of costly mistakes.",
  },
];

export default function BringingDogToAustraliaPage() {
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
          Bringing a Dog to Australia: The Complete DAFF Guide (2026)
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          Australia has some of the world&apos;s strictest pet import rules — but they&apos;re entirely navigable if you plan ahead. This guide covers every requirement, step, and cost you&apos;ll encounter when bringing your dog to Australia.
        </p>
        <ShareButtons title={PAGE_TITLE} description={PAGE_DESC} />
      </div>

      {/* Table of Contents */}
      <nav className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-10" aria-label="Table of contents">
        <p className="text-sm font-semibold text-brand-700 mb-3 uppercase tracking-wide">On this page</p>
        <ol className="space-y-1 text-sm">
          {[
            ["can-i-bring", "Can I bring my dog to Australia?"],
            ["daff-groups", "The 3 DAFF country groups"],
            ["step-by-step", "Step-by-step: How to bring your dog"],
            ["rnatt", "The RNATT blood test explained"],
            ["quarantine", "Mickleham quarantine: What to expect"],
            ["costs", "How much does it cost?"],
            ["breeds", "Breed restrictions"],
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Can I bring my dog to Australia?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Yes — you can bring your dog to Australia, but DAFF (the Australian Department of Agriculture, Fisheries and Forestry) enforces strict biosecurity requirements. Australia is rabies-free, and DAFF&apos;s rules exist to keep it that way.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          The most important facts to know upfront:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
          <li><strong>All dogs must enter Australia through Melbourne Airport only</strong> — no exceptions, regardless of where you&apos;re flying from.</li>
          <li>Your dog&apos;s requirements depend entirely on which country you&apos;re importing from — there are three groups with very different rules.</li>
          <li>The process can take anywhere from a few weeks (New Zealand) to over 12 months (USA, most of Europe) to complete.</li>
          <li>Planning ahead is critical — quarantine spots are limited and mistakes can reset your timeline entirely.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          The first step is determining which of the three DAFF country groups applies to you.
        </p>
      </section>

      {/* Section 2 */}
      <section id="daff-groups" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 3 DAFF country groups — which one are you?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          DAFF classifies every country into one of three groups based on its rabies and disease status. Your group determines which requirements apply and how long the process will take.
        </p>

        <div className="mb-6 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-1">Group 1 — Simplest process</h3>
            <p className="text-sm text-green-700">New Zealand, Norfolk Island, Cocos Islands</p>
            <p className="text-gray-700 text-sm mt-2">No quarantine required. No import permit needed. Minimal documentation. Timeline: a few weeks. These countries share Australia&apos;s disease-free status.</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-1">Group 2 — Moderate process</h3>
            <p className="text-sm text-yellow-700">UK, Ireland, Hawaii, Guam, Japan, Singapore, Taiwan, Hong Kong, Cyprus, Malta, Mauritius, and others</p>
            <p className="text-gray-700 text-sm mt-2">Rabies-free countries. Requires 10-day quarantine at Mickleham. No RNATT blood test needed. Timeline: 3–4 months minimum.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-1">Group 3 — Most complex process</h3>
            <p className="text-sm text-red-700">USA, Canada, most of Europe, Asia, South America, Africa, Middle East</p>
            <p className="text-gray-700 text-sm mt-2">Requires RNATT blood test + mandatory 180-day wait + import permit ($1,265 AUD) + 10–30 days quarantine. Timeline: 7–12 months minimum.</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">Country group comparison</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Group</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Example Countries</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Quarantine</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Import Permit</th>
                <th className="px-4 py-3 font-semibold text-gray-700">RNATT</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Min. Timeline</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Est. Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-green-700">Group 1</td>
                <td className="px-4 py-3 text-gray-600">NZ, Norfolk Is.</td>
                <td className="px-4 py-3 text-gray-600">None</td>
                <td className="px-4 py-3 text-gray-600">No</td>
                <td className="px-4 py-3 text-gray-600">No</td>
                <td className="px-4 py-3 text-gray-600">~4 weeks</td>
                <td className="px-4 py-3 text-gray-600">$1k–$3.5k AUD</td>
              </tr>
              <tr className="border-t border-gray-100 bg-gray-50">
                <td className="px-4 py-3 font-medium text-yellow-700">Group 2</td>
                <td className="px-4 py-3 text-gray-600">UK, Japan, Singapore</td>
                <td className="px-4 py-3 text-gray-600">10 days</td>
                <td className="px-4 py-3 text-gray-600">Yes</td>
                <td className="px-4 py-3 text-gray-600">No</td>
                <td className="px-4 py-3 text-gray-600">~4 months</td>
                <td className="px-4 py-3 text-gray-600">$3k–$6k AUD</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-red-700">Group 3</td>
                <td className="px-4 py-3 text-gray-600">USA, Europe, Asia</td>
                <td className="px-4 py-3 text-gray-600">10–30 days</td>
                <td className="px-4 py-3 text-gray-600">Yes</td>
                <td className="px-4 py-3 text-gray-600">Yes</td>
                <td className="px-4 py-3 text-gray-600">7–12 months</td>
                <td className="px-4 py-3 text-gray-600">$5k–$14k AUD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">Cost estimates include quarantine, permit, health certificate, and pet transport agency fees. Individual costs vary significantly.</p>
      </section>

      {/* Mid-page CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-lg font-semibold mb-2">Not sure which group applies to you?</p>
        <p className="text-white/80 mb-5 text-sm">Get a personalised step-by-step timeline with exact dates and costs for your specific situation.</p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised dog import timeline →
        </Link>
      </div>

      {/* Section 3 */}
      <section id="step-by-step" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-step: How to bring your dog to Australia</h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          The steps below apply to most importers. Group 1 and Group 2 skip several Group 3-specific requirements (noted in each step). The order matters — some steps are invalid if done out of sequence.
        </p>

        <ol className="space-y-5">
          {[
            {
              num: 1,
              title: "Get an ISO-compliant microchip implanted",
              body: "Your dog must have an ISO 11784/11785 compliant microchip. This must be implanted BEFORE the rabies vaccination and BEFORE any blood is drawn for RNATT. If the microchip is implanted after the rabies vaccination, the vaccination does not count — you will need to start again.",
            },
            {
              num: 2,
              title: "Administer the rabies vaccination",
              body: "After the microchip is confirmed readable, administer a course of rabies vaccination as required. The vaccination schedule must comply with DAFF requirements for your country group. Keep all vaccination records with dates, vaccine brand, and batch numbers.",
            },
            {
              num: 3,
              title: "Identity verification (critical timing for Group 3)",
              body: "For Group 3 importers, identity verification by an Official Veterinarian must happen BEFORE the RNATT blood draw. If you verify identity after the RNATT, your minimum quarantine increases from 10 days to 30 days — an extra 20 days and approximately $1,040 AUD. This is one of the most common and costly mistakes in the process.",
            },
            {
              num: 4,
              title: "RNATT blood test (Group 3 only)",
              body: "Book a blood draw at a DAFF-approved laboratory. The sample is sent to an approved RNATT lab. The mandatory 180-day wait starts from the date the laboratory RECEIVES the sample — not the date the blood was drawn. Choose your lab carefully and confirm receipt.",
            },
            {
              num: 5,
              title: "Wait 180 days from lab receipt date (Group 3 only)",
              body: "This is the longest part of the process for Group 3 importers. During this 180-day wait, your dog must remain in the origin country. Plan your accommodation and logistics accordingly — many families arrange temporary housing while waiting.",
            },
            {
              num: 6,
              title: "Apply for an import permit via BICON",
              body: "For Group 2 and Group 3, apply for an import permit through DAFF's BICON portal. The permit costs $1,265 AUD and is valid for 12 months from issue date. Allow time for processing and apply before your target travel date.",
            },
            {
              num: 7,
              title: "Book Mickleham quarantine",
              body: "Book your dog's quarantine stay at the Mickleham Post Entry Quarantine Facility via the DAFF website. You need the import permit number, microchip number, and confirmed arrival date. Book as early as possible — spaces are very limited, especially in peak periods (Oct–Feb). Airlines will not accept your pet without a confirmed quarantine booking.",
            },
            {
              num: 8,
              title: "Veterinary health certificate (within 5 days before export)",
              body: "Within 5 days of your export date, a DAFF-approved Official Veterinarian (OV) must complete and sign the official health certificate. This cannot be done earlier — the 5-day window is strict. The certificate confirms microchip identity, vaccination status, and overall health.",
            },
            {
              num: 9,
              title: "Fly to Melbourne — your dog is in cargo",
              body: "All pets travel as manifest cargo. Most airlines require you to book your dog as separate cargo freight. Book well in advance, and confirm the airline accepts pets on your specific route and aircraft type. Some airlines have seasonal or aircraft-specific restrictions.",
            },
            {
              num: 10,
              title: "Quarantine at Mickleham, then collection",
              body: "On arrival, DAFF staff receive your dog and transfer them to Mickleham. Quarantine is 10 days (Group 1: none, Group 2: always 10 days, Group 3: 10 or 30 days depending on identity verification timing). You cannot visit your pet during quarantine. After clearance, you collect your dog from Mickleham.",
            },
          ].map((step) => (
            <li key={step.num} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
                {step.num}
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{step.title}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 4 */}
      <section id="rnatt" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The RNATT blood test explained</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The Rabies Neutralising Antibody Titre Test (RNATT) is a blood test that measures your dog&apos;s antibody response to rabies vaccination. DAFF requires it for all Group 3 countries because these countries are not considered rabies-free — the test provides scientific proof your dog is adequately vaccinated before entering Australia.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          A titre level of ≥0.5 IU/mL is required to pass. If your dog&apos;s titre is below this threshold, you must revaccinate and retest — which resets the 180-day wait.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
          <p className="font-semibold text-amber-800 mb-1">Critical: When the 180-day wait starts</p>
          <p className="text-amber-700 text-sm leading-relaxed">
            The 180-day mandatory wait begins from the date the blood sample arrives at the DAFF-approved laboratory — <strong>not</strong> the date the blood was drawn from your dog. A sample drawn on 1 January and received by the lab on 3 January means your 180 days starts on 3 January. Always confirm the lab&apos;s receipt date in writing.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-3">
          You must use a DAFF-approved laboratory for the RNATT. Labs in the USA, Europe, and Australia are approved. Your vet or a pet transport agency can advise on the closest approved lab. Results typically take 2–4 weeks.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Once the 180-day wait is complete, you have a window to arrange travel and complete the remaining steps (health certificate, quarantine booking, airline booking) before your import permit expires.
        </p>
      </section>

      {/* Section 5 */}
      <section id="quarantine" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mickleham quarantine: What to expect</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          All dogs and cats entering Australia (except from Group 1 countries) must complete quarantine at the Mickleham Post Entry Quarantine Facility, located in Melbourne&apos;s northern suburbs. It is the only approved pet quarantine facility in Australia.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">10 days vs 30 days quarantine</h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          The length of quarantine depends on your group and identity verification timing:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-5">
          <li><strong>Group 1:</strong> No quarantine required.</li>
          <li><strong>Group 2:</strong> Always 10 days.</li>
          <li><strong>Group 3, identity verified BEFORE RNATT:</strong> 10 days minimum quarantine.</li>
          <li><strong>Group 3, identity verified AFTER RNATT:</strong> 30 days quarantine.</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-3">
          The 10-day vs 30-day distinction for Group 3 is controlled entirely by when identity verification is performed relative to the RNATT blood draw. Getting this right saves 20 days and approximately $1,040 AUD.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quarantine costs</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-5">
          <li>10-day quarantine: approximately <strong>$520 AUD</strong></li>
          <li>30-day quarantine: approximately <strong>$1,560 AUD</strong></li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-3">
          These are DAFF fees and do not include transport to and from the facility. Quarantine spots are limited — book as early as possible, especially for peak season travel (October through February).
        </p>
        <p className="text-gray-700 leading-relaxed">
          During quarantine, your dog is housed in an individual kennel with daily welfare checks and veterinary oversight. You cannot visit your pet during the quarantine period.
        </p>
      </section>

      {/* Section 6 */}
      <section id="costs" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How much does it cost to bring a dog to Australia?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Costs vary dramatically by country group. Here is a breakdown of the key expenses:
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Cost Item</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Group 1 (NZ)</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Group 2 (UK etc.)</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Group 3 (USA etc.)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Import permit (BICON)", "—", "—", "$1,265 AUD"],
                ["Quarantine", "—", "~$520", "~$520–$1,560"],
                ["RNATT test", "—", "—", "~$300–$600"],
                ["Health certificate", "~$200", "~$200", "~$200"],
                ["Pet transport agency", "$800–$3,000", "$2,000–$5,000", "$3,000–$8,000+"],
                ["Airline cargo", "$300–$800", "$500–$1,500", "$500–$1,500"],
                ["Total estimate", "$1,000–$3,500 AUD", "$3,000–$6,000 AUD", "$5,000–$14,000+ AUD"],
              ].map(([item, g1, g2, g3], idx) => (
                <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""} ${idx === 6 ? "font-semibold" : ""}`}>
                  <td className="px-4 py-3 text-gray-700">{item}</td>
                  <td className="px-4 py-3 text-gray-600">{g1}</td>
                  <td className="px-4 py-3 text-gray-600">{g2}</td>
                  <td className="px-4 py-3 text-gray-600">{g3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mb-5">All figures in AUD. Estimates only — verify current DAFF fees before booking. Pet transport agency costs vary significantly by route.</p>

        <p className="text-gray-700 leading-relaxed">
          The biggest hidden cost for Group 3 importers is often not in the list above — it&apos;s the accommodation and logistics cost of the 180-day wait, particularly if you&apos;re planning a move from the USA or Europe and need to delay your own departure to stay with your pet.
        </p>
      </section>

      {/* Section 7 */}
      <section id="breeds" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Breed restrictions</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Certain dog breeds are banned from import into Australia regardless of country of origin. These restrictions apply under the <em>Customs Act 1901</em> and DAFF biosecurity legislation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-5">
          <li>Pit Bull Terrier (including American Pit Bull)</li>
          <li>Dogo Argentino</li>
          <li>Fila Brasileiro</li>
          <li>Japanese Tosa</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-3">
          If you have a mixed-breed dog that may have characteristics of any of the above, DAFF may require a breed assessment.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>For cat owners:</strong> Bengal cats are now banned from import as of March 2026. The previous exemption for 5th-generation and beyond Bengals has been removed. Savannah cats remain banned regardless of generation.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Confirm your pet&apos;s eligibility with DAFF before beginning any preparation, as import of banned breeds will be refused and the animal may be returned or euthanised at the owner&apos;s expense.
        </p>
      </section>

      {/* Section 8 — FAQ */}
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
        <p className="text-xl font-bold mb-2">Get your personalised dog import timeline</p>
        <p className="text-white/80 mb-5">Free in 60 seconds. Know every step, deadline, and cost for your specific situation.</p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised dog import timeline — free in 60 seconds →
        </Link>
      </div>

      {/* Internal links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link href="/guides/australia-pet-quarantine" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Australia Pet Quarantine: The Complete Mickleham Guide</p>
        </Link>
        <Link href="/guides/pet-import-cost-australia" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Pet Import Australia Cost: 2026 Complete Breakdown</p>
        </Link>
        <Link href="/guides/moving-to-australia-from-uk-with-pet" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Moving to Australia from the UK with a Dog: 2026 Guide</p>
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
        <strong className="text-gray-700">Disclaimer:</strong> Based on DAFF rules last verified March 2026. Requirements can change without notice. Always confirm current requirements directly with the Australian Department of Agriculture, Fisheries and Forestry (DAFF) at{" "}
        <a href="https://www.agriculture.gov.au" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">agriculture.gov.au</a>{" "}
        before booking travel for your pet. PetBorder is a planning tool, not legal or veterinary advice.
      </div>
    </>
  );
}
