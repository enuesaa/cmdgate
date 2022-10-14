import { promises as readline } from 'node:readline'

export let writeValue: any;
export const createMockReadline = () => {
  writeValue = null;
  return jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => ({
    question: (value: any) => true,
    write: (value: any) => {
      writeValue = value
      return true
    },
    close: () => true,
  } as any))
}