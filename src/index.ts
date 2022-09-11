
export type WriteString = string;
export const writer = (val: WriteString) => {
  process.stdout.write(`${val}\n`)
}