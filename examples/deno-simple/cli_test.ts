import { assertEquals } from "std/assert/mod.ts";
import { cli } from "./cli.ts";
import { PromptMock } from "npm:@enuesaa/cmdgate";

Deno.test(function helloTest() {
  cli.argv = ["deno", "/workspace/main.ts"];
  const prompt = new PromptMock();
  cli.prompt = prompt;
  cli.run();
  assertEquals(prompt.out, "hello\n");
});
