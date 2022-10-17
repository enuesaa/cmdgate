export type VersionOptionConfig = {
  alias: string | null
  message: string
}

export class VersionOption {
  name: string | null
  config: VersionOptionConfig

  constructor(name: string, config: Partial<VersionOptionConfig>) {
    this.name = name
    this.config = { alias: null, message: '', ...config }
  }

  exec() {
    console.log('version')
  }
}
