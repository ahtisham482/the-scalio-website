import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

// ─── Types ───
export type CardPosition = { row: number; col: number };

type CardFocusContextValue = {
  focusedSlug: string | null;
  setFocused: (slug: string | null) => void;
  registerCard: (slug: string, pos: CardPosition) => void;
  getPosition: (slug: string) => CardPosition | null;
};

const CardFocusContext = createContext<CardFocusContextValue | null>(null);

// ─── Provider ───
// Broadcasts which card in a grid is currently focused (hovered on desktop,
// scroll-centered on mobile). Children receive their role (focused / peer / idle)
// and adjust motion state accordingly. Backbone of the "Stage Lighting" concept.
export const CardFocusProvider = ({ children }: { children: ReactNode }) => {
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);
  const positionsRef = useRef<Map<string, CardPosition>>(new Map());

  const setFocused = useCallback((slug: string | null) => {
    setFocusedSlug(slug);
  }, []);

  const registerCard = useCallback((slug: string, pos: CardPosition) => {
    positionsRef.current.set(slug, pos);
  }, []);

  const getPosition = useCallback((slug: string): CardPosition | null => {
    return positionsRef.current.get(slug) ?? null;
  }, []);

  return (
    <CardFocusContext.Provider
      value={{ focusedSlug, setFocused, registerCard, getPosition }}
    >
      {children}
    </CardFocusContext.Provider>
  );
};

// ─── Hook ───
export const useCardFocus = () => {
  const ctx = useContext(CardFocusContext);
  if (!ctx) {
    throw new Error("useCardFocus must be used within CardFocusProvider");
  }
  return ctx;
};

// ─── Helpers ───

/**
 * Peer lean: computes the rotateX/rotateY angles for a peer card so it
 * visually "turns toward" the focused card.
 *
 * Sign convention (CSS 3D):
 *  - rotateY(negative) makes the RIGHT edge come FORWARD → used when focused is to the right
 *  - rotateX(positive) makes the BOTTOM edge come FORWARD → used when focused is below
 *
 * Distance is clamped to ±1 unit so far-away peers don't over-lean.
 */
export function computePeerLean(
  thisPos: CardPosition,
  focusedPos: CardPosition,
  maxAngle: number = 2,
): { rotateX: number; rotateY: number } {
  const deltaCol = focusedPos.col - thisPos.col;
  const deltaRow = focusedPos.row - thisPos.row;
  const clampedDx = Math.max(-1, Math.min(1, deltaCol));
  const clampedDy = Math.max(-1, Math.min(1, deltaRow));
  return {
    rotateY: -clampedDx * maxAngle,
    rotateX: clampedDy * maxAngle,
  };
}

/**
 * Radial-wave entrance: returns the Euclidean distance of a card from the
 * geometric center of the grid. Used as a stagger multiplier so entrance
 * animates outward from center instead of top-to-bottom.
 */
export function distanceFromCenter(
  pos: CardPosition,
  totalCols: number,
  totalRows: number,
): number {
  const centerCol = (totalCols - 1) / 2;
  const centerRow = (totalRows - 1) / 2;
  const deltaCol = pos.col - centerCol;
  const deltaRow = pos.row - centerRow;
  return Math.sqrt(deltaCol * deltaCol + deltaRow * deltaRow);
}
