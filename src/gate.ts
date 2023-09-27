
type BoolFlagOption = {
  alias: string;
}

export class Gate {
  boolFlag(name: string, option: undefined|BoolFlagOption) {

  }
}

export const createGate = () => new Gate()
