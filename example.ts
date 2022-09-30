import {gateli, command, option, help, positional1, positional2, positionalRecursive, optionValue} from './src/a'

gateli({
  _name: 'aaa',
  _description: 'aaa command',
  aa: command({
    bb: command({
      dd: command({})
    }),
    cc: option({
      aa: optionValue({ _name: 'aa'}),
      _required: true,
      _description: ''
    }),
  }),
  bbb: command({
    bb2: command({
      _handler: () => { console.log('bbb'); return {}},
    }),
  }),
  ccc: command({
    _handler: () => { console.log('bbb'); return {}},
  }),
  '--help': option({ alias: '-h', global: true }),
})
.exec()
