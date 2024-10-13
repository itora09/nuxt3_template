import { z } from "zod";

export const exampleSchema = z.object({
  hoge: z.string(),
  fuga: z.number(),
  piyo: z.boolean(),
});
