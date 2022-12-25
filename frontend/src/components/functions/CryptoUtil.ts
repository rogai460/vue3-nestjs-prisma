export const getRandomString = (): string => {
  const n: number = 10;
  const S: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from(crypto.getRandomValues(new Uint32Array(n)))
    .map((v) => S[v % S.length])
    .join("");
};
