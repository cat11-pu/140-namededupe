// check.js：查重键——去掉首尾空白后转小写；空白名报 E_EMPTY_NAME
export function keyOf(name) {
  const text = String(name).trim();
  if (text === "") {
    const error = new Error("名字去掉空白后为空");
    error.code = "E_EMPTY_NAME";
    throw error;
  }
  return text.toLowerCase();
}
