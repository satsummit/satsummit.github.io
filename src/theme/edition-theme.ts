import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { hugConfig } from '@devseed-ui/hug-chakra';

import { baseConfig } from './index';

// =============================================================================
// PER-EDITION THEME
// =============================================================================
// An edition may override ANY part of the theme. An edition module exports a
// full Chakra config (the same shape as the global `baseConfig`): tokens,
// semanticTokens, recipes, globalCss — all fair game. That config is merged on
// top of the base brand, so anything an edition omits is inherited unchanged.
//
// Authoring notes:
// - Use `defineEditionTheme` (this is Chakra's `defineConfig`) for full type
//   checking and autocomplete over the entire theme surface.
// - Use `createColorPalette` (from ./color-palette) to expand a base hex into
//   the full 50-900 (+ alpha) palette, exactly like the base theme does. The
//   base semantic tokens (primary.fg, primary.subtle, …) reference colors by
//   name, so they recompute automatically when an edition overrides a palette.
// - A new font family must also be registered with `gatsby-plugin-webfonts` in
//   gatsby-config.mjs, otherwise it falls back to a system font.
// =============================================================================

/** A full Chakra config, as accepted by `createSystem`. */
export type EditionConfig = Parameters<typeof createSystem>[number];

/**
 * Author an edition theme. This is Chakra's `defineConfig`, re-exported under a
 * domain name — an edition can override any part of the theme, not a fixed set
 * of properties. Everything omitted is inherited from the base brand.
 */
export const defineEditionTheme = defineConfig;

/**
 * Build a full Chakra system for an edition: the base brand plus the edition's
 * config merged on top. The edition config is merged last, so it wins on
 * conflicts while inheriting everything it doesn't touch.
 */
export function buildEditionSystem(editionConfig: EditionConfig) {
  return createSystem(defaultConfig, hugConfig, baseConfig, editionConfig);
}
