export type VersionOptionConfig = {
  alias: string
  message: string
}

export class VersionOption {
  name: string | null
  alias: string | null

  constructor(name: string, config: Partial<VersionOptionConfig>) {
    this.name = name
    this.alias = config.alias ?? null
  }

  exec() {
    console.log('version')
  }
}
