/**
 * Tests for pet type selection (dog/cat) cards.
 *
 * Verifies that the buttons render correctly, respond to click events,
 * and update state — which is the core mobile touch bug we fixed.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/outbound",
}));

// Stub next/dynamic — LottiePawSpinner only renders during submission,
// not during pet type selection, so a null stub is sufficient.
vi.mock("next/dynamic", () => ({
  default: (_loader: unknown) =>
    function DynamicStub() {
      return null;
    },
}));

// Stub OutboundTimelineResult (only shown after form submission)
vi.mock("@/components/outbound/OutboundTimelineResult", () => ({
  OutboundTimelineResult: () => null,
}));

// Stub TimelineResult (only shown after form submission)
vi.mock("@/components/timeline/TimelineResult", () => ({
  TimelineResult: () => null,
}));

import { OutboundForm } from "@/components/outbound/OutboundForm";
import { TimelineForm } from "@/components/timeline/TimelineForm";

// ── OutboundForm pet type tests ───────────────────────────────────────────────

describe("OutboundForm — pet type selection", () => {
  it("renders both dog and cat buttons", () => {
    render(<OutboundForm />);
    expect(screen.getByRole("button", { name: /dog/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cat/i })).toBeInTheDocument();
  });

  it("buttons are actual <button> elements (not divs)", () => {
    render(<OutboundForm />);
    expect(screen.getByRole("button", { name: /dog/i }).tagName).toBe("BUTTON");
    expect(screen.getByRole("button", { name: /cat/i }).tagName).toBe("BUTTON");
  });

  it("neither is selected by default", () => {
    render(<OutboundForm />);
    expect(screen.getByRole("button", { name: /dog/i })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /cat/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("clicking dog selects it", () => {
    render(<OutboundForm />);
    fireEvent.click(screen.getByRole("button", { name: /dog/i }));
    expect(screen.getByRole("button", { name: /dog/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("clicking cat selects it", () => {
    render(<OutboundForm />);
    fireEvent.click(screen.getByRole("button", { name: /cat/i }));
    expect(screen.getByRole("button", { name: /cat/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("selecting dog deselects cat", () => {
    render(<OutboundForm />);
    fireEvent.click(screen.getByRole("button", { name: /cat/i }));
    fireEvent.click(screen.getByRole("button", { name: /dog/i }));
    expect(screen.getByRole("button", { name: /dog/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /cat/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("selecting a pet type reveals the breed input", () => {
    render(<OutboundForm />);
    // Input has a `list` attribute so its ARIA role is "combobox", not "textbox"
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /dog/i }));
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});

// ── TimelineForm pet type tests ───────────────────────────────────────────────

describe("TimelineForm — pet type selection", () => {
  beforeEach(() => {
    // Mock the /api/countries fetch that TimelineForm calls on mount
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { name: "New Zealand", code: "NZ", group: 1 },
          { name: "United Kingdom", code: "GB", group: 2 },
          { name: "United States", code: "US", group: 3 },
        ],
      })
    );
  });

  it("renders both dog and cat buttons", async () => {
    render(<TimelineForm />);
    expect(screen.getByRole("button", { name: /dog/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cat/i })).toBeInTheDocument();
  });

  it("buttons are actual <button> elements", () => {
    render(<TimelineForm />);
    expect(screen.getByRole("button", { name: /dog/i }).tagName).toBe("BUTTON");
    expect(screen.getByRole("button", { name: /cat/i }).tagName).toBe("BUTTON");
  });

  it("neither is selected by default", () => {
    render(<TimelineForm />);
    expect(screen.getByRole("button", { name: /dog/i })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /cat/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("clicking dog selects it", () => {
    render(<TimelineForm />);
    fireEvent.click(screen.getByRole("button", { name: /dog/i }));
    expect(screen.getByRole("button", { name: /dog/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("clicking cat selects it", () => {
    render(<TimelineForm />);
    fireEvent.click(screen.getByRole("button", { name: /cat/i }));
    expect(screen.getByRole("button", { name: /cat/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("selecting dog deselects cat", () => {
    render(<TimelineForm />);
    fireEvent.click(screen.getByRole("button", { name: /cat/i }));
    fireEvent.click(screen.getByRole("button", { name: /dog/i }));
    expect(screen.getByRole("button", { name: /dog/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /cat/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("Continue button is disabled until pet type and breed are filled", async () => {
    render(<TimelineForm />);
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    expect(continueBtn).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /dog/i }));
    expect(continueBtn).toBeDisabled(); // still disabled — no breed yet
  });
});
