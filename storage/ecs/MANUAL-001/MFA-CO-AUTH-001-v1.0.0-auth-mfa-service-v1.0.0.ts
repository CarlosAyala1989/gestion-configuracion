export type MfaChallenge = {
  userId: string;
  expiresAt: Date;
  codeHash: string;
};

export function isMfaChallengeActive(challenge: MfaChallenge, now = new Date()) {
  return challenge.expiresAt.getTime() > now.getTime();
}

export function shouldRequestMfa(user: { status: string; mfaEnabled?: boolean }) {
  return user.status === "ACTIVE" && user.mfaEnabled === true;
}
