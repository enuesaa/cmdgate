**DEVELOPING**

# gateli
## usage
~~~ts
import { gateli, command, option } from './src/index'

gateli({
  name: 'sample', // bin name
  gate: {
    'aaa': command({
      description: 'aaa subcommand',
      gate: {
        'aa': command({
          handler: () => { console.log('aaa.aa'); return {} },
        }),
        '--input': option(),
      },
    }),
    'bbb': command({
      handler: () => { console.log('bbb'); return {} },
    }),
    'ccc': command({
      handler: () => { console.log('ccc'); return {} },
    }),
    '--help': option({ alias: '-h' }),
  },
})
.exec()
~~~
