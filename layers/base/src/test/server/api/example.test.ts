import { describe, it, expect } from 'vitest'
import type { H3Event } from 'h3'
import { useH3TestUtils } from '../../setup'

describe('API Tests', async () => {
  const { defineEventHandler } = useH3TestUtils()
  const handler = await import('../../../server/api/example').then(
    (m) => m.default,
  )

  it('イベントハンドラとして登録されていること', () =>
    expect(defineEventHandler).toHaveBeenCalled())

  it('正しいレスポンス形式を返すべき', async () => {
    const data = await handler({} as H3Event)
    expect(data).toEqual({
      hoge: 'hoge',
      fuga: 111,
      piyo: true,
    })
  })

  it('各フィールドが正しい型を持つべき', async () => {
    const data = await handler({} as H3Event)
    expect(typeof data.hoge).toBe('string')
    expect(typeof data.fuga).toBe('number')
    expect(typeof data.piyo).toBe('boolean')
  })

  // エラーケースのテスト（将来的な実装のため、現在はスキップ）
  it.skip('エラー時に適切なレスポンスを返すべき', async () => {
    try {
      await handler({} as H3Event)
      throw new Error('エラーが発生すべき')
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404)
      expect(error).toHaveProperty('statusMessage', 'Not Found')
    }
  })
})
