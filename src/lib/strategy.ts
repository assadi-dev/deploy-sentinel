import { NtfyInferModel } from "@models/ntfyModel";

export const dockployMessageStrategy = {
  isSuccess: (
    data: NtfyInferModel,
    callback: (data?: NtfyInferModel | null) => void
  ) => {
    try {
      const { title } = data;
      if (title.toLowerCase().includes("success")) callback(data);
    } catch (error) {
      console.log(error);
    }
  },
  isFailed: (
    data: NtfyInferModel,
    callback: (data?: NtfyInferModel | null) => void
  ) => {
    try {
      const { title } = data;
      if (title.toLowerCase().includes("failed")) callback(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  hasError: (errMsg: string, callback: (errMsg: string) => void) => {
    try {
      callback(errMsg);
    } catch (error) {
      console.log(`Error in hasError strategy: ${error.message}`);

      return "";
    }
  },
};

export const truncateStringStrategy = {
  discordLimit: (string: string): string => {
    if (string.length > 1000) {
      return string.substring(0, 1000) + "\n... ";
    }
    return string;
  },
};
