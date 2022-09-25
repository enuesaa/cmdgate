import { Definition } from './definition'
import { Prompt } from './prompt'

export class Gateli {
  definitions: Definition[];
  prompt: Prompt;

  constructor(definiitons: Array<Definition> = []) {
    this.definitions = definiitons;
    this.prompt = new Prompt();
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

  async parseArgs() {
    const args = this.prompt.getArgs()
    if (args.length === 0) {
      await this.interactive()
    } else {
      let definitions = this.definitions ?? [];
      for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        const res = this.search(definitions, arg);
        if (res === false) {
          this.prompt.println('not found!')
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

  async interactive() {
    const defnames = this.definitions.map((def) => def.getName()).join()
    const answer = await this.prompt.question(`select from [${defnames}]: `);
    const res = this.search(this.definitions, answer);
    if (res === false) {
      this.prompt.println('not found!')
    } else {
      let definition = res;
      definition.doHandle();
    }
    this.prompt.close();
  }
}
