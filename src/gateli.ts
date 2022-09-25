import { Definition } from './definition'

export class Gateli {
  definitions: Array<Definition>;

  constructor(definiitons: Array<Definition> = []) {
    this.definitions = definiitons;
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

  parseArgs() {
    const args = process.argv.slice(2);
    let definitions = this.definitions ?? [];
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      const res = this.search(definitions, arg);
      if (res === false) {
        console.log('not found!')
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
}
