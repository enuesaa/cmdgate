import { Handler } from '@/handler/handler'
import process from 'node:process'
import { type Runner, normalRunner } from '@/runner'
import { type CommandManifest } from '@/manifest'
import { Prompt } from './prompt'

export class Command {
  private _name: string = ''
  private _description: string = ''
  private _version: string = ''
  private _middlewares: Handler[] = []
  private _handlers: Record<string, Handler> = {}
  private _runner: Runner = normalRunner
  private _prompt: Prompt = new Prompt()

  name(name: string): this {
    this._name = name
    return this
  }

  description(description: string): this {
    this._description = description
    return this
  }

  version(version: string): this {
    this._version = version
    return this
  }

  use(handler: Handler): this {
    this._middlewares.push(handler)
    return this
  }

  route(route: string, handler: Handler): this {
    this._handlers[route] = handler
    return this
  }

  describeManifest(): CommandManifest {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      middlewares: this._middlewares,
      handlers: this._handlers,
    }
  }

  withRunner(runner: Runner) {
    this._runner = runner
  }

  withPrompt(prompt: Prompt) {
    this._prompt = prompt
  }

  /**
   * @returns number exit code.
   */
  run(argv: string[] = process.argv): number {
    const manifest = this.describeManifest()

    return this._runner(argv, manifest, this._prompt)
  }
}
