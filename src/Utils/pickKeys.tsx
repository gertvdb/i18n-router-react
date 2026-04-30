export function pickKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const picked: Partial<T> = {};

  keys.forEach((key) => {
    if (key in obj) {
      picked[key] = obj[key];
    }
  });

  return picked as Pick<T, K>;
}
