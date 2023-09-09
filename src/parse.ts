type UserInputOptions = Record<string, string|boolean>;

export type UserInput = {
  options: UserInputOptions;
  arguments: string[];
}

export const parseUserInput = (argv: string[]): UserInput => {
  const [_nodebin, _filename, ...args] = argv

  const userinput = {
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
    } else {
      if (value.startsWith('-')) {
        prevHasOptionMarker = true
        options[prevValue] = true;
      } else {
        prevHasOptionMarker = false
      }
    }
    prevValue = value;
  }

  return options
}

const extractArguments = (args: string[]): string[] => {
  return []
}
