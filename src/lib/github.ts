import crypto from "crypto";

export type ProjectGithub = {
  githubOwner?: string | null;
  githubRepo?: string | null;
};

type GithubRepositoryInput = {
  owner?: string | null;
  name: string;
  description?: string | null;
  visibility?: "private" | "public";
  autoInit?: boolean;
};

type GithubPullRequestInput = {
  title: string;
  head: string;
  base: string;
  body?: string | null;
};

type GithubWebhookInput = {
  url: string;
  secret?: string | null;
  events?: string[];
};

export class GithubApiError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`GitHub API ${status}: ${body.slice(0, 180)}`);
    this.name = "GithubApiError";
    this.status = status;
    this.body = body;
  }
}

function encryptionKey() {
  const raw = process.env.GITHUB_TOKEN_ENCRYPTION_KEY ?? process.env.AUTH_SECRET ?? "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";
  return crypto.createHash("sha256").update(raw).digest();
}

function sharedGithubToken() {
  return process.env.GITHUB_WORKSPACE_TOKEN ?? process.env.GITHUB_TOKEN ?? null;
}

export function hasGithubWorkspaceToken() {
  return Boolean(sharedGithubToken());
}

export function githubTokenLast4(token?: string | null) {
  return token ? token.slice(-4) : null;
}

export function resolveGithubToken(userEncryptedToken?: string | null) {
  return sharedGithubToken() ?? decryptSecret(userEncryptedToken);
}

export function encryptSecret(secret: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}.${tag.toString("base64")}.${encrypted.toString("base64")}`;
}

export function decryptSecret(cipherText?: string | null) {
  if (!cipherText) return null;
  const [ivText, tagText, encryptedText] = cipherText.split(".");
  if (!ivText || !tagText || !encryptedText) return null;
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(ivText, "base64"));
  decipher.setAuthTag(Buffer.from(tagText, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, "base64")),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}

export async function githubFetch<T = any>(token: string, url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://api.github.com${url}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new GithubApiError(response.status, text);
  }
  if (response.status === 204) return {} as T;
  return response.json();
}

function repoPath(project: ProjectGithub) {
  if (!project.githubOwner || !project.githubRepo) {
    throw new Error("El proyecto no tiene owner/repositorio GitHub configurado.");
  }
  return `/repos/${encodeURIComponent(project.githubOwner)}/${encodeURIComponent(project.githubRepo)}`;
}

function isAlreadyExists(error: unknown) {
  return error instanceof GithubApiError && error.status === 422 && /already exists|exists|ya existe/i.test(error.body);
}

function repoSummary(repo: any, created: boolean) {
  return {
    id: Number(repo.id),
    owner: String(repo.owner?.login ?? ""),
    name: String(repo.name ?? ""),
    fullName: String(repo.full_name ?? ""),
    private: Boolean(repo.private),
    defaultBranch: String(repo.default_branch ?? "main"),
    htmlUrl: String(repo.html_url ?? ""),
    created
  };
}

export function githubRepositoryUrl(project: ProjectGithub) {
  if (!project.githubOwner || !project.githubRepo) return null;
  return `https://github.com/${project.githubOwner}/${project.githubRepo}`;
}

export function githubBranchUrl(project: ProjectGithub, branch?: string | null) {
  const repoUrl = githubRepositoryUrl(project);
  return repoUrl && branch ? `${repoUrl}/tree/${encodeURIComponent(branch)}` : null;
}

export function githubCommitUrl(project: ProjectGithub, commit?: string | null) {
  const repoUrl = githubRepositoryUrl(project);
  return repoUrl && commit ? `${repoUrl}/commit/${encodeURIComponent(commit)}` : null;
}

export async function getAuthenticatedGithubUser(token: string) {
  const user = await githubFetch<{ login: string; html_url: string }>(token, "/user");
  return { login: user.login, htmlUrl: user.html_url };
}

export async function getGithubRepository(project: ProjectGithub, token: string) {
  const repo = await githubFetch<any>(token, repoPath(project));
  return repoSummary(repo, false);
}

export async function createGithubRepository(token: string, input: GithubRepositoryInput) {
  const actor = await getAuthenticatedGithubUser(token);
  const repoName = input.name.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!repoName) throw new Error("El nombre del repositorio GitHub es obligatorio.");

  const owner = input.owner?.trim();
  const endpoint = !owner || owner.toLowerCase() === actor.login.toLowerCase()
    ? "/user/repos"
    : `/orgs/${encodeURIComponent(owner)}/repos`;
  const body = {
    name: repoName,
    description: input.description || undefined,
    private: input.visibility !== "public",
    auto_init: input.autoInit ?? true
  };

  try {
    const repo = await githubFetch<any>(token, endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
    return repoSummary(repo, true);
  } catch (error) {
    if (!isAlreadyExists(error)) throw error;
    const repoOwner = owner || actor.login;
    const repo = await githubFetch<any>(token, `/repos/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repoName)}`);
    return repoSummary(repo, false);
  }
}

export async function listGithubBranches(project: ProjectGithub, token: string) {
  const branches = await githubFetch<Array<{ name: string; commit?: { sha?: string } }>>(token, `${repoPath(project)}/branches?per_page=100`);
  return branches.map((branch) => ({ name: branch.name, sha: branch.commit?.sha ?? null }));
}

export async function listGithubPullRequests(project: ProjectGithub, token: string, state: "open" | "closed" | "all" = "open") {
  const pulls = await githubFetch<Array<{ number: number; title: string; html_url: string; state: string; head: { ref: string }; base: { ref: string } }>>(
    token,
    `${repoPath(project)}/pulls?state=${state}&per_page=100`
  );
  return pulls.map((pull) => ({
    number: pull.number,
    title: pull.title,
    htmlUrl: pull.html_url,
    state: pull.state,
    head: pull.head.ref,
    base: pull.base.ref
  }));
}

export async function createGithubBranch(project: ProjectGithub, token: string, branchName: string, fromBranch = "main") {
  const repo = repoPath(project);
  const ref = await githubFetch<{ object?: { sha?: string } }>(token, `${repo}/git/ref/heads/${encodeURIComponent(fromBranch)}`);
  const sha = ref.object?.sha;
  if (!sha) throw new Error("No se pudo obtener el SHA base de GitHub.");
  try {
    await githubFetch(token, `${repo}/git/refs`, {
      method: "POST",
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha })
    });
    return { name: branchName, sha, created: true };
  } catch (error) {
    if (!isAlreadyExists(error)) throw error;
    return { name: branchName, sha, created: false };
  }
}

async function findOpenPullRequest(project: ProjectGithub, token: string, head: string, base: string) {
  if (!project.githubOwner) return null;
  const headValue = head.includes(":") ? head : `${project.githubOwner}:${head}`;
  const params = new URLSearchParams({ state: "open", head: headValue, base });
  const pulls = await githubFetch<Array<{ number: number; title: string; html_url: string; state: string }>>(token, `${repoPath(project)}/pulls?${params.toString()}`);
  const pull = pulls[0];
  return pull
    ? { number: pull.number, title: pull.title, htmlUrl: pull.html_url, state: pull.state, created: false }
    : null;
}

export async function ensureGithubPullRequest(project: ProjectGithub, token: string, input: GithubPullRequestInput) {
  const repo = repoPath(project);
  try {
    const pull = await githubFetch<{ number: number; title: string; html_url: string; state: string }>(token, `${repo}/pulls`, {
      method: "POST",
      body: JSON.stringify({
        title: input.title,
        head: input.head,
        base: input.base,
        body: input.body || undefined
      })
    });
    return { number: pull.number, title: pull.title, htmlUrl: pull.html_url, state: pull.state, created: true };
  } catch (error) {
    if (!isAlreadyExists(error)) throw error;
    const existing = await findOpenPullRequest(project, token, input.head, input.base);
    if (existing) return existing;
    throw error;
  }
}

export async function createGithubTag(project: ProjectGithub, token: string, tagName: string, commitSha: string) {
  try {
    await githubFetch(token, `${repoPath(project)}/git/refs`, {
      method: "POST",
      body: JSON.stringify({ ref: `refs/tags/${tagName}`, sha: commitSha })
    });
    return { name: tagName, sha: commitSha, created: true };
  } catch (error) {
    if (!isAlreadyExists(error)) throw error;
    return { name: tagName, sha: commitSha, created: false };
  }
}

export async function createGithubIssue(project: ProjectGithub, token: string, title: string, body?: string | null) {
  const issue = await githubFetch<{ number: number; title: string; html_url: string; state: string }>(token, `${repoPath(project)}/issues`, {
    method: "POST",
    body: JSON.stringify({ title, body: body || undefined })
  });
  return { number: issue.number, title: issue.title, htmlUrl: issue.html_url, state: issue.state };
}

export async function ensureGithubWebhook(project: ProjectGithub, token: string, input: GithubWebhookInput) {
  const hooks = await githubFetch<Array<{ id: number; config?: { url?: string } }>>(token, `${repoPath(project)}/hooks?per_page=100`);
  const existing = hooks.find((hook) => hook.config?.url === input.url);
  const body = {
    name: "web",
    active: true,
    events: input.events ?? ["push"],
    config: {
      url: input.url,
      content_type: "json",
      secret: input.secret || undefined,
      insecure_ssl: "0"
    }
  };

  if (existing) {
    const hook = await githubFetch<{ id: number; config?: { url?: string }; active: boolean }>(token, `${repoPath(project)}/hooks/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
    return { id: hook.id, url: hook.config?.url ?? input.url, active: hook.active, created: false };
  }

  const hook = await githubFetch<{ id: number; config?: { url?: string }; active: boolean }>(token, `${repoPath(project)}/hooks`, {
    method: "POST",
    body: JSON.stringify(body)
  });
  return { id: hook.id, url: hook.config?.url ?? input.url, active: hook.active, created: true };
}
