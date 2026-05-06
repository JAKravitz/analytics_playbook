/**
 * Default catalog layer ids per solution package (`${verticalId}.${packageId}`).
 * Editable selections persist in `state.packages[thatKey].layerIds` / `hsiLayerIds`.
 */

export const PACKAGE_CATALOG_DEFAULTS = {
  'agriculture.01': {
    included: ['l66', 'l14', 'l01', 'l02', 'l03', 'l20', 'l67', 'l21', 'l22', 'l24', 'l17'],
    hsi: ['l04', 'l09', 'l10', 'l25'],
  },
  'agriculture.02': {
    included: [
      'l66', 'l14', 'l01', 'l02', 'l03', 'l20', 'l67', 'l21', 'l22', 'l24', 'l17',
      'l06', 'l07', 'l08', 'l25', 'l04', 'l30',
    ],
    hsi: [],
  },
  'agriculture.03': {
    included: ['l20', 'l21', 'l14', 'l70', 'l26', 'l22', 'l30', 'l27'],
    hsi: [],
  },
  'agriculture.04': {
    included: ['l22', 'l29', 'l17', 'l68', 'l69', 'l18', 'l21', 'l27'],
    hsi: [],
  },
  'agriculture.05': {
    included: ['l71', 'l72', 'l70', 'l14', 'l27'],
    hsi: [],
  },

  'forestry.01': {
    included: ['l12', 'l64', 'l65', 'l01', 'l111', 'l34'],
    hsi: [],
  },
  'forestry.02': {
    included: ['l55', 'l32', 'l56', 'l57', 'l58'],
    hsi: [],
  },
  'forestry.03': {
    included: ['l59', 'l12', 'l60', 'l33', 'l61'],
    hsi: [],
  },
  'forestry.04': {
    included: ['l62', 'l01', 'l03', 'l12', 'l63', 'l13'],
    hsi: [],
  },

  'aquatic.01': {
    included: ['l35', 'l36', 'l37', 'l38', 'l39', 'l40', 'l41', 'l42', 'l43', 'l44', 'l45'],
    hsi: [],
  },
  'aquatic.02': {
    included: ['l46', 'l47', 'l48', 'l36', 'l49', 'l50'],
    hsi: [],
  },
  'aquatic.03': {
    included: ['l51', 'l52'],
    hsi: [],
  },
  'aquatic.04': {
    included: ['l53', 'l54'],
    hsi: [],
  },

  'geology.01': {
    included: ['l73', 'l74', 'l75', 'l76', 'l77', 'l78'],
    hsi: [],
  },
  'geology.02': {
    included: ['l79', 'l80', 'l81', 'l82', 'l83'],
    hsi: [],
  },
  'geology.03': {
    included: ['l84', 'l85', 'l86', 'l87', 'l88', 'l89'],
    hsi: [],
  },

  'defense.01': {
    included: ['l90', 'l91', 'l92', 'l93', 'l94', 'l95', 'l96'],
    hsi: [],
  },
  'defense.02': {
    included: ['l97', 'l98', 'l99', 'l100', 'l101', 'l102', 'l103'],
    hsi: [],
  },
  'defense.03': {
    included: ['l104', 'l105', 'l106', 'l107', 'l108', 'l109', 'l110'],
    hsi: [],
  },
};

export function getPackageCatalogDefaults(verticalId, packageId) {
  const key = `${verticalId}.${packageId}`;
  return (
    PACKAGE_CATALOG_DEFAULTS[key] || {
      included: [],
      hsi: [],
    }
  );
}
