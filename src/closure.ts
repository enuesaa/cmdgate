export const createState = <T>(initialValue: T) => {
  let state = initialValue;

  return {
    state: () => { return state },
    setState: (state: T) => {},
  }
}

// type CommandState = {
//   name: string,
// }
// const command = createState<CommandState>({
//   name: 'a',
// })
// const createCommand = {
//   name: (name: string) => {
//     const state = command.state()
//     state.name = name
//     command.setState(state)
//   }
// }

type Command = {
  name: (name: string) => Command;
  description: (description: string) => Command;
  getState: () => any;
}

export const createCommand = () => {
  const state = {
    name: '',
    description: '',
  }

  const methods: Command = {
    getState: () => {
      return state
    },
    name: (name) => {
      state.name = name;
      return methods
    },
    description: (description) => {
      state.description = description;
      return methods
    }
  }

  return methods
}

const command = createCommand()
command.name('aa').description('bb')

console.log(command.getState())

