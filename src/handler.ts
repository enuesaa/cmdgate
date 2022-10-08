export type HandlerArg = {
  [key: string]: string | null
}
export type Handler = (arg: HandlerArg) => boolean
