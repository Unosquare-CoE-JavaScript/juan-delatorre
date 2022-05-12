
export function randomID (length: number): string {
  return String(Date.now() / Math.random()).slice(0, length)
}
