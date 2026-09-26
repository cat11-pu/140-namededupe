import assert from "node:assert";
import { keyOf } from "../check.js";
import { dedupeNames } from "../dedupe.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("keyOf returns text", () => {
  assert.strictEqual(typeof keyOf("a"), "string");
});

check("dedupeNames returns a list", () => {
  assert.ok(Array.isArray(dedupeNames(["a"])));
});

check("dedupeNames keeps count", () => {
  assert.strictEqual(dedupeNames(["a", "a"]).length, 2);
});

check("render counts names", () => {
  assert.strictEqual(typeof render({ names: ["a"] }).count, "number");
});

check("render exposes unique flag", () => {
  assert.strictEqual(typeof render({ names: ["a"] }).unique, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
