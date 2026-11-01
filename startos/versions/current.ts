import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.1:5',
  releaseNotes: {
    en_US:
      'Returns Buzz Relay to unmodified upstream code and updates it to upstream commit 90772a4.',
    es_ES:
      'Restaura Buzz Relay al código upstream sin modificaciones y lo actualiza al commit upstream 90772a4.',
    de_DE:
      'Setzt Buzz Relay auf unveränderten Upstream-Code zurück und aktualisiert auf den Upstream-Commit 90772a4.',
    pl_PL:
      'Przywraca Buzz Relay do niezmodyfikowanego kodu upstream i aktualizuje do commitu upstream 90772a4.',
    fr_FR:
      'Rétablit Buzz Relay sur le code upstream non modifié et le met à jour vers le commit upstream 90772a4.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
