**DEVELOPING**

# gateli
## usage
~~~ts
import {gateli, command, option} from './src/index'

gateli({
  aaa: command({
    handler: () => { console.log('aaa'); return {}},
    options: {
      input: option({}), // special handler
    }
  }),
  bbb: command({ handler: () => { console.log('bbb'); return {}}, }),
  ccc: command({ handler: () => { console.log('ccc'); return {}} }),
  help: option({
    short: 'h',
    long: 'help',
    global: true,
  })
})
.exec()
~~~
