import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    include: [
      'src/**/*.test.ts',
      'tests/**/*.test.ts',
    ],
  },
})
