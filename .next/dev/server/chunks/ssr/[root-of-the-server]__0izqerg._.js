module.exports = [
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-mariadb/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-rsc] (ecmascript)");
;
;
;
if (!process.env.DB_HOST && !process.env.DATABASE_URL) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["config"])({
        path: ".env.local"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["config"])({
        path: ".env",
        override: false
    });
}
const globalForPrisma = globalThis;
function mariadbConfigFromUrl(connectionString) {
    const url = new URL(connectionString);
    return {
        host: url.hostname,
        port: url.port ? Number(url.port) : 3306,
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: url.pathname.replace(/^\//, "")
    };
}
function databaseUrlFromEnv() {
    if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
        const user = encodeURIComponent(process.env.DB_USER);
        const password = encodeURIComponent(process.env.DB_PASSWORD ?? "");
        const host = process.env.DB_HOST;
        const port = process.env.DB_PORT ?? "3306";
        const database = process.env.DB_NAME;
        return `mysql://${user}:${password}@${host}:${port}/${database}`;
    }
    return process.env.DATABASE_URL;
}
function createClient() {
    const databaseUrl = databaseUrlFromEnv();
    if (!databaseUrl) {
        return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
            log: ("TURBOPACK compile-time truthy", 1) ? [
                "error",
                "warn"
            ] : "TURBOPACK unreachable"
        });
    }
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaMariaDb"](mariadbConfigFromUrl(databaseUrl));
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
        adapter,
        log: ("TURBOPACK compile-time truthy", 1) ? [
            "error",
            "warn"
        ] : "TURBOPACK unreachable"
    });
}
const prisma = globalForPrisma.prisma ?? createClient();
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
}),
"[project]/src/lib/audit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "audit",
    ()=>audit,
    "notify",
    ()=>notify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
;
async function audit(input) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].auditLog.create({
        data: {
            userId: input.userId ?? undefined,
            module: input.module,
            action: input.action,
            ip: input.ip ?? undefined,
            previousDetail: input.previous ? JSON.stringify(input.previous) : undefined,
            newDetail: input.next ? JSON.stringify(input.next) : undefined
        }
    });
}
async function notify(userId, title, message, link, type = "INFO") {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].notification.create({
        data: {
            userId,
            title,
            message,
            link,
            type
        }
    });
}
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSessionCookie",
    ()=>clearSessionCookie,
    "getSession",
    ()=>getSession,
    "projectUserToSession",
    ()=>projectUserToSession,
    "requireUser",
    ()=>requireUser,
    "sessionCookieName",
    ()=>sessionCookieName,
    "setSessionCookie",
    ()=>setSessionCookie,
    "signSession",
    ()=>signSession,
    "userToSession",
    ()=>userToSession,
    "verifySessionToken",
    ()=>verifySessionToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
const sessionCookieName = "sgcsw_session";
function authSecret() {
    return new TextEncoder().encode(process.env.AUTH_SECRET ?? "sgcsw-local-dev-secret-change-before-production");
}
function permissionsFromRole(role) {
    return role.rolePermissions.map((rp)=>rp.permission.code);
}
async function signSession(user) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"](user).setProtectedHeader({
        alg: "HS256"
    }).setIssuedAt().setExpirationTime("8h").sign(authSecret());
}
async function verifySessionToken(token) {
    const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, authSecret());
    return payload;
}
async function setSessionCookie(user) {
    const token = await signSession(user);
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(sessionCookieName, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: ("TURBOPACK compile-time value", "development") === "production",
        path: "/",
        maxAge: 60 * 60 * 8
    });
}
async function clearSessionCookie() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(sessionCookieName);
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get(sessionCookieName)?.value;
    if (!token) return null;
    try {
        const payload = await verifySessionToken(token);
        const roleSlug = String(payload.roleSlug ?? "");
        const roleName = String(payload.roleName ?? "");
        return {
            id: String(payload.id ?? ""),
            name: String(payload.name ?? ""),
            email: String(payload.email ?? ""),
            roleSlug,
            roleName,
            permissions: Array.isArray(payload.permissions) ? payload.permissions.map(String) : [],
            projectSelected: Boolean(payload.projectSelected),
            projectId: typeof payload.projectId === "string" ? payload.projectId : null,
            projectCode: typeof payload.projectCode === "string" ? payload.projectCode : null,
            projectName: typeof payload.projectName === "string" ? payload.projectName : null,
            globalRoleSlug: typeof payload.globalRoleSlug === "string" ? payload.globalRoleSlug : roleSlug,
            globalRoleName: typeof payload.globalRoleName === "string" ? payload.globalRoleName : roleName
        };
    } catch  {
        return null;
    }
}
async function userToSession(userId, options = {}) {
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        include: {
            role: {
                include: {
                    rolePermissions: {
                        include: {
                            permission: true
                        }
                    }
                }
            }
        }
    });
    if (!user || user.status !== "ACTIVE" || !user.role.active) return null;
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        roleSlug: user.role.slug,
        roleName: user.role.name,
        permissions: permissionsFromRole(user.role),
        projectSelected: options.projectSelected ?? false,
        projectId: null,
        projectCode: null,
        projectName: null,
        globalRoleSlug: user.role.slug,
        globalRoleName: user.role.name
    };
}
async function projectUserToSession(userId, projectUserId) {
    const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].projectUser.findFirst({
        where: {
            id: projectUserId,
            userId,
            active: true,
            project: {
                status: {
                    in: [
                        "ACTIVE",
                        "PAUSED"
                    ]
                }
            },
            role: {
                active: true
            },
            user: {
                status: "ACTIVE"
            }
        },
        include: {
            project: true,
            role: {
                include: {
                    rolePermissions: {
                        include: {
                            permission: true
                        }
                    }
                }
            },
            user: {
                include: {
                    role: true
                }
            }
        }
    });
    if (!membership || !membership.user.role.active) return null;
    return {
        id: membership.user.id,
        name: membership.user.name,
        email: membership.user.email,
        roleSlug: membership.role.slug,
        roleName: membership.role.name,
        permissions: permissionsFromRole(membership.role),
        projectSelected: true,
        projectId: membership.project.id,
        projectCode: membership.project.code,
        projectName: membership.project.name,
        globalRoleSlug: membership.user.role.slug,
        globalRoleName: membership.user.role.name
    };
}
async function requireUser(permission) {
    const session = await getSession();
    if (!session) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    if (permission && !session.permissions.includes(permission)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/dashboard");
    return session;
}
}),
"[project]/src/lib/github.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GithubApiError",
    ()=>GithubApiError,
    "createGithubBranch",
    ()=>createGithubBranch,
    "createGithubIssue",
    ()=>createGithubIssue,
    "createGithubRepository",
    ()=>createGithubRepository,
    "createGithubTag",
    ()=>createGithubTag,
    "decryptSecret",
    ()=>decryptSecret,
    "encryptSecret",
    ()=>encryptSecret,
    "ensureGithubPullRequest",
    ()=>ensureGithubPullRequest,
    "ensureGithubWebhook",
    ()=>ensureGithubWebhook,
    "getAuthenticatedGithubUser",
    ()=>getAuthenticatedGithubUser,
    "getGithubRepository",
    ()=>getGithubRepository,
    "githubBranchUrl",
    ()=>githubBranchUrl,
    "githubCommitUrl",
    ()=>githubCommitUrl,
    "githubFetch",
    ()=>githubFetch,
    "githubRepositoryUrl",
    ()=>githubRepositoryUrl,
    "githubTokenLast4",
    ()=>githubTokenLast4,
    "hasGithubWorkspaceToken",
    ()=>hasGithubWorkspaceToken,
    "listGithubBranches",
    ()=>listGithubBranches,
    "listGithubPullRequests",
    ()=>listGithubPullRequests,
    "resolveGithubToken",
    ()=>resolveGithubToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
class GithubApiError extends Error {
    status;
    body;
    constructor(status, body){
        super(`GitHub API ${status}: ${body.slice(0, 180)}`);
        this.name = "GithubApiError";
        this.status = status;
        this.body = body;
    }
}
function encryptionKey() {
    const raw = process.env.GITHUB_TOKEN_ENCRYPTION_KEY ?? process.env.AUTH_SECRET ?? "sgcsw-local-github-token-key";
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(raw).digest();
}
function sharedGithubToken() {
    return process.env.GITHUB_WORKSPACE_TOKEN ?? process.env.GITHUB_TOKEN ?? null;
}
function hasGithubWorkspaceToken() {
    return Boolean(sharedGithubToken());
}
function githubTokenLast4(token) {
    return token ? token.slice(-4) : null;
}
function resolveGithubToken(userEncryptedToken) {
    return sharedGithubToken() ?? decryptSecret(userEncryptedToken);
}
function encryptSecret(secret) {
    const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(12);
    const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv("aes-256-gcm", encryptionKey(), iv);
    const encrypted = Buffer.concat([
        cipher.update(secret, "utf8"),
        cipher.final()
    ]);
    const tag = cipher.getAuthTag();
    return `${iv.toString("base64")}.${tag.toString("base64")}.${encrypted.toString("base64")}`;
}
function decryptSecret(cipherText) {
    if (!cipherText) return null;
    const [ivText, tagText, encryptedText] = cipherText.split(".");
    if (!ivText || !tagText || !encryptedText) return null;
    const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(ivText, "base64"));
    decipher.setAuthTag(Buffer.from(tagText, "base64"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedText, "base64")),
        decipher.final()
    ]);
    return decrypted.toString("utf8");
}
async function githubFetch(token, url, init) {
    const response = await fetch(`https://api.github.com${url}`, {
        ...init,
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
            ...init?.headers ?? {}
        }
    });
    if (!response.ok) {
        const text = await response.text();
        throw new GithubApiError(response.status, text);
    }
    if (response.status === 204) return {};
    return response.json();
}
function repoPath(project) {
    if (!project.githubOwner || !project.githubRepo) {
        throw new Error("El proyecto no tiene owner/repositorio GitHub configurado.");
    }
    return `/repos/${encodeURIComponent(project.githubOwner)}/${encodeURIComponent(project.githubRepo)}`;
}
function isAlreadyExists(error) {
    return error instanceof GithubApiError && error.status === 422 && /already exists|exists|ya existe/i.test(error.body);
}
function repoSummary(repo, created) {
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
function githubRepositoryUrl(project) {
    if (!project.githubOwner || !project.githubRepo) return null;
    return `https://github.com/${project.githubOwner}/${project.githubRepo}`;
}
function githubBranchUrl(project, branch) {
    const repoUrl = githubRepositoryUrl(project);
    return repoUrl && branch ? `${repoUrl}/tree/${encodeURIComponent(branch)}` : null;
}
function githubCommitUrl(project, commit) {
    const repoUrl = githubRepositoryUrl(project);
    return repoUrl && commit ? `${repoUrl}/commit/${encodeURIComponent(commit)}` : null;
}
async function getAuthenticatedGithubUser(token) {
    const user = await githubFetch(token, "/user");
    return {
        login: user.login,
        htmlUrl: user.html_url
    };
}
async function getGithubRepository(project, token) {
    const repo = await githubFetch(token, repoPath(project));
    return repoSummary(repo, false);
}
async function createGithubRepository(token, input) {
    const actor = await getAuthenticatedGithubUser(token);
    const repoName = input.name.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
    if (!repoName) throw new Error("El nombre del repositorio GitHub es obligatorio.");
    const owner = input.owner?.trim();
    const endpoint = !owner || owner.toLowerCase() === actor.login.toLowerCase() ? "/user/repos" : `/orgs/${encodeURIComponent(owner)}/repos`;
    const body = {
        name: repoName,
        description: input.description || undefined,
        private: input.visibility !== "public",
        auto_init: input.autoInit ?? true
    };
    try {
        const repo = await githubFetch(token, endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });
        return repoSummary(repo, true);
    } catch (error) {
        if (!isAlreadyExists(error)) throw error;
        const repoOwner = owner || actor.login;
        const repo = await githubFetch(token, `/repos/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repoName)}`);
        return repoSummary(repo, false);
    }
}
async function listGithubBranches(project, token) {
    const branches = await githubFetch(token, `${repoPath(project)}/branches?per_page=100`);
    return branches.map((branch)=>({
            name: branch.name,
            sha: branch.commit?.sha ?? null
        }));
}
async function listGithubPullRequests(project, token, state = "open") {
    const pulls = await githubFetch(token, `${repoPath(project)}/pulls?state=${state}&per_page=100`);
    return pulls.map((pull)=>({
            number: pull.number,
            title: pull.title,
            htmlUrl: pull.html_url,
            state: pull.state,
            head: pull.head.ref,
            base: pull.base.ref
        }));
}
async function createGithubBranch(project, token, branchName, fromBranch = "main") {
    const repo = repoPath(project);
    const ref = await githubFetch(token, `${repo}/git/ref/heads/${encodeURIComponent(fromBranch)}`);
    const sha = ref.object?.sha;
    if (!sha) throw new Error("No se pudo obtener el SHA base de GitHub.");
    try {
        await githubFetch(token, `${repo}/git/refs`, {
            method: "POST",
            body: JSON.stringify({
                ref: `refs/heads/${branchName}`,
                sha
            })
        });
        return {
            name: branchName,
            sha,
            created: true
        };
    } catch (error) {
        if (!isAlreadyExists(error)) throw error;
        return {
            name: branchName,
            sha,
            created: false
        };
    }
}
async function findOpenPullRequest(project, token, head, base) {
    if (!project.githubOwner) return null;
    const headValue = head.includes(":") ? head : `${project.githubOwner}:${head}`;
    const params = new URLSearchParams({
        state: "open",
        head: headValue,
        base
    });
    const pulls = await githubFetch(token, `${repoPath(project)}/pulls?${params.toString()}`);
    const pull = pulls[0];
    return pull ? {
        number: pull.number,
        title: pull.title,
        htmlUrl: pull.html_url,
        state: pull.state,
        created: false
    } : null;
}
async function ensureGithubPullRequest(project, token, input) {
    const repo = repoPath(project);
    try {
        const pull = await githubFetch(token, `${repo}/pulls`, {
            method: "POST",
            body: JSON.stringify({
                title: input.title,
                head: input.head,
                base: input.base,
                body: input.body || undefined
            })
        });
        return {
            number: pull.number,
            title: pull.title,
            htmlUrl: pull.html_url,
            state: pull.state,
            created: true
        };
    } catch (error) {
        if (!isAlreadyExists(error)) throw error;
        const existing = await findOpenPullRequest(project, token, input.head, input.base);
        if (existing) return existing;
        throw error;
    }
}
async function createGithubTag(project, token, tagName, commitSha) {
    try {
        await githubFetch(token, `${repoPath(project)}/git/refs`, {
            method: "POST",
            body: JSON.stringify({
                ref: `refs/tags/${tagName}`,
                sha: commitSha
            })
        });
        return {
            name: tagName,
            sha: commitSha,
            created: true
        };
    } catch (error) {
        if (!isAlreadyExists(error)) throw error;
        return {
            name: tagName,
            sha: commitSha,
            created: false
        };
    }
}
async function createGithubIssue(project, token, title, body) {
    const issue = await githubFetch(token, `${repoPath(project)}/issues`, {
        method: "POST",
        body: JSON.stringify({
            title,
            body: body || undefined
        })
    });
    return {
        number: issue.number,
        title: issue.title,
        htmlUrl: issue.html_url,
        state: issue.state
    };
}
async function ensureGithubWebhook(project, token, input) {
    const hooks = await githubFetch(token, `${repoPath(project)}/hooks?per_page=100`);
    const existing = hooks.find((hook)=>hook.config?.url === input.url);
    const body = {
        name: "web",
        active: true,
        events: input.events ?? [
            "push"
        ],
        config: {
            url: input.url,
            content_type: "json",
            secret: input.secret || undefined,
            insecure_ssl: "0"
        }
    };
    if (existing) {
        const hook = await githubFetch(token, `${repoPath(project)}/hooks/${existing.id}`, {
            method: "PATCH",
            body: JSON.stringify(body)
        });
        return {
            id: hook.id,
            url: hook.config?.url ?? input.url,
            active: hook.active,
            created: false
        };
    }
    const hook = await githubFetch(token, `${repoPath(project)}/hooks`, {
        method: "POST",
        body: JSON.stringify(body)
    });
    return {
        id: hook.id,
        url: hook.config?.url ?? input.url,
        active: hook.active,
        created: true
    };
}
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[project]/src/lib/storage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "saveUploadedFile",
    ()=>saveUploadedFile,
    "sha256Buffer",
    ()=>sha256Buffer,
    "sha256File",
    ()=>sha256File,
    "writeTextArtifact",
    ()=>writeTextArtifact
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
const storageRoot = process.env.SGCSW_STORAGE_DIR ?? "storage";
async function sha256Buffer(buffer) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(buffer).digest("hex");
}
async function sha256File(filePath) {
    return sha256Buffer(await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(filePath));
}
async function saveUploadedFile(file, scope, preferredName) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hash = await sha256Buffer(buffer);
    const safeName = (preferredName || file.name || "archivo").replace(/[^a-zA-Z0-9._-]/g, "_");
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(/*turbopackIgnore: true*/ process.cwd(), storageRoot, scope);
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["mkdir"])(dir, {
        recursive: true
    });
    const target = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, `${Date.now()}-${safeName}`);
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(target, buffer);
    return {
        storagePath: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(/*turbopackIgnore: true*/ process.cwd(), target),
        sha256Hash: hash,
        fileName: safeName,
        mimeType: file.type || "application/octet-stream"
    };
}
async function writeTextArtifact(scope, fileName, content) {
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(/*turbopackIgnore: true*/ process.cwd(), storageRoot, scope);
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["mkdir"])(dir, {
        recursive: true
    });
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const target = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, `${Date.now()}-${safeName}`);
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(target, content, "utf8");
    return {
        storagePath: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(/*turbopackIgnore: true*/ process.cwd(), target),
        sha256Hash: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(content).digest("hex"),
        fileName: safeName,
        mimeType: "text/plain"
    };
}
}),
"[project]/src/lib/workflow.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classifyChange",
    ()=>classifyChange,
    "missingChangeFields",
    ()=>missingChangeFields,
    "nextSemver",
    ()=>nextSemver
]);
const requiredChangeFields = [
    "projectId",
    "title",
    "description",
    "justification",
    "priority"
];
function missingChangeFields(formData) {
    return requiredChangeFields.filter((field)=>!String(formData.get(field) ?? "").trim());
}
function classifyChange(input) {
    const text = `${input.title} ${input.description} ${input.justification}`.toLowerCase();
    if (input.priority === "CRITICAL" || /emergencia|caida|produccion|hotfix|critico/.test(text)) {
        return {
            type: "EMERGENCY",
            criteria: "Prioridad critica o palabras clave de emergencia/hotfix/produccion."
        };
    }
    if (input.originIncidentId || /error|defecto|bug|fallo|incidencia|corregir/.test(text)) {
        return {
            type: "CORRECTIVE",
            criteria: "Existe incidencia origen o palabras clave de correccion."
        };
    }
    if (/prevenir|riesgo|obsolescencia|seguridad|mantenimiento/.test(text)) {
        return {
            type: "PREVENTIVE",
            criteria: "El texto indica prevencion, reduccion de riesgo o mantenimiento."
        };
    }
    return {
        type: "EVOLUTIONARY",
        criteria: "El cambio agrega o mejora capacidad funcional sin incidencia correctiva."
    };
}
function nextSemver(current, type) {
    const [major = 0, minor = 0, patch = 0] = current.split(".").map((part)=>Number(part) || 0);
    if (type === "EMERGENCY" || type === "CORRECTIVE") return `${major}.${minor}.${patch + 1}`;
    if (type === "PREVENTIVE") return `${major}.${minor + 1}.0`;
    return `${major + 1}.0.0`;
}
}),
"[project]/src/app/(protected)/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/* __next_internal_action_entry_do_not_use__ [{"001673bf106908c8d3426eec222a128099e2ed3af5":{"name":"logoutAction"},"4005e5cc0ec190bfb412f655f8bef99562f5f344fc":{"name":"createEcsAction"},"40187c3b36b597f9d895df0826cb88cfa90778c14f":{"name":"finalQualityAction"},"40205f8d6f4c4fd92e5ff60e1cfd53301f2db98496":{"name":"closeChangeRequestAction"},"4024848b8cc359e36719d8bededadd19ecbd91d87c":{"name":"createGithubBranchAction"},"4029ef3894713c482d1764feaeeeb8e6202e2ca460":{"name":"observeFormatAction"},"402f0ea3db2386fe8cb00de0189f136bfe8c803d8f":{"name":"createRoleAction"},"402fa80b5507df9b3d4aab54c6741c33379f5f3036":{"name":"createChangeRequestAction"},"4031b9abbf3a25401a2fceab7eb682eb0beb41e3bb":{"name":"updateDefectStatusAction"},"40337d87b05bc63e58b65ad34e62456bba2f173244":{"name":"executeReleaseAction"},"403b94788d665fef61ccf295b53d3869b558a9dda7":{"name":"recordUnitTestAction"},"4041dbdb3afa10dc8c1927ea7b351f49657ce44668":{"name":"createGithubProjectRepoAction"},"404592d76b3dd15584144fe2a495c4cbae98405714":{"name":"integrateChangeAction"},"405749e1a203fb1153676fcc28a68ce53e0e8d739b":{"name":"validateAlignmentAction"},"405885459964968c919b8865a9c1e9fd39ce3d3cea":{"name":"createChangeOrderAction"},"406597829c1d6e684c03deaf6524551b7c9b2eda25":{"name":"createGithubTagAction"},"4068cfdf0f0155586763d97d0b4baf4bc70c0c7764":{"name":"resubmitChangeRequestAction"},"406a9710480b473fbe910c2a590c2039965c675f97":{"name":"createIncidentAction"},"407a1177b6b4691416179692b7cb353f48e407f6f5":{"name":"setProjectStatusAction"},"4083b8367d5081a20b44ac07a7f3abceea28f1edae":{"name":"setProjectUserStatusAction"},"40913446e2e68f8aa61b34cb00d315f7a1dafec184":{"name":"checkInAction"},"409845efc66eff460f13a8d7f4c958b7cfd2c8f8e4":{"name":"ccbDecisionAction"},"40996835f1e8cfe71a7f77fac808e6fc4f2a6c9095":{"name":"recordUatAction"},"409ce3de40e8827cc9ca743bbd2cccc0573b117e1e":{"name":"transferLibraryAction"},"40b0a795a6fb6fffad3a1f8ea13256c436abec153d":{"name":"configureGithubWebhookAction"},"40b2a099603c0939c383ff400a3c16c3f01a178e84":{"name":"setRoleStatusAction"},"40b525afa05b2bf8d7620241024a6b3bb645d49132":{"name":"createBaselineAction"},"40bb94c676fbdbd12c0e5c4634a5c66d1a49a5a77d":{"name":"validateIntegrityAction"},"40c51d0da21bf4971ab58450e6b1a2ccab86730bcd":{"name":"createUserAction"},"40c857da79012c09ff82e2e48fa6d1b4e147fef840":{"name":"forceUnlockAction"},"40ceceb55510febdeee4df1dfea967f796c415cff8":{"name":"setUserStatusAction"},"40deb43f1afef7be1f1c75a8093edb87059f2eeb45":{"name":"createImpactAssessmentAction"},"40e1f00259b3a0998d113c67d1b0d09249e246972f":{"name":"updateIncidentStatusAction"},"40f0f8d5eeff78e4ac287fcd39e66e91f173f70e7b":{"name":"createGithubIssueAction"},"40f22d2e2ff3e31a99df51467f47c12834d7cc15e8":{"name":"checkOutAction"},"40f782daf9b056d574bd0f905641fb9b8e9ef18ab1":{"name":"assignProjectRoleAction"},"40f9e819eea9fdcf8063b506b3b96720bdd7dd3bce":{"name":"createProjectAction"},"40fd9015124e26bd3c4abe7ed9d38e966330a44ad2":{"name":"recordQaTestAction"},"40fde470c338c3d4f4dacc897d690bbeda9aca7b4b":{"name":"createGithubPullRequestAction"},"40ff14fa1c13777668eaabc7220177788403a9433b":{"name":"technicalDecisionAction"},"40ff3bf6173fd1180383ac2b135a5ef3d442093dd6":{"name":"startImplementationAction"}},"src/app/(protected)/actions.ts",""] */ __turbopack_context__.s([
    "assignProjectRoleAction",
    ()=>assignProjectRoleAction,
    "ccbDecisionAction",
    ()=>ccbDecisionAction,
    "checkInAction",
    ()=>checkInAction,
    "checkOutAction",
    ()=>checkOutAction,
    "closeChangeRequestAction",
    ()=>closeChangeRequestAction,
    "configureGithubWebhookAction",
    ()=>configureGithubWebhookAction,
    "createBaselineAction",
    ()=>createBaselineAction,
    "createChangeOrderAction",
    ()=>createChangeOrderAction,
    "createChangeRequestAction",
    ()=>createChangeRequestAction,
    "createEcsAction",
    ()=>createEcsAction,
    "createGithubBranchAction",
    ()=>createGithubBranchAction,
    "createGithubIssueAction",
    ()=>createGithubIssueAction,
    "createGithubProjectRepoAction",
    ()=>createGithubProjectRepoAction,
    "createGithubPullRequestAction",
    ()=>createGithubPullRequestAction,
    "createGithubTagAction",
    ()=>createGithubTagAction,
    "createImpactAssessmentAction",
    ()=>createImpactAssessmentAction,
    "createIncidentAction",
    ()=>createIncidentAction,
    "createProjectAction",
    ()=>createProjectAction,
    "createRoleAction",
    ()=>createRoleAction,
    "createUserAction",
    ()=>createUserAction,
    "executeReleaseAction",
    ()=>executeReleaseAction,
    "finalQualityAction",
    ()=>finalQualityAction,
    "forceUnlockAction",
    ()=>forceUnlockAction,
    "integrateChangeAction",
    ()=>integrateChangeAction,
    "logoutAction",
    ()=>logoutAction,
    "observeFormatAction",
    ()=>observeFormatAction,
    "recordQaTestAction",
    ()=>recordQaTestAction,
    "recordUatAction",
    ()=>recordUatAction,
    "recordUnitTestAction",
    ()=>recordUnitTestAction,
    "resubmitChangeRequestAction",
    ()=>resubmitChangeRequestAction,
    "setProjectStatusAction",
    ()=>setProjectStatusAction,
    "setProjectUserStatusAction",
    ()=>setProjectUserStatusAction,
    "setRoleStatusAction",
    ()=>setRoleStatusAction,
    "setUserStatusAction",
    ()=>setUserStatusAction,
    "startImplementationAction",
    ()=>startImplementationAction,
    "technicalDecisionAction",
    ()=>technicalDecisionAction,
    "transferLibraryAction",
    ()=>transferLibraryAction,
    "updateDefectStatusAction",
    ()=>updateDefectStatusAction,
    "updateIncidentStatusAction",
    ()=>updateIncidentStatusAction,
    "validateAlignmentAction",
    ()=>validateAlignmentAction,
    "validateIntegrityAction",
    ()=>validateIntegrityAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/audit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/workflow.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__ = __turbopack_context__.i("[externals]/bcryptjs [external] (bcryptjs, esm_import, [project]/node_modules/bcryptjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
function value(formData, key) {
    return String(formData.get(key) ?? "").trim();
}
function optionalValue(formData, key) {
    const current = value(formData, key);
    return current.length > 0 ? current : undefined;
}
function numberValue(formData, key, fallback = 0) {
    const raw = Number(value(formData, key));
    return Number.isFinite(raw) ? raw : fallback;
}
function fileValue(formData, key) {
    const file = formData.get(key);
    if (file instanceof File && file.size > 0) return file;
    return null;
}
function currentPath(formData) {
    return value(formData, "currentPath") || "/dashboard";
}
function go(formData, message, type = "ok") {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(currentPath(formData));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`${currentPath(formData)}?${type}=${encodeURIComponent(message)}`);
}
function requireField(formData, field, label) {
    const current = value(formData, field);
    if (!current) go(formData, `${label} es obligatorio.`, "error");
    return current;
}
function slugText(input) {
    return input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
async function requireGithubToken(formData, userId) {
    const fullUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            githubTokenEncrypted: true
        }
    });
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveGithubToken"])(fullUser?.githubTokenEncrypted);
    if (!token) {
        go(formData, "Configure GITHUB_WORKSPACE_TOKEN para usar el workspace GitHub compartido.", "error");
    }
    return token;
}
async function nextTicket(prefix, table) {
    const count = table === "incident" ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].incident.count() : table === "changeRequest" ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.count() : table === "changeOrder" ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.count() : await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].defect.count();
    return `${prefix}-${String(count + 1).padStart(4, "0")}`;
}
async function logoutAction() {
    const { clearSessionCookie } = await __turbopack_context__.A("[project]/src/lib/auth.ts [app-rsc] (ecmascript, async loader)");
    await clearSessionCookie();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
}
async function createUserAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.users.manage");
    const name = requireField(formData, "name", "Nombre");
    const email = requireField(formData, "email", "Email").toLowerCase();
    const password = requireField(formData, "password", "Contrasena");
    const roleId = requireField(formData, "roleId", "Rol");
    const githubToken = optionalValue(formData, "githubToken");
    const passwordHash = await __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__["default"].hash(password, 12);
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.create({
        data: {
            name,
            email,
            passwordHash,
            roleId,
            status: value(formData, "status") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
            githubTokenEncrypted: githubToken ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encryptSecret"])(githubToken) : undefined,
            githubTokenLast4: githubToken ? githubToken.slice(-4) : undefined
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "usuarios",
        action: "create",
        next: {
            id: created.id,
            email
        }
    });
    go(formData, "Usuario creado.");
}
async function setUserStatusAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.users.manage");
    const id = requireField(formData, "id", "Usuario");
    const status = value(formData, "status") === "ACTIVE" ? "ACTIVE" : "INACTIVE";
    const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.update({
        where: {
            id
        },
        data: {
            status
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "usuarios",
        action: "status",
        previous: before,
        next: {
            id,
            status
        }
    });
    go(formData, "Estado de usuario actualizado.");
}
async function assignProjectRoleAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.users.manage");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const userId = requireField(formData, "userId", "Usuario");
    const roleId = requireField(formData, "roleId", "Rol en proyecto");
    const role = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].role.findUnique({
        where: {
            id: roleId
        }
    });
    if (!role || !role.active || role.isSystem) go(formData, "Seleccione un rol activo de usuario.", "error");
    const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].projectUser.findUnique({
        where: {
            projectId_userId: {
                projectId,
                userId
            }
        },
        include: {
            project: true,
            user: true,
            role: true
        }
    });
    const assignment = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].projectUser.upsert({
        where: {
            projectId_userId: {
                projectId,
                userId
            }
        },
        create: {
            projectId,
            userId,
            roleId,
            roleNote: optionalValue(formData, "roleNote"),
            active: true
        },
        update: {
            roleId,
            roleNote: optionalValue(formData, "roleNote"),
            active: true
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "usuarios",
        action: "assign_project_role",
        previous: before,
        next: assignment
    });
    go(formData, "Rol por proyecto asignado.");
}
async function setProjectUserStatusAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.users.manage");
    const id = requireField(formData, "id", "Asignacion");
    const active = value(formData, "active") === "true";
    const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].projectUser.findUnique({
        where: {
            id
        },
        include: {
            project: true,
            user: true,
            role: true
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].projectUser.update({
        where: {
            id
        },
        data: {
            active
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "usuarios",
        action: "project_role_status",
        previous: before,
        next: {
            id,
            active
        }
    });
    go(formData, "Estado de asignacion actualizado.");
}
async function createRoleAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.roles.manage");
    const slug = requireField(formData, "slug", "Slug").toUpperCase().replace(/[^A-Z0-9_]/g, "_");
    const role = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].role.create({
        data: {
            slug,
            name: requireField(formData, "name", "Nombre"),
            description: optionalValue(formData, "description"),
            isSystem: false
        }
    });
    const permissionIds = formData.getAll("permissionIds").map(String).filter(Boolean);
    for (const permissionId of permissionIds){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].rolePermission.create({
            data: {
                roleId: role.id,
                permissionId
            }
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "roles",
        action: "create",
        next: {
            role: role.slug,
            permissions: permissionIds.length
        }
    });
    go(formData, "Rol creado con permisos asignados.");
}
async function setRoleStatusAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.roles.manage");
    const id = requireField(formData, "id", "Rol");
    const active = value(formData, "active") === "true";
    const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].role.findUnique({
        where: {
            id
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].role.update({
        where: {
            id
        },
        data: {
            active
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "roles",
        action: "status",
        previous: before,
        next: {
            id,
            active
        }
    });
    go(formData, "Estado de rol actualizado.");
}
async function createProjectAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.projects.manage");
    const code = requireField(formData, "code", "Codigo").toUpperCase();
    const name = requireField(formData, "name", "Nombre");
    const managerId = requireField(formData, "managerId", "Jefe de Proyecto");
    const manager = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: managerId
        },
        select: {
            roleId: true
        }
    });
    if (!manager) go(formData, "Jefe de proyecto no encontrado.", "error");
    let githubOwner = optionalValue(formData, "githubOwner");
    let githubRepo = optionalValue(formData, "githubRepo");
    if (value(formData, "createGithubRepo") === "on") {
        const repo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubRepository"])(await requireGithubToken(formData, user.id), {
            owner: githubOwner,
            name: githubRepo ?? slugText(code),
            description: optionalValue(formData, "description") ?? `Repositorio del proyecto ${code} - ${name}`,
            visibility: value(formData, "githubVisibility") === "public" ? "public" : "private",
            autoInit: value(formData, "githubAutoInit") !== "off"
        });
        githubOwner = repo.owner;
        githubRepo = repo.name;
    }
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.create({
        data: {
            code,
            name,
            description: optionalValue(formData, "description"),
            managerId,
            createdById: user.id,
            githubOwner,
            githubRepo
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].projectUser.upsert({
        where: {
            projectId_userId: {
                projectId: project.id,
                userId: managerId
            }
        },
        create: {
            projectId: project.id,
            userId: managerId,
            roleId: manager.roleId,
            roleNote: "Jefe de proyecto",
            active: true
        },
        update: {
            roleId: manager.roleId,
            roleNote: "Jefe de proyecto",
            active: true
        }
    });
    for (const type of [
        "WORK",
        "INTEGRATION",
        "SUPPORT",
        "MASTER"
    ]){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].library.create({
            data: {
                projectId: project.id,
                type,
                name: type === "WORK" ? "Trabajo" : type === "INTEGRATION" ? "Integracion" : type === "SUPPORT" ? "Soporte" : "Maestra"
            }
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "proyectos",
        action: "create",
        next: project
    });
    go(formData, githubOwner && githubRepo ? "Proyecto creado con bibliotecas base y repositorio GitHub vinculado." : "Proyecto creado con bibliotecas base.");
}
async function setProjectStatusAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.projects.manage");
    const id = requireField(formData, "id", "Proyecto");
    const status = requireField(formData, "status", "Estado");
    const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUnique({
        where: {
            id
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.update({
        where: {
            id
        },
        data: {
            status,
            closedAt: status === "CLOSED" ? new Date() : undefined
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "proyectos",
        action: "status",
        previous: before,
        next: {
            id,
            status
        }
    });
    go(formData, "Estado de proyecto actualizado.");
}
async function createGithubProjectRepoAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dashboard.read");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUniqueOrThrow({
        where: {
            id: projectId
        }
    });
    const repo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubRepository"])(await requireGithubToken(formData, user.id), {
        owner: optionalValue(formData, "githubOwner") ?? project.githubOwner,
        name: optionalValue(formData, "githubRepo") ?? project.githubRepo ?? slugText(project.code),
        description: optionalValue(formData, "description") ?? project.description ?? `Repositorio del proyecto ${project.code}`,
        visibility: value(formData, "githubVisibility") === "public" ? "public" : "private",
        autoInit: value(formData, "githubAutoInit") !== "off"
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.update({
        where: {
            id: projectId
        },
        data: {
            githubOwner: repo.owner,
            githubRepo: repo.name
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "github",
        action: repo.created ? "repo_create" : "repo_link_existing",
        next: {
            projectId,
            repo
        }
    });
    go(formData, repo.created ? `Repositorio GitHub creado: ${repo.fullName}.` : `Repositorio GitHub existente vinculado: ${repo.fullName}.`);
}
async function createGithubBranchAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dashboard.read");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const branchName = requireField(formData, "branchName", "Rama");
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUniqueOrThrow({
        where: {
            id: projectId
        }
    });
    const branch = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubBranch"])(project, await requireGithubToken(formData, user.id), branchName, optionalValue(formData, "baseBranch") ?? "main");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "github",
        action: branch.created ? "branch_create" : "branch_exists",
        next: {
            projectId,
            branch
        }
    });
    go(formData, branch.created ? `Rama GitHub creada: ${branch.name}.` : `La rama GitHub ya existia: ${branch.name}.`);
}
async function createGithubPullRequestAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dashboard.read");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUniqueOrThrow({
        where: {
            id: projectId
        }
    });
    const pull = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureGithubPullRequest"])(project, await requireGithubToken(formData, user.id), {
        title: requireField(formData, "title", "Titulo PR"),
        head: requireField(formData, "headBranch", "Rama origen"),
        base: optionalValue(formData, "baseBranch") ?? "main",
        body: optionalValue(formData, "body")
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "github",
        action: pull.created ? "pull_request_create" : "pull_request_exists",
        next: {
            projectId,
            pull
        }
    });
    go(formData, pull.created ? `Pull request creado: #${pull.number}.` : `Pull request abierto reutilizado: #${pull.number}.`);
}
async function createGithubTagAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dashboard.read");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUniqueOrThrow({
        where: {
            id: projectId
        }
    });
    const tag = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubTag"])(project, await requireGithubToken(formData, user.id), requireField(formData, "tagName", "Tag"), requireField(formData, "commitSha", "Commit SHA"));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "github",
        action: tag.created ? "tag_create" : "tag_exists",
        next: {
            projectId,
            tag
        }
    });
    go(formData, tag.created ? `Tag GitHub creado: ${tag.name}.` : `El tag GitHub ya existia: ${tag.name}.`);
}
async function createGithubIssueAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dashboard.read");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUniqueOrThrow({
        where: {
            id: projectId
        }
    });
    const issue = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubIssue"])(project, await requireGithubToken(formData, user.id), requireField(formData, "title", "Titulo issue"), optionalValue(formData, "body"));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "github",
        action: "issue_create",
        next: {
            projectId,
            issue
        }
    });
    go(formData, `Issue GitHub creado: #${issue.number}.`);
}
async function configureGithubWebhookAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dashboard.read");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUniqueOrThrow({
        where: {
            id: projectId
        }
    });
    const hook = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureGithubWebhook"])(project, await requireGithubToken(formData, user.id), {
        url: requireField(formData, "webhookUrl", "URL webhook"),
        secret: optionalValue(formData, "webhookSecret") ?? process.env.GITHUB_WEBHOOK_SECRET,
        events: [
            "push"
        ]
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "github",
        action: hook.created ? "webhook_create" : "webhook_update",
        next: {
            projectId,
            hook
        }
    });
    go(formData, hook.created ? "Webhook GitHub creado para push automatico a QA." : "Webhook GitHub actualizado para push automatico a QA.");
}
async function createEcsAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("config.ecs.manage");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const libraryId = requireField(formData, "libraryId", "Biblioteca");
    const code = requireField(formData, "code", "Codigo").toUpperCase();
    const name = requireField(formData, "name", "Nombre ECS");
    const description = requireField(formData, "description", "Descripcion");
    const file = fileValue(formData, "file");
    if (!file) go(formData, "El archivo ECS es obligatorio para calcular SHA-256.", "error");
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].project.findUniqueOrThrow({
        where: {
            id: projectId
        }
    });
    const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveUploadedFile"])(file, `ecs/${project.code}`);
    const version = optionalValue(formData, "version") ?? "1.0.0";
    const item = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.create({
        data: {
            code,
            projectId,
            libraryId,
            type: requireField(formData, "type", "Tipo"),
            name,
            description,
            currentVersion: version,
            status: "AVAILABLE",
            metadata: optionalValue(formData, "metadata"),
            storagePath: stored.storagePath,
            sha256Hash: stored.sha256Hash,
            responsibleId: requireField(formData, "responsibleId", "Responsable")
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemVersion.create({
        data: {
            itemId: item.id,
            version,
            storagePath: stored.storagePath,
            sha256Hash: stored.sha256Hash,
            comment: "Version inicial registrada.",
            createdById: user.id
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "ecs",
        action: "create",
        next: {
            item: item.code,
            hash: stored.sha256Hash
        }
    });
    go(formData, "ECS registrado con hash SHA-256.");
}
async function checkOutAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("config.versions.manage");
    const itemId = requireField(formData, "itemId", "ECS");
    const activeLock = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemLock.findFirst({
        where: {
            itemId,
            status: "ACTIVE"
        }
    });
    if (activeLock) go(formData, "El ECS ya tiene un bloqueo activo.", "error");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemLock.create({
        data: {
            itemId,
            userId: user.id,
            reason: optionalValue(formData, "reason")
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.update({
        where: {
            id: itemId
        },
        data: {
            status: "LOCKED"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "versiones",
        action: "checkout",
        next: {
            itemId
        }
    });
    go(formData, "Check-out registrado y ECS bloqueado.");
}
async function checkInAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("config.versions.manage");
    const itemId = requireField(formData, "itemId", "ECS");
    const comment = requireField(formData, "comment", "Comentario de check-in");
    const version = requireField(formData, "version", "Version");
    const file = fileValue(formData, "file");
    if (!file) go(formData, "El archivo versionado es obligatorio.", "error");
    const lock = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemLock.findFirst({
        where: {
            itemId,
            status: "ACTIVE"
        }
    });
    if (!lock || lock.userId !== user.id && user.roleSlug !== "BIBLIOTECARIO") {
        go(formData, "Solo el usuario con bloqueo activo puede hacer check-in.", "error");
    }
    const item = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.findUniqueOrThrow({
        where: {
            id: itemId
        },
        include: {
            project: true
        }
    });
    const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveUploadedFile"])(file, `ecs/${item.project.code}`, `${item.code}-${version}-${file.name}`);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemVersion.create({
        data: {
            itemId,
            version,
            storagePath: stored.storagePath,
            sha256Hash: stored.sha256Hash,
            comment,
            createdById: user.id,
            changeRequestId: optionalValue(formData, "changeRequestId"),
            changeOrderId: optionalValue(formData, "changeOrderId"),
            gitBranch: optionalValue(formData, "gitBranch"),
            gitCommit: optionalValue(formData, "gitCommit"),
            gitPushRef: optionalValue(formData, "gitPushRef")
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.update({
        where: {
            id: itemId
        },
        data: {
            currentVersion: version,
            storagePath: stored.storagePath,
            sha256Hash: stored.sha256Hash,
            status: "AVAILABLE"
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemLock.update({
        where: {
            id: lock.id
        },
        data: {
            status: "RELEASED",
            unlockedAt: new Date()
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "versiones",
        action: "checkin",
        next: {
            itemId,
            version,
            hash: stored.sha256Hash
        }
    });
    go(formData, "Check-in registrado y bloqueo liberado.");
}
async function forceUnlockAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("config.locks.manage");
    const lockId = requireField(formData, "lockId", "Bloqueo");
    const forceReason = requireField(formData, "forceReason", "Motivo de desbloqueo forzado");
    const lock = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemLock.findUniqueOrThrow({
        where: {
            id: lockId
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemLock.update({
        where: {
            id: lockId
        },
        data: {
            status: "FORCED",
            forcedById: user.id,
            forceReason,
            unlockedAt: new Date()
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.update({
        where: {
            id: lock.itemId
        },
        data: {
            status: "AVAILABLE"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "bloqueos",
        action: "force_unlock",
        previous: lock,
        next: {
            forceReason
        }
    });
    go(formData, "Bloqueo liberado por contingencia.");
}
async function transferLibraryAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("config.libraries.manage");
    const itemId = requireField(formData, "itemId", "ECS");
    const toLibraryId = requireField(formData, "toLibraryId", "Biblioteca destino");
    const reason = requireField(formData, "reason", "Motivo");
    const item = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.findUniqueOrThrow({
        where: {
            id: itemId
        }
    });
    const activeLock = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemLock.findFirst({
        where: {
            itemId,
            status: "ACTIVE"
        }
    });
    if (activeLock) go(formData, "No se puede transferir un ECS bloqueado.", "error");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].libraryTransfer.create({
        data: {
            itemId,
            fromLibraryId: item.libraryId,
            toLibraryId,
            userId: user.id,
            reason,
            status: "COMPLETED",
            completedAt: new Date()
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.update({
        where: {
            id: itemId
        },
        data: {
            libraryId: toLibraryId
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "bibliotecas",
        action: "transfer",
        previous: {
            libraryId: item.libraryId
        },
        next: {
            toLibraryId
        }
    });
    go(formData, "Transferencia de biblioteca registrada.");
}
async function createBaselineAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("config.baselines.manage");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const versionIds = formData.getAll("versionIds").map(String).filter(Boolean);
    if (versionIds.length === 0) go(formData, "Seleccione versiones exactas de ECS.", "error");
    const baseline = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].baseline.create({
        data: {
            code: requireField(formData, "code", "Codigo").toUpperCase(),
            projectId,
            name: requireField(formData, "name", "Nombre"),
            description: optionalValue(formData, "description"),
            milestone: optionalValue(formData, "milestone"),
            status: "FROZEN",
            createdById: user.id,
            frozenAt: new Date()
        }
    });
    const versions = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItemVersion.findMany({
        where: {
            id: {
                in: versionIds
            }
        }
    });
    for (const version of versions){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].baselineItem.create({
            data: {
                baselineId: baseline.id,
                itemId: version.itemId,
                itemVersionId: version.id,
                versionLabel: version.version
            }
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "lineas-base",
        action: "freeze",
        next: {
            baseline: baseline.code,
            items: versions.length
        }
    });
    go(formData, "Linea base creada y congelada.");
}
async function validateIntegrityAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("admin.integrity.read");
    const itemId = requireField(formData, "itemId", "ECS");
    const item = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].configurationItem.findUniqueOrThrow({
        where: {
            id: itemId
        }
    });
    if (!item.storagePath || !item.sha256Hash) go(formData, "El ECS no tiene archivo o hash registrado.", "error");
    const actualHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sha256File"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(/*turbopackIgnore: true*/ process.cwd(), item.storagePath));
    if (actualHash !== item.sha256Hash) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].integrityAlert.create({
            data: {
                projectId: item.projectId,
                itemId: item.id,
                expectedHash: item.sha256Hash,
                actualHash,
                detail: "Discrepancia SHA-256 detectada en validacion manual."
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
            userId: user.id,
            module: "integridad",
            action: "mismatch",
            next: {
                itemId,
                actualHash
            }
        });
        go(formData, "Discrepancia detectada. Se genero alerta de integridad.", "error");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "integridad",
        action: "ok",
        next: {
            itemId
        }
    });
    go(formData, "Integridad validada correctamente.");
}
async function createIncidentAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("support.incidents.manage");
    const projectId = requireField(formData, "projectId", "Proyecto");
    const incident = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].incident.create({
        data: {
            ticketId: await nextTicket("INC", "incident"),
            projectId,
            reportedById: user.id,
            title: requireField(formData, "title", "Titulo"),
            severity: requireField(formData, "severity", "Severidad"),
            description: requireField(formData, "description", "Descripcion"),
            reproductionSteps: requireField(formData, "reproductionSteps", "Pasos de reproduccion"),
            affectedItemId: optionalValue(formData, "affectedItemId"),
            assignedToId: optionalValue(formData, "assignedToId")
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "incidencias",
        action: "create",
        next: {
            ticketId: incident.ticketId
        }
    });
    go(formData, "Incidencia registrada.");
}
async function updateIncidentStatusAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("support.incidents.manage");
    const id = requireField(formData, "id", "Incidencia");
    const status = requireField(formData, "status", "Estado");
    const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].incident.findUnique({
        where: {
            id
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].incident.update({
        where: {
            id
        },
        data: {
            status
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "incidencias",
        action: "status",
        previous: before,
        next: {
            id,
            status
        }
    });
    go(formData, "Estado de incidencia actualizado.");
}
async function createChangeRequestAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.requests.manage");
    const missing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["missingChangeFields"])(formData);
    if (missing.length > 0) {
        go(formData, `Solicitud observada por formato. Faltan: ${missing.join(", ")}.`, "error");
    }
    const projectId = value(formData, "projectId");
    const priority = value(formData, "priority");
    const originIncidentId = optionalValue(formData, "originIncidentId");
    const title = value(formData, "title");
    const description = value(formData, "description");
    const justification = value(formData, "justification");
    const classification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["classifyChange"])({
        title,
        description,
        justification,
        priority,
        originIncidentId
    });
    const change = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.create({
        data: {
            ticketId: await nextTicket("SC", "changeRequest"),
            projectId,
            requesterId: user.id,
            title,
            description,
            justification,
            priority,
            type: classification.type,
            originIncidentId,
            status: "INITIAL_VALIDATION",
            classificationCriteria: classification.criteria
        }
    });
    const affectedItemId = optionalValue(formData, "affectedItemId");
    if (affectedItemId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequestItem.create({
            data: {
                changeRequestId: change.id,
                itemId: affectedItemId
            }
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "solicitudes",
        action: "create",
        next: {
            ticketId: change.ticketId,
            classification
        }
    });
    go(formData, "Solicitud creada y enviada a validacion inicial.");
}
async function observeFormatAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.requests.manage");
    const id = requireField(formData, "id", "Solicitud");
    const observations = requireField(formData, "observations", "Observaciones");
    const change = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id
        },
        data: {
            status: "FORMAT_OBSERVED",
            observations
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notify"])(change.requesterId, "Solicitud observada por formato", `${change.ticketId}: ${observations}`, "/cambios/solicitudes", "WARNING");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "solicitudes",
        action: "observe_format",
        next: {
            id,
            observations
        }
    });
    go(formData, "Solicitud devuelta al solicitante.");
}
async function resubmitChangeRequestAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.requests.manage");
    const id = requireField(formData, "id", "Solicitud");
    const title = requireField(formData, "title", "Titulo");
    const description = requireField(formData, "description", "Descripcion");
    const justification = requireField(formData, "justification", "Justificacion");
    const priority = requireField(formData, "priority", "Prioridad");
    const originIncidentId = optionalValue(formData, "originIncidentId");
    const classification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["classifyChange"])({
        title,
        description,
        justification,
        priority,
        originIncidentId
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id
        },
        data: {
            title,
            description,
            justification,
            priority,
            type: classification.type,
            classificationCriteria: classification.criteria,
            status: "INITIAL_VALIDATION"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "solicitudes",
        action: "resubmit",
        next: {
            id
        }
    });
    go(formData, "Solicitud corregida y reenviada.");
}
async function validateAlignmentAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.requests.manage");
    const id = requireField(formData, "id", "Solicitud");
    const decision = requireField(formData, "decision", "Decision");
    const reason = optionalValue(formData, "reason");
    const change = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.findUniqueOrThrow({
        where: {
            id
        }
    });
    if (decision === "NOT_ALIGNED" && !reason) go(formData, "El motivo de rechazo es obligatorio.", "error");
    if (decision === "NOT_ALIGNED") {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
            where: {
                id
            },
            data: {
                status: "ALIGNMENT_REJECTED",
                alignmentDecision: "NOT_ALIGNED",
                alignmentReason: reason,
                alignedById: user.id
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notify"])(change.requesterId, "Solicitud rechazada por alineacion", `${change.ticketId}: ${reason}`, "/cambios/solicitudes", "ERROR");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
            userId: user.id,
            module: "solicitudes",
            action: "alignment_reject",
            next: {
                id,
                reason
            }
        });
        go(formData, "Solicitud rechazada por alineacion.");
    }
    const requiredMissing = [
        change.title,
        change.description,
        change.justification,
        change.priority
    ].some((field)=>!field);
    if (requiredMissing) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
            where: {
                id
            },
            data: {
                status: "FORMAT_OBSERVED",
                observations: "Campos obligatorios incompletos."
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notify"])(change.requesterId, "Solicitud observada por formato", `${change.ticketId}: campos obligatorios incompletos.`, "/cambios/solicitudes", "WARNING");
        go(formData, "Solicitud observada por formato.");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id
        },
        data: {
            status: "CLASSIFIED",
            alignmentDecision: "ALIGNED",
            alignmentReason: reason,
            alignedById: user.id,
            formalRegisteredAt: new Date()
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "solicitudes",
        action: "alignment_approve",
        next: {
            id
        }
    });
    go(formData, "Solicitud alineada, registrada formalmente y clasificada.");
}
async function createImpactAssessmentAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.impact.manage");
    const changeRequestId = requireField(formData, "changeRequestId", "Solicitud");
    const change = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.findUniqueOrThrow({
        where: {
            id: changeRequestId
        }
    });
    if (![
        "CLASSIFIED",
        "IMPACT_ANALYSIS"
    ].includes(change.status)) {
        go(formData, "La solicitud debe estar clasificada antes de evaluar impacto.", "error");
    }
    const costEstimated = numberValue(formData, "costEstimated");
    const timeEstimatedHours = numberValue(formData, "timeEstimatedHours");
    const highImpact = value(formData, "highImpact") === "on" || costEstimated >= 5000 || timeEstimatedHours >= 80 || change.priority === "CRITICAL";
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].impactAssessment.upsert({
        where: {
            changeRequestId
        },
        create: {
            changeRequestId,
            costEstimated,
            timeEstimatedHours,
            risks: requireField(formData, "risks", "Riesgos"),
            requiredResources: requireField(formData, "requiredResources", "Recursos"),
            technicalImpact: requireField(formData, "technicalImpact", "Impacto tecnico"),
            functionalImpact: requireField(formData, "functionalImpact", "Impacto funcional"),
            affectedItemsImpact: requireField(formData, "affectedItemsImpact", "ECS afectados"),
            roi: requireField(formData, "roi", "Beneficio o ROI"),
            highImpact,
            route: highImpact ? "CCB" : "TECHNICAL_LEAD",
            assessedById: user.id
        },
        update: {
            costEstimated,
            timeEstimatedHours,
            risks: requireField(formData, "risks", "Riesgos"),
            requiredResources: requireField(formData, "requiredResources", "Recursos"),
            technicalImpact: requireField(formData, "technicalImpact", "Impacto tecnico"),
            functionalImpact: requireField(formData, "functionalImpact", "Impacto funcional"),
            affectedItemsImpact: requireField(formData, "affectedItemsImpact", "ECS afectados"),
            roi: requireField(formData, "roi", "Beneficio o ROI"),
            highImpact,
            route: highImpact ? "CCB" : "TECHNICAL_LEAD",
            assessedById: user.id
        }
    });
    if (highImpact) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].ccbReview.create({
            data: {
                changeRequestId,
                status: "PENDING",
                scheduledAt: new Date()
            }
        });
    } else {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].technicalApproval.upsert({
            where: {
                changeRequestId
            },
            create: {
                changeRequestId,
                reviewerId: user.id,
                decision: "PENDING"
            },
            update: {
                decision: "PENDING"
            }
        });
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: changeRequestId
        },
        data: {
            status: highImpact ? "CCB_REVIEW" : "FAST_APPROVAL"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "impacto",
        action: "assess",
        next: {
            changeRequestId,
            highImpact
        }
    });
    go(formData, highImpact ? "Impacto alto derivado a CCB." : "Impacto bajo derivado a aprobacion rapida.");
}
async function technicalDecisionAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.technical.manage");
    const changeRequestId = requireField(formData, "changeRequestId", "Solicitud");
    const decision = requireField(formData, "decision", "Decision");
    const reason = optionalValue(formData, "reason");
    if (decision === "REJECTED" && !reason) go(formData, "El motivo de rechazo es obligatorio.", "error");
    const change = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.findUniqueOrThrow({
        where: {
            id: changeRequestId
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].technicalApproval.upsert({
        where: {
            changeRequestId
        },
        create: {
            changeRequestId,
            reviewerId: user.id,
            decision,
            reason,
            decidedAt: new Date()
        },
        update: {
            reviewerId: user.id,
            decision,
            reason,
            decidedAt: new Date()
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: changeRequestId
        },
        data: {
            status: decision === "APPROVED" ? "APPROVED" : "REJECTED"
        }
    });
    if (decision === "REJECTED") {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notify"])(change.requesterId, "Solicitud rechazada por lider tecnico", `${change.ticketId}: ${reason}`, "/cambios/solicitudes", "ERROR");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "aprobacion-tecnica",
        action: decision.toLowerCase(),
        next: {
            changeRequestId,
            reason
        }
    });
    go(formData, decision === "APPROVED" ? "Cambio aprobado por lider tecnico." : "Cambio rechazado y notificado.");
}
async function ccbDecisionAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.ccb.manage");
    const reviewId = requireField(formData, "reviewId", "Revision CCB");
    const decision = requireField(formData, "decision", "Decision");
    const resolution = requireField(formData, "resolution", "Resolucion o motivo");
    const review = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].ccbReview.findUniqueOrThrow({
        where: {
            id: reviewId
        },
        include: {
            changeRequest: true
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].ccbVote.upsert({
        where: {
            reviewId_voterId: {
                reviewId,
                voterId: user.id
            }
        },
        create: {
            reviewId,
            voterId: user.id,
            decision,
            comment: optionalValue(formData, "comment")
        },
        update: {
            decision,
            comment: optionalValue(formData, "comment")
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].ccbResolution.upsert({
        where: {
            reviewId
        },
        create: {
            reviewId,
            decision,
            resolution,
            issuedById: user.id
        },
        update: {
            decision,
            resolution,
            issuedById: user.id,
            issuedAt: new Date()
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].ccbReview.update({
        where: {
            id: reviewId
        },
        data: {
            status: decision,
            summary: resolution,
            reviewedAt: new Date()
        }
    });
    const status = decision === "APPROVED" ? "APPROVED" : decision === "REJECTED" ? "REJECTED" : "CCB_REVIEW";
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: review.changeRequestId
        },
        data: {
            status
        }
    });
    if (decision === "REJECTED") {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notify"])(review.changeRequest.requesterId, "Solicitud rechazada por CCB", `${review.changeRequest.ticketId}: ${resolution}`, "/cambios/solicitudes", "ERROR");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "ccb",
        action: decision.toLowerCase(),
        next: {
            reviewId,
            resolution
        }
    });
    go(formData, "Resolucion CCB registrada.");
}
async function createChangeOrderAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.orders.manage");
    const changeRequestId = requireField(formData, "changeRequestId", "Solicitud aprobada");
    const change = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.findUniqueOrThrow({
        where: {
            id: changeRequestId
        }
    });
    if (change.status !== "APPROVED") go(formData, "Solo se puede crear orden desde solicitud aprobada.", "error");
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.create({
        data: {
            code: await nextTicket("OC", "changeOrder"),
            changeRequestId,
            projectId: change.projectId,
            developerId: requireField(formData, "developerId", "Desarrollador"),
            priority: requireField(formData, "priority", "Prioridad"),
            dueDate: optionalValue(formData, "dueDate") ? new Date(value(formData, "dueDate")) : undefined,
            estimatedHours: numberValue(formData, "estimatedHours"),
            peopleResources: requireField(formData, "peopleResources", "Personas asignadas"),
            environment: requireField(formData, "environment", "Ambiente")
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: changeRequestId
        },
        data: {
            status: "RESOURCE_ASSIGNMENT"
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrderAssignment.create({
        data: {
            changeOrderId: order.id,
            userId: order.developerId,
            roleInOrder: "Desarrollador asignado",
            hoursAssigned: order.estimatedHours
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "ordenes",
        action: "create",
        next: {
            code: order.code
        }
    });
    go(formData, "Orden de cambio creada y asignada.");
}
async function startImplementationAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dev.orders.manage");
    const orderId = requireField(formData, "orderId", "Orden");
    const gitBranch = requireField(formData, "gitBranch", "Rama GitFlow");
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.findUniqueOrThrow({
        where: {
            id: orderId
        },
        include: {
            project: true,
            changeRequest: true
        }
    });
    if (order.developerId !== user.id && user.roleSlug !== "BIBLIOTECARIO") {
        go(formData, "Solo el desarrollador asignado puede iniciar la implementacion.", "error");
    }
    if (value(formData, "createGithubBranch") === "on") {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubBranch"])(order.project, await requireGithubToken(formData, user.id), gitBranch, optionalValue(formData, "baseBranch") ?? "main");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
        where: {
            id: orderId
        },
        data: {
            gitBranch,
            status: "IMPLEMENTING"
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: order.changeRequestId
        },
        data: {
            status: "IMPLEMENTATION"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "implementacion",
        action: "start",
        next: {
            orderId,
            gitBranch
        }
    });
    go(formData, "Implementacion iniciada.");
}
async function recordUnitTestAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dev.unit.manage");
    const changeOrderId = requireField(formData, "changeOrderId", "Orden");
    const result = requireField(formData, "result", "Resultado");
    const errors = optionalValue(formData, "errors");
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.findUniqueOrThrow({
        where: {
            id: changeOrderId
        }
    });
    if (result === "FAILED" && !errors) go(formData, "Debe registrar errores de pruebas unitarias fallidas.", "error");
    if (result === "PASSED" && (!optionalValue(formData, "gitCommit") || !optionalValue(formData, "gitPushRef"))) {
        go(formData, "Commit y push son obligatorios cuando las pruebas unitarias pasan.", "error");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].unitTest.create({
        data: {
            changeOrderId,
            itemVersionId: optionalValue(formData, "itemVersionId"),
            executedById: user.id,
            result,
            errors,
            notes: optionalValue(formData, "notes")
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
        where: {
            id: changeOrderId
        },
        data: {
            status: result === "PASSED" ? "READY_FOR_QA" : "UNIT_TESTING",
            gitCommit: optionalValue(formData, "gitCommit"),
            gitPushRef: optionalValue(formData, "gitPushRef")
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: order.changeRequestId
        },
        data: {
            status: result === "PASSED" ? "QA_TESTING" : "UNIT_TESTING"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "pruebas-unitarias",
        action: result.toLowerCase(),
        next: {
            changeOrderId
        }
    });
    go(formData, result === "PASSED" ? "Pruebas unitarias OK. Orden lista para QA." : "Pruebas unitarias fallidas registradas.");
}
async function recordQaTestAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("qa.tests.manage");
    const changeOrderId = requireField(formData, "changeOrderId", "Orden");
    const result = requireField(formData, "result", "Resultado");
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.findUniqueOrThrow({
        where: {
            id: changeOrderId
        }
    });
    const qaTest = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].qaTest.create({
        data: {
            changeOrderId,
            executedById: user.id,
            type: requireField(formData, "type", "Tipo de prueba"),
            result,
            notes: optionalValue(formData, "notes")
        }
    });
    if (result === "FAILED") {
        const description = requireField(formData, "defectDescription", "Descripcion del defecto");
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].defect.create({
            data: {
                code: await nextTicket("DEF", "defect"),
                qaTestId: qaTest.id,
                changeOrderId,
                severity: optionalValue(formData, "severity") ?? "MEDIUM",
                description,
                responsibleId: order.developerId
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
            where: {
                id: changeOrderId
            },
            data: {
                status: "QA_FAILED"
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
            where: {
                id: order.changeRequestId
            },
            data: {
                status: "QA_DEFECTS"
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
            userId: user.id,
            module: "qa",
            action: "failed",
            next: {
                changeOrderId,
                qaTest: qaTest.id
            }
        });
        go(formData, "QA fallo y se registro defecto.");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
        where: {
            id: changeOrderId
        },
        data: {
            status: "READY_FOR_UAT"
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: order.changeRequestId
        },
        data: {
            status: "UAT"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "qa",
        action: "passed",
        next: {
            changeOrderId,
            qaTest: qaTest.id
        }
    });
    go(formData, "QA aprobado. Continua UAT.");
}
async function updateDefectStatusAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("qa.defects.manage");
    const id = requireField(formData, "id", "Defecto");
    const status = requireField(formData, "status", "Estado");
    const defect = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].defect.update({
        where: {
            id
        },
        data: {
            status
        }
    });
    if ([
        "FIXED",
        "RETEST",
        "CLOSED"
    ].includes(status)) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
            where: {
                id: defect.changeOrderId
            },
            data: {
                status: "READY_FOR_QA"
            }
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "defectos",
        action: "status",
        next: {
            id,
            status
        }
    });
    go(formData, "Defecto actualizado.");
}
async function recordUatAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("qa.uat.manage");
    const changeRequestId = requireField(formData, "changeRequestId", "Solicitud");
    const result = requireField(formData, "result", "Resultado UAT");
    const changeOrderId = optionalValue(formData, "changeOrderId");
    const observations = optionalValue(formData, "observations");
    if (result === "OBSERVED" && !observations) go(formData, "Las observaciones UAT son obligatorias.", "error");
    const acceptanceFile = result === "ACCEPTED" ? fileValue(formData, "acceptanceFile") : null;
    if (result === "ACCEPTED" && !acceptanceFile) go(formData, "El acta de aceptacion es obligatoria para UAT OK.", "error");
    const uat = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].uatTest.create({
        data: {
            changeRequestId,
            changeOrderId,
            executedById: user.id,
            result,
            observations
        }
    });
    if (result === "ACCEPTED") {
        const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveUploadedFile"])(acceptanceFile, `acceptance/${changeRequestId}`);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].acceptanceRecord.create({
            data: {
                changeRequestId,
                uatTestId: uat.id,
                signedById: user.id,
                documentPath: stored.storagePath,
                sha256Hash: stored.sha256Hash
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
            where: {
                id: changeRequestId
            },
            data: {
                status: "UAT_ACCEPTED"
            }
        });
        if (changeOrderId) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
            where: {
                id: changeOrderId
            },
            data: {
                status: "READY_FOR_INTEGRATION"
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
            userId: user.id,
            module: "uat",
            action: "accepted",
            next: {
                changeRequestId,
                hash: stored.sha256Hash
            }
        });
        go(formData, "UAT aceptado y acta registrada.");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: changeRequestId
        },
        data: {
            status: "UAT_OBSERVATIONS",
            observations
        }
    });
    if (changeOrderId) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
        where: {
            id: changeOrderId
        },
        data: {
            status: "UAT_FAILED"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "uat",
        action: "observed",
        next: {
            changeRequestId,
            observations
        }
    });
    go(formData, "Observaciones UAT registradas.");
}
async function integrateChangeAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("dev.orders.manage");
    const changeOrderId = requireField(formData, "changeOrderId", "Orden");
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.findUniqueOrThrow({
        where: {
            id: changeOrderId
        },
        include: {
            changeRequest: true
        }
    });
    if (order.changeRequest.status !== "UAT_ACCEPTED") go(formData, "UAT debe estar aceptado antes de integrar.", "error");
    const semver = requireField(formData, "semver", "Nueva version SemVer");
    const integrationBranch = requireField(formData, "integrationBranch", "Rama destino");
    const integrationCommit = requireField(formData, "integrationCommit", "Commit de integracion");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.update({
        where: {
            id: changeOrderId
        },
        data: {
            status: "INTEGRATED",
            integrationBranch,
            integrationCommit
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: order.changeRequestId
        },
        data: {
            status: "FINAL_VALIDATION"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "integracion",
        action: "merge",
        next: {
            changeOrderId,
            semver,
            integrationBranch,
            integrationCommit
        }
    });
    go(formData, "Integracion registrada. Pendiente validacion final QA.");
}
async function finalQualityAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("qa.final.manage");
    const changeOrderId = requireField(formData, "changeOrderId", "Orden");
    const result = requireField(formData, "result", "Resultado");
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeOrder.findUniqueOrThrow({
        where: {
            id: changeOrderId
        },
        include: {
            changeRequest: true
        }
    });
    if (result === "FAILED") {
        const notes = requireField(formData, "notes", "Observaciones de calidad");
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].qaTest.create({
            data: {
                changeOrderId,
                executedById: user.id,
                type: "FINAL_QUALITY",
                result,
                notes
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
            where: {
                id: order.changeRequestId
            },
            data: {
                status: "FINAL_VALIDATION",
                observations: notes
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
            userId: user.id,
            module: "validacion-final",
            action: "failed",
            next: {
                changeOrderId,
                notes
            }
        });
        go(formData, "Validacion final fallida. Requiere correccion integrada.", "error");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].qaTest.create({
        data: {
            changeOrderId,
            executedById: user.id,
            type: "FINAL_QUALITY",
            result,
            notes: optionalValue(formData, "notes")
        }
    });
    const semver = optionalValue(formData, "semver") ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$workflow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nextSemver"])("1.0.0", order.changeRequest.type);
    const release = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].release.create({
        data: {
            projectId: order.projectId,
            changeRequestId: order.changeRequestId,
            changeOrderId,
            version: semver,
            semver,
            environment: optionalValue(formData, "environment") ?? order.environment,
            status: "APPROVED",
            responsibleId: user.id,
            targetBranch: order.integrationBranch,
            mergeCommit: order.integrationCommit,
            tagName: `v${semver}`,
            approvedAt: new Date()
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id: order.changeRequestId
        },
        data: {
            status: "RELEASE_APPROVED"
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "validacion-final",
        action: "release_approved",
        next: {
            release: release.id,
            semver
        }
    });
    go(formData, "Release aprobado y senal enviada al gestor de liberacion.");
}
async function executeReleaseAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("release.manage");
    const releaseId = requireField(formData, "releaseId", "Release");
    const result = requireField(formData, "result", "Resultado");
    const release = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].release.findUniqueOrThrow({
        where: {
            id: releaseId
        },
        include: {
            project: true,
            changeRequest: true
        }
    });
    if (release.status !== "APPROVED") go(formData, "El release debe estar aprobado. El gestor de liberacion no decide aprobaciones.", "error");
    const token = optionalValue(formData, "createGithubTag") === "on" ? decryptSecret((await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: user.id
        }
    }))?.githubTokenEncrypted) : null;
    if (token && release.tagName && release.mergeCommit) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubTag"])(release.project, token, release.tagName, release.mergeCommit);
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].release.update({
        where: {
            id: releaseId
        },
        data: {
            status: "EXECUTED",
            result,
            releasedAt: new Date(),
            responsibleId: user.id
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].releaseLog.create({
        data: {
            releaseId,
            level: "INFO",
            message: result,
            createdById: user.id
        }
    });
    if (release.changeRequestId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
            where: {
                id: release.changeRequestId
            },
            data: {
                status: "RELEASED"
            }
        });
    }
    if (release.changeRequest?.requesterId) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notify"])(release.changeRequest.requesterId, "Release ejecutado", `${release.changeRequest.ticketId} liberada en ${release.environment}.`, "/cambios/solicitudes", "SUCCESS");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "liberacion",
        action: "execute",
        next: {
            releaseId,
            result
        }
    });
    go(formData, "Liberacion ejecutada y registrada en log.");
}
async function closeChangeRequestAction(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])("changes.requests.manage");
    const id = requireField(formData, "id", "Solicitud");
    const change = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            project: true
        }
    });
    if (change.status !== "RELEASED") go(formData, "La solicitud debe estar liberada antes de cerrar.", "error");
    const archive = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeTextArtifact"])(`archive/${change.project.code}`, `${change.ticketId}.txt`, `Solicitud ${change.ticketId}\nTitulo: ${change.title}\nEstado final: Cerrada\nFecha: ${new Date().toISOString()}\n`);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].attachment.create({
        data: {
            projectId: change.projectId,
            ownerType: "CHANGE_REQUEST",
            ownerId: change.id,
            fileName: archive.fileName,
            mimeType: archive.mimeType,
            storagePath: archive.storagePath,
            sha256Hash: archive.sha256Hash,
            version: "cierre",
            uploadedById: user.id
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].changeRequest.update({
        where: {
            id
        },
        data: {
            status: "CLOSED",
            closedAt: new Date()
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notify"])(change.requesterId, "Solicitud cerrada", `${change.ticketId} cerrada exitosamente.`, "/cambios/solicitudes", "SUCCESS");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["audit"])({
        userId: user.id,
        module: "cierre",
        action: "close",
        next: {
            id,
            archive
        }
    });
    go(formData, "Solicitud archivada y cerrada.");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    logoutAction,
    createUserAction,
    setUserStatusAction,
    assignProjectRoleAction,
    setProjectUserStatusAction,
    createRoleAction,
    setRoleStatusAction,
    createProjectAction,
    setProjectStatusAction,
    createGithubProjectRepoAction,
    createGithubBranchAction,
    createGithubPullRequestAction,
    createGithubTagAction,
    createGithubIssueAction,
    configureGithubWebhookAction,
    createEcsAction,
    checkOutAction,
    checkInAction,
    forceUnlockAction,
    transferLibraryAction,
    createBaselineAction,
    validateIntegrityAction,
    createIncidentAction,
    updateIncidentStatusAction,
    createChangeRequestAction,
    observeFormatAction,
    resubmitChangeRequestAction,
    validateAlignmentAction,
    createImpactAssessmentAction,
    technicalDecisionAction,
    ccbDecisionAction,
    createChangeOrderAction,
    startImplementationAction,
    recordUnitTestAction,
    recordQaTestAction,
    updateDefectStatusAction,
    recordUatAction,
    integrateChangeAction,
    finalQualityAction,
    executeReleaseAction,
    closeChangeRequestAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAction, "001673bf106908c8d3426eec222a128099e2ed3af5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUserAction, "40c51d0da21bf4971ab58450e6b1a2ccab86730bcd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setUserStatusAction, "40ceceb55510febdeee4df1dfea967f796c415cff8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(assignProjectRoleAction, "40f782daf9b056d574bd0f905641fb9b8e9ef18ab1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setProjectUserStatusAction, "4083b8367d5081a20b44ac07a7f3abceea28f1edae", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createRoleAction, "402f0ea3db2386fe8cb00de0189f136bfe8c803d8f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setRoleStatusAction, "40b2a099603c0939c383ff400a3c16c3f01a178e84", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProjectAction, "40f9e819eea9fdcf8063b506b3b96720bdd7dd3bce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setProjectStatusAction, "407a1177b6b4691416179692b7cb353f48e407f6f5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createGithubProjectRepoAction, "4041dbdb3afa10dc8c1927ea7b351f49657ce44668", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createGithubBranchAction, "4024848b8cc359e36719d8bededadd19ecbd91d87c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createGithubPullRequestAction, "40fde470c338c3d4f4dacc897d690bbeda9aca7b4b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createGithubTagAction, "406597829c1d6e684c03deaf6524551b7c9b2eda25", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createGithubIssueAction, "40f0f8d5eeff78e4ac287fcd39e66e91f173f70e7b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(configureGithubWebhookAction, "40b0a795a6fb6fffad3a1f8ea13256c436abec153d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createEcsAction, "4005e5cc0ec190bfb412f655f8bef99562f5f344fc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkOutAction, "40f22d2e2ff3e31a99df51467f47c12834d7cc15e8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkInAction, "40913446e2e68f8aa61b34cb00d315f7a1dafec184", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(forceUnlockAction, "40c857da79012c09ff82e2e48fa6d1b4e147fef840", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(transferLibraryAction, "409ce3de40e8827cc9ca743bbd2cccc0573b117e1e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBaselineAction, "40b525afa05b2bf8d7620241024a6b3bb645d49132", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validateIntegrityAction, "40bb94c676fbdbd12c0e5c4634a5c66d1a49a5a77d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createIncidentAction, "406a9710480b473fbe910c2a590c2039965c675f97", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateIncidentStatusAction, "40e1f00259b3a0998d113c67d1b0d09249e246972f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createChangeRequestAction, "402fa80b5507df9b3d4aab54c6741c33379f5f3036", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(observeFormatAction, "4029ef3894713c482d1764feaeeeb8e6202e2ca460", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resubmitChangeRequestAction, "4068cfdf0f0155586763d97d0b4baf4bc70c0c7764", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validateAlignmentAction, "405749e1a203fb1153676fcc28a68ce53e0e8d739b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createImpactAssessmentAction, "40deb43f1afef7be1f1c75a8093edb87059f2eeb45", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(technicalDecisionAction, "40ff14fa1c13777668eaabc7220177788403a9433b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ccbDecisionAction, "409845efc66eff460f13a8d7f4c958b7cfd2c8f8e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createChangeOrderAction, "405885459964968c919b8865a9c1e9fd39ce3d3cea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(startImplementationAction, "40ff3bf6173fd1180383ac2b135a5ef3d442093dd6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recordUnitTestAction, "403b94788d665fef61ccf295b53d3869b558a9dda7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recordQaTestAction, "40fd9015124e26bd3c4abe7ed9d38e966330a44ad2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateDefectStatusAction, "4031b9abbf3a25401a2fceab7eb682eb0beb41e3bb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recordUatAction, "40996835f1e8cfe71a7f77fac808e6fc4f2a6c9095", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(integrateChangeAction, "404592d76b3dd15584144fe2a495c4cbae98405714", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(finalQualityAction, "40187c3b36b597f9d895df0826cb88cfa90778c14f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(executeReleaseAction, "40337d87b05bc63e58b65ad34e62456bba2f173244", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(closeChangeRequestAction, "40205f8d6f4c4fd92e5ff60e1cfd53301f2db98496", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/rbac.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "can",
    ()=>can,
    "menuItems",
    ()=>menuItems,
    "permissionForPath",
    ()=>permissionForPath,
    "routePermissions",
    ()=>routePermissions,
    "visibleMenu",
    ()=>visibleMenu
]);
const menuItems = [
    {
        href: "/dashboard",
        label: "Mi Panel de Trabajo",
        group: "Operacion",
        permission: "dashboard.read"
    },
    {
        href: "/admin/usuarios",
        label: "Usuarios",
        group: "Administracion",
        permission: "admin.users.manage"
    },
    {
        href: "/admin/roles",
        label: "Roles y permisos",
        group: "Administracion",
        permission: "admin.roles.manage"
    },
    {
        href: "/admin/proyectos",
        label: "Proyectos",
        group: "Administracion",
        permission: "admin.projects.manage"
    },
    {
        href: "/admin/auditoria",
        label: "Auditoria",
        group: "Administracion",
        permission: "admin.audit.read"
    },
    {
        href: "/admin/integridad",
        label: "Integridad",
        group: "Administracion",
        permission: "admin.integrity.read"
    },
    {
        href: "/configuracion/ecs",
        label: "Repositorio ECS",
        group: "Configuracion",
        permission: "config.ecs.manage"
    },
    {
        href: "/configuracion/versiones",
        label: "Versiones",
        group: "Configuracion",
        permission: "config.versions.manage"
    },
    {
        href: "/configuracion/bloqueos",
        label: "Bloqueos",
        group: "Configuracion",
        permission: "config.locks.manage"
    },
    {
        href: "/configuracion/bibliotecas",
        label: "Bibliotecas",
        group: "Configuracion",
        permission: "config.libraries.manage"
    },
    {
        href: "/configuracion/lineas-base",
        label: "Lineas base",
        group: "Configuracion",
        permission: "config.baselines.manage"
    },
    {
        href: "/configuracion/trazabilidad",
        label: "Trazabilidad",
        group: "Configuracion",
        permission: "config.traceability.read"
    },
    {
        href: "/cambios/solicitudes",
        label: "Solicitudes",
        group: "Cambios",
        permission: "changes.requests.manage"
    },
    {
        href: "/cambios/evaluacion-impacto",
        label: "Evaluacion de impacto",
        group: "Cambios",
        permission: "changes.impact.manage"
    },
    {
        href: "/cambios/aprobacion-tecnica",
        label: "Aprobacion tecnica",
        group: "Cambios",
        permission: "changes.technical.manage"
    },
    {
        href: "/cambios/ccb",
        label: "Comite CCB",
        group: "Cambios",
        permission: "changes.ccb.manage"
    },
    {
        href: "/cambios/ordenes",
        label: "Ordenes de cambio",
        group: "Cambios",
        permission: "changes.orders.manage"
    },
    {
        href: "/desarrollo/mis-ordenes",
        label: "Mis ordenes",
        group: "Desarrollo",
        permission: "dev.orders.manage"
    },
    {
        href: "/desarrollo/pruebas-unitarias",
        label: "Pruebas unitarias",
        group: "Desarrollo",
        permission: "dev.unit.manage"
    },
    {
        href: "/qa/pruebas",
        label: "Pruebas QA",
        group: "Calidad",
        permission: "qa.tests.manage"
    },
    {
        href: "/qa/defectos",
        label: "Defectos",
        group: "Calidad",
        permission: "qa.defects.manage"
    },
    {
        href: "/qa/uat",
        label: "UAT",
        group: "Calidad",
        permission: "qa.uat.manage"
    },
    {
        href: "/qa/validacion-final",
        label: "Validacion final",
        group: "Calidad",
        permission: "qa.final.manage"
    },
    {
        href: "/liberacion/releases",
        label: "Releases",
        group: "Liberacion",
        permission: "release.manage"
    },
    {
        href: "/soporte/incidencias",
        label: "Incidencias",
        group: "Soporte",
        permission: "support.incidents.manage"
    },
    {
        href: "/reportes",
        label: "Reportes",
        group: "Reportes",
        permission: "reports.read"
    }
];
const routePermissions = menuItems.map((item)=>({
        prefix: item.href,
        permission: item.permission
    }));
function can(user, permission) {
    return user.permissions.includes(permission);
}
function visibleMenu(user) {
    return menuItems.filter((item)=>can(user, item.permission));
}
function permissionForPath(pathname) {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard.read";
    const match = routePermissions.filter((route)=>pathname === route.prefix || pathname.startsWith(`${route.prefix}/`)).sort((a, b)=>b.prefix.length - a.prefix.length)[0];
    return match?.permission;
}
}),
"[project]/src/components/app-shell.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00dfdb926b23583bacdd14fea1371dd60514f6cd04":{"name":"$$RSC_SERVER_ACTION_0"}},"src/components/app-shell.tsx",""] */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(protected)/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rbac.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/archive.mjs [app-rsc] (ecmascript) <export default as Archive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-rsc] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/boxes.mjs [app-rsc] (ecmascript) <export default as Boxes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-check.mjs [app-rsc] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.mjs [app-rsc] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-clock.mjs [app-rsc] (ecmascript) <export default as FileClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-rsc] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.mjs [app-rsc] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.mjs [app-rsc] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$library$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Library$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/library.mjs [app-rsc] (ecmascript) <export default as Library>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-checks.mjs [app-rsc] (ecmascript) <export default as ListChecks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$keyhole$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LockKeyhole$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock-keyhole.mjs [app-rsc] (ecmascript) <export default as LockKeyhole>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.mjs [app-rsc] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/network.mjs [app-rsc] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package-check.mjs [app-rsc] (ecmascript) <export default as PackageCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-rsc] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$cog$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCog$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-cog.mjs [app-rsc] (ecmascript) <export default as UserCog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-rsc] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const iconMap = [
    [
        "/dashboard",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    ],
    [
        "/admin/usuarios",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    ],
    [
        "/admin/roles",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$cog$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCog$3e$__["UserCog"]
    ],
    [
        "/admin/proyectos",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"]
    ],
    [
        "/admin/auditoria",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__["FileClock"]
    ],
    [
        "/admin/integridad",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
    ],
    [
        "/configuracion/ecs",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$archive$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Archive$3e$__["Archive"]
    ],
    [
        "/configuracion/versiones",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"]
    ],
    [
        "/configuracion/bloqueos",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$keyhole$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LockKeyhole$3e$__["LockKeyhole"]
    ],
    [
        "/configuracion/bibliotecas",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$library$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Library$3e$__["Library"]
    ],
    [
        "/configuracion/lineas-base",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageCheck$3e$__["PackageCheck"]
    ],
    [
        "/configuracion/trazabilidad",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"]
    ],
    [
        "/cambios/solicitudes",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    ],
    [
        "/cambios/evaluacion-impacto",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"]
    ],
    [
        "/cambios/aprobacion-tecnica",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"]
    ],
    [
        "/cambios/ccb",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    ],
    [
        "/cambios/ordenes",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"]
    ],
    [
        "/desarrollo/mis-ordenes",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"]
    ],
    [
        "/desarrollo/pruebas-unitarias",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"]
    ],
    [
        "/qa/pruebas",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"]
    ],
    [
        "/qa/defectos",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"]
    ],
    [
        "/qa/uat",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    ],
    [
        "/qa/validacion-final",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
    ],
    [
        "/liberacion/releases",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$check$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageCheck$3e$__["PackageCheck"]
    ],
    [
        "/soporte/incidencias",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"]
    ],
    [
        "/reportes",
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    ]
];
function iconFor(href) {
    return iconMap.find(([prefix])=>href.startsWith(prefix))?.[1] ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
}
const $$RSC_SERVER_ACTION_0 = async function goDashboard() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/dashboard");
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "00dfdb926b23583bacdd14fea1371dd60514f6cd04", null);
function AppShell({ user, children, currentPath }) {
    const menu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["visibleMenu"])(user);
    const grouped = new Map();
    for (const item of menu){
        grouped.set(item.group, [
            ...grouped.get(item.group) ?? [],
            item
        ]);
    }
    var goDashboard = $$RSC_SERVER_ACTION_0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-panel text-ink",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "fixed inset-y-0 left-0 z-20 hidden w-72 bg-navy p-4 text-white lg:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-white/10 bg-white/8 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-base font-bold",
                                children: "SGCSW"
                            }, void 0, false, {
                                fileName: "[project]/src/components/app-shell.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-300",
                                children: "Sistema de Gestion de Configuracion"
                            }, void 0, false, {
                                fileName: "[project]/src/components/app-shell.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/app-shell.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mt-4 space-y-5",
                        children: [
                            ...grouped.entries()
                        ].map(([group, items])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-2 text-[11px] font-bold uppercase tracking-widest text-slate-400",
                                        children: group
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/app-shell.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 space-y-1",
                                        children: items.map((item)=>{
                                            const Icon = iconFor(item.href);
                                            const active = currentPath === item.href;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                className: `flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${active ? "bg-teal text-white" : "text-slate-200 hover:bg-white/10"}`,
                                                href: item.href,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        "aria-hidden": true,
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/app-shell.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/app-shell.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, item.href, true, {
                                                fileName: "[project]/src/components/app-shell.tsx",
                                                lineNumber: 96,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/app-shell.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, group, true, {
                                fileName: "[project]/src/components/app-shell.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/app-shell.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/8 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-bold",
                                children: user.roleName
                            }, void 0, false, {
                                fileName: "[project]/src/components/app-shell.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 truncate text-xs text-slate-300",
                                children: user.projectCode ? `${user.projectCode} - ${user.projectName}` : "Contexto global"
                            }, void 0, false, {
                                fileName: "[project]/src/components/app-shell.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 truncate text-xs text-slate-300",
                                children: user.email
                            }, void 0, false, {
                                fileName: "[project]/src/components/app-shell.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/app-shell.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/app-shell.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "lg:pl-72",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:px-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    action: goDashboard,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-ink lg:hidden",
                                        type: "submit",
                                        children: "Menu"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/app-shell.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/app-shell.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-bold text-ink",
                                            children: user.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/app-shell.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500",
                                            children: [
                                                user.roleName,
                                                user.projectCode ? ` en ${user.projectCode}` : " - Global"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/app-shell.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/app-shell.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            className: "inline-flex h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-ink hover:bg-slate-50",
                                            href: "/seleccionar-proyecto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/app-shell.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 17
                                                }, this),
                                                "Cambiar proyecto"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/app-shell.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            action: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAction"],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "inline-flex h-9 items-center gap-2 rounded-md bg-red-50 px-3 text-sm font-semibold text-red-700 hover:bg-red-100",
                                                type: "submit",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/app-shell.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Salir"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/app-shell.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/app-shell.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/app-shell.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/app-shell.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/app-shell.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-5 lg:px-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/app-shell.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/app-shell.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/app-shell.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(protected)/[...segments]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(protected)/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/components/app-shell.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(protected)/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/app-shell.tsx [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(protected)/[...segments]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(protected)/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/components/app-shell.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "001673bf106908c8d3426eec222a128099e2ed3af5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAction"],
    "00dfdb926b23583bacdd14fea1371dd60514f6cd04",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"],
    "4005e5cc0ec190bfb412f655f8bef99562f5f344fc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEcsAction"],
    "40187c3b36b597f9d895df0826cb88cfa90778c14f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finalQualityAction"],
    "40205f8d6f4c4fd92e5ff60e1cfd53301f2db98496",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["closeChangeRequestAction"],
    "4024848b8cc359e36719d8bededadd19ecbd91d87c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubBranchAction"],
    "4029ef3894713c482d1764feaeeeb8e6202e2ca460",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["observeFormatAction"],
    "402f0ea3db2386fe8cb00de0189f136bfe8c803d8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRoleAction"],
    "402fa80b5507df9b3d4aab54c6741c33379f5f3036",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createChangeRequestAction"],
    "4031b9abbf3a25401a2fceab7eb682eb0beb41e3bb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateDefectStatusAction"],
    "40337d87b05bc63e58b65ad34e62456bba2f173244",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeReleaseAction"],
    "403b94788d665fef61ccf295b53d3869b558a9dda7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordUnitTestAction"],
    "4041dbdb3afa10dc8c1927ea7b351f49657ce44668",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubProjectRepoAction"],
    "404592d76b3dd15584144fe2a495c4cbae98405714",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integrateChangeAction"],
    "405749e1a203fb1153676fcc28a68ce53e0e8d739b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAlignmentAction"],
    "405885459964968c919b8865a9c1e9fd39ce3d3cea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createChangeOrderAction"],
    "406597829c1d6e684c03deaf6524551b7c9b2eda25",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubTagAction"],
    "4068cfdf0f0155586763d97d0b4baf4bc70c0c7764",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resubmitChangeRequestAction"],
    "406a9710480b473fbe910c2a590c2039965c675f97",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createIncidentAction"],
    "407a1177b6b4691416179692b7cb353f48e407f6f5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setProjectStatusAction"],
    "4083b8367d5081a20b44ac07a7f3abceea28f1edae",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setProjectUserStatusAction"],
    "40913446e2e68f8aa61b34cb00d315f7a1dafec184",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkInAction"],
    "409845efc66eff460f13a8d7f4c958b7cfd2c8f8e4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ccbDecisionAction"],
    "40996835f1e8cfe71a7f77fac808e6fc4f2a6c9095",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordUatAction"],
    "409ce3de40e8827cc9ca743bbd2cccc0573b117e1e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["transferLibraryAction"],
    "40b0a795a6fb6fffad3a1f8ea13256c436abec153d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["configureGithubWebhookAction"],
    "40b2a099603c0939c383ff400a3c16c3f01a178e84",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setRoleStatusAction"],
    "40b525afa05b2bf8d7620241024a6b3bb645d49132",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBaselineAction"],
    "40bb94c676fbdbd12c0e5c4634a5c66d1a49a5a77d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateIntegrityAction"],
    "40c51d0da21bf4971ab58450e6b1a2ccab86730bcd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createUserAction"],
    "40c857da79012c09ff82e2e48fa6d1b4e147fef840",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forceUnlockAction"],
    "40ceceb55510febdeee4df1dfea967f796c415cff8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setUserStatusAction"],
    "40deb43f1afef7be1f1c75a8093edb87059f2eeb45",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createImpactAssessmentAction"],
    "40e1f00259b3a0998d113c67d1b0d09249e246972f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateIncidentStatusAction"],
    "40f0f8d5eeff78e4ac287fcd39e66e91f173f70e7b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubIssueAction"],
    "40f22d2e2ff3e31a99df51467f47c12834d7cc15e8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkOutAction"],
    "40f782daf9b056d574bd0f905641fb9b8e9ef18ab1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assignProjectRoleAction"],
    "40f9e819eea9fdcf8063b506b3b96720bdd7dd3bce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProjectAction"],
    "40fd9015124e26bd3c4abe7ed9d38e966330a44ad2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordQaTestAction"],
    "40fde470c338c3d4f4dacc897d690bbeda9aca7b4b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGithubPullRequestAction"],
    "40ff14fa1c13777668eaabc7220177788403a9433b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["technicalDecisionAction"],
    "40ff3bf6173fd1180383ac2b135a5ef3d442093dd6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startImplementationAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$protected$292f5b2e2e2e$segments$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(protected)/[...segments]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(protected)/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/components/app-shell.tsx [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(protected)/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/app-shell.tsx [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$protected$292f5b2e2e2e$segments$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$protected$292f5b2e2e2e$segments$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$protected$292f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$shell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0izqerg._.js.map