import { Gateli } from '../src/gateli'

describe('classify passed args', () => {
  it('normal', () => {
    const gateli = new Gateli({})
    const result = gateli.classifyPassedArgs(['aa', '--bb', 'bbvalue', '--cc', 'ccvalue', 'dddd'])

    expect(result).toMatchObject({
      options: {
        '--bb': 'bbvalue',
        '--cc': 'ccvalue',
      },
      serials: ['aa', 'dddd'],
    })
  })
})