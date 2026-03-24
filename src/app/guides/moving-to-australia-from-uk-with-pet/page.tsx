import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "Moving to Australia from UK with a Dog: 2026 Guide";
const PAGE_DESC =
  "Complete guide to moving to Australia from the UK with your dog or cat. Step-by-step DAFF process, timelines, costs and what to do first.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/moving-to-australia-from-uk-with-pet",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/moving-to-australia-from-uk-with-pet",
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
    question: "Does my UK dog need a rabies blood test (RNATT) to enter Australia?",
    answer:
      "No. The UK is classified as DAFF Group 2 — a rabies-free country. The RNATT (Rabies Neutralising Antibody Titre Test) and the associated 180-day wait are only required for Group 3 countries (USA, Europe, most of Asia). UK pets need a current rabies vaccination but no blood test.",
  },
  {
    question: "Do I need an import permit for my UK dog?",
    answer:
      "No. Group 2 countries (including the UK) are exempt from the BICON import permit requirement. The $1,265 AUD permit is only required for Group 3 countries. This is a significant cost saving compared to importing from the USA or Europe.",
  },
  {
    question: "Which airport does my dog enter Australia through from the UK?",
    answer:
      "Melbourne Airport (Tullamarine) only. All pet imports enter Australia through Melbourne, regardless of your final destination within Australia. There are no direct pet-cargo flights from the UK to Sydney — your pet must arrive in Melbourne and complete 10 days at Mickleham before you can travel onward.",
  },
  {
    question: "How long is quarantine for UK pets in Australia?",
    answer:
      "10 days at the Mickleham Post Entry Quarantine Facility in Melbourne. Group 2 countries (including the UK, Ireland, Japan, Singapore) always receive the 10-day quarantine — there is no 30-day risk for UK importers because the 30-day rule only applies to Group 3 countries where identity verification happens after the RNATT blood draw.",
  },
  {
    question: "Can I use any UK vet for the health certificate?",
    answer:
      "No. The Australian health certificate must be completed and signed by an Official Veterinarian (OV) — a vet accredited by the Animal and Plant Health Agency (APHA) in the UK. Not all vets are OVs. Contact your regular vet to check if they hold OV accreditation, or find an OV through the APHA website.",
  },
  {
    question: "Is there a weight limit for pets from the UK?",
    answer:
      "DAFF has no weight limit for importing pets from the UK. However, airlines impose their own weight and size restrictions for pets travelling as cargo. Check with your specific airline and the pet transport agency you use, as policies vary by aircraft type and route.",
  },
  {
    question: "Can I visit my pet during quarantine at Mickleham?",
    answer:
      "No. Mickleham Post Entry Quarantine Facility does not allow owner visits during the quarantine period. DAFF veterinary staff care for your pet daily, but you cannot see or interact with your pet until collection on day 10.",
  },
  {
    question: "What happens if my pet fails the arrival inspection at Mickleham?",
    answer:
      "If a health concern is detected on arrival or during quarantine, DAFF vets will assess the situation. This may result in extended quarantine, required treatment at the owner's expense, or in serious biosecurity cases, return to the UK or euthanasia. This outcome is extremely rare for well-prepared importers with current vaccinations and clean health certificates.",
  },
];

export default function MovingToAustraliaFromUkWithPetPage() {
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
          Moving to Australia from the UK with Your Dog or Cat: Complete 2026 Guide
        </h1>

        {/* Prominent Group 2 callout */}
        <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-4">
          <p className="text-green-800 font-semibold text-sm">
            Good news for UK pet owners: The UK falls under DAFF Group 2 — no RNATT blood test, no 180-day wait, and no import permit required. Your total minimum timeline is 3–4 months, not 7–12.
          </p>
        </div>

        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          Thousands of UK families move to Australia each year — and thousands bring their pets. The process is more straightforward than Group 3 countries, but it still requires careful planning. This guide walks you through every step.
        </p>
        <ShareButtons title={PAGE_TITLE} description={PAGE_DESC} />
      </div>

      {/* Table of Contents */}
      <nav className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-10" aria-label="Table of contents">
        <p className="text-sm font-semibold text-brand-700 mb-3 uppercase tracking-wide">On this page</p>
        <ol className="space-y-1 text-sm">
          {[
            ["group2-status", "Why the UK gets Group 2 status"],
            ["step-by-step", "Step-by-step: The UK to Australia process"],
            ["timeline", "How long does the process take?"],
            ["costs", "How much does it cost from the UK?"],
            ["cabin", "Can my dog fly in the cabin?"],
            ["vet-certificate", "The UK vet certificate: what's required"],
            ["breeds", "Which UK breeds are restricted?"],
            ["tips", "Practical tips for UK families"],
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
      <section id="group2-status" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why the UK gets Group 2 status</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Australia classifies origin countries into three groups based on their disease status — particularly regarding rabies. The UK has been rabies-free since the early 20th century. Because Australia trusts the UK&apos;s veterinary health certificate as evidence of a rabies-free origin, UK pets benefit from a significantly simplified import process.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          What Group 2 status means in practice:
        </p>
        <ul className="list-none space-y-2 mb-4">
          {[
            ["No RNATT blood test", "The Rabies Neutralising Antibody Titre Test — and its 180-day mandatory wait — is only required for Group 3 countries. UK pets are exempt."],
            ["No import permit required", "The $1,265 AUD BICON import permit is only required for Group 3 countries. UK importers save this cost entirely."],
            ["Always 10-day quarantine", "Group 2 quarantine is always 10 days at Mickleham. There is no risk of 30-day quarantine — that only applies to Group 3."],
            ["3–4 month minimum timeline", "Without the 180-day RNATT wait, the process is dramatically faster. Plan for 3–4 months from decision to arrival in Australia."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-3 bg-green-50 rounded-lg p-3">
              <span className="text-green-500 font-bold text-lg shrink-0">✓</span>
              <div>
                <span className="font-semibold text-gray-900">{title}:</span>{" "}
                <span className="text-gray-700 text-sm">{desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Other countries in Group 2 include Ireland, Hawaii, Japan, Singapore, Taiwan, Hong Kong, Cyprus, Malta, and Mauritius. All benefit from the same simplified process.
        </p>
      </section>

      {/* Section 2 */}
      <section id="step-by-step" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The UK to Australia pet import process — step by step</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>Plan for at least 3–4 months minimum from your decision to your pet&apos;s arrival in Australia.</strong> Most UK families plan 4–6 months to allow comfortable buffer. Do not book your own flights until your pet&apos;s quarantine booking is confirmed.
        </p>

        <ol className="space-y-5 mb-6">
          {[
            {
              num: 1,
              when: "As early as possible",
              title: "Get an ISO-compliant microchip implanted",
              body: "Your dog or cat must have an ISO 11784/11785 compliant microchip. If your pet already has a UK microchip from a vet, this likely qualifies — confirm the standard. The microchip must be implanted BEFORE the rabies vaccination. If the order is reversed, the vaccination does not count for DAFF purposes.",
            },
            {
              num: 2,
              when: "After microchip confirmation",
              title: "Ensure rabies vaccination is current",
              body: "Your pet needs a current rabies vaccination. Most UK-vaccinated pets already have this as part of a pet passport. Confirm the vaccination dates, brand, and batch number — all are required for the health certificate. The vaccination course must comply with DAFF requirements.",
            },
            {
              num: 3,
              when: "As early as possible (6+ months before travel)",
              title: "Book Mickleham quarantine",
              body: "This is often the most overlooked step. Mickleham has limited capacity and peak periods (October–February) fill months in advance. Book through the DAFF website or BICON portal. You need your pet's microchip number and expected arrival date. Your airline will not accept your pet without this booking reference. Note: for Group 2 (UK), no import permit is needed — just the quarantine booking.",
            },
            {
              num: 4,
              when: "At least 4 weeks before departure",
              title: "Book airline cargo for your pet",
              body: "Pets travel as manifest cargo, not as carry-on luggage, for long-haul routes to Australia. Contact your airline early — not all flights or aircraft accept pets, and cargo space is limited. Most UK families use a pet transport agency that handles airline cargo booking as part of their service.",
            },
            {
              num: 5,
              when: "Within 5 days before export date",
              title: "Get the official veterinary health certificate",
              body: "Within 5 days of your departure date, an Official Veterinarian (OV) must complete and sign the DAFF-approved health certificate. This is a strict window — the certificate cannot be completed earlier. Coordinate this appointment only after your quarantine booking and airline booking are confirmed.",
            },
            {
              num: 6,
              when: "Departure day",
              title: "Fly to Melbourne",
              body: "All pets must arrive at Melbourne Airport (Tullamarine). There are no direct pet cargo flights from the UK to Sydney, Brisbane, or other Australian cities. Your pet travels separately in the cargo hold. Confirm your pet's crate meets IATA standards for air travel.",
            },
            {
              num: 7,
              when: "Day of arrival",
              title: "DAFF receives your pet at Melbourne Airport",
              body: "DAFF staff collect your pet from airline cargo and conduct an arrival inspection, confirming microchip identity against documentation. Your pet is then transported to Mickleham.",
            },
            {
              num: 8,
              when: "10 days at Mickleham",
              title: "Quarantine",
              body: "Your pet spends 10 days in individual quarantine at Mickleham with daily welfare checks and veterinary oversight. You cannot visit during this time. After clearance on day 10, you collect your pet directly from the facility.",
            },
          ].map((step) => (
            <li key={step.num} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
                {step.num}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900">{step.title}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{step.when}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">UK to Australia — step timeline summary</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Step</th>
                <th className="px-4 py-3 font-semibold text-gray-700">When to do it</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Microchip", "ASAP", "Must be before rabies vaccination"],
                ["Rabies vaccination", "After microchip", "Keep all records with dates and batch"],
                ["Book Mickleham quarantine", "6+ months before travel", "Limited capacity — book early"],
                ["Book airline cargo", "4–6 weeks before", "Not all flights accept pets"],
                ["Veterinary health certificate", "Within 5 days of departure", "Must be signed by Official Veterinarian (OV)"],
                ["Fly to Melbourne", "Departure date", "Melbourne Airport only"],
                ["Quarantine at Mickleham", "10 days post-arrival", "No visits permitted"],
                ["Collection from Mickleham", "After 10 days", "Arrange own transport"],
              ].map(([step, when, notes], idx) => (
                <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3 text-gray-700 font-medium">{step}</td>
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
        <p className="text-lg font-semibold mb-2">Get your personalised UK → Australia timeline</p>
        <p className="text-white/80 mb-5 text-sm">Free in 60 seconds — see exact dates, costs, and every step for your specific situation.</p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised timeline →
        </Link>
      </div>

      {/* Section 3 */}
      <section id="timeline" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How long does the process take from the UK?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The minimum realistic timeline from the UK to Australia is <strong>3–4 months</strong>. This accounts for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-5">
          <li>Microchip implantation (if needed) and confirmation</li>
          <li>Rabies vaccination course (timing requirements)</li>
          <li>Quarantine booking processing time</li>
          <li>Airline cargo booking lead time</li>
          <li>10-day quarantine period on arrival</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-3">
          Most UK families plan for <strong>4–6 months</strong> to allow comfortable buffer for any delays — veterinary appointment availability, airline schedule changes, or quarantine booking lead time during peak periods.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-amber-800 mb-1">Critical timing note</p>
          <p className="text-amber-700 text-sm leading-relaxed">
            Do not book your own flights to Australia until your pet&apos;s quarantine booking at Mickleham is confirmed. Quarantine spaces are not guaranteed and late unavailability could leave you travelling to Australia without your pet — and needing to delay their departure entirely.
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Compared to Group 3 importers (USA, Europe), the UK timeline is dramatically shorter. There is no RNATT blood test and no 180-day mandatory wait — the two biggest time drivers for Group 3 importers.
        </p>
      </section>

      {/* Section 4 */}
      <section id="costs" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How much does it cost to bring a pet from the UK to Australia?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          UK imports (Group 2) are considerably cheaper than Group 3 countries — primarily because there is no $1,265 import permit and no RNATT test cost. Here is a typical breakdown:
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Cost Item</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Estimated Cost (AUD)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Rabies vaccination (UK vet)", "~$100–$200"],
                ["Microchip implantation (if needed)", "~$50–$80"],
                ["Veterinary health certificate (OV)", "~$200–$400"],
                ["10-day Mickleham quarantine", "~$520 AUD"],
                ["Pet transport agency (recommended)", "$2,000–$5,000"],
                ["Airline cargo / excess baggage fee", "$500–$1,500"],
              ].map(([item, cost], idx) => (
                <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3 text-gray-700">{item}</td>
                  <td className="px-4 py-3 text-gray-600">{cost}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300 bg-brand-50 font-bold">
                <td className="px-4 py-3 text-gray-900">Total estimate</td>
                <td className="px-4 py-3 text-gray-900">$3,000–$7,500 AUD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mb-4">Estimates only. Individual costs vary by vet, agency, and airline. Verify current DAFF fees before booking.</p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="font-semibold text-green-800 mb-1">Group 2 saving vs Group 3</p>
          <p className="text-green-700 text-sm">
            UK importers save at minimum: $1,265 (import permit) + $500–$1,000 (RNATT test and lab) = approximately <strong>$1,765–$2,265 AUD</strong> compared to Group 3 importers — not counting the time and indirect costs of the 180-day wait.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section id="cabin" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Can my dog fly in the cabin from the UK?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          For long-haul flights from the UK to Australia, almost all major airlines require dogs to travel in the cargo hold — not in the passenger cabin. This applies to both small and large breeds. Some airlines allow very small dogs (typically under 8kg) in the cabin for short European routes, but Australia-bound flights are too long for cabin pet travel on most carriers.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Cats are generally subject to the same restrictions as dogs for long-haul routes.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Check your specific airline&apos;s pet cargo policy before booking</li>
          <li>Confirm the aircraft type — some long-haul aircraft have temperature-controlled cargo holds rated for live animal transport, others do not</li>
          <li>Some airlines ban pet cargo during summer months (Australian summer: November–March) due to heat risk</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Most UK families use a specialist pet transport agency to handle airline cargo bookings. Agencies have established relationships with airlines and knowledge of which routes and aircraft types accept pets in any given season.
        </p>
      </section>

      {/* Section 6 */}
      <section id="vet-certificate" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The UK vet certificate: what&apos;s required</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Australia requires an official veterinary health certificate in a DAFF-approved format. This is different from the UK pet passport used for travel within Europe.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
          <p className="font-semibold text-amber-800 mb-1">Must be an Official Veterinarian (OV)</p>
          <p className="text-amber-700 text-sm leading-relaxed">
            The Australian health certificate must be signed by an Official Veterinarian (OV) — a vet accredited by the UK&apos;s Animal and Plant Health Agency (APHA). Your regular vet may or may not hold OV accreditation. Check before booking the appointment. Using a non-OV vet will invalidate the certificate and DAFF will reject the import.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">What the certificate must include</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Pet&apos;s microchip number and confirmation it was scanned and matches</li>
          <li>Rabies vaccination dates, vaccine brand, and batch number</li>
          <li>OV&apos;s declaration that the pet is in good health and fit to travel</li>
          <li>DAFF-required declarations on the pet&apos;s origin, treatment history, and freedom from disease</li>
          <li>OV&apos;s signature, stamp, and APHA accreditation number</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>The 5-day window:</strong> The health certificate must be completed within 5 days before your export date. This is a strict DAFF requirement — certificates signed more than 5 days before departure are invalid. Do not book the OV appointment until your quarantine booking and airline booking are confirmed.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          If you change your travel date after the certificate is signed and the new date falls outside the 5-day window, you will need a new certificate. This means another OV appointment and another fee.
        </p>
      </section>

      {/* Section 7 */}
      <section id="breeds" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Which UK breeds are restricted from entering Australia?</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Certain dog breeds are banned from import into Australia regardless of country of origin. These restrictions apply under Australian federal legislation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-5">
          <li><strong>Pit Bull Terrier</strong> (including American Pit Bull Terrier)</li>
          <li><strong>Dogo Argentino</strong></li>
          <li><strong>Fila Brasileiro</strong></li>
          <li><strong>Japanese Tosa</strong></li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-3">
          These restrictions apply regardless of whether your dog was bred or born in the UK. If your dog is a mixed breed with characteristics of any banned breed, DAFF may require a breed assessment before approving import.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>For cat owners:</strong> Bengal cats are banned from import to Australia as of March 2026. The previous exemption for 5th-generation and beyond Bengals has been removed. Savannah cats remain banned regardless of generation.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If you have any doubt about your pet&apos;s eligibility, contact DAFF before beginning any preparations. Import of banned breeds will be refused, and the animal may be returned to the UK or euthanised at the owner&apos;s expense.
        </p>
      </section>

      {/* Section 8 */}
      <section id="tips" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical tips for UK families moving with pets</h2>

        <ol className="space-y-4">
          {[
            {
              num: 1,
              title: "Use an accredited Official Veterinarian (OV) — don't assume your regular vet qualifies",
              body: "This is the most common mistake UK importers make. Your beloved local vet may not hold OV accreditation. Check the APHA register before booking the health certificate appointment. An invalid certificate means DAFF refuses entry.",
            },
            {
              num: 2,
              title: "Book quarantine at least 6 months in advance",
              body: "Mickleham has limited capacity. UK families moving in the Australian peak period (November–February) face the highest competition for quarantine spots. Book quarantine as early as your import permit/quarantine booking process allows.",
            },
            {
              num: 3,
              title: "Remember: pets fly into Melbourne only, not Sydney",
              body: "There is no direct pet cargo route from the UK to Sydney. All pets enter through Melbourne. If you are moving to Sydney, Brisbane, or elsewhere in Australia, you will need to arrange onward transport for your pet after they clear quarantine at Mickleham in Melbourne — either by road or on a domestic flight.",
            },
            {
              num: 4,
              title: "Consider timing around Australian seasons",
              body: "Australian summer (November–March) brings extreme heat in many states. Long-haul pet cargo travel in summer heat can be stressful and some airlines restrict pet cargo during hot periods. Travelling in the Australian autumn (March–May) or winter (June–August) is generally gentler on pets.",
            },
            {
              num: 5,
              title: "Keep meticulous copies of every document",
              body: "Microchip implant record, vaccination certificate, OV health certificate, quarantine booking confirmation, import permit (Group 3), airline cargo booking — keep physical and digital copies of everything. Carry hard copies personally in addition to those travelling with your pet.",
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

      {/* Section 9 — FAQ */}
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
        <p className="text-xl font-bold mb-2">Get your personalised UK → Australia timeline</p>
        <p className="text-white/80 mb-5">Free in 60 seconds — know every step, deadline, and cost before you book anything.</p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised dog import timeline →
        </Link>
      </div>

      {/* Internal links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link href="/guides/bringing-dog-to-australia" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Bringing a Dog to Australia: The Complete 2026 Guide</p>
        </Link>
        <Link href="/guides/australia-pet-quarantine" className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors">
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">Australia Pet Quarantine: The Complete Mickleham Guide</p>
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
          href="https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/how-to-import"
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          DAFF — How to import cats and dogs to Australia
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
