
type UserInputFlags = Record<string, string|boolean>;
type UserInputArgs = string[];

export class Context {
  private _argv: string[] = []
  private _flags: UserInputFlags = {}
  private _args: UserInputArgs = []

  constructor(argv: string[]) {
    const [_nodebin, _filename, ...rawArgs] = argv

    this._argv = argv
    this._flags = this.extractFlags(rawArgs)
    this._args = this.extractArgs(rawArgs)
  }

  extractFlags(args: string[]) {
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

  extractArgs(args: string[]) {
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

  getFlag(name: string): string | boolean | null {
    return this._flags[name] ?? null
  }
}
