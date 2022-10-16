import { classifyArgs } from '../src/util/classify-args'

describe('classify stdin args', () => {
  it('normal', () => {
    const ret = classifyArgs(['aa', '--bb', 'bbvalue', '--cc', 'ccvalue', 'dddd'])

    expect(ret).toMatchObject({
      options: {
        '--bb': 'bbvalue',
        '--cc': 'ccvalue',
      },
      serials: ['aa', 'dddd'],
    })
  })
})