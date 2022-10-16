import { Option } from './fragment/option'
import { Positional } from './fragment/positional'
import { Prompt } from '@/prompt'

export type Handle = {
  args: {
    [key: string]: string | null
  }
  prompt: Prompt
}
export type Handler = (handle: Handle) => void

export const resolveHandlerArg = (
  def: { positionals: Positional[]; options: Option[] },
  arg: { options: Record<string, string | true> }
): { [key: string]: string | null } | false => {
  const handlerarg = {}

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
