type Context = {}
type Handler = (context: Context) => Context;
type EventHandler = {
  name: string,
  handler: Handler;
}

export class Steps {
  constructor(
    protected _handlers: Handler[] = [],
    protected _eventHandlers: EventHandler[] = [],
  ) {}

  handler(handler: Handler): this {
    this._handlers.push(handler)
    return this
  }

  on(name: string, handler: Handler): this {
    this._eventHandlers.push({ name, handler })
    return this
  }
}
