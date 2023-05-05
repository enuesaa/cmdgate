import { Command } from '@/command'
import { Route } from '@/route'
// import { Context } from './context'

export const createCommand = () => new Command()
export const createRoute = () => new Route()

// export const createContext = <S extends string[], T extends Record<'string', any>>() => {
//   return new Context<S, T>()
// }
