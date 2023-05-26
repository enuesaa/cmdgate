import { Handler } from '@/handler'
import { Argument } from '@/argument'
import { Option } from '@/option'
import { type HandleFn } from '@/handlefn'

export type CommandManifest = {
  name: string;
  description: string;
  middlewares: Handler[];
  handlers: Record<string, Handler>;
}

export type HandlerManifest = {
  description: string;
  arguments: Argument[];
  options: Option[];
  handlefn: HandleFn;
}
