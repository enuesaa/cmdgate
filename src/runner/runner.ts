import { Context } from '@/context'
import { CommandManifest } from '@/runner/manifest'

export type Runner = (argv: string[], manifest: CommandManifest) => number;
export const defaultRunner: Runner = (argv, manifest) => {
  const [_nodepath, _filename, ...args] = argv

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
