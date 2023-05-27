import { Handler } from '@/handler'
import { Argument } from '@/handler/argument'
import { Option } from '@/handler/option'
import { type HandleFn } from '@/handler/handlefn'

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
