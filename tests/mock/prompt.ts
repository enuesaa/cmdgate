import { Prompt } from '../../src/prompt'
import { vi, type MockInstance } from 'vitest'

export let mockPromptPrintln: MockInstance

beforeEach(() => {
  mockPromptPrintln = vi.spyOn(Prompt.prototype, 'println').mockImplementation(v => v)
})

afterEach(() => {
  mockPromptPrintln.mockRestore()
})
