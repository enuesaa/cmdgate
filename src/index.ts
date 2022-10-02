import { Gateli } from '@/gateli'
import { Command, CommandHandler } from '@/command'
import { Option } from '@/option'
import { classify } from '@/classify'

type CreateGateli = (arg: {
  name: string,
  description?: string,
  handler?: CommandHandler,
  gate?: {
    [key: string]: Command | Option,
  }
}) => Gateli;
export const gateli: CreateGateli = ({ name, description, handler, gate }) => {
  const { commands, options } = classify(gate ?? {})
  return (
    new Gateli()
      .name(name)
      .description(description ?? '')
      .handler(handler ?? (() => ({})))
      .commands(commands)
      .options(options)
  )
}

type CreateCommand = (arg: {
  description?: string,
  handler?: CommandHandler,
  gate?: {
    [key: string]: Command | Option,
  },
}) => Command;
export const command: CreateCommand = ({ description, handler, gate }) => {
  const { commands, options } = classify(gate)
  return (
    new Command()
      .description(description ?? '')
      .handler(handler ?? (() => ({})))
      .commands(commands)
      .options(options)
  )
}

type CreateOption = (arg: {
  description?: string,
  alias?: string,
  required?: boolean,
}) => Option;
export const option: CreateOption = ({ description, alias, required }) => {
  return (
    new Option()
      .description(description ?? '')
      .alias(alias ?? null)
      .required(required)
  )
}

type CreateHelp = (arg: {}) => ({});
export const help: CreateHelp= (arg) => ({})

type CreatePositional = (arg: {}) => ({});
export const positional1: CreatePositional = (arg) => ({})
export const positional2: CreatePositional = (arg) => ({})

type CreatePositionalArgs = (arg: {}) => ({});
export const positionalArgs: CreatePositionalArgs= (arg) => ({})

type CreateOptionValue = (arg: {}) => ({});
export const optionValue: CreateOptionValue = (arg) => ({})
