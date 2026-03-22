"use client";

import { useEffect, useState, useCallback } from "react";
import type { PetRow } from "@/types/database";
import { PetCard } from "./PetCard";
import { PetForm, type PetFormData } from "./PetForm";
import { Button } from "@/components/ui/Button";

const MAX_PETS = 5;

type ModalState =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; pet: PetRow };

export function PetManager() {
  const [pets, setPets] = useState<PetRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  const fetchPets = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/pets");
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Failed to load pets");
      }
      const data = (await res.json()) as PetRow[];
      setPets(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load pets";
      setFetchError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPets();
  }, [fetchPets]);

  async function handleAdd(data: PetFormData) {
    const res = await fetch("/api/pets", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to add pet");
    }
    const newPet = (await res.json()) as PetRow;
    setPets((prev) => [...prev, newPet]);
    setModal({ mode: "closed" });
  }

  async function handleEdit(pet: PetRow, data: PetFormData) {
    const res = await fetch(`/api/pets/${pet.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      throw new Error(body.error ?? "Failed to update pet");
    }
    const updated = (await res.json()) as PetRow;
    setPets((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setModal({ mode: "closed" });
  }

  async function handleDelete(pet: PetRow) {
    setActionError(null);
    const res = await fetch(`/api/pets/${pet.id}`, { method: "DELETE" });
    if (!res.ok) {
      let message = "Failed to delete pet";
      try {
        const body = (await res.json()) as { error?: string };
        message = body.error ?? message;
      } catch {
        // ignore parse error
      }
      setActionError(message);
      return;
    }
    setPets((prev) => prev.filter((p) => p.id !== pet.id));
  }

  const atLimit = pets.length >= MAX_PETS;

  return (
    <div>
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-gray-400" aria-live="polite" aria-label="Loading pets">
          <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      )}

      {/* Action error (e.g. delete failed) */}
      {actionError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {actionError}
        </div>
      )}

      {/* Fetch error */}
      {!isLoading && fetchError && (
        <div className="text-center py-12" role="alert">
          <p className="text-red-600 mb-4">{fetchError}</p>
          <Button variant="secondary" onClick={() => void fetchPets()}>Retry</Button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !fetchError && pets.length === 0 && modal.mode === "closed" && (
        <div className="text-center py-20 border border-dashed border-[#E5E3DF] rounded-2xl">
          <p className="text-gray-500 mb-4">No pets added yet. Add your first pet to get started.</p>
          <Button onClick={() => setModal({ mode: "add" })}>Add pet</Button>
        </div>
      )}

      {/* Pet list */}
      {!isLoading && !fetchError && pets.length > 0 && (
        <div className="flex flex-col gap-3">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onEdit={() => setModal({ mode: "edit", pet })}
              onDelete={() => void handleDelete(pet)}
            />
          ))}
        </div>
      )}

      {/* Add button */}
      {!isLoading && !fetchError && modal.mode === "closed" && pets.length > 0 && (
        <div className="mt-4">
          <Button
            onClick={() => setModal({ mode: "add" })}
            disabled={atLimit}
            title={atLimit ? "Maximum 5 pets reached" : undefined}
            aria-label={atLimit ? "Maximum 5 pets reached" : "Add pet"}
          >
            {atLimit ? "Maximum 5 pets reached" : "+ Add pet"}
          </Button>
        </div>
      )}

      {/* Inline modal — Add */}
      {modal.mode === "add" && (
        <div className="mt-6 bg-white border border-[#E5E3DF] rounded-2xl p-6" role="dialog" aria-modal="true" aria-labelledby="pet-form-title">
          <h2 id="pet-form-title" className="text-lg font-semibold text-gray-900 mb-5">Add a pet</h2>
          <PetForm
            onSubmit={handleAdd}
            onCancel={() => setModal({ mode: "closed" })}
          />
        </div>
      )}

      {/* Inline modal — Edit */}
      {modal.mode === "edit" && (
        <div className="mt-6 bg-white border border-[#E5E3DF] rounded-2xl p-6" role="dialog" aria-modal="true" aria-labelledby="pet-form-title">
          <h2 id="pet-form-title" className="text-lg font-semibold text-gray-900 mb-5">Edit pet</h2>
          <PetForm
            mode="edit"
            initial={{
              name: modal.pet.name,
              type: modal.pet.type,
              breed: modal.pet.breed,
              microchip_number: modal.pet.microchip_number ?? undefined,
              date_of_birth: modal.pet.date_of_birth ?? undefined,
            }}
            onSubmit={(data) => handleEdit(modal.pet, data)}
            onCancel={() => setModal({ mode: "closed" })}
          />
        </div>
      )}
    </div>
  );
}
