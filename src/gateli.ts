import { Definition } from './definition'
import process from 'node:process'
import { promises as readline } from 'node:readline'

export class Gateli {
  definitions: Definition[];

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

  async parseArgs() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
      await this.interactive()
    } else {
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

  async interactive() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    const defnames = this.definitions.map((def) => def.getName()).join()
    const answer = await rl.question(`select from [${defnames}]: `);
    console.log(`you select: ${answer}`);
    rl.close();
    const res = this.search(this.definitions, answer);
    if (res === false) {
      console.log('not found!')
    } else {
      let definition = res;
      definition.doHandle();
    }
  }
}
