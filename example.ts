import {gateli, command, option} from './src/index'

gateli({
  aaa: command(
    {
      aa: command({}, () => { console.log('aaa.aa'); return {} }),
      input: option({}),
    },
    () => { console.log('aaa'); return {} }
  ),
  bbb: command({}, () => { console.log('bbb'); return {}}),
  ccc: command({}, () => { console.log('ccc'); return {}}),
  help: option({ short: 'h', long: 'help', global: true }),
})
.exec()
