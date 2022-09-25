export type DefinitionOptions = {
  handler: () => void,
  definitions?: Array<Definition>,
}

// immutable
export class Definition {
  name: string;
  handler: () => void;
  definitions: Array<Definition>;

  constructor(name: string, options: DefinitionOptions) {
    const { handler, definitions } = options;
    this.name = name;
    // this.handleNames = handleNames ?? [name];
    this.handler = handler;
    this.definitions = definitions ?? [];
  }

  match(val: string): boolean {
    return this.name === val
  }

  addDefinition(definition: Definition) {
    this.definitions.push(definition);
  }

  getDefinitions(): Array<Definition> {
    return this.definitions ?? [];
  }

  doHandle(): void {
    this.handler()
  }
}