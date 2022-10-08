import { Option } from './fragment/option'
import { Positional } from './fragment/positional'

export type HandlerArg = {
  [key: string]: string | null
}
export type Handler = (arg: HandlerArg) => boolean

export const resolveHandlerArg = (
  def: { positionals: Positional[]; options: Option[] },
  arg: { positionals: string[]; options: Record<string, string | null> }
): HandlerArg | false => {
  const handlerarg = {}

  if (def.positionals.length > 0) {
    for (const positional of def.positionals) {
      handlerarg[positional.name] = arg.positionals[positional.position - 1] ?? null
    }
  } else if (arg.positionals.length > 0) {
    console.error(`invalid argument: ${arg.positionals[0]}`)
    return false
  }
  for (const option of def.options) {
    handlerarg[option.name] = null
  }
  for (const [key, value] of Object.entries(arg.options)) {
    if (handlerarg.hasOwnProperty(key)) {
      handlerarg[key] = value === null ? true : value
    } else {
      console.error(`invalid option: ${key}`)
      return false
    }
  }

  return handlerarg
}
