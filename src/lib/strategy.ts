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
};
