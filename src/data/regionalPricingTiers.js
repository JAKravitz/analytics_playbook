/** World Bank income-tier multipliers — pilot list fees and product revenue (Track 1 / geology). */

export const regionalPricingTiers = {
  blurb:
    'Pilot list prices in the tables above are Tier 1 (1.0×). Multiply by the band that matches the purchaser\'s headquarters jurisdiction using the current World Bank country income classification.',
  worldBankUrl:
    'https://datatopics.worldbank.org/world-development-indicators/the-world-by-income-and-region.html',
  headers: ['Region tier', 'Classification (HQ jurisdiction)', 'Multiplier'],
  rows: [
    ['Tier 1', 'High-income economy', '1.0×'],
    ['Tier 2', 'Upper-middle-income economy', '0.75×'],
    ['Tier 3', 'Lower-middle-income & low-income economies', '0.50×'],
    ['Institutional', 'International NGOs · UN agencies · multilateral development banks (MDBs)', '0.60×'],
  ],
  footnote:
    'NGO / multilateral eligibility requires documented status. Stacking with other discounts is subject to commercial review.',
};
