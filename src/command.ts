import { Gate } from '@/gate';

export class Command {
  constructor(
    protected _name: string = '',
    protected _description: string = '',
    protected _gates: Gate[] = [],
  ) {}

  name(name: string): this {
    this._name = name;
    return this
  }

  description(description: string): this {
    this._description = description;
    return this
  }

  use(gate: Gate): this {
    this._gates.push(gate)
    return this
  }

  gate(name: string, gate: Gate): this {
    this._gates.push(gate)
    return this
  }

  run(): void {}
}
