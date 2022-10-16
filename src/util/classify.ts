import { Option } from '@/fragment/option'
import { HelpOption } from '@/fragment/help-option'
import { VersionOption } from '@/fragment/version-option'
import { Positional } from '@/fragment/positional'

type Classify = (arg: { [key: string]: Option | HelpOption | VersionOption | Positional }) => {
  options: Option[]
  helpOption: HelpOption[],
  versionOption: VersionOption[],
  positionals: Positional[]
}
export const classify: Classify = (arg) => {
  const options: Option[] = []
  const positionals: Positional[] = []
  const helpOption: HelpOption[] = []
  const versionOption: VersionOption[] = []

  for (const [name, value] of Object.entries(arg)) {
    if (value instanceof Option) {
      options.push(value)
    } else if (value instanceof Positional) {
      positionals.push(value)
    }
  }

  return { options, positionals, helpOption, versionOption }
}
