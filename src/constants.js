export const API_URL = "https://development.neerajx0.xyz";



export const parseBody = (obj) => {
  if (obj === null || obj === undefined) return undefined;
  if (typeof obj !== "object") return obj === "" ? undefined : obj;
  if (Array.isArray(obj)) {
    const cleanedArray = obj.map(parseBody).filter((item) => item !== undefined);
    return cleanedArray.length ? cleanedArray : undefined;
  }
  const cleanedObj = {};
  let hasValidProperties = false;
  for (const [key, value] of Object.entries(obj)) {
    const cleanedValue = parseBody(value);
    if (cleanedValue !== undefined) {
      cleanedObj[key] = cleanedValue;
      hasValidProperties = true;
    }
  }
  return hasValidProperties ? cleanedObj : undefined;
};