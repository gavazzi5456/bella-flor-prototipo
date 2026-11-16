import { test } from "node:test";
import assert from "node:assert/strict";
import { buildMessage, emptyPreferences } from "../src/lib/message.ts";

test("empty preferences invite guidance without inventing a purchase", () => {
  const message = buildMessage(emptyPreferences);
  assert.match(message, /SIMULAÇÃO/);
  assert.match(message, /orientação/);
  assert.doesNotMatch(message, /wa\.me|https:|entrega garantida/);
});
test("chosen preferences are preserved as requests, never confirmed terms", () => {
  const message = buildMessage({
    ...emptyPreferences,
    category: "Orquídeas",
    occasion: "Aniversário",
    colors: "Tons rosados",
    budget: "Até R$ 150",
    date: "2026-12-20",
    style: "Natural",
  });
  for (const value of [
    "Orquídeas",
    "Aniversário",
    "Tons rosados",
    "Até R$ 150",
    "Natural",
    "20/12/2026",
  ])
    assert.ok(message.includes(value), value);
  assert.match(message, /pretendido/);
  assert.match(message, /confirmar/);
});
