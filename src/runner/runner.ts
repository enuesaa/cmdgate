import { Context } from '@/context'
import { Prompt } from '@/prompt'
import { CommandManifest } from '@/handler/manifest'

export type Runner = (argv: string[], manifest: CommandManifest, prompt: Prompt) => number
export const defaultRunner: Runner = (argv, manifest, prompt) => {
  for (const handler of manifest.middlewares) {
    const handlerManifest = handler.describeManifest()
    const handlefn = handlerManifest.handlefn
    const context = new Context(argv, manifest, handlerManifest)
    handlefn(context, prompt)
  }

  const route = '' // todo parse route
  for (const [handlerRoute, handler] of Object.entries(manifest.handlers)) {
    if (route === handlerRoute) {
      const handlerManifest = handler.describeManifest()
      const handlefn = handlerManifest.handlefn
      const context = new Context(argv, manifest, handlerManifest)
      handlefn(context, prompt)
      break
    }
  }

  prompt.close()

  return 1
}
