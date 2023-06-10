export type OptionConfig = {
  description: string;
  alias: null | string;
  required: boolean;
}

export type Option = {
  name: string;
  config: OptionConfig;
}
