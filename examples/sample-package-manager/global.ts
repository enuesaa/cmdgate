import { createGate } from '@/index'
import type { Handler } from '@/index'

const checkNeedHelpHandler: Handler = (context) => {
  if (context.get('--help')) {
    context.setState('needHelp')
  }
}

const checkNeedVersionHandler: Handler = (context) => {
  if (context.get('--version')) {
    context.setState('needVersion')
  }
}

const showHelpMessageHander: Handler = (context) => {
  context.abort()
}

const showVersionInfomationHander: Handler = (context) => {
  context.abort()
}

export const globalGate = createGate()
  .option('--help', {
    description: 'Print help message. ',
    alias: '-h',
  })
  .option('--version', {
    description: 'Print version information. ',
    alias: '-v',
  })
  .steps(steps => {
    steps
      .handler(checkNeedHelpHandler)
      .handler(checkNeedVersionHandler)
      .on('needHelp', showHelpMessageHander) // abort
      .on('needVersion', showVersionInfomationHander)
    return steps
  })
