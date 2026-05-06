/**
 * pricingEngine.test.js
 * Run with:  node --test src/data/pricingEngine.test.js
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeQuote, deriveMultipliers, DEFAULT_PILOT_FRACTION } from './pricingEngine.js';
import { DEFAULT_INPUTS } from './pricingPresets.js';

const FIXTURE_INPUTS = {
  ...DEFAULT_INPUTS,
  aoiKm2: 1000,
  quarters: 1,
  fxRate: 1,
  pilotFraction: 0.9,
  gtClient: false,
  gtPixxel: false,
};

const FIXTURE_LINES = [
  { id: 'a', include: true, baseUsdPerKm2: 10, source: 'custom', name: 'Crop Boundaries', layerId: null, billingCadence: 'quarterly' },
  { id: 'b', include: true, baseUsdPerKm2: 15, source: 'custom', name: 'Phenology', layerId: null, billingCadence: 'quarterly' },
  { id: 'c', include: false, baseUsdPerKm2: 75, source: 'custom', name: 'Yield Forecast', layerId: null, billingCadence: 'quarterly' },
];

test('deriveMultipliers — default inputs at 1000 km²', () => {
  const m = deriveMultipliers(FIXTURE_INPUTS);
  assert.equal(m.earlyFactor, 1, 'earlyFactor should be 1 (None)');
  assert.equal(m.minAoiMult, 1, 'minAoiMult should be 1 (AOI >= 500)');
  assert.ok(Math.abs(m.volumeDiscFactor - 0.95) < 1e-9, `volumeDiscFactor should be 0.95, got ${m.volumeDiscFactor}`);
  const expected = 1 * 0.95;
  assert.ok(Math.abs(m.totalAddonFactor - expected) < 1e-9, `totalAddonFactor should be ${expected}, got ${m.totalAddonFactor}`);
});

test('computeQuote — pre-addon line totals (quarterly cadence, 1 quarter)', () => {
  const result = computeQuote(FIXTURE_INPUTS, FIXTURE_LINES);
  const lineA = result.lines.find((l) => l.id === 'a');
  const lineB = result.lines.find((l) => l.id === 'b');
  const lineC = result.lines.find((l) => l.id === 'c');

  assert.ok(Math.abs(lineA._calc.effectiveRate - 10 * DEFAULT_PILOT_FRACTION) < 1e-9, 'line A effectiveRate');
  assert.ok(Math.abs(lineA._calc.preAddonUsd - 9000) < 1e-9, 'line A preAddonUsd = $9000');
  assert.ok(Math.abs(lineB._calc.preAddonUsd - 13500) < 1e-9, 'line B preAddonUsd = $13500');
  assert.equal(lineC._calc.preAddonUsd, 0, 'excluded line should contribute $0');
});

test('computeQuote — blended totals', () => {
  const result = computeQuote(FIXTURE_INPUTS, FIXTURE_LINES);
  const addOnFactor = 0.95;

  assert.ok(Math.abs(result.blendedPreAddonRate - 22.5) < 1e-9, `blendedPreAddonRate should be 22.5, got ${result.blendedPreAddonRate}`);
  assert.ok(Math.abs(result.subtotalAfterVolumeMinAoi - 22500 * addOnFactor) < 1e-4, 'subtotal after volume');
  assert.ok(Math.abs(result.totalUsd - 22500 * addOnFactor) < 1e-4, 'totalUsd');
  assert.equal(result.totalLocal, result.totalUsd, 'totalLocal equals totalUsd when fxRate=1');
});

test('computeQuote — monthly cadence scales deliveries per quarter', () => {
  const lines = [
    { id: 'a', include: true, baseUsdPerKm2: 10, source: 'custom', name: 'A', layerId: null, billingCadence: 'monthly' },
  ];
  const inputs = { ...FIXTURE_INPUTS, aoiKm2: 100, quarters: 1 };
  const r = computeQuote(inputs, lines);
  const pre = r.lines[0]._calc.preAddonUsd;
  const eff = 10 * 0.9;
  const expected = eff * 100 * 1 * 3;
  assert.ok(Math.abs(pre - expected) < 1e-6, `monthly should be 3× quarterly, got ${pre} vs ${expected}`);
});

test('computeQuote — min-AOI surcharge kicks in below threshold', () => {
  const inputs = { ...FIXTURE_INPUTS, aoiKm2: 400 };
  const m = deriveMultipliers(inputs);
  assert.ok(Math.abs(m.minAoiMult - 1.25) < 1e-9, `minAoiMult should be 1.25 for AOI < threshold, got ${m.minAoiMult}`);
  assert.ok(Math.abs(m.volumeDiscFactor - 1.0) < 1e-9, `volumeDiscFactor should be 1.0 for AOI < 1000, got ${m.volumeDiscFactor}`);
});

test('computeQuote — client GT discount', () => {
  const inputs = {
    ...FIXTURE_INPUTS,
    gtClient: true,
    gtClientDiscountPct: 0.1,
  };
  const r = computeQuote(inputs, FIXTURE_LINES.slice(0, 2));
  const raw = r.subtotalAfterVolumeMinAoi;
  assert.ok(Math.abs(r.subtotalAfterClientGt - raw * 0.9) < 1e-4, '10% client GT discount');
});

test('computeQuote — Pixxel GT fixed fee', () => {
  const inputs = {
    ...FIXTURE_INPUTS,
    gtPixxel: true,
    gtPixxelFeeUsd: 2500,
  };
  const r = computeQuote(inputs, FIXTURE_LINES.slice(0, 2));
  assert.ok(Math.abs(r.totalUsd - r.subtotalAfterClientGt - 2500) < 1e-4, 'fee added');
});

test('computeQuote — early adopter discount', () => {
  const inputs = { ...FIXTURE_INPUTS, earlyDiscountType: 'Early Adopter (10%)' };
  const m = deriveMultipliers(inputs);
  assert.ok(Math.abs(m.earlyFactor - 0.9) < 1e-9, `earlyFactor should be 0.90, got ${m.earlyFactor}`);
});

test('computeQuote — FX conversion', () => {
  const inputs = { ...FIXTURE_INPUTS, fxRate: 83 };
  const result = computeQuote(inputs, FIXTURE_LINES.slice(0, 2));
  assert.ok(Math.abs(result.totalLocal - result.totalUsd * 83) < 1, `totalLocal should be totalUsd × 83`);
});
