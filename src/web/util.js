export function sleep(t) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, t);
  });
}
