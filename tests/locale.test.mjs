import test from "node:test"
import assert from "node:assert/strict"
import { detectLocale, isLocale, SPANISH_COUNTRIES } from "../lib/locale.ts"

test("Spain and Latin America use Spanish, including Brazil and the Latin Caribbean", () => {
  for (const country of SPANISH_COUNTRIES) assert.equal(detectLocale(country, undefined, "en-US"), "es", country)
})
test("other countries use English even when the browser prefers Spanish", () => {
  for (const country of ["US", "GB", "PT", "FR", "CA", "AU", "JP"]) assert.equal(detectLocale(country, undefined, "es-ES"), "en", country)
})
test("manual preference takes priority over country", () => {
  assert.equal(detectLocale("US", "es"), "es")
  assert.equal(detectLocale("MX", "en"), "en")
  assert.equal(detectLocale("MX", "invalid"), "es")
})
test("missing geolocation falls back to the browser's highest priority language", () => {
  assert.equal(detectLocale(null, undefined, "en;q=0.5,es-MX;q=0.9"), "es")
  assert.equal(detectLocale(null, undefined, "fr-FR,es;q=0.5"), "en")
  assert.equal(detectLocale(null, undefined, "es;q=0,en;q=1"), "en")
  assert.equal(detectLocale("XX", undefined, "es-ES"), "es")
  assert.equal(detectLocale(null), "en")
})
test("country values are normalized and locale input is restricted", () => {
  assert.equal(detectLocale(" es "), "es")
  assert.equal(isLocale("es"), true)
  assert.equal(isLocale("en"), true)
  assert.equal(isLocale("../../etc"), false)
})
