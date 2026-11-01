import { sdk } from '../sdk'
import { configureSupportAdmission } from './configureSupportAdmission'
import { manageMembers } from './manageMembers'
import { setOwnerPubkey } from './setOwnerPubkey'
import { setRelayUrl } from './setRelayUrl'

export const actions = sdk.Actions.of()
  .addAction(configureSupportAdmission)
  .addAction(setOwnerPubkey)
  .addAction(setRelayUrl)
  .addAction(manageMembers)
