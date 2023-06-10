import { Prompt } from '@/prompt'

export let mockPromptPrintln: jest.SpyInstance

beforeEach(() => {
  mockPromptPrintln = jest.spyOn(Prompt.prototype, 'println').mockImplementation()
})

afterEach(() => {
  mockPromptPrintln.mockRestore()
})
