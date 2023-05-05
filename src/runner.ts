import { Gate } from '@/gate'
import { Steps } from '@/steps'
import { Context } from '@/context'

export const runGate = (gate: Gate, context: Context) => {
  const buildStepsFn = gate.getBuildStepsFn()
  const steps = buildStepsFn(new Steps())

  const ordered = steps.getOrderedHandlers()
  const mapped = steps.getMappedHandlers()

  for (const handler of ordered) {
    if (context.isAborted()) {
      break;
    }
    if (context.getState() !== null) {
      break;
    }

    handler(context)
  }

  let state = context.getState()
  while (state !== null) {
    if (context.isAborted()) {
      break;
    }
    mapped[state](context)        
  }

  gate.run(context)
}
