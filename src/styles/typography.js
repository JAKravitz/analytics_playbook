/**
 * Shared type scale — aligned with Pilot Revenue Model page readability.
 */
export const TYPE = {
  body: 15,
  muted: 14,
  small: 13,
  label: 12,
  micro: 11,
  section: 14,
  vertical: 16,
  tableHead: 12,
};

export const mono = {
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
};

export const monoStyle = {
  ...mono,
  fontSize: TYPE.label,
  letterSpacing: 0.5,
  color: 'var(--gray)',
};

export const bodyText = {
  fontSize: TYPE.body,
  color: 'var(--text)',
  lineHeight: 1.65,
};

export const mutedText = {
  fontSize: TYPE.muted,
  color: 'var(--gray)',
  lineHeight: 1.55,
};
