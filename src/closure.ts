export const createState = <T>(initialValue: T, actions: Record<string, (state: T) => any>) => {
  let state = initialValue;

  return Object.assign(actions, {
    state: () => { return state },
  })
}

type CommandState = {
  name: string,
}
const commandStateInit: CommandState = {
  name: 'a',
}
export const command = createState<CommandState>(commandStateInit, {
  name: (state) => (value: string) => {
    state.name = value;
    return command
  },
})
