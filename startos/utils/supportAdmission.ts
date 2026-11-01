import { utils } from '@start9labs/start-sdk'

export const DEFAULT_SUPPORT_PUBKEY =
  'd7c26bcdde73145ddae90eba1ec1a3a88a35dbc83cb70b297626b8f691f49061'
export const DEFAULT_ESCALATION_PUBKEY =
  '2f204d8cba347e4137cdec9b57352246d06e0d4d85038a3f7d339d8097310a34'
export const DEFAULT_SUPPORT_GRANT_TTL_SECS = 30 * 24 * 60 * 60

const CAPABILITY_RANDOM_STRING = { charset: '0-9,a-f', len: 64 } as const
const CAPABILITY_LIFETIME_SECS = 365 * 24 * 60 * 60

export function generateSupportCapability(): string {
  return utils.getDefaultString(CAPABILITY_RANDOM_STRING)
}

export function supportCapabilityRandomString() {
  return CAPABILITY_RANDOM_STRING
}

export function defaultSupportAdmission(now = new Date()) {
  const generation = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-a`
  const nowSecs = Math.floor(now.getTime() / 1000)

  return {
    supportPubkey: DEFAULT_SUPPORT_PUBKEY,
    escalationPubkey: DEFAULT_ESCALATION_PUBKEY,
    generation,
    capability: generateSupportCapability(),
    expiresAt: nowSecs + CAPABILITY_LIFETIME_SECS,
    grantTtlSecs: DEFAULT_SUPPORT_GRANT_TTL_SECS,
  }
}
