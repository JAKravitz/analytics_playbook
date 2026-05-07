/**
 * Vercel serverless: create a Linear issue from the playbook Commercial request form.
 *
 * Env (Vercel → Project → Settings → Environment Variables):
 *   LINEAR_API_KEY     — Linear → Settings → API → Personal API keys
 *   LINEAR_TEAM_ID     — UUID of the team issues should land in (see README)
 * Optional:
 *   LINEAR_PROJECT_ID  — project UUID (if set, used as-is; skips name lookup)
 *   LINEAR_PROJECT_NAME — project name on that team (e.g. Commercial Requests); resolved via API
 *   LINEAR_LABEL_IDS   — comma-separated label UUIDs
 */

const LINEAR_GRAPHQL = 'https://api.linear.app/graphql';

const CREATE_ISSUE = `
mutation CreateIssue($input: IssueCreateInput!) {
  issueCreate(input: $input) {
    success
    issue {
      identifier
      url
      title
    }
  }
}
`;

const TEAM_PROJECTS = `
query TeamProjects($teamId: String!) {
  team(id: $teamId) {
    projects(first: 250) {
      nodes { id name }
    }
  }
}
`;

async function linearPost(apiKey, body) {
  const r = await fetch(LINEAR_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify(body),
  });
  return r.json();
}

/**
 * Resolve project id: explicit LINEAR_PROJECT_ID wins; else match LINEAR_PROJECT_NAME on team.
 */
async function resolveProjectId(apiKey, teamId) {
  const byId = process.env.LINEAR_PROJECT_ID?.trim();
  if (byId) return { projectId: byId };

  const rawName = process.env.LINEAR_PROJECT_NAME?.trim();
  if (!rawName) return { projectId: null };

  const j = await linearPost(apiKey, {
    query: TEAM_PROJECTS,
    variables: { teamId },
  });

  if (j.errors?.length) {
    return { error: `Could not list team projects: ${j.errors.map((e) => e.message).join('; ')}` };
  }

  const nodes = j.data?.team?.projects?.nodes || [];
  const want = rawName.toLowerCase();
  const matches = nodes.filter((p) => p?.name && p.name.trim().toLowerCase() === want);

  if (matches.length === 1) return { projectId: matches[0].id };
  if (matches.length > 1) {
    return {
      error: `Multiple projects named "${rawName}" on this team; set LINEAR_PROJECT_ID to disambiguate.`,
    };
  }

  const avail = nodes.map((p) => p.name).filter(Boolean);
  return {
    error: `No project named "${rawName}" on this team. Available: ${avail.length ? avail.join(', ') : '(none)'}`,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.LINEAR_API_KEY;
  const teamId = process.env.LINEAR_TEAM_ID;

  if (!apiKey || !teamId) {
    return res.status(503).json({
      error:
        'Linear integration is not configured. Set LINEAR_API_KEY and LINEAR_TEAM_ID on Vercel.',
    });
  }

  let payload;
  try {
    payload =
      typeof req.body === 'object' && req.body !== null
        ? req.body
        : JSON.parse(req.body || '{}');
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const {
    title: rawTitle,
    requestType,
    description,
    neededBy,
    requesterName,
    requesterEmail,
    vertical,
  } = payload;

  const title =
    (typeof rawTitle === 'string' && rawTitle.trim().slice(0, 250)) ||
    `Commercial request (${requestType || 'general'})`;

  const md = [
    '**Source:** Pixxel Analytics Playbook (Commercial)',
    ...(requestType ? [`**Request type:** ${requestType}`] : []),
    ...(vertical ? [`**Vertical / audience:** ${vertical}`] : []),
    ...(neededBy ? [`**Needed by:** ${neededBy}`] : []),
    '',
    '### Details',
    typeof description === 'string' && description.trim()
      ? description.trim()
      : '_No additional details provided._',
    '',
    '### Requester',
    ...(requesterName || requesterEmail
      ? [`- **Name:** ${requesterName || '—'}`, `- **Email:** ${requesterEmail || '—'}`]
      : ['_Not provided_']),
  ].join('\n');

  const issueTitle =
    title.length > 230 ? `[Commercial] ${title.slice(0, 220)}…` : `[Commercial] ${title}`;

  const input = {
    teamId,
    title: issueTitle,
    description: md,
  };

  const resolved = await resolveProjectId(apiKey, teamId);
  if (resolved.error) {
    return res.status(400).json({ error: resolved.error });
  }
  if (resolved.projectId) {
    input.projectId = resolved.projectId;
  }

  const labelEnv = process.env.LINEAR_LABEL_IDS;
  if (labelEnv && labelEnv.trim()) {
    const labelIds = labelEnv.split(',').map((s) => s.trim()).filter(Boolean);
    if (labelIds.length) input.labelIds = labelIds;
  }

  let linearJson;
  try {
    linearJson = await linearPost(apiKey, { query: CREATE_ISSUE, variables: { input } });
  } catch (e) {
    return res.status(502).json({
      error: 'Could not reach Linear API',
      detail: String(e?.message || e),
    });
  }

  if (linearJson.errors && linearJson.errors.length) {
    return res.status(400).json({
      error: linearJson.errors.map((err) => err.message).join('; '),
    });
  }

  const created = linearJson.data?.issueCreate;
  if (!created?.success || !created.issue) {
    return res.status(400).json({ error: 'Linear did not create an issue' });
  }

  return res.status(200).json({
    identifier: created.issue.identifier,
    url: created.issue.url,
    title: created.issue.title,
  });
}
