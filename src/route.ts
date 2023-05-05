type CliargType = 'argument'|'requiredArgument'|'option';
type Cliarg = {
  name: string;
  description: string;
  type: CliargType;
}

export class Route {
  constructor(
    protected _cliargs: Cliarg[] = [],
    protected _description: string = '',
  ) {}

  argument(name: string, description: string): this {
    this._cliargs.push({ name, description, type: 'argument' })
    return this
  }

  requiredArgument(name: string, description: string): this {
    this._cliargs.push({ name, description, type: 'requiredArgument' })
    return this
  }

  option(name: string, description: string): this {
    this._cliargs.push({ name, description, type: 'option' })
    return this
  }

  description(description: string): this {
    this._description = description;
    return this
  }
}
