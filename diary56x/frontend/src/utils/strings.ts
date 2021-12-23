export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const stringUtils = {
  capitalize,
};

export default stringUtils;