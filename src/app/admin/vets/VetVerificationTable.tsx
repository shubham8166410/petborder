"use client";

import { useState } from "react";
import type { AdminVetListItem } from "@/app/api/admin/vets/route";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";
import type { VetProfileRow } from "@/types/database";

type ActionState = {
  id: string;
  action: "approve" | "reject";
} | null;

function StatusBadge({ verifiedAt }: { verifiedAt: string | null }) {
  if (verifiedAt) {
    return (
      <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
        Verified
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
      Pending
    </span>
  );
}

export function VetVerificationTable({
  initialVets,
}: {
  initialVets: AdminVetListItem[];
}) {
  const [vets, setVets] = useState<AdminVetListItem[]>(initialVets);
  const [pendingAction, setPendingAction] = useState<ActionState>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(id: string, action: "approve" | "reject") {
    setPendingAction({ id, action });
    setError(null);

    try {
      const res = await fetch(`/api/admin/vets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (action === "reject" && res.status === 204) {
        // Remove from list
        setVets((prev) => prev.filter((v) => v.id !== id));
        return;
      }

      const json = (await res.json()) as
        | ApiSuccessResponse<VetProfileRow>
        | ApiErrorResponse;

      if (!res.ok || !json.success) {
        const errMsg = json.success === false ? json.error : "Action failed";
        setError(errMsg);
        return;
      }

      if (action === "approve") {
        const updated = json.data as VetProfileRow;
        setVets((prev) =>
          prev.map((v) =>
            v.id === id
              ? {
                  ...v,
                  verified_at: updated.verified_at,
                  daff_approved: updated.daff_approved,
                }
              : v
          )
        );
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPendingAction(null);
    }
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-[12px] border border-[#E5E3DF] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Clinic</th>
              <th className="px-6 py-3 font-medium">AHPRA</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Registered</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E3DF]">
            {vets.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No vet registrations found.
                </td>
              </tr>
            ) : (
              vets.map((vet) => {
                const isActing =
                  pendingAction?.id === vet.id;

                return (
                  <tr key={vet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {vet.user_email || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {vet.clinic_name ?? (
                        <span className="text-gray-400">Unknown</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-600">
                      {vet.ahpra_number ?? (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge verifiedAt={vet.verified_at} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(vet.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      {!vet.verified_at ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => void handleAction(vet.id, "approve")}
                            disabled={isActing}
                            className="rounded-lg bg-[#1B4F72] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#154060] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isActing && pendingAction?.action === "approve"
                              ? "Approving…"
                              : "Approve"}
                          </button>
                          <button
                            onClick={() => void handleAction(vet.id, "reject")}
                            disabled={isActing}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isActing && pendingAction?.action === "reject"
                              ? "Rejecting…"
                              : "Reject"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Verified{" "}
                          {vet.verified_at
                            ? formatDate(vet.verified_at)
                            : ""}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
