import { Context } from '@/context'
import { CommandManifest } from '@/manifest'

export type Runner = (args: string[], manifest: CommandManifest) => number;
export const defaultRunner: Runner = (args, manifest) => {
  for (const handler of manifest.middlewares) {
    const handlerManifest = handler.describeManifest()
    handlerManifest.handlefn() // todo pass context
  }

  const route = '' // todo parse route
  for (const [handlerRoute, handler] of Object.entries(manifest.handlers)) {
    if (route === handlerRoute) {
      const handlerManifest = handler.describeManifest()
      handlerManifest.handlefn() // todo pass context
      break;
    }
  }

  return 1
}
