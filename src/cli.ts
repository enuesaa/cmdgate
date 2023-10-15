import process from 'node:process'
import { Handler } from './handler'
import { Prompt } from './prompt'
import { Context } from './context'

type HandleRoute = {
  route: string;
  handler: Handler;
}

export type CliConfig = {
  name: string
  description: string
  version: string
  routes: HandleRoute[]
}

export class Cli {
  private _name: string = ''
  private _description: string = ''
  private _version: string = ''
  private _routes: HandleRoute[] = []

  name(name: string) {
    this._name = name
  }

  description(description: string) {
    this._description = description
  }

  version(version: string) {
    this._version = version
  }

  use(handler: Handler) {
    this._routes.push({ route: '', handler })
  }

  route(route: string, handler: Handler) {
    this._routes.push({ route, handler })
  }

  describeConfig(): CliConfig {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      routes: this._routes,
    }
  }

  run(argv: string[] = process.argv, prompt: Prompt = new Prompt()) {
    const context = new Context(argv)
  
    const provided = argv.slice(2).join(' ')
    for (const handleroute of this._routes) {
      if (handleroute.route === '') {
        handleroute.handler.run(context, prompt)
      }
      if (handleroute.route === provided) {
        handleroute.handler.run(context, prompt)
        break
      }
    }
    prompt.close()
  }
}
