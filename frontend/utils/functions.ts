export function splitNumber(num: number): string {
  const commas: string = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return commas;
}
