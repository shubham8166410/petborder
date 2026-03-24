import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "PetBorder's privacy policy — how we collect, use, and protect your personal information when you use our pet travel compliance planning service.",
  alternates: {
    canonical: "https://petborder.com/privacy",
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 March 2026";
const CONTACT_EMAIL = "privacy@petborder.com";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 mb-4">
            Last updated: {LAST_UPDATED}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-600 leading-relaxed">
            This Privacy Policy explains how PetBorder (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, stores, and protects your personal information when you use petborder.com. By using PetBorder, you agree to the practices described in this policy.
          </p>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 1. Who we are */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who we are</h2>
            <p className="mb-3">
              PetBorder is an online pet travel compliance planning service operated from Australia. We help pet owners navigate Australian Department of Agriculture, Fisheries and Forestry (DAFF) requirements for importing and exporting pets.
            </p>
            <p>
              For privacy enquiries, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>

          {/* 2. What information we collect */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. What information we collect</h2>

            <h3 className="font-semibold text-gray-800 mb-2">Information you provide directly</h3>
            <ul className="list-disc list-inside space-y-1.5 mb-4 text-sm">
              <li><strong>Account information:</strong> email address, name (when you sign up or use Google OAuth)</li>
              <li><strong>Pet details:</strong> pet type (dog or cat), breed, origin country, intended travel date — used to generate your compliance timeline</li>
              <li><strong>Contact information:</strong> name and message when you use our contact form</li>
              <li><strong>Payment information:</strong> processed directly by Stripe — we never see or store your card number</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Information collected automatically</h3>
            <ul className="list-disc list-inside space-y-1.5 mb-4 text-sm">
              <li><strong>Usage data:</strong> pages visited, features used, timeline generation events</li>
              <li><strong>Technical data:</strong> IP address (used for rate limiting), browser type, device type</li>
              <li><strong>Cookies:</strong> authentication session cookies (Supabase), preference cookies — see Section 7</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Information we do not collect</h3>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>We do not collect microchip numbers, passport numbers, or veterinary records</li>
              <li>We do not collect payment card numbers (Stripe handles this)</li>
              <li>We do not collect sensitive personal data such as health information about you (only about your pet)</li>
            </ul>
          </section>

          {/* 3. How we use your information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How we use your information</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700">Purpose</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Data used</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Legal basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Generate your pet compliance timeline", "Pet details, origin country, travel date", "Contract performance"],
                    ["Save and display your timelines", "Account info, pet details, generated timeline", "Contract performance"],
                    ["Process payments", "Email (passed to Stripe)", "Contract performance"],
                    ["Send DAFF deadline reminder emails", "Email, timeline data", "Legitimate interest / consent"],
                    ["Rate limit the timeline generator", "IP address", "Legitimate interest"],
                    ["Respond to support requests", "Name, email, message", "Legitimate interest"],
                    ["Improve the service", "Anonymised usage data", "Legitimate interest"],
                    ["Comply with legal obligations", "As required", "Legal obligation"],
                  ].map(([purpose, data, basis], idx) => (
                    <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}>
                      <td className="px-4 py-3 text-gray-700">{purpose}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{data}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Third-party services */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-party services we use</h2>
            <p className="mb-4">We use the following third-party services to operate PetBorder. Each has its own privacy policy:</p>
            <div className="space-y-3">
              {[
                {
                  name: "Supabase",
                  purpose: "Authentication, database storage (your account data, saved timelines, progress)",
                  location: "USA (AWS)",
                  link: "https://supabase.com/privacy",
                },
                {
                  name: "Stripe",
                  purpose: "Payment processing for document pack purchases and subscriptions",
                  location: "USA",
                  link: "https://stripe.com/privacy",
                },
                {
                  name: "Anthropic (Claude API)",
                  purpose: "AI generation of compliance timeline step descriptions — pet details are sent to the API",
                  location: "USA",
                  link: "https://www.anthropic.com/privacy",
                },
                {
                  name: "Resend",
                  purpose: "Transactional email (deadline reminders, purchase confirmations)",
                  location: "USA",
                  link: "https://resend.com/legal/privacy-policy",
                },
                {
                  name: "Vercel",
                  purpose: "Web hosting and deployment infrastructure",
                  location: "USA (global edge)",
                  link: "https://vercel.com/legal/privacy-policy",
                },
              ].map((s) => (
                <div key={s.name} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{s.purpose}</p>
                      <p className="text-gray-400 text-xs mt-0.5">Data location: {s.location}</p>
                    </div>
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline shrink-0">
                      Privacy policy ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              We do not sell your personal information to any third party. We do not use your data for advertising.
            </p>
          </section>

          {/* 5. Data retention */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data retention</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Account data:</strong> retained while your account is active. Deleted within 30 days of account deletion request.</li>
              <li><strong>Generated timelines:</strong> retained until you delete them, or for 2 years after your last login if your account becomes inactive.</li>
              <li><strong>Payment records:</strong> retained for 7 years to comply with Australian tax law.</li>
              <li><strong>Contact form messages:</strong> retained for 12 months then deleted.</li>
              <li><strong>IP addresses (rate limiting):</strong> retained for 24 hours only.</li>
              <li><strong>Usage analytics:</strong> retained in anonymised form for up to 3 years.</li>
            </ul>
          </section>

          {/* 6. Your rights */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-2 text-sm mb-4">
              <li><strong>Access:</strong> request a copy of the data we hold about you</li>
              <li><strong>Correction:</strong> update inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> request deletion of your account and associated data</li>
              <li><strong>Portability:</strong> receive your timeline data in a machine-readable format</li>
              <li><strong>Objection:</strong> object to processing based on legitimate interest</li>
              <li><strong>Withdraw consent:</strong> unsubscribe from reminder emails at any time via the unsubscribe link in emails</li>
            </ul>
            <p className="text-sm">
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline">
                {CONTACT_EMAIL}
              </a>. We will respond within 30 days.
            </p>
          </section>

          {/* 7. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Cookies</h2>
            <p className="mb-3">We use the following cookies:</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700">Cookie</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Purpose</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["sb-auth-token", "Authentication session — keeps you logged in", "Essential"],
                    ["sb-refresh-token", "Refreshes your authentication session automatically", "Essential"],
                  ].map(([name, purpose, type], idx) => (
                    <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 1 ? "bg-gray-50" : ""}`}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{name}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{purpose}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              We use only essential cookies required for the service to function. We do not use advertising or tracking cookies.
            </p>
          </section>

          {/* 8. Data security */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Data security</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>All data is transmitted over HTTPS (TLS encryption)</li>
              <li>Database access is protected by Supabase Row Level Security (RLS) — users can only access their own data</li>
              <li>Passwords are hashed and never stored in plain text</li>
              <li>API keys are hashed with bcrypt before storage</li>
              <li>Payment card data is never transmitted to or stored on PetBorder servers</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              While we apply industry-standard security measures, no system is completely secure. In the event of a data breach that affects your personal data, we will notify you as required by applicable law.
            </p>
          </section>

          {/* 9. International transfers */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. International data transfers</h2>
            <p className="text-sm">
              Our service providers (Supabase, Stripe, Anthropic, Resend, Vercel) are based in the USA and process data there. By using PetBorder, you consent to your data being transferred to and processed in the USA. We rely on Standard Contractual Clauses and Privacy Shield-equivalent mechanisms where applicable for transfers from the UK and EU.
            </p>
          </section>

          {/* 10. Australian Privacy Act */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Australian Privacy Act</h2>
            <p className="text-sm">
              PetBorder complies with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). If you are an Australian resident and believe we have breached the APPs, you may contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              or lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at{" "}
              <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                oaic.gov.au
              </a>.
            </p>
          </section>

          {/* 11. UK/EU GDPR */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. UK and EU users (GDPR / UK GDPR)</h2>
            <p className="text-sm mb-3">
              If you are located in the UK or European Economic Area, you have additional rights under GDPR / UK GDPR. Our legal basis for processing your data is set out in Section 3 above. You have the right to lodge a complaint with your local supervisory authority.
            </p>
            <p className="text-sm">
              For UK residents: Information Commissioner&apos;s Office (ICO) at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                ico.org.uk
              </a>.
            </p>
          </section>

          {/* 12. Children */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Children&apos;s privacy</h2>
            <p className="text-sm">
              PetBorder is not directed at children under 16. We do not knowingly collect personal information from children under 16. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
            </p>
          </section>

          {/* 13. Changes */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Changes to this policy</h2>
            <p className="text-sm">
              We may update this Privacy Policy from time to time. We will notify registered users of material changes by email or via a notice on the website. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Continued use of PetBorder after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* 14. Contact */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">14. Contact us</h2>
            <p className="text-sm">
              For any privacy-related questions or to exercise your rights, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              or via our{" "}
              <Link href="/contact" className="text-brand-600 hover:underline">
                contact form
              </Link>.
            </p>
          </section>
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-500">
          <Link href="/terms" className="text-brand-600 hover:underline">Terms of Use</Link>
          <Link href="/about" className="text-brand-600 hover:underline">About PetBorder</Link>
          <Link href="/contact" className="text-brand-600 hover:underline">Contact</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
