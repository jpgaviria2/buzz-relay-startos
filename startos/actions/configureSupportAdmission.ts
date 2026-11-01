import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  defaultSupportAdmission,
  MAX_SUPPORT_CAPABILITY_LIFETIME_SECS,
  supportCapabilityRandomString,
  toHexPubkey,
} from '../utils'

const { InputSpec, Value } = sdk

const pubkeyPattern = {
  regex: '^([0-9a-fA-F]{64}|npub1[a-z0-9]{58}|nsec1[a-z0-9]{58})$',
  description: i18n('Must be an npub1... address or a 64-character hex key'),
}

const inputSpec = InputSpec.of({
  supportPubkey: Value.text({
    name: i18n('Hermes Support Nostr Public Key'),
    description: i18n(
      'The Hermes support identity included in every support-only direct message.',
    ),
    required: true,
    masked: false,
    default: null,
    patterns: [pubkeyPattern],
    minLength: null,
    maxLength: null,
  }),
  escalationPubkey: Value.text({
    name: i18n('Escalation Nostr Public Key'),
    description: i18n(
      'The escalation identity included in every support-only direct message.',
    ),
    required: true,
    masked: false,
    default: null,
    patterns: [pubkeyPattern],
    minLength: null,
    maxLength: null,
  }),
  generation: Value.text({
    name: i18n('Capability Generation'),
    description: i18n(
      'A public rotation label written to support grants and audit records.',
    ),
    required: true,
    masked: false,
    default: null,
    patterns: [
      {
        regex: '^[ -~]{1,128}$',
        description: i18n('Must be 1 to 128 printable ASCII characters'),
      },
    ],
    minLength: 1,
    maxLength: 128,
  }),
  expiresAt: Value.number({
    name: i18n('Capability Expiry'),
    description: i18n(
      'Unix timestamp in seconds. New support admissions stop after this time.',
    ),
    required: true,
    default: null,
    integer: true,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    units: i18n('Unix seconds'),
  }),
  grantTtlSecs: Value.number({
    name: i18n('Support Grant Lifetime'),
    description: i18n(
      'How long each admitted customer can use the restricted support direct message.',
    ),
    required: true,
    default: null,
    integer: true,
    min: 1,
    max: 7_776_000,
    units: i18n('seconds'),
  }),
  capability: Value.text({
    name: i18n('Support Capability'),
    description: i18n(
      'Share this opaque value only with the support client. Generate a new value to rotate admission access.',
    ),
    required: true,
    masked: true,
    default: supportCapabilityRandomString(),
    generate: supportCapabilityRandomString(),
    patterns: [
      {
        regex: '^[0-9A-Za-z_-]{32,512}$',
        description: i18n(
          'Must be 32 to 512 ASCII letters, numbers, underscores, or hyphens',
        ),
      },
    ],
    minLength: 32,
    maxLength: 512,
  }),
})

export const configureSupportAdmission = sdk.Action.withInput(
  'configure-support-admission',
  async () => ({
    name: i18n('Configure Support Admission'),
    description: i18n(
      'Configure restricted customer, Hermes support, and escalation direct messages without adding customers as relay members.',
    ),
    warning: i18n(
      'Saving restarts the relay. Replacing the capability immediately stops new admissions using the old value.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async () => {
    const current = await storeJson
      .read((store) => store.supportAdmission)
      .once()
    return current ?? defaultSupportAdmission()
  },
  async ({ effects, input }) => {
    const supportPubkey = normalizePublicKey(
      input.supportPubkey,
      i18n('Hermes support'),
    )
    const escalationPubkey = normalizePublicKey(
      input.escalationPubkey,
      i18n('escalation'),
    )

    if (supportPubkey === escalationPubkey) {
      throw new Error(
        i18n(
          'Hermes support and escalation must use different Nostr public keys.',
        ),
      )
    }
    if (!input.generation.trim()) {
      throw new Error(i18n('Capability generation cannot be blank.'))
    }
    if (input.expiresAt <= Math.floor(Date.now() / 1000)) {
      throw new Error(i18n('Capability expiry must be in the future.'))
    }
    if (
      input.expiresAt >
      Math.floor(Date.now() / 1000) + MAX_SUPPORT_CAPABILITY_LIFETIME_SECS
    ) {
      throw new Error(
        i18n('Capability expiry must be no more than 24 hours in the future.'),
      )
    }

    const supportAdmission = {
      supportPubkey,
      escalationPubkey,
      generation: input.generation.trim(),
      expiresAt: input.expiresAt,
      grantTtlSecs: input.grantTtlSecs,
      capability: input.capability,
    }
    await storeJson.merge(effects, { supportAdmission })

    return {
      version: '1',
      title: i18n('Support Admission Updated'),
      message: i18n(
        'Copy the capability into the authorized support client. It is stored masked and is not written to relay logs.',
      ),
      result: {
        type: 'single',
        value: supportAdmission.capability,
        masked: true,
        copyable: true,
        qr: false,
        launchable: false,
      },
    }
  },
)

function normalizePublicKey(raw: string, label: string): string {
  if (raw.trim().toLowerCase().startsWith('nsec1')) {
    throw new Error(
      i18n(
        'The ${label} value looks like a private key (nsec), not a public key. Paste an npub or 64-character hex public key instead.',
        { label },
      ),
    )
  }
  return toHexPubkey(raw)
}
