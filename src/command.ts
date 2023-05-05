import { Gate } from '@/gate'
import { Route } from '@/route';
import { Option, OptionConfig } from '@/option'

type GateBuildfn = (gate: Gate) => Gate;

export class Command {
  constructor(
    protected _name: string = '',
    protected _description: string = '',
    protected _options: Option[] = [],
    protected _gates: GateBuildfn[] = [],
    protected _routes: Route[] = [],
  ) {}

  name(name: string): this {
    this._name = name;
    return this
  }

  description(description: string): this {
    this._description = description;
    return this
  }

  option(name: string, config: OptionConfig): this {
    this._options.push(new Option(name, config));
    return this
  }

  gate(buildfn: GateBuildfn): this {
    this._gates.push(buildfn)
    return this
  }

  route(name: string, route: Route): this {
    return this
  }

  run(): void {}
}
