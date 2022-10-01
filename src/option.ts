export type OptionArg = {
  description: string,
  alias: string | null,
  required: boolean,
}
export class Option {
  name: string | null;
  description: string;
  alias: string | null;
  required: boolean;

  constructor(arg: OptionArg) {
    this.name = null;
    this.description = arg.description;
    this.alias = arg.alias ?? null;
    this.required = arg.required;
  }

  bindName(name: string): Option {
    this.name = name;
    return this
  }

  isMatch(value: string): boolean {
    return this.name === value;
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

