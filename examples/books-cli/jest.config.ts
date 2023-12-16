import { type Config }  from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transform: {
    '^.+\\.ts$': ['ts-jest', {}]
  },
  transformIgnorePatterns: ["/node_modules/.pnpm/@enuesaa+cmdgate@0.0.1"],
}

export default config
