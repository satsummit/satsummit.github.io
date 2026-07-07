import { system as baseSystem } from '../index';
import { buildEditionSystem, type EditionConfig } from '../edition-theme';

import stLouis2026 from './2026-st-louis';

// Register per-edition themes here, keyed by the edition's `cId` (its content
// filename, e.g. `2026-st-louis`). Editions absent from this map render with
// the global brand.
const registry: Record<string, EditionConfig> = {
  '2026-st-louis': stLouis2026
};

// Build every edition system once at module load. Identities are stable, so a
// consumer selecting the same edition twice gets the same object — the theme
// only repaints when the edition actually changes.
const systems: Record<string, ReturnType<typeof buildEditionSystem>> =
  Object.fromEntries(
    Object.entries(registry).map(([cId, theme]) => [
      cId,
      buildEditionSystem(theme)
    ])
  );

/**
 * Resolve the Chakra system for a page. Edition pages carry `editionCId` in
 * their page context; global pages pass nothing and get the base brand.
 */
export function getSystem(editionCId?: string | null) {
  if (editionCId && systems[editionCId]) {
    return systems[editionCId];
  }
  return baseSystem;
}
