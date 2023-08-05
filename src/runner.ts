import { Context } from '@/context'
import { Prompt } from '@/prompt'
import { CommandManifest } from '@/manifest'

export const runner = (argv: string[], manifest: CommandManifest, prompt: Prompt) => {
  const context = new Context(argv, manifest)

  for (const handler of manifest.middlewares) {
    const config = handler.describeManifest()
    context.pushHistory(config)
    const handlefn = config.handlefn
    handlefn(context, prompt)
  }

  const route = '' // todo parse route
  for (const [handlerRoute, handler] of Object.entries(manifest.handlers)) {
    if (route === handlerRoute) {
      const config = handler.describeManifest()
      context.pushHistory(config)
      const handlefn = config.handlefn
      handlefn(context, prompt)
      break
    }
  }

  prompt.close()

  return 1
}
