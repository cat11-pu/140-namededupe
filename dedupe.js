// dedupe.js：去重（基线：原样返回）
import { keyOf } from "./check.js";

export function dedupeNames(names) {
  return names.slice();
}
