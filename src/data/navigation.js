/** Sections hidden from navigation while in draft — remove an id to re-enable. */
export const DISABLED_SECTIONS = {
  quoting: 'Temporarily unavailable while pricing and scope are finalized.',
};

export function isSectionDisabled(sectionId) {
  return sectionId in DISABLED_SECTIONS;
}

export function disabledSectionReason(sectionId) {
  return DISABLED_SECTIONS[sectionId] ?? null;
}
