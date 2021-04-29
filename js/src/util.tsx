export function sleep(t: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, t);
  });
}

export function defined<T>(t:T | undefined | null){
  if(t === null || t === undefined){
    throw Error("value was not defined");
  }
  return t;
}