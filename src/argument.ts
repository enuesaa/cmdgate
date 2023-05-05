export type ArgumentConfig = {
  description: string;
  required: boolean;  
}

export type Argument = {
  name: string;
  config: ArgumentConfig;
}
