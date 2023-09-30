type UserInputFlags = Record<string, string|boolean>;
type UserInputArgs = string[];

export type UserInput = {
  argv: string[];
  flags: UserInputFlags;
  args: UserInputArgs;
}

export const parseUserInput = (argv: string[]): UserInput => {
  const [_nodebin, _filename, ...rawArgs] = argv

  const userinput = {
    argv,
    flags: extractFlags(rawArgs),
    args: extractArgs(rawArgs),
  }

  return userinput
}

/**
 * @todo refactor
 */
const extractFlags = (args: string[]): UserInputFlags => {
  const options: UserInputFlags = {}
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

const extractArgs = (args: string[]): UserInputArgs => {
  const values: UserInputArgs = []
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
