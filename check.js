// check.js：查重（基线：不查重）
export function keyOf(name) {
  const text = String(name).trim();
  if (text === "") {
    const error = new Error("名字去空白后为空");
    error.code = "E_EMPTY_NAME";
    throw error;
  }
  return text.toLowerCase();
}
