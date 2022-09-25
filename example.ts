import { Gateli, Definition } from './src/index'

const gateli = new Gateli([
  new Definition('aaa', {
    handler: (): void => { console.log('heyaaa'); },
    definitions: [
      new Definition('--help', {handler: (): void => { console.log('heyaaa-help'); }}),
      new Definition('bbb', {handler: (): void => { console.log('heybbb'); }}),
    ],
  }),
])
gateli.parseArgs()
