export const createState = <T>(initialValue: T) => {
  let state = initialValue;

  return {
    state: () => { return state },
    setState: (state: T) => {},
  }
}

type CommandState = {
  name: string,
}
export const command = createState<CommandState>({
  name: 'a',
})

const createCommand = {
  name: (name: string) => {
    const state = command.state()
    state.name = name
    command.setState(state)
  }
}
