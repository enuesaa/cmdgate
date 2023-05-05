import { Gate } from '@/gate'
import { Route } from '@/route';

type Option = {
  name: string;
  description: string;
}
type GateBuildfn = (gate: Gate) => Gate;

export class Command {
  constructor(
    protected _name: string = '',
    protected _options: Option[] = [],
    protected _gates: GateBuildfn[] = [],
    protected _routes: Route[] = [],
  ) {}

  name(name: string): this {
    this._name = name;
    return this
  }
  
  option(name: string, description: string): this {
    this._options.push({ name, description });
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
