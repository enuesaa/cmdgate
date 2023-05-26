import { Option, OptionConfig } from '@/option'
import { Argument, ArgumentConfig } from '@/argument'
import { HandleFn } from '@/handlefn'
import { type HandlerManifest } from '@/manifest'

export class Handler {
  protected _description: string = ''
  protected _arguments: Argument[] = []
  protected _options: Option[] = []
  protected _handlefn: HandleFn = () => {}

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

  handle(handlefn: HandleFn): this {
    this._handlefn = handlefn;
    return this
  }

  describeManifest(): HandlerManifest {
    return {
      description: this._description,
      arguments: this._arguments,
      options: this._options,
      handlefn: this._handlefn,
    }
  }
}
