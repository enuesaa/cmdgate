import { describe, expect, it } from 'vitest'
import { listMatchableRouteFromArgv, listPositionalsFromArgv } from './argv'

describe('cmd complex', () => {
  it('cmd._getMatchableRoutes', () => {
    const argv = ['node', 'main.js', 'thisiscontent', 'thismaypositional', '--filename', 'aa.json', '--use']
    expect(listMatchableRouteFromArgv(argv)).toStrictEqual(['thisiscontent', 'thisiscontent thismaypositional'])
  })
})

describe('positional complex', () => {
  it('positional.listPositionals() remove flags', () => {
    const argv = ['node', 'main.js', 'thisiscontent', 'thismaypositional', '--filename', 'aa.json', '--use']
    expect(listPositionalsFromArgv(argv, '')).toStrictEqual(['thisiscontent', 'thismaypositional'])
  })
})
