import { rgba, tint, shade } from 'polished';

/**
 * Curry the polished rgba function to allow switching the parameters.
 */
const _rgba = (alpha: number) => (color: string) => rgba(color, alpha);

const colorPaletteSettings = [
  {
    code: '50',
    colorFn: tint(0.96)
  },
  {
    code: '50a',
    colorFn: _rgba(0.04)
  },
  {
    code: '100',
    colorFn: tint(0.92)
  },
  {
    code: '100a',
    colorFn: _rgba(0.08)
  },
  {
    code: '200',
    colorFn: tint(0.84)
  },
  {
    code: '200a',
    colorFn: _rgba(0.16)
  },
  {
    code: '300',
    colorFn: tint(0.68)
  },
  {
    code: '300a',
    colorFn: _rgba(0.32)
  },
  {
    code: '400',
    colorFn: tint(0.36)
  },
  {
    code: '400a',
    colorFn: _rgba(0.64)
  },
  {
    code: '500',
    colorFn: (v: string) => v
  },
  {
    code: '600',
    colorFn: shade(0.16)
  },
  {
    code: '700',
    colorFn: shade(0.32)
  },
  {
    code: '800',
    colorFn: shade(0.48)
  },
  {
    code: '900',
    colorFn: shade(0.64)
  }
];

/**
 * Creates a color palette base off of the provided base color including
 * lightened/darkened/transparent versions of that color.
 *
 * Uses a scale from 50 - 900 to indicate the color value. Values lower than 500
 * are lightened, above 500 are darkened and values ending with `a` have a alpha
 * channel.
 *
 * List of returned colors:
 * name.50      Lightened 96%
 * name.50a     Opacity 4%
 * name.100     Lightened 92%
 * name.100a    Opacity 8%
 * name.200     Lightened 84%
 * name.200a    Opacity 16%
 * name.300     Lightened 68%
 * name.300a    Opacity 32%
 * name.400     Lightened 36%
 * name.400a    Opacity 64%
 * name.500     Same as base color
 * name.600     Darkened 16%
 * name.700     Darkened 32%
 * name.800     Darkened 48%
 * name.900     Darkened 64%
 *
 * @param {string} name Name of the color variable
 * @param {string} baseColor Base color for the palette. Used as middle color
 * with value 500.
 *
 * @returns object
 */
export function createColorPalette(baseColor: string) {
  return colorPaletteSettings.reduce(
    (acc, c) => ({
      ...acc,
      [c.code]: { value: c.colorFn(baseColor) }
    }),
    {}
  );
}

// Light mode only: semantic tokens resolve to a single value.
export const createColorSemanticTokens = (colorName: string) => ({
  [colorName]: {
    contrast: { value: 'white' },
    fg: { value: `{colors.${colorName}.500}` },
    subtle: { value: `{colors.${colorName}.100}` },
    muted: { value: `{colors.${colorName}.200}` },
    emphasized: { value: `{colors.${colorName}.300}` },
    solid: { value: `{colors.${colorName}.500}` },
    focusRing: { value: `{colors.${colorName}.400}` }
  }
});

const semanticKeys = [
  'contrast',
  'fg',
  'subtle',
  'muted',
  'emphasized',
  'solid',
  'focusRing'
];

/**
 * Creates a role palette (e.g. `action-button`, `nav`) that points every shade
 * and semantic key at an existing palette. Components use the role as their
 * `colorPalette`; editions remap the role without touching component code.
 * The source palette must define all semantic keys.
 *
 * @param {string} source Name of the palette the role points to.
 */
export const createColorAlias = (source: string) =>
  Object.fromEntries(
    [...colorPaletteSettings.map((c) => c.code), ...semanticKeys].map((k) => [
      k,
      { value: `{colors.${source}.${k}}` }
    ])
  );
