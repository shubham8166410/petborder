import type { Metadata } from "next";
import Link from "next/link";
import { ShareButtons } from "@/components/guides/ShareButtons";

const PAGE_TITLE = "RNATT Test Australia: The Complete 2026 Guide";
const PAGE_DESC =
  "Everything about the RNATT rabies blood test for Australia. Approved labs, the 180-day rule, titre thresholds, costs, and what happens if your pet fails.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "https://petborder.com/guides/rnatt-test-australia",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "https://petborder.com/guides/rnatt-test-australia",
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
    question: "What does RNATT stand for?",
    answer:
      "RNATT stands for Rabies Neutralising Antibody Titre Test. It is a blood test that measures the level of rabies-neutralising antibodies in your pet's blood, confirming that the rabies vaccination has produced adequate immunity.",
  },
  {
    question: "When does the 180-day wait start?",
    answer:
      "The 180-day mandatory wait starts from the date the blood sample is RECEIVED by the DAFF-approved laboratory — not the date the blood was drawn from your pet. A 2-day postal delay means a 2-day later start to your countdown. Always confirm the lab receipt date in writing.",
  },
  {
    question: "What titre level is required to pass the RNATT?",
    answer:
      "Your pet must achieve a titre level of ≥0.5 IU/mL to pass. This is the DAFF-specified threshold. Most pets that have been properly vaccinated achieve this comfortably, but young pets, immunocompromised animals, or those with a poorly administered vaccination may fall below.",
  },
  {
    question: "Which labs are approved for the RNATT?",
    answer:
      "DAFF publishes a list of approved RNATT laboratories on the agriculture.gov.au website. Approved labs are located in the USA (Kansas State University, Auburn University), Europe (ANSES Laboratoire de Nancy in France, and others), and Australia. Your vet or a pet transport agency can direct you to the closest approved lab for your location.",
  },
  {
    question: "What happens if my pet fails the RNATT?",
    answer:
      "If your pet's titre falls below 0.5 IU/mL, you must revaccinate and wait at least 30 days before retesting. If the retest passes, a new 180-day wait begins from the date the new sample is received by the lab. The original 180-day wait does not carry over — the clock resets entirely.",
  },
  {
    question: "Do cats need the RNATT test?",
    answer:
      "Yes. The RNATT requirement applies to both dogs and cats importing from Group 3 countries. The same titre threshold (≥0.5 IU/mL), 180-day wait, and approved lab requirements apply to cats. Note: Bengal cats are banned from import into Australia as of March 2026.",
  },
  {
    question: "Can I do the RNATT in Australia?",
    answer:
      "No. The RNATT must be performed while your pet is still in the origin country, before your pet enters Australia. Some DAFF-approved labs are based in Australia, but the blood sample must be drawn in your origin country and sent to an approved lab internationally.",
  },
];

export default function RnattTestAustraliaPage() {
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
          The RNATT Test for Australia: Everything You Need to Know (2026)
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          The Rabies Neutralising Antibody Titre Test (RNATT) is one of the most
          critical — and most misunderstood — steps in bringing a pet to
          Australia from a Group 3 country. Get the 180-day rule wrong and your
          move could be delayed by months. This guide explains exactly how it
          works.
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
            ["what-is-rnatt", "What is the RNATT?"],
            ["who-needs-rnatt", "Who needs the RNATT?"],
            ["180-day-rule", "The 180-day rule explained"],
            ["approved-labs", "DAFF-approved labs"],
            ["step-by-step", "Step-by-step RNATT process"],
            ["costs", "How much does it cost?"],
            ["fail", "What if your pet fails?"],
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
      <section id="what-is-rnatt" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is the RNATT?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The Rabies Neutralising Antibody Titre Test (RNATT) is a blood test
          that measures the level of rabies-neutralising antibodies in your
          pet&apos;s bloodstream. It provides scientific confirmation that your
          pet&apos;s rabies vaccination has generated adequate immunity —
          specifically, that your pet could resist a rabies challenge.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Australia is one of only a handful of rabies-free countries in the
          world. The Australian Department of Agriculture, Fisheries and
          Forestry (DAFF) requires the RNATT as a biosecurity safeguard to
          ensure pets imported from rabies-risk countries carry demonstrable
          immunity before entering.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          Unlike a simple vaccination record check, the RNATT actually measures
          the immune response — it&apos;s possible for a pet to have received a
          rabies vaccination but still not develop sufficient antibody levels.
          The RNATT catches those cases.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-blue-800 mb-1">
            The required threshold
          </p>
          <p className="text-blue-700 text-sm leading-relaxed">
            Your pet must achieve a titre level of{" "}
            <strong>≥0.5 IU/mL</strong> (international units per millilitre) to
            pass the RNATT. This is the DAFF-specified minimum. Most
            well-vaccinated pets achieve this threshold on their first test.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section id="who-needs-rnatt" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Who needs the RNATT?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The RNATT is required for all pets (dogs and cats) importing from
          DAFF-classified Group 3 countries. Group 3 includes most of the world
          outside of New Zealand, the UK, Ireland, Hawaii, and a small number of
          other rabies-free territories.
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">
                  DAFF Group
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Example Countries
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  RNATT Required?
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  180-Day Wait?
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-green-700">
                  Group 1
                </td>
                <td className="px-4 py-3 text-gray-600">
                  New Zealand, Norfolk Island
                </td>
                <td className="px-4 py-3 text-green-700 font-medium">No</td>
                <td className="px-4 py-3 text-green-700 font-medium">No</td>
              </tr>
              <tr className="border-t border-gray-100 bg-gray-50">
                <td className="px-4 py-3 font-medium text-yellow-700">
                  Group 2
                </td>
                <td className="px-4 py-3 text-gray-600">
                  UK, Ireland, Hawaii, Japan, Singapore
                </td>
                <td className="px-4 py-3 text-green-700 font-medium">No</td>
                <td className="px-4 py-3 text-green-700 font-medium">No</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-red-700">Group 3</td>
                <td className="px-4 py-3 text-gray-600">
                  USA, Canada, Europe, Asia, South America, Africa
                </td>
                <td className="px-4 py-3 text-red-700 font-medium">
                  Yes — mandatory
                </td>
                <td className="px-4 py-3 text-red-700 font-medium">
                  Yes — 180 days from lab receipt
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you&apos;re unsure which group your origin country belongs to, use
          the PetBorder timeline generator — it identifies your group instantly
          based on the country you enter.
        </p>
      </section>

      {/* Section 3 */}
      <section id="180-day-rule" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The 180-day rule: The most critical detail
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          After your pet passes the RNATT, there is a mandatory 180-day waiting
          period before your pet can enter Australia. This is the single most
          impactful timing rule in the entire import process — it is responsible
          for most of the 7–12 month timeline for Group 3 importers.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
          <p className="font-semibold text-amber-800 mb-2">
            Critical: When does the 180 days start?
          </p>
          <p className="text-amber-700 text-sm leading-relaxed">
            The 180-day wait begins from the date the blood sample is{" "}
            <strong>received by the DAFF-approved laboratory</strong> — NOT the
            date the blood was drawn from your pet, and NOT the date the result
            was issued. Postal delays between your vet and the lab delay the
            clock start. Always confirm the exact receipt date with the lab in
            writing and keep this confirmation permanently.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Example timeline calculation
        </h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Event
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Blood drawn from pet",
                  "1 January",
                  "Drawn at vet clinic",
                ],
                [
                  "Sample shipped to lab",
                  "2 January",
                  "Posted next day",
                ],
                [
                  "Lab receives sample",
                  "4 January",
                  "Clock starts here — not Jan 1",
                ],
                [
                  "RNATT result issued",
                  "18 January",
                  "~2 weeks processing",
                ],
                [
                  "180-day wait ends",
                  "3 July",
                  "180 days from 4 January",
                ],
                [
                  "Earliest entry to Australia",
                  "4 July+",
                  "Plus import permit + quarantine booking",
                ],
              ].map(([event, date, note], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}
                >
                  <td className="px-4 py-3 text-gray-700">{event}</td>
                  <td className="px-4 py-3 text-gray-600 font-medium">
                    {date}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The 180-day wait cannot be shortened by any means — including early
          retesting, premium lab processing, or appeals. It is a fixed
          biosecurity requirement set by Australian law. Plan your move date
          around this constraint first, then build everything else backwards
          from it.
        </p>
      </section>

      {/* Mid-page CTA */}
      <div className="bg-brand-600 rounded-2xl p-8 text-center text-white mb-10">
        <p className="text-lg font-semibold mb-2">
          Know exactly when your 180-day wait ends
        </p>
        <p className="text-white/80 mb-5 text-sm">
          Enter your origin country and travel date — get a complete personalised
          timeline with your RNATT deadlines, blood draw date, and entry window.
        </p>
        <Link
          href="/generate"
          className="inline-block bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
        >
          Get your free personalised timeline →
        </Link>
      </div>

      {/* Section 4 */}
      <section id="approved-labs" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          DAFF-approved RNATT laboratories
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You must use a DAFF-approved laboratory for the RNATT. Using an
          unapproved lab — even one that measures the same titre — will result
          in your pet being denied entry. DAFF publishes the current list of
          approved labs at agriculture.gov.au.
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Lab Name
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Country
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Best For
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Turnaround
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Kansas State University Rabies Lab",
                  "USA (Kansas)",
                  "USA, Canada, Americas",
                  "10–14 days",
                ],
                [
                  "Auburn University Rabies Laboratory",
                  "USA (Alabama)",
                  "USA, Caribbean",
                  "10–14 days",
                ],
                [
                  "ANSES Laboratoire de Nancy",
                  "France",
                  "Europe, Middle East, Africa",
                  "10–21 days",
                ],
                [
                  "University of Ghent",
                  "Belgium",
                  "Europe",
                  "10–14 days",
                ],
                [
                  "APHA Weybridge",
                  "UK",
                  "UK, Europe",
                  "10–14 days",
                ],
                [
                  "Biosecurity Laboratory (CSIRO Geelong)",
                  "Australia",
                  "Australian confirmation testing",
                  "Varies",
                ],
              ].map(([lab, country, bestFor, turnaround], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-700">{lab}</td>
                  <td className="px-4 py-3 text-gray-600">{country}</td>
                  <td className="px-4 py-3 text-gray-600">{bestFor}</td>
                  <td className="px-4 py-3 text-gray-600">{turnaround}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          Always verify lab approval status directly at{" "}
          <a
            href="https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/approved-countries-laboratories-arrangements"
            className="text-brand-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            agriculture.gov.au
          </a>{" "}
          before booking. Lab approval status can change.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Your vet will take the blood sample and ship it to the chosen lab on
          your behalf. Choose a lab geographically close to your origin country
          to minimise shipping time and maximise the reliability of the transit.
          Use a trackable courier service — and always confirm the lab&apos;s
          receipt date.
        </p>
      </section>

      {/* Section 5 */}
      <section id="step-by-step" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Step-by-step RNATT process
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          The RNATT is not a standalone event — it sits within a strict sequence
          of steps. Getting the order wrong can be very costly.
        </p>

        <ol className="space-y-5">
          {[
            {
              num: 1,
              title: "Microchip first — before everything",
              body: "Your pet must have an ISO 11784/11785 compliant microchip implanted BEFORE the rabies vaccination is given. The microchip must be readable at the time of vaccination. If the microchip is implanted after the vaccination, the vaccination does not count and the entire sequence must start again.",
            },
            {
              num: 2,
              title: "Administer rabies vaccination",
              body: "After the microchip is confirmed readable, your vet administers a DAFF-compliant rabies vaccination course. Keep all vaccination records: date, vaccine brand, batch number, and administering vet's details.",
            },
            {
              num: 3,
              title: "Identity verification BEFORE the RNATT blood draw",
              body: "A DAFF-approved Official Veterinarian (OV) must verify your pet's identity (confirming the microchip matches vaccination records) BEFORE the RNATT blood is drawn. If identity is verified after the blood draw, your quarantine at Mickleham increases from 10 days to 30 days — an extra 20 days and approximately $1,040 AUD.",
            },
            {
              num: 4,
              title: "RNATT blood draw",
              body: "Your vet draws a blood sample from your pet. The sample is packaged for international shipping to your chosen DAFF-approved lab. Use a trackable courier with appropriate biological sample packaging.",
            },
            {
              num: 5,
              title: "Confirm lab receipt and start the 180-day clock",
              body: "Contact the lab to confirm they have received the sample. Ask for written confirmation of the receipt date. This date is day zero of your 180-day wait. Save this confirmation permanently.",
            },
            {
              num: 6,
              title: "Receive RNATT result",
              body: "The lab typically issues results within 10–21 days. The result will state your pet's titre level. A titre of ≥0.5 IU/mL is a pass. Keep the original certificate — you will need it for the import permit application and quarantine booking.",
            },
            {
              num: 7,
              title: "Wait 180 days from lab receipt date",
              body: "Your pet must remain in the origin country during the 180-day wait. You may proceed with other import preparation during this period: apply for the import permit via BICON, book Mickleham quarantine, arrange airline bookings.",
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

      {/* Section 6 */}
      <section id="costs" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How much does the RNATT cost?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The total cost of the RNATT includes the vet consultation, blood draw,
          laboratory testing fee, and international shipping. Here is a typical
          breakdown:
        </p>

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
                [
                  "Vet consultation + blood draw",
                  "$80–$200",
                  "Varies by vet and location",
                ],
                [
                  "DAFF-approved lab testing fee",
                  "$150–$350",
                  "Varies by lab",
                ],
                [
                  "International courier shipping",
                  "$80–$200",
                  "Biological sample packaging required",
                ],
                [
                  "RNATT total (per pet)",
                  "$300–$700",
                  "If first test passes",
                ],
                [
                  "If retest required (add)",
                  "+$300–$700",
                  "Full cost repeated",
                ],
              ].map(([item, cost, notes], idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""} ${idx === 3 ? "font-semibold" : ""}`}
                >
                  <td className="px-4 py-3 text-gray-700">{item}</td>
                  <td className="px-4 py-3 text-gray-600">{cost}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          All figures in AUD. Costs are estimates only — verify with your vet
          and chosen lab before proceeding.
        </p>
      </section>

      {/* Section 7 */}
      <section id="fail" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What happens if your pet fails the RNATT?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          A failed RNATT result (titre below 0.5 IU/mL) is disappointing but
          not the end of the process. Here is what happens:
        </p>

        <ol className="space-y-4 mb-5">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
              1
            </span>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Do not travel.</strong> Your pet cannot enter Australia
              with a failed RNATT. Wait for DAFF&apos;s official notification
              and review the result carefully.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
              2
            </span>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Revaccinate.</strong> Your vet administers a booster
              rabies vaccination. Wait at least 30 days after the booster before
              drawing blood for a retest.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
              3
            </span>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Retest and ship to an approved lab.</strong> If the retest
              passes, the 180-day wait begins again from the new lab receipt
              date. The original failed test&apos;s 180-day clock does not
              count.
            </p>
          </li>
        </ol>

        <p className="text-gray-700 leading-relaxed">
          Most pets that fail do so because of a poorly administered initial
          vaccination or a young immune system. A properly administered
          vaccination at a reputable vet clinic should result in a pass on the
          first attempt for the vast majority of healthy adult pets.
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
          Calculate your exact RNATT and 180-day deadlines
        </p>
        <p className="text-white/80 mb-5">
          Free personalised timeline in 60 seconds — enter your origin country
          and target travel date.
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
          href="/guides/bringing-dog-to-australia"
          className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-300 transition-colors"
        >
          <p className="text-xs text-gray-500 mb-1">Related guide</p>
          <p className="font-semibold text-brand-600 text-sm">
            Bringing a Dog to Australia: The Complete DAFF Guide
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
          href="https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/approved-countries-laboratories-arrangements"
          className="text-brand-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          DAFF — Approved laboratories for RNATT testing
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
