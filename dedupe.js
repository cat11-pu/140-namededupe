// dedupe.js：一次扫描去重，占用集合 + 每个基名的下一序号，均为映射操作
import { keyOf } from "./check.js";

export function dedupeNames(names) {
  const used = new Set();
  const nextSeq = new Map();
  const finals = [];

  for (const raw of names) {
    const trimmed = String(raw).trim();
    const baseKey = keyOf(trimmed);

    if (!used.has(baseKey)) {
      used.add(baseKey);
      if (!nextSeq.has(baseKey)) nextSeq.set(baseKey, 2);
      finals.push(trimmed);
      continue;
    }

    let seq = nextSeq.get(baseKey) ?? 2;
    let candidate;
    let candidateKey;
    do {
      candidate = trimmed + "-" + seq;
      candidateKey = keyOf(candidate);
      seq += 1;
    } while (used.has(candidateKey));
    nextSeq.set(baseKey, seq);
    used.add(candidateKey);
    finals.push(candidate);
  }

  return finals;
}
