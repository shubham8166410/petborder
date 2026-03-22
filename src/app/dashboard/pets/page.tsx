import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PetManager } from "@/components/pets/PetManager";

// Always fetch fresh — pet data changes frequently
export const dynamic = "force-dynamic";

export default async function PetsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <Header />
      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Pets</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your pets and link them to travel timelines.
            </p>
          </div>

          <PetManager />
        </div>
      </main>
      <Footer />
    </div>
  );
}
