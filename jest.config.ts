import { type Config }  from 'jest'

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': ['ts-jest', {'tsconfig': 'tsconfig.json'}]
  },
  modulePathIgnorePatterns: ["<rootDir>/examples/"]
}

export default config
