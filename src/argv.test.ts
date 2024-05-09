import { describe, expect, it } from 'vitest'
import { listMatchableRouteFromArgv } from './argv'

describe('cmd complex', () => {
  it('cmd._getMatchableRoutes', () => {
    const argv = ['node', 'main.js', 'thisiscontent', 'thismaypositional', '--filename', 'aa.json', '--use']
    expect(listMatchableRouteFromArgv(argv)).toStrictEqual(['thisiscontent', 'thisiscontent thismaypositional'])
  })
})
