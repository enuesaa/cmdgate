import { Gate } from '@/gate'
import { Context } from '@/context'

// TODO implements RunnerInterface

export class Runner {
  run(args: string[], manifest: ManifestInterface): number {
    // for (const gate of this._middlewares) {
    //   runGate(gate, context)
    // }

    // const route = context.getParsedRoute()
    // for (const [gateRoute, gate] of Object.entries(this._handlers)) {
    //   if (gateRoute === route) {
    //     runGate(gate, context)
    //     break;
    //   }
    // }
    return 1
  }
}


/**
 * @deprecated
 */
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
