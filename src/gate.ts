import { Steps } from '@/steps'
import { Option, OptionConfig } from '@/option'
import { Argument, ArgumentConfig } from '@/argument'
import { Context } from '@/context'
import { runGate } from '@/runner'

export type GlobalGates = Gate[]
export type MappedGates = Record<string, Gate>
type BuildStepsFn = (steps: Steps) => Steps

export class Gate {
  constructor(
    protected _arguments: Argument[] = [],
    protected _options: Option[] = [],
    protected _buildStepsFn: BuildStepsFn = (steps) => steps,
    protected _description: string = '',
    protected _globalGates: GlobalGates = [],
    protected _mappedGates: MappedGates = {},
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
    this._globalGates.push(gate)
    return this
  }

  gate(name: string, gate: Gate): this {
    this._mappedGates[name] = gate
    return this
  }

  getBuildStepsFn(): BuildStepsFn {
    return this._buildStepsFn
  }

  run(context: Context): Context {
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
    return context
  }
}
