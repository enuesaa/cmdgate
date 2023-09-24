type ContextBuildFn = () => {}
export const createContext = (fn: ContextBuildFn) => {}

export class ContextBuilder {
  constructor() {}

  description(description: string) {}
  flag(description: string) {}
  argument(description: string) {}
}
