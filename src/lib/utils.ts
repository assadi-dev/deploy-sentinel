export const wait = (delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done !"), delay);
  });
};
