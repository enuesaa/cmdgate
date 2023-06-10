import { Context } from '@/context'
import { Prompt } from '@/prompt';
import { CommandManifest } from '@/runner/manifest'

export type Runner = (argv: string[], manifest: CommandManifest) => number;
export const defaultRunner: Runner = (argv, manifest) => {
  const context = new Context(argv)
  const prompt = new Prompt()

  for (const handler of manifest.middlewares) {
    const handlerManifest = handler.describeManifest()
    // TODO: context をここで加工する. help message を出力できるようにしたい
    handlerManifest.handlefn(context, prompt)
  }

  const route = '' // todo parse route
  for (const [handlerRoute, handler] of Object.entries(manifest.handlers)) {
    if (route === handlerRoute) {
      const handlerManifest = handler.describeManifest()
      handlerManifest.handlefn(context, prompt)
      break;
    }
  }

  return 1
}
