import { z, ZodType } from "zod";
import type { ZodTypeDef } from "zod";

const env = process.env.NUXT_ENV ?? "development";

export function ensureValueOf<T>(
  x: ZodType<T, ZodTypeDef>,
  y: unknown
): asserts y is T {
  if (env === "development") {
    const result = x.safeParse(y);
    if (result.error) {
      console.error(result.error);
    }
  }
  x.parse(y);
}

export function requireValueOf<T>(x: ZodType<T, ZodTypeDef>, y: unknown): T {
  ensureValueOf(x, y);
  return y;
}
