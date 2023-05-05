import { Command } from '@/command'
import { Route } from '@/route'
import { Context } from './context'

export const createCommand = () => new Command()
export const createRoute = () => new Route()

export const createContext = <S, T>() => {
  return new Context<S, T>()
}
