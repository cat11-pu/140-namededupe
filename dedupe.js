// dedupe.js：去重（基线：原样返回）
import { keyOf } from "./check.js";

export function dedupeNames(names) {
  const used = new Set();
  const nextSeq = new Map();
  const finals = [];

  for (const raw of names) {
    const name = String(raw).trim();
    const base = keyOf(name);
    let finalName;

    if (!used.has(base)) {
      finalName = name;
      used.add(base);
    } else {
      let seq = nextSeq.get(base) || 2;
      while (used.has(base + "-" + seq)) seq += 1;
      finalName = name + "-" + seq;
      used.add(base + "-" + seq);
      nextSeq.set(base, seq + 1);
    }

    finals.push(finalName);
  }

  return finals;
}
