import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    include: [
      'src/**/*.test.ts',
    ],
    coverage: {
      enabled: true,
      reporter: ['json-summary', 'json'],
    },
  },
})
