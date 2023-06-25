import { Argument } from '@/fragments/argument'
import { Option } from '@/fragments/option'
import { type HandleFn } from '@/handler/handlefn'

export type HandlerConfig = {
  description: string
  arguments: Argument[]
  options: Option[]
  handlefn: HandleFn
}
