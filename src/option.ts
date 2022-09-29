export type OptionArg = {
  short?: string,
  long?: string,
  global?: boolean,
}
export class Option {
  defaultName: null | string;
  short: null | string;
  long: null | string;
  global: boolean;

  constructor(arg: OptionArg) {
    this.short = arg.short ?? null
    this.long = arg.long ?? null
    this.global = arg.global ?? false
  }

  setDefaultName(name: string): Option {
    this.defaultName = name;
    if (this.long === null) {
      this.long = name;
    }
    return this
  }

  isMatch(value: string): boolean {
    return this.long === value;
  }
}


export const searchFromOptions = (options: Option[], value: string): false | Option => {
  for (const option of options) {
    if (option.isMatch(value)) {
      return option
    }
  }
  return false
}

