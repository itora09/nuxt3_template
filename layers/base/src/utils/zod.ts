import type { ZodTypeDef, ZodType } from 'zod'

export function ensureValueOf<T>(
  x: ZodType<T, ZodTypeDef>,
  y: unknown,
): asserts y is T {
  const env = process.env.NUXT_ENV ?? 'development'
  if (env === 'development') {
    const result = x.safeParse(y)
    if (result.error) {
      console.error(result.error)
    }
  }
  x.parse(y)
}

export function requireValueOf<T>(x: ZodType<T, ZodTypeDef>, y: unknown): T {
  ensureValueOf(x, y)
  return y
}
