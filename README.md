**DEVELOPING**

# gateli
## usage
~~~ts
import { gateli, command, option, helpOption, versionOption } from './src/index'

gateli({
  name: 'sample', // bin name
  gate: [
    command('aaa', {
      param: {
        input: option('--input', {}),
      },
    }),
    command('aaa aa', {
      handler: () => { console.log('aaa.aa'); return {} },
    }),
    command('bbb', {
      handler: () => { console.log('bbb'); return {} },
    }),
    command('ccc', {
      handler: () => { console.log('ccc'); return {} },
    }),
    command('', {
      param: {
        help: helpOption('--help', { alias: '-h' }),
        version: versionOption('--version', { alias: '-v' }),
      },
      handler: ({ prompt }) => {},
    }),
  ],
})
.exec()
~~~
