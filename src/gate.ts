import { Steps } from '@/steps'
import { Option, OptionConfig } from '@/option'
import { Argument, ArgumentConfig } from '@/argument'
import { Context } from '@/context'
import { runGate } from '@/runner'

export type Middlewares = Gate[]
export type Gates = Record<string, Gate>
type BuildStepsFn = (steps: Steps) => Steps

export class Gate {
  constructor(
    protected _arguments: Argument[] = [],
    protected _options: Option[] = [],
    protected _buildStepsFn: BuildStepsFn = (steps) => steps,
    protected _description: string = '',
    protected _middlewares: Middlewares = [],
    protected _gates: Gates = {},
  ) {}

  argument(name: string, config: ArgumentConfig): this {
    this._arguments.push({ name, config })
    return this
  }

  option(name: string, config: OptionConfig): this {
    this._options.push({ name, config })
    return this
  }

  description(description: string): this {
    this._description = description;
    return this
  }

  steps(buildStepsFn: BuildStepsFn): this {
    this._buildStepsFn = buildStepsFn;
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

  getBuildStepsFn(): BuildStepsFn {
    return this._buildStepsFn
  }

  run(context: Context): Context {
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
    return context
  }
}
