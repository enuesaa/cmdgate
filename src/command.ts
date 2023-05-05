import { Gate, Middlewares, Gates } from '@/gate';
import process from 'node:process'
import { Context } from '@/context'
import { runGate } from '@/runner'

export class Command {
  constructor(
    protected _name: string = '',
    protected _description: string = '',
    protected _middlewares: Middlewares = [],
    protected _gates: Gates = {},
  ) {}

  name(name: string): this {
    this._name = name
    return this
  }

  description(description: string): this {
    this._description = description
    return this
  }

  use(gate: Gate): this {
    this._middlewares.push(gate)
    return this
  }

  gate(name: string, gate: Gate): this {
    this._gates[name] = gate
    return this
  }

  run(): void {
    const args = process.argv.slice(2) // hide bin
    const context = new Context()

    for (const gate of this._middlewares) {
      runGate(gate, context)
    }

    const route = context.getParsedRoute()
    for (const [gateRoute, gate] of Object.entries(this._gates)) {
      if (gateRoute === route) {
        runGate(gate, context)
        break;
      }
    }
  }
}
