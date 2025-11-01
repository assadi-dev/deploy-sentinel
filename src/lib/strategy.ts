export const dockployMessageStrategy = {
  isSuccess: (title: string, callback: () => void) => {
    try {
      if (title.toLowerCase().includes("success")) callback();
    } catch (error) {
      console.log(error);
    }
  },
  isFailed: (title: string, callback: () => void) => {
    try {
      if (title.toLowerCase().includes("success")) callback();
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  hasError: (error: string, callback: () => void) => {},
};

export const truncateStringStrategy = {
  discordLimit: (string: string): string => {
    if (string.length > 1000) {
      return string.substring(0, 1000) + "\n... ";
    }
    return string;
  },
};
