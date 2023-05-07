import { Steps } from '@/steps'
import { Option, OptionConfig } from '@/option'
import { Argument, ArgumentConfig } from '@/argument'
import { Context } from '@/context'
import { runGate } from '@/runner'

export type Middlewares = Handler[]
export type Handlers = Record<string, Handler>
type BuildStepsFn = (steps: Steps) => Steps

export class Handler {
  constructor(
    protected _arguments: Argument[] = [],
    protected _options: Option[] = [],
    protected _buildStepsFn: BuildStepsFn = (steps) => steps,
    protected _description: string = '',
    protected _middlewares: Middlewares = [],
    protected _handlers: Handlers = {},
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

  use(handler: Handler): this {
    this._middlewares.push(handler)
    return this
  }

  handler(name: string, handler: Handler): this {
    this._handlers[name] = handler
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
    for (const [gateRoute, gate] of Object.entries(this._handlers)) {
      if (gateRoute === route) {
        runGate(gate, context)
        break;
      }
    }
    return context
  }
}
