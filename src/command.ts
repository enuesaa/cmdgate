import { Gate, GlobalGates, MappedGates } from '@/gate';
import process from 'node:process'
import { promises as readline } from 'node:readline'
import { Steps } from '@/steps'
import { Context } from '@/context'
import { runGate } from '@/runner'

export class Command {
  constructor(
    protected _name: string = '',
    protected _description: string = '',
    protected _globalGates: GlobalGates = [],
    protected _mappedGates: MappedGates = {},
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
    this._globalGates.push(gate)
    return this
  }

  gate(name: string, gate: Gate): this {
    this._mappedGates[name] = gate
    return this
  }

  run(): void {
    const args = process.argv.slice(2) // hide bin
    let context = new Context()

    for (const gate of this._globalGates) {
      context = runGate(gate, context)
    }

    const route = context.getParsedRoute()
    for (const [gateRoute, gate] of Object.entries(this._mappedGates)) {
      if (gateRoute === route) {
        runGate(gate, context)
        break;
      }
    }
  }
}
