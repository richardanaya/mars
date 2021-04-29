export function sleep(t) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, t);
  });
}
export function defined(t) {
  if (t === null || t === void 0) {
    throw Error("value was not defined");
  }
  return t;
}
