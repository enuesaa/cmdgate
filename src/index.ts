import { Gateli } from './gateli'
import { Definition, DefinitionOptions } from './definition'

type Props = {
  definitions: Record<string, any>;
}
const createDefinition = (name: string, { handler, definitions }: DefinitionOptions ): Definition => {
  const definition = new Definition(name, { handler })
  for (const name in definitions) {
    if (!definitions.hasOwnProperty(name)) {
      continue;
    }
    definition.addDefinition(createDefinition(name, definitions[name]))
  }
  return definition
}
export default function createGateli ({ definitions }: Props): Gateli {
  const gateli = new Gateli()
  for (const name in definitions) {
    if (!definitions.hasOwnProperty(name)) {
      continue;
    }
    gateli.addDefinition(createDefinition(name, definitions[name]))
  }

  return gateli
}
