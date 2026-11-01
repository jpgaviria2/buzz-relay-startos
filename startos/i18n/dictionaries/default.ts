export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Buzz Relay!': 0,
  'PostgreSQL is ready': 1,
  'Waiting for PostgreSQL to be ready': 2,
  'Redis is ready': 3,
  'Waiting for Redis to be ready': 4,
  'Buzz Relay': 7,
  'Buzz Relay is ready': 8,
  'Buzz Relay is not ready': 9,
  // actions/setOwnerPubkey.ts, actions/setRelayUrl.ts
  'Owner Nostr Public Key': 10,
  "The relay owner's Nostr identity: paste your npub (starts with npub1) or its 64-character hex public key. The owner is always a member of the relay and cannot be removed.": 11,
  'Must be an npub1... address or a 64-character hex key': 12,
  'Set Relay Owner': 13,
  'Set the Nostr public key that owns and administers this relay. Required before the relay can start.': 14,
  'If the relay is running, saving this restarts it so the new owner takes effect.': 97,
  "Set the relay owner's Nostr public key before the relay can start": 16,
  // interfaces.ts, actions/setRelayUrl.ts, init/seedFiles.ts
  'WebSocket relay and API endpoint for Buzz Desktop and other Nostr clients': 17,
  'Set Relay Address/URL': 18,
  'Address/URL': 21,
  'Choose a permanent address/URL for your Buzz relay.': 19,
  "This can never be changed. You have two choices:<ul><li><b>Public domain</b> — anyone can join from anywhere, and the certificate is trusted automatically. The relay is reachable from the public internet.</li><li><b>Private domain</b> — stays on your own network or VPN and is never publicly exposed. Reachable only there, and every device that joins must first be told to trust this server's certificate.</li></ul>": 92,
  'The address clients will use to reach this relay. It becomes the permanent identity of your community.': 22,
  'No domain is switched on for the Buzz Relay interface yet. Add one under Interfaces and switch it on there — an address that is switched off is not offered here, because your community would be bound to one the server is not serving.': 91,
  'Choose the permanent address/URL of your Buzz relay': 60,
  // main.ts: media-storage health check
  'Media & Git Storage': 24,
  'Media and git storage are reachable': 25,
  'Media and git storage are unreachable — uploads and git operations will fail': 26,
  // main.ts: pairing-relay daemon ready display
  // main.ts: caddy daemon ready check
  'The relay is reachable': 89,
  'The relay is not reachable': 90,
  // main.ts: pairing-relay daemon ready check
  'Mobile pairing is ready': 31,
  'Mobile pairing is not ready': 32,
  // actions/manageMembers.ts
  'Manage Members': 76,
  'Add, remove, rename, and set the role of everyone allowed on this relay.': 77,
  Members: 78,
  'Everyone allowed on this relay besides the owner. Removing someone revokes their access immediately; changes apply when you save.': 79,
  Name: 80,
  'What to call this person, so you can tell members apart. StartOS stores this name; the relay and Buzz clients never see it.': 81,
  'Nostr Public Key': 82,
  "This person's Nostr identity. Paste their npub (starts with npub1) or its 64-character hex public key.": 83,
  Role: 40,
  '- Member: reads and writes on the relay\n- Admin: also adds and removes other members': 41,
  Member: 42,
  Admin: 43,
  // Thrown out of action handlers -- StartOS renders these as the user's alert,
  // so they are translated copy (actions.md, "Wrap User-Facing Strings").
  'That looks like a private key (nsec), not a public key. Paste your npub (or its hex public key) instead.': 61,
  // Interpolation is the SDK's `${name}` form, substituted once per key
  // (setupI18n uses String.replace with a string pattern, not a global regex),
  // so each placeholder appears exactly once.
  'Expected an npub1... address, got a ${prefix}1... address.': 62,
  "That looks like a private key (nsec), not a public key. Paste the member's npub (or its hex public key) instead.": 63,
  "This relay's community was created under ${bound} and upstream Buzz has no way to move it. Pointing the relay at ${chosen} would leave it serving a new, empty community while the original members, channels and messages stayed behind. To use a different address you must reinstall and start over.": 64,
  'That npub is not valid — check it for typos. Every character matters, and the key carries its own checksum, so a single wrong character makes the whole key unreadable.': 65,
  'The same Nostr identity is listed twice. Each member can appear only once.': 84,
  "That is the relay owner's own key. The owner is always a member — change that identity with Set Relay Owner.": 85,
  // actions/configureSupportAdmission.ts
  'Hermes Support Nostr Public Key': 98,
  'The Hermes support identity included in every support-only direct message.': 99,
  'Escalation Nostr Public Key': 100,
  'The escalation identity included in every support-only direct message.': 101,
  'Capability Generation': 102,
  'A public rotation label written to support grants and audit records.': 103,
  'Must be 1 to 128 printable ASCII characters': 104,
  'Capability Expiry': 105,
  'Unix timestamp in seconds. New support admissions stop after this time.': 106,
  'Unix seconds': 107,
  'Support Grant Lifetime': 108,
  'How long each admitted customer can use the restricted support direct message.': 109,
  seconds: 110,
  'Support Capability': 111,
  'Share this opaque value only with the support client. Generate a new value to rotate admission access.': 112,
  'Must be 32 to 512 ASCII letters, numbers, underscores, or hyphens': 113,
  'Configure Support Admission': 114,
  'Configure restricted customer, Hermes support, and escalation direct messages without adding customers as relay members.': 115,
  'Saving restarts the relay. Replacing the capability immediately stops new admissions using the old value.': 116,
  'Hermes support': 117,
  escalation: 118,
  'Hermes support and escalation must use different Nostr public keys.': 119,
  'Capability generation cannot be blank.': 120,
  'Capability expiry must be in the future.': 121,
  'Support Admission Updated': 122,
  'Copy the capability into the authorized support client. It is stored masked and is not written to relay logs.': 123,
  'The ${label} value looks like a private key (nsec), not a public key. Paste an npub or 64-character hex public key instead.': 124,
  'Capability expiry must be no more than 24 hours in the future.': 125,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
