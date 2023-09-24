import { Option, OptionConfig } from '@/types/option'
import { Argument, ArgumentConfig } from '@/types/argument'
import { type Context } from '@/context'
import { type Prompt } from '@/prompt'
import { HandleFn, HandlerConfig } from './types/config'

export class Handler {
  protected _description: string = ''
  protected _arguments: Argument[] = []
  protected _options: Option[] = []
  protected _handlefn: HandleFn = () => {}

  argument(name: string, config: Partial<ArgumentConfig>) {
    this._arguments.push({ name, config: { description: '', ...config } })
  }

  flag(name: string, config: Partial<OptionConfig>) {
    this._options.push({ name, config: { description: '', alias: null, required: false, ...config } })
  }

  description(description: string) {
    this._description = description
  }

  main(handlefn: HandleFn) {
    this._handlefn = handlefn
  }

  describeConfig(): HandlerConfig {
    return {
      description: this._description,
      arguments: this._arguments,
      options: this._options,
      handlefn: this._handlefn,
    }
  }

  run(context: Context, prompt: Prompt) {
    this._handlefn(context, prompt)
  }
}
