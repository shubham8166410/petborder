import type { PetRow } from "@/types/database";
import { Button } from "@/components/ui/Button";

interface PetCardProps {
  pet: PetRow;
  onEdit: () => void;
  onDelete: () => void;
}

function DogIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.212-1.343c.01.065.02.13.028.194A7.5 7.5 0 0121.75 22.5H2.25a.75.75 0 01-.75-.75v-2.625z" />
      <path d="M19.5 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM5.25 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  );
}

function CatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.5 3.75a.75.75 0 00-.75.75v.75l-.75.375A.75.75 0 003 6.375v1.875c0 1.242.676 2.33 1.682 2.914A7.504 7.504 0 0012 19.5a7.504 7.504 0 007.318-8.311A3.375 3.375 0 0021 8.25V6.375a.75.75 0 00-.75-.375L19.5 5.25v-.75A.75.75 0 0018.75 3.75H18a.75.75 0 00-.75.75v.75L15.75 6H8.25L6.75 5.25v-.75A.75.75 0 006 3.75H4.5zM9 10.5a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  return (
    <article
      className="bg-white border border-[#E5E3DF] rounded-xl p-5 flex items-start justify-between gap-4"
      aria-label={`${pet.name} the ${pet.type}`}
    >
      <div className="flex items-start gap-4">
        {/* Pet type icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EAF1F8] flex items-center justify-center text-[#1B4F72]">
          {pet.type === "dog" ? <DogIcon /> : <CatIcon />}
        </div>

        {/* Pet details */}
        <div>
          <h3 className="font-semibold text-gray-900 text-base leading-tight">{pet.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5 capitalize">
            {pet.type} &middot; {pet.breed}
          </p>
          {pet.microchip_number && (
            <p className="text-xs text-gray-400 mt-1">
              Microchip: <span className="font-mono">{pet.microchip_number}</span>
            </p>
          )}
          {pet.date_of_birth && (
            <p className="text-xs text-gray-400 mt-0.5">
              Born: {formatDate(pet.date_of_birth)}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={onEdit} aria-label={`Edit ${pet.name}`}>
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm(`Delete ${pet.name}? This cannot be undone.`)) {
              onDelete();
            }
          }}
          aria-label={`Delete ${pet.name}`}
          className="text-red-600 hover:bg-red-50"
        >
          Delete
        </Button>
      </div>
    </article>
  );
}
