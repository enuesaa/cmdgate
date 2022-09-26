export type DefinitionOptions = {
  handler: () => void
  definitions?: Definition[]
}

// immutable
export class Definition {
  name: string
  handler: () => void
  definitions: Definition[]

  constructor(name: string, options: DefinitionOptions) {
    const { handler, definitions } = options
    this.name = name
    // this.handleNames = handleNames ?? [name];
    this.handler = handler
    this.definitions = definitions ?? []
  }

  match(val: string): boolean {
    return this.name === val
  }

  getName(): string {
    return this.name
  }

  addDefinition(definition: Definition) {
    this.definitions.push(definition)
  }

  getDefinitions(): Array<Definition> {
    return this.definitions ?? []
  }

  doHandle(): void {
    this.handler()
  }
}
