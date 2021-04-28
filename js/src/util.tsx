export function sleep(t: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, t);
  });
}
