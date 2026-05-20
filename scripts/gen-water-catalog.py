#!/usr/bin/env python3
"""Generate src/data/waterCatalogRows.js from Water API Catalog.docx."""
import json
import re
import zipfile
from xml.etree import ElementTree as ET

DOCX = '/Users/jeremy/Documents/analytics/Water API Catalog.docx'
OUT = '/Users/jeremy/pyProjects/playbook/src/data/waterCatalogRows.js'

z = zipfile.ZipFile(DOCX)
root = ET.fromstring(z.read('word/document.xml'))
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
body = root.find('w:body', ns)


def cell_text(tc):
    return ''.join(t.text or '' for t in tc.findall('.//w:t', ns)).strip()


section = None
apis = []
current_family = None

for child in body:
    tag = child.tag.split('}')[-1]
    if tag == 'p':
        text = ''.join(t.text or '' for t in child.findall('.//w:t', ns)).strip()
        if 'Core API' in text:
            section = 'core'
        elif 'Data API' in text and 'Trait' not in text:
            section = 'data'
        elif 'Internal' in text:
            section = 'internal'
        elif 'Add-on Catalog' in text:
            section = 'addon'
        elif 'Add-ons' in text and section == 'addon':
            current_family = text.replace(' Add-ons', '').strip()
    elif tag == 'tbl':
        rows = []
        for tr in child.findall('.//w:tr', ns):
            tcs = tr.findall('./w:tc', ns)
            texts = [cell_text(tc) for tc in tcs]
            if any(texts):
                rows.append(texts)
        if not rows or rows[0][0] in ('Trait', 'Variable'):
            continue
        if rows[0][0] == 'Layer' and len(rows[0]) >= 5:
            for r in rows[1:]:
                apis.append(
                    {
                        'name': r[0],
                        'provides': r[1],
                        'requires': r[2],
                        'upliftVnirHsi': r[3],
                        'upliftVnirSwir': r[4],
                        'section': section,
                        'addonFamily': current_family if section == 'addon' else None,
                    }
                )
        elif rows[0][0] == 'Layer' and len(rows[0]) == 2:
            for r in rows[1:]:
                apis.append(
                    {
                        'name': r[0],
                        'provides': r[1],
                        'requires': '',
                        'upliftVnirHsi': '',
                        'upliftVnirSwir': '',
                        'section': section,
                        'addonFamily': None,
                    }
                )


def slug(name):
    s = name.replace(' API', '').strip()
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    if 'forecast' in s and 'confidence' in s:
        return 'water-hab-confidence-forecast-api'
    if 'atmospheric' in s:
        return 'water-atmospheric-correction-api'
    return 'water-' + s + '-api'


def parse_requires(req):
    if not req or req.lower() == 'none':
        return []
    parts = re.split(r',\s*(?![^()]*\))', req)
    out = []
    for p in parts:
        p = p.strip()
        if not p:
            continue
        if p.endswith(' API') or '(internal)' in p.lower():
            out.append(p)
        else:
            out.append(p + ' API')
    return out


def price(a):
    if a['section'] == 'internal':
        return 0
    n = a['name'].lower()
    if 'boundary' in n:
        return 5
    if 'mask' in n:
        return 8
    if 'constituent' in n:
        return 18
    if 'optical' in n:
        return 24
    if 'hab' in n or 'bloom' in n:
        return 22
    if 'benthic' in n or 'seagrass' in n or 'coral' in n or 'bleaching' in n:
        return 28
    if 'webhook' in n:
        return 2
    if 'alert' in n or 'exceedance' in n:
        return 4
    if 'confidence' in n:
        return 6
    if 'anomaly' in n or 'non-optical' in n:
        return 12
    return 15


def msi_for(a):
    hsi = a.get('upliftVnirHsi', '')
    if hsi.startswith('No uplift') or hsi.startswith('No significant'):
        return 'Baseline product on MSI imagery.'
    if 'not retrievable from MSI' in hsi or 'not possible with MSI' in hsi or 'MSI broadband' in hsi:
        return 'Limited MSI capability — full product requires VNIR HSI.'
    return 'Broadband MSI retrievals where mask and atmospheric quality allow.'


rows = []
for a in apis:
    kind = 'core' if a['section'] in ('core', 'data') else ('internal' if a['section'] == 'internal' else 'addon')
    name = a['name']
    if name == 'Atmospheric Correction / Surface Reflectance':
        name = 'Atmospheric Correction / Surface Reflectance API'
    elif not name.endswith(' API'):
        name = name + ' API'
    row = {
        'id': slug(a['name']),
        'name': name,
        'provides': a['provides'],
        'requires': parse_requires(a['requires']),
        'upliftMsi': msi_for(a),
        'upliftVnirHsi': a['upliftVnirHsi'] or 'No uplift',
        'upliftVnirSwir': a['upliftVnirSwir'] or 'No uplift',
        'baseUsdPerKm2': price(a),
        'verticals': ['water'],
        'tier': 'Both',
        'grade': 'inventory',
        'status': 'aurora',
        'apiReady': 'live',
        'kind': kind,
    }
    if 'Forecast' in a['name']:
        row['status'] = 'piloting'
        row['apiReady'] = 'Q3 2026'
    if a['addonFamily']:
        row['addonFamily'] = a['addonFamily']
    if kind == 'internal':
        row['notes'] = 'Internal — available on request at no extra charge.'
    rows.append(row)

body_js = json.dumps(rows, indent=2)
body_js = body_js.replace('"verticals": [\n      "water"\n    ]', '"verticals": WATER')
body_js = body_js.replace('[\n      "water"\n    ]', 'FORESTRY_PLACEHOLDER')
# fix WATER constant usage
body_js = body_js.replace('"verticals": [\n    "water"\n  ]', '"verticals": WATER')

with open(OUT, 'w') as f:
    f.write('/** Water API catalog — from Water API Catalog.docx (product). */\n')
    f.write("const WATER = ['water'];\n\n")
    f.write('export const waterApiRows = ')
    text = json.dumps(rows, indent=2)
    text = re.sub(r'"verticals": \[\s*"water"\s*\]', '"verticals": WATER', text)
    f.write(text)
    f.write(';\n')

print(f'Wrote {len(rows)} rows to {OUT}')
