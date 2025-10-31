export const base64Encode = (input: string): string => {
  const buffer = Buffer.from(input, "utf-8");
  return buffer.toString("base64");
};

export const trimTrailingEquals = (input: string): string => {
  return input.replace(/=+$/, "");
};
