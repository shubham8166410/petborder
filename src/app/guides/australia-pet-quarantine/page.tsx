import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "Australia Pet Quarantine 2026: Mickleham Guide";
const PAGE_DESC =
  "Everything about Australia's Mickleham pet quarantine facility. 10 vs 30 days, costs, booking, what to bring, and how to qualify for the shorter stay.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/australia-pet-quarantine",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/australia-pet-quarantine",
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
    question: "Where do pets quarantine when entering Australia?",
    answer:
      "All cats and dogs entering Australia (except from New Zealand and Norfolk Island) must quarantine at the Mickleham Post Entry Quarantine Facility, located in Melbourne's northern suburbs. It is the only approved quarantine facility in Australia for pet imports.",
  },
  {
    question: "How long is quarantine in Australia for pets?",
    answer:
      "It depends on your origin country and, for Group 3 importers, identity verification timing. Group 1 (NZ, Norfolk Island): no quarantine. Group 2 (UK, Ireland, Japan, Singapore, etc.): always 10 days. Group 3 (USA, Europe, Asia): 10 days if identity was verified before the RNATT blood draw; 30 days if verified after.",
  },
  {
    question: "Can I visit my pet during quarantine at Mickleham?",
    answer:
      "No. Mickleham Post Entry Quarantine Facility does not allow owner visits during the quarantine period. Your pet will be cared for by DAFF veterinary staff with daily welfare checks throughout the stay.",
  },
  {
    question: "How do I book Mickleham quarantine?",
    answer:
      "Book through DAFF's BICON portal or the DAFF website. You need your import permit number (Group 2/3), your pet's microchip number, and your confirmed arrival date. Your airline will not accept your pet without a confirmed quarantine booking. Book as early as possible — spots are limited.",
  },
  {
    question: "What can I send with my pet to Mickleham?",
    answer:
      "You may include comfort items such as a blanket or small soft toy with your scent. The facility provides food and bedding. Do not include rawhide, bones, or any items that may be prohibited under Australian biosecurity rules (untreated wood, soil-contaminated items, etc.).",
  },
  {
    question: "What happens if my pet fails the quarantine inspection?",
    answer:
      "If a health issue is detected on arrival or during quarantine, DAFF vets will assess the situation. Depending on severity, this may result in extended quarantine, treatment at the owner's expense, or in serious cases, return to the country of origin or euthanasia. This is extremely rare for well-prepared importers.",
  },
];

export default function AustraliaPetQuarantinePage() {
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
          Australia Pet Quarantine: The Complete Mickleham Guide (2026)
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          Every cat and dog entering Australia (except from New Zealand and Norfolk Island) must complete quarantine at Mickleham. Here is everything you need to know — duration, cost, booking, and the identity verification timing that can save you $1,040 AUD.
        </p>
        <ShareButtons title={PAGE_TITLE} description={PAGE_DESC} />
      </div>

      {/* Table of Contents */}
      <nav className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-10" aria-label="Table of contents">
        <p className="text-sm font-semibold text-brand-700 mb-3 uppercase tracking-wide">On this page</p>
        <ol className="space-y-1 text-sm">
          {[
            ["where", "Where do pets quarantine in Australia?"],
            ["duration", "10 days vs 30 days: how long is quarantine?"],
            ["cost", "What does quarantine cost?"],
            ["booking", "How to book Mickleham quarantine"],
            ["during", "What happens during quarantine?"],
            ["what-to-send", "What can I send with my pet?"],
            ["groups", "Which DAFF group does your country fall in?"],
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
      <section id="where" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Where do pets quarantine in Australia?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          All cats and dogs entering Australia must complete quarantine at the{" "}
          <strong>Mickleham Post Entry Quarantine Facility</strong>, located in Mickleham, Victoria — approximately 30 kilometres north of Melbourne CBD. This is the only approved pet quarantine facility in the country.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          The facility is operated and managed by DAFF (Australian Department of Agriculture, Fisheries and Forestry). It houses cats and dogs in separate, purpose-built individual kennels and cattery units under the supervision of accredited DAFF veterinary staff.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Because all international pet arrivals are channelled through a single facility with limited capacity, advance booking is essential. The facility cannot accommodate last-minute bookings, and airlines will not accept your pet without a confirmed quarantine reservation.
        </p>
        <p className="text-gray-700 leading-relaxed">
          All pets entering Australia must also arrive via Melbourne Airport — regardless of where you are flying from or where you ultimately intend to live in Australia. This is a non-negotiable DAFF requirement.
        </p>
      </section>

      {/* Section 2 */}
      <section id="duration" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10 days vs 30 days: how long is quarantine?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Quarantine duration is determined by your origin country group and, for Group 3, by a critical timing decision around identity verification.
        </p>

        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-5">
          <p className="font-bold text-amber-900 text-base mb-2">The most important fact on this page</p>
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Identity verification timing is the single most impactful decision in your pet import process.</strong> For Group 3 importers, having identity verified BEFORE the RNATT blood draw qualifies you for 10-day quarantine. Verified AFTER means 30-day quarantine. Done correctly, it saves 20 days and <strong>approximately $1,040 AUD</strong>.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Scenario</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Quarantine Duration</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Why</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Group 1 (NZ, Norfolk Island)", "0 days", "No quarantine required — country is considered disease-free."],
                ["Group 2 (UK, Ireland, Japan, Singapore, etc.)", "10 days", "Rabies-free country status. Always 10 days, no exceptions."],
                ["Group 3 — identity verified BEFORE RNATT", "10 days", "Correct timing qualifies for minimum quarantine period."],
                ["Group 3 — identity verified AFTER RNATT", "30 days", "Incorrect timing results in longer mandatory quarantine."],
              ].map(([scenario, days, reason], idx) => (
                <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3 text-gray-700 font-medium">{scenario}</td>
                  <td className={`px-4 py-3 font-bold ${days === "0 days" ? "text-green-600" : days === "10 days" ? "text-yellow-600" : "text-red-600"}`}>{days}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs leading-relaxed">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">What is identity verification?</h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          Identity verification is a formal confirmation by an Official Veterinarian (OV) that your dog is the same animal that was microchipped and vaccinated. The OV confirms the microchip number matches all records and signs off on the pet&apos;s identity.
        </p>
        <p className="text-gray-700 leading-relaxed">
          For Group 3 importers, DAFF requires this to happen before the RNATT blood draw. This is not always made explicit in general information about the process — it is critical to confirm with your vet or pet transport agency that they understand this sequencing requirement.
        </p>
      </section>

      {/* Mid-page CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-lg font-semibold mb-2">What quarantine applies to your pet?</p>
        <p className="text-white/80 mb-5 text-sm">Get a personalised timeline showing every step, deadline, and cost for your specific origin country.</p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised timeline →
        </Link>
      </div>

      {/* Section 3 */}
      <section id="cost" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What does quarantine cost?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-extrabold text-green-700 mb-1">~$520 AUD</p>
            <p className="font-semibold text-green-800 mb-2">10-day quarantine</p>
            <p className="text-sm text-gray-600">Applies to Group 2 (always) and Group 3 (identity verified before RNATT)</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-extrabold text-red-700 mb-1">~$1,560 AUD</p>
            <p className="font-semibold text-red-800 mb-2">30-day quarantine</p>
            <p className="text-sm text-gray-600">Group 3 only — when identity verified after RNATT blood draw</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-3">
          These are official DAFF fees charged for the quarantine stay itself. They do <strong>not</strong> include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-5 text-sm">
          <li>Transport from the airport to the Mickleham facility (handled by DAFF logistics on arrival)</li>
          <li>Transport from Mickleham to your home after quarantine ends (owner&apos;s responsibility)</li>
          <li>Any veterinary treatment required during quarantine (charged separately)</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          Quarantine availability is limited. DAFF recommends booking your quarantine spot as early as possible — ideally at the same time as your import permit application, and at least 6 months before your intended travel date. Peak season (October to February) fills fastest.
        </p>
      </section>

      {/* Section 4 */}
      <section id="booking" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to book Mickleham quarantine</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Quarantine must be booked through the DAFF BICON portal or via the DAFF website directly. Your airline will not accept your pet as cargo until you have a confirmed quarantine booking reference.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">What you need to book</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-5">
          <li>Your <strong>import permit number</strong> (issued via BICON — required for Group 2 and Group 3)</li>
          <li>Your pet&apos;s <strong>microchip number</strong> (15-digit ISO compliant number)</li>
          <li>Your <strong>confirmed arrival date</strong> into Melbourne Airport</li>
          <li>Your pet&apos;s species (dog or cat) and number of pets if travelling with multiple animals</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking timeline advice</h3>
        <div className="space-y-3 mb-4">
          {[
            { label: "6+ months before travel", text: "Ideal time to book quarantine. Ensures availability even during peak season. Do this as soon as your import permit is issued." },
            { label: "3–6 months before travel", text: "Acceptable for off-peak periods (March to September). May face limited availability for peak dates." },
            { label: "Less than 3 months", text: "High risk of unavailability, especially October–February. If unavailable, you may need to delay departure and rebook airline tickets." },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 border border-gray-200 rounded-lg p-3">
              <span className="font-semibold text-brand-600 text-sm min-w-[160px] shrink-0">{item.label}</span>
              <span className="text-gray-600 text-sm">{item.text}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          If you&apos;re using a pet transport agency, they will typically handle the quarantine booking on your behalf as part of their service. Confirm whether this is included before signing a contract.
        </p>
      </section>

      {/* Section 5 */}
      <section id="during" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What happens during quarantine?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here is a general overview of what your pet experiences at Mickleham:
        </p>

        <div className="space-y-4">
          {[
            {
              day: "Arrival day",
              desc: "DAFF staff receive your pet from the airline cargo handlers at Melbourne Airport. An initial arrival inspection confirms microchip identity against your documentation. Your pet is transported to Mickleham and settled into an individual kennel or cattery unit.",
            },
            {
              day: "Days 1–9 (or 1–29)",
              desc: "Your pet is housed in an individual unit — separate from all other animals. DAFF staff conduct daily welfare checks: food, water, behaviour, and physical health observations. Any health concerns are assessed by on-site DAFF veterinary staff. Pets are provided with standard food, bedding, and enrichment.",
            },
            {
              day: "Final health check",
              desc: "Before release, a final veterinary health assessment confirms your pet is healthy and meets all clearance criteria. If all is well, you are notified that your pet is ready for collection.",
            },
            {
              day: "Collection day",
              desc: "You collect your pet directly from the Mickleham facility. Bring photo ID and your import documentation. Arrange your own transport — the facility is in Mickleham, approximately 30km north of Melbourne CBD.",
            },
          ].map((phase) => (
            <div key={phase.day} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-brand-700 text-sm mb-1">{phase.day}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mt-5">
          <strong>Important:</strong> Owner visits are not permitted during the quarantine period. You will not be able to see or interact with your pet until collection day. This is a DAFF biosecurity requirement and cannot be waived.
        </p>
      </section>

      {/* Section 6 */}
      <section id="what-to-send" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What can I send with my pet?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You may include a small number of comfort items in your pet&apos;s travel crate to help them settle into quarantine. However, items are subject to biosecurity inspection and not all items will be permitted into the facility.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold text-green-800 mb-2">Permitted items (generally)</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Soft blanket or small item with your scent</li>
              <li>✓ Familiar soft toy (no stuffing that could contaminate)</li>
              <li>✓ Your pet&apos;s regular food (limited quantity)</li>
              <li>✓ Comfort items that have not been in contact with soil</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-semibold text-red-800 mb-2">Not permitted</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✗ Rawhide or raw bones</li>
              <li>✗ Items with soil contamination</li>
              <li>✗ Untreated wood or plant material</li>
              <li>✗ Prohibited biosecurity items</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          The facility provides standard food, bedding, and fresh water. If your pet has a specific diet or medical need, contact DAFF in advance of travel to arrange appropriate provision. Additional food or veterinary care during quarantine may incur extra charges.
        </p>
      </section>

      {/* Section 7 */}
      <section id="groups" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Which DAFF group does your country fall in?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Your DAFF group determines your quarantine duration and overall import requirements:
        </p>

        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-1">Group 1 — No quarantine</h3>
            <p className="text-sm text-gray-700">New Zealand, Norfolk Island, Cocos Islands</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-1">Group 2 — 10 days quarantine (always)</h3>
            <p className="text-sm text-gray-700">
              United Kingdom, Ireland, Hawaii, Guam, Japan, Singapore, Taiwan, Hong Kong, Cyprus, Malta, Mauritius, Réunion, New Caledonia, French Polynesia
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-1">Group 3 — 10 or 30 days quarantine</h3>
            <p className="text-sm text-gray-700">
              USA, Canada, most of Europe (including Germany, France, Netherlands, Spain, Italy), most of Asia (India, China, Thailand, Philippines, Vietnam, Indonesia, South Korea, etc.), South America, Africa, Middle East, and most other countries not listed in Groups 1 or 2.
            </p>
            <p className="text-sm text-amber-700 font-medium mt-2">Duration depends on identity verification timing relative to RNATT blood draw.</p>
          </div>
        </div>

        <p className="text-gray-700 text-sm mt-4">
          Not sure which group your country is in?{" "}
          <Link href="/generate" className="text-brand-600 hover:underline">
            Use our free timeline generator
          </Link>{" "}
          to find out instantly.
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
        <p className="text-xl font-bold mb-2">Know exactly what quarantine applies to you</p>
        <p className="text-white/80 mb-5">Get a personalised timeline showing your quarantine duration, cost, and every step before and after.</p>
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
        <Link href="/guides/pet-import-cost-australia" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Pet Import Australia Cost: 2026 Complete Breakdown</p>
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
        <strong className="text-gray-700">Disclaimer:</strong> Based on DAFF rules and fee schedules last verified March 2026. Quarantine fees, availability, and procedures can change without notice. Always confirm requirements and current fees directly with DAFF at{" "}
        <a href="https://www.agriculture.gov.au" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">agriculture.gov.au</a>{" "}
        before booking travel. PetBorder is a planning tool, not legal or veterinary advice.
      </div>
    </>
  );
}
