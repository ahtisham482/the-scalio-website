import { useCallback, useState } from "react";

/**
 * Tracks whether any descendant form control is focused, via focus-capture
 * events bubbling up to a wrapper element.
 *
 * Used by the CTA "Invitation" to drive form inhale/exhale behavior without
 * modifying the ContactForm component itself. Tab-between-fields does NOT
 * trigger exhale because we check if focus moves to another element inside
 * the same wrapper (relatedTarget containment).
 *
 * Usage:
 *   const { focused, onFocusCapture, onBlurCapture } = useFormAttention();
 *   <div onFocusCapture={onFocusCapture} onBlurCapture={onBlurCapture}>
 *     <ContactForm />
 *   </div>
 */
export function useFormAttention() {
  const [focused, setFocused] = useState(false);

  const onFocusCapture = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    // Only count focusable form controls (not clicks on labels, etc.)
    if (
      target.matches(
        "input, textarea, select, button:not([type='button']), [contenteditable='true']",
      )
    ) {
      setFocused(true);
    }
  }, []);

  const onBlurCapture = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const currentTarget = e.currentTarget;
    const related = e.relatedTarget as HTMLElement | null;
    // If focus is moving to another element INSIDE the wrapper (tab between
    // fields), don't exhale. Only exhale when focus leaves the wrapper entirely.
    if (related && currentTarget.contains(related)) {
      return;
    }
    setFocused(false);
  }, []);

  return { focused, onFocusCapture, onBlurCapture };
}
