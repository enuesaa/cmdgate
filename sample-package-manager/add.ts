import { createGate } from '@/index'
import type { Handler } from '@/index'

const validateHandler: Handler = (context) => {
}

const showInvalidPackageNamehandler: Handler = (context) => {
  context.abort()
}

export const addGate = createGate()
  .argument('name', {
    description: 'Package name',
    required: true,
  })
  .description('Add package.')
  .steps(step => {
    step
      .handler(validateHandler)
      .on('validationFailed', showInvalidPackageNamehandler)
    return step
  })
