"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description?: string;
}

export function ShareButtons({ title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  function getUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  function copyLink() {
    navigator.clipboard.writeText(getUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  }

  function shareOnWhatsApp() {
    const text = `${title} — ${getUrl()}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareOnLinkedIn() {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getUrl())}&title=${encodeURIComponent(title)}${description ? `&summary=${encodeURIComponent(description)}` : ""}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500 mr-1">Share:</span>

      {/* Copy link */}
      <button
        onClick={copyLink}
        aria-label="Copy link to clipboard"
        className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon />
            <span>Copy link</span>
          </>
        )}
      </button>

      {/* WhatsApp — highest priority for expat communities */}
      <button
        onClick={shareOnWhatsApp}
        aria-label="Share on WhatsApp"
        className="flex items-center gap-1.5 text-sm text-white bg-[#25D366] hover:bg-[#1ebe5d] rounded-lg px-3 py-2 transition-colors"
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </button>

      {/* Facebook */}
      <button
        onClick={shareOnFacebook}
        aria-label="Share on Facebook"
        className="flex items-center gap-1.5 text-sm text-white bg-[#1877F2] hover:bg-[#0d6ee3] rounded-lg px-3 py-2 transition-colors"
      >
        <FacebookIcon />
        <span>Facebook</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        aria-label="Share on LinkedIn"
        className="flex items-center gap-1.5 text-sm text-white bg-[#0A66C2] hover:bg-[#0958a8] rounded-lg px-3 py-2 transition-colors"
      >
        <LinkedInIcon />
        <span>LinkedIn</span>
      </button>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
