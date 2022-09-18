
type DefinitionOptions = {
  handler: () => void,
}

// immutable
export class Definition {
  name: string;
  handler: () => void;
  definitions: Array<Definition>;

  constructor(name: string, options: DefinitionOptions) {
    const {handler} = options;
    this.name = name;
    // this.handleNames = handleNames ?? [name];
    this.handler = handler;
    this.definitions = [];
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

export class Gateli {
  definitions: Array<Definition>;
  constructor() {
    this.definitions = [];
  }

  addDefinition(definition: Definition) {
    this.definitions.push(definition);
  }

  /**
   * @todo return type を react hooks に近くしたい
   * e.g. const {definition: null|Definition, {error, meta}} = this.search(definitions, val);
   */
  protected search(definitions: Array<Definition>, val: string): false|Definition {
    for (const definition of definitions) {
      if (definition.match(val)) {
        return definition;
      }
    }
    return false
  }

  protected parseArgs() {
    const args = process.argv.slice(2);
    let definitions = this.definitions ?? [];
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      const res = this.search(definitions, arg);
      if (res === false) {
        this.notFound()
        break;
      }
      definitions = res.getDefinitions()
      /**
       * @todo fix logic. this cant show message like `not-matched-command`
       */
      if (definitions.length === 0 || i === args.length - 1) {
        const definition = res;
        definition.doHandle();
        break;
      }
    }
  }

  protected notFound() {
    console.log('not found!')
  }

  work() {
    this.parseArgs()
  }
}

const gateli = new Gateli()
const aaa = new Definition('aaa', {handler: (): void => { console.log('heyaaa'); }})
const aaahelp = new Definition('--help', {handler: (): void => { console.log('heyaaa-help'); }})
const bbb = new Definition('bbb', {handler: (): void => { console.log('heybbb'); }})
aaa.addDefinition(aaahelp)
aaa.addDefinition(bbb)
gateli.addDefinition(aaa)
gateli.work()
