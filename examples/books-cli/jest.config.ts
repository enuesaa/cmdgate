import { type Config }  from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {'tsconfig': 'tsconfig.json'}]
  },
}

export default config
