type UserInputOptions = Record<string, string|boolean>;

export type UserInput = {
  argv: string[];
  options: UserInputOptions;
  arguments: string[];
}

export const parseUserInput = (argv: string[]): UserInput => {
  const [_nodebin, _filename, ...args] = argv

  const userinput = {
    argv,
    options: extractOptions(args),
    arguments: extractArguments(args),
  }

  return userinput
}

/**
 * @todo refactor
 */
const extractOptions = (args: string[]): UserInputOptions => {
  const options: UserInputOptions = {}
  let prevHasOptionMarker: boolean = false; // this means prev value has `-` or `--`
  let prevValue: string = '';
  for (const value of args) {
    if (prevHasOptionMarker) {
      options[prevValue] = value;
      prevHasOptionMarker = false
      continue;
    }
    if (value.startsWith('-')) {
      prevHasOptionMarker = true
      prevValue = value;
      options[prevValue] = true;
    }
  }

  return options
}

const extractArguments = (args: string[]): string[] => {
  const values: string[] = []
  let prevHasOptionMarker: boolean = false; // this means prev value has `-` or `--`
  for (const value of args) {
    if (prevHasOptionMarker) {
      prevHasOptionMarker = false
      continue;
    }
    if (value.startsWith('-')) {
      prevHasOptionMarker = true
      continue;
    }
    values.push(value)
  }

  return values
}
