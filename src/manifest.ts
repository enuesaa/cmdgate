import { Handler } from '@/handler/handler'

export type CommandManifest = {
  name: string
  description: string
  version: string
  middlewares: Handler[]
  handlers: Record<string, Handler>
}
