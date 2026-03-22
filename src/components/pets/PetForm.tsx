"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface PetFormData {
  name: string;
  type: "dog" | "cat";
  breed: string;
  microchip_number?: string;
  date_of_birth?: string;
}

interface FieldErrors {
  name?: string;
  type?: string;
  breed?: string;
  microchip_number?: string;
  date_of_birth?: string;
  form?: string;
}

interface PetFormProps {
  mode?: "add" | "edit";
  initial?: Partial<PetFormData>;
  onSubmit: (data: PetFormData) => Promise<void>;
  onCancel: () => void;
}

const MICROCHIP_REGEX = /^\d{15}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function validateForm(values: Partial<PetFormData>): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name?.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length > 50) {
    errors.name = "Name must be 50 characters or fewer";
  }

  if (!values.type) {
    errors.type = "Please select dog or cat";
  }

  if (!values.breed?.trim()) {
    errors.breed = "Breed is required";
  } else if (values.breed.trim().length > 100) {
    errors.breed = "Breed must be 100 characters or fewer";
  } else if (values.type === "cat" && /bengal/i.test(values.breed.trim())) {
    errors.breed = "Bengal cats are banned from import to Australia (effective March 2026)";
  }

  if (values.microchip_number && values.microchip_number.trim() !== "") {
    if (!MICROCHIP_REGEX.test(values.microchip_number.trim())) {
      errors.microchip_number = "Microchip number must be exactly 15 digits (ISO 11784/11785)";
    }
  }

  if (values.date_of_birth && values.date_of_birth.trim() !== "") {
    if (!DATE_REGEX.test(values.date_of_birth.trim())) {
      errors.date_of_birth = "Date must be in YYYY-MM-DD format";
    } else if (new Date(values.date_of_birth) > new Date()) {
      errors.date_of_birth = "Date of birth cannot be in the future";
    }
  }

  return errors;
}

export function PetForm({ mode = "add", initial, onSubmit, onCancel }: PetFormProps) {
  const [values, setValues] = useState<Partial<PetFormData>>({
    name: initial?.name ?? "",
    type: initial?.type,
    breed: initial?.breed ?? "",
    microchip_number: initial?.microchip_number ?? "",
    date_of_birth: initial?.date_of_birth ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof PetFormData>(key: K, value: PetFormData[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validateForm(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    try {
      const payload: PetFormData = {
        name: values.name!.trim(),
        type: values.type!,
        breed: values.breed!.trim(),
        ...(values.microchip_number?.trim()
          ? { microchip_number: values.microchip_number.trim() }
          : {}),
        ...(values.date_of_birth?.trim()
          ? { date_of_birth: values.date_of_birth.trim() }
          : {}),
      };
      await onSubmit(payload);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({ form: message });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isEditing = mode === "edit";

  return (
    <form onSubmit={handleSubmit} noValidate aria-label={isEditing ? "Edit pet" : "Add pet"}>
      <div className="flex flex-col gap-5">
        {/* Name */}
        <Input
          id="pet-name"
          label="Pet name"
          required
          placeholder="e.g. Rex"
          value={values.name ?? ""}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
          autoComplete="off"
        />

        {/* Type — card buttons */}
        <fieldset>
          <legend className="text-sm font-semibold text-gray-700 mb-2">
            Pet type <span className="text-red-500" aria-hidden="true">*</span>
          </legend>
          <div className="flex gap-3">
            {(["dog", "cat"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={values.type === t}
                onClick={() => set("type", t)}
                className={[
                  "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer capitalize",
                  values.type === t
                    ? "border-[#1B4F72] bg-[#EAF1F8] text-[#1B4F72]"
                    : "border-[#E5E3DF] bg-white text-gray-600 hover:border-gray-400",
                ].join(" ")}
              >
                {t === "dog" ? "Dog" : "Cat"}
              </button>
            ))}
          </div>
          {errors.type && (
            <p role="alert" className="text-xs text-red-600 mt-1.5">{errors.type}</p>
          )}
        </fieldset>

        {/* Breed */}
        <Input
          id="pet-breed"
          label="Breed"
          required
          placeholder="e.g. Labrador, Siamese"
          value={values.breed ?? ""}
          onChange={(e) => set("breed", e.target.value)}
          error={errors.breed}
          autoComplete="off"
        />

        {/* Microchip (optional) */}
        <Input
          id="pet-microchip"
          label="Microchip number (optional)"
          placeholder="e.g. 900123456789012"
          hint="15-digit ISO 11784/11785 number"
          value={values.microchip_number ?? ""}
          onChange={(e) => set("microchip_number", e.target.value)}
          error={errors.microchip_number}
          inputMode="numeric"
          maxLength={15}
          autoComplete="off"
        />

        {/* Date of birth (optional) */}
        <Input
          id="pet-dob"
          label="Date of birth (optional)"
          type="date"
          value={values.date_of_birth ?? ""}
          onChange={(e) => set("date_of_birth", e.target.value)}
          error={errors.date_of_birth}
          max={new Date().toISOString().split("T")[0]}
        />

        {/* Form-level error */}
        {errors.form && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
            {errors.form}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button type="submit" isLoading={isSubmitting} className="flex-1">
            {isEditing ? "Save changes" : "Add pet"}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
