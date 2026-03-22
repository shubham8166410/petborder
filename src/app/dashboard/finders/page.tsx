import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VetFinderList } from "@/components/finder/VetFinderList";
import { LabFinderList } from "@/components/finder/LabFinderList";

export const dynamic = "force-dynamic";

export default async function FindersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex flex-col min-h-screen bg-app-bg">
      <Header />
      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-gray-900">
              Find DAFF-Approved Services
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Locate accredited vets and RNATT labs for your pet&apos;s travel compliance.
            </p>
          </div>

          {/* Vet finder section */}
          <section aria-labelledby="vet-section-heading" className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 id="vet-section-heading" className="text-lg font-semibold text-gray-900">
                DAFF-Approved Vets
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-5 -mt-2 ml-11">
              These vets are accredited by DAFF to perform health checks, microchipping, and export documentation for international pet travel.
            </p>
            <VetFinderList />
          </section>

          {/* Lab finder section */}
          <section aria-labelledby="lab-section-heading">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v10.586a2 2 0 00.586 1.414l3 3a2 2 0 001.414.586H18a2 2 0 002-2V5a2 2 0 00-2-2H9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h5.586" />
                </svg>
              </div>
              <h2 id="lab-section-heading" className="text-lg font-semibold text-gray-900">
                RNATT-Approved Labs
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-5 -mt-2 ml-11">
              DAFF-approved laboratories that can process the Rabies Neutralising Antibody Titre Test (RNATT) required for Group 3 countries. Filter by your origin country code.
            </p>
            <LabFinderList />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
