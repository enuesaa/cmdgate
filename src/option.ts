export type OptionConfig = {
  description: string;
  alias: null | string;
}

export type Option = {
  name: string;
  config: OptionConfig;
}
