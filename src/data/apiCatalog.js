/**
 * Overview API catalog — aggregated from per-product apiSchema definitions.
 */

import { agricultureProduct } from './products/agriculture.js';
import { waterProduct } from './products/water.js';
import { geologyProduct } from './products/geology.js';
import { sseProduct } from './products/sse.js';

export const API_CATALOG_VERSION = 2;

export const API_CATALOG_PRODUCTS = [
  { section: 'agriculture', product: agricultureProduct },
  { section: 'water', product: waterProduct },
  { section: 'geology', product: geologyProduct },
  { section: 'sse', product: sseProduct },
];

export const API_STATUS_LABELS = {
  available: 'Available',
  'semi-operational': 'Semi-operational',
  beta: 'Beta',
  'in-development': 'In development',
  roadmap: 'Roadmap',
};

export const API_STATUS_COLORS = {
  available: 'var(--green)',
  'semi-operational': 'var(--cyan)',
  beta: 'var(--amber)',
  'in-development': 'var(--amber)',
  roadmap: 'var(--purple)',
};

export const API_STATUSES = Object.keys(API_STATUS_LABELS);

/** @returns {Array<{
 *   id: string,
 *   productId: string,
 *   productName: string,
 *   productSection: string,
 *   productColor: string,
 *   group: string,
 *   name: string,
 *   path: string,
 *   method: string,
 *   returns: string,
 *   status: string,
 *   sensors?: string,
 * }>} */
export function buildApiCatalogEntries() {
  const entries = [];
  for (const { section, product } of API_CATALOG_PRODUCTS) {
    const schema = product.apiSchema;
    if (!schema?.groups) continue;
    for (const group of schema.groups) {
      for (const ep of group.endpoints) {
        const slug = ep.path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
        entries.push({
          id: `${product.id}-${slug}`,
          productId: product.id,
          productName: product.name,
          productSection: section,
          productColor: product.color,
          group: group.title,
          name: ep.name,
          path: ep.path,
          method: ep.method || 'GET',
          returns: ep.returns,
          status: ep.status,
          sensors: ep.sensors,
        });
      }
    }
  }
  return entries;
}

export const apiCatalogEntries = buildApiCatalogEntries();
