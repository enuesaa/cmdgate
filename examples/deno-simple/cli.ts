import { createCmd } from "npm:@enuesaa/cmdgate";

export const cli = createCmd();

cli.handle((prompt) => {
  prompt.info("hello");
  prompt.exit(0);
});
