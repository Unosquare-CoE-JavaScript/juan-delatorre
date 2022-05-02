
export function randomNumber (max: number): number {
  return Number(String(Date.now() / Math.random()).slice(0, max))
}
