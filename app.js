// app.js：渲染结果
import { keyOf } from "./check.js";
import { dedupeNames } from "./dedupe.js";

export function render(spec) {
  const names = spec.names || [];
  const finals = dedupeNames(names);
  let renamed = 0;
  finals.forEach((item, spot) => {
    if (item !== String(names[spot]).trim()) renamed += 1;
  });
  const keys = finals.map((item) => keyOf(item));
  const unique = new Set(keys).size === keys.length;
  return { finals: finals, renamed: renamed, count: finals.length, unique: unique };
}
