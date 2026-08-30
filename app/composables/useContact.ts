// The studio inbox comes from runtime config (NUXT_PUBLIC_CONTACT_EMAIL) rather
// than being committed to the repo. Everything that needs it goes through these
// two helpers so the address and the endpoint derived from it cannot drift.

/** The studio inbox, or "" when it has not been configured yet. */
export function useContactEmail(): string {
  return (useRuntimeConfig().public.contactEmail as string) || "";
}

/**
 * FormSubmit's AJAX endpoint for the studio inbox.
 *
 * The `/ajax/` variant is used rather than a plain form `action`, because that
 * returns JSON instead of navigating the visitor to formsubmit.co — which keeps
 * the page's own translated sending / thanks / error states meaningful.
 *
 * Note that FormSubmit requires activation: the very first submission to a new
 * address triggers a confirmation email that must be clicked before any message
 * is forwarded.
 */
export function useContactFormEndpoint(): string {
  const email = useContactEmail();
  return email ? `https://formsubmit.co/ajax/${encodeURIComponent(email)}` : "";
}
