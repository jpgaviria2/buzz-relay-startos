import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { defaultSupportAdmission } from '../utils'

export const current = VersionInfo.of({
  version: '0.2.1:4',
  releaseNotes: {
    en_US:
      'Adds configurable support-only admission for restricted customer, Hermes, and escalation direct messages.',
    es_ES:
      'Añade admisión configurable solo para soporte para mensajes directos restringidos entre clientes, Hermes y escalamiento.',
    de_DE:
      'Fügt eine konfigurierbare Support-Zulassung für eingeschränkte Direktnachrichten zwischen Kunden, Hermes und Eskalation hinzu.',
    pl_PL:
      'Dodaje konfigurowalny dostęp tylko do pomocy dla ograniczonych wiadomości bezpośrednich klienta, Hermes i eskalacji.',
    fr_FR:
      "Ajoute une admission d'assistance configurable pour les messages directs restreints entre client, Hermes et l'escalade.",
  },
  migrations: {
    up: async ({ effects }) => {
      const current = await storeJson
        .read((store) => store.supportAdmission)
        .once()
      if (!current) {
        await storeJson.merge(effects, {
          supportAdmission: defaultSupportAdmission(),
        })
      }
    },
    down: IMPOSSIBLE,
  },
})
