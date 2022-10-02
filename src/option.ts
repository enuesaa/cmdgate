import process from "node:process";

export class Option {
  protected _name: string | null;
  protected _description: string;
  protected _alias: string | null;
  protected _required: boolean;

  constructor() {
    this._name = null
  }

  name(name: string): this {
    this._name = name
    return this
  }

  description(description: string): this {
    this._description = description
    return this
  }

  alias(alias: string | null): this {
    if (!alias.startsWith('-')) {
      console.error(`invalid alias name: ${alias}. alias name should be start with "-" like "-v"`)
      process.exit(1)
    }
    this._alias = alias
    return this
  }

  required(required: boolean): this {
    this._required = required
    return this
  }

  bindName(name: string): Option {
    this._name = name;
    return this
  }

  isMatch(value: string): boolean {
    return this._name === value;
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

