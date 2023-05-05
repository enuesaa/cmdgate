import { Context } from '@/context'

export type Handler = (context: Context) => Context;
type OrderedHandlers = Handler[]
type MappedHandlers = Record<string, Handler> 

export class Steps {
  constructor(
    protected _orderedHandlers: OrderedHandlers = [],
    protected _mappedHandlers: MappedHandlers = {},
  ) {}

  handler(handler: Handler): this {
    this._orderedHandlers.push(handler)
    return this
  }

  on(name: string, handler: Handler): this {
    this._mappedHandlers[name] = handler
    return this
  }

  getOrderedHandlers(): OrderedHandlers {
    return this._orderedHandlers
  }

  getMappedHandlers(): MappedHandlers {
    return this._mappedHandlers
  }
}
