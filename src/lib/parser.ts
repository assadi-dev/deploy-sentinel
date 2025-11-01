import { NtfyInferModel, ntfySchemaModel } from "@models/ntfyModel";
import { ZodError } from "zod";

export const zodParserError = <T extends Record<string, any>>(
  error: ZodError<T>
) => {
  try {
    console.log(error);
  } catch (error) {
    console.log(`Error in zodParserError: ${error.message}`);
  }
};

export const genericParserError = (error: Error, name?: string | null) => {
  if (name) console.log(`Error is occur in ${name} : ${error.message}`);
  else console.log(`Error is occur : ${error.message}`);
};

export const parseNtfyMessageData = (data: string): NtfyInferModel | null => {
  try {
    const validate = ntfySchemaModel.safeParse(data);
    if (validate.error) throw validate.error;
    return validate.data;
  } catch (error) {
    if (error instanceof ZodError) zodParserError(error);
    return null;
  }
};

export const splitMessageToKeyValue = (input: string): [string, string] => {
  const match = input.match(/^([^:]+):(.*)$/);
  if (!match || match.length !== 3) {
    throw new Error("Invalid input format");
  }
  return [match[1], match[2]];
};

/**
 * Supprimer les emojis et passer tout en minuscules
 * @param input
 * @returns
 */
export const cleanAndLowerCase = (input: string): string => {
  // Expression régulière pour trouver tous les emojis
  const emojiRegex = /[^a-zA-Z0-9\u{1F600}-\u{1F64F}]/gu;
  return input.replace(emojiRegex, "").toLowerCase();
};
