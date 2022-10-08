export type HandlerArg = {
  positionals: string[],
  options: {
    [key: string]: string|null
  }
}
export type Handler = (arg: HandlerArg) => boolean
