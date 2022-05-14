export const deepClone = (target: any) => {
  return JSON.parse(JSON.stringify(target))
}
