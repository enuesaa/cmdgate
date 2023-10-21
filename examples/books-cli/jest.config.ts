import { type Config }  from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transform: {
    '^.+\\.ts$': ['ts-jest', {}]
  },
}

export default config
