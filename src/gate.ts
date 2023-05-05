import { Steps } from '@/steps'
import { Option, OptionConfig } from '@/option'
import { Argument, ArgumentConfig } from '@/argument'

type BuildStepsFn = (steps: Steps) => Steps;

export class Gate {
  constructor(
    protected _arguments: Argument[] = [],
    protected _options: Option[] = [],
    protected _buildStepsFn: BuildStepsFn = (steps) => steps,
    protected _description: string = '',
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
}
