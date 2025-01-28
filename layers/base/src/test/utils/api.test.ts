import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FetchError, callApi, type FetchParams } from '../../utils/api'

describe('api', () => {
  describe('FetchError', () => {
    it('エラーインスタンスが正しく作成されるべき', () => {
      const error = new FetchError(
        'エラーが発生しました',
        404,
        'Not Found',
        { message: 'リソースが見つかりません' },
        'http://example.com/api',
      )

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(FetchError)
      expect(error.name).toBe('FetchError')
      expect(error.message).toBe('エラーが発生しました')
      expect(error.statusCode).toBe(404)
      expect(error.statusText).toBe('Not Found')
      expect(error.response).toEqual({ message: 'リソースが見つかりません' })
      expect(error.url).toBe('http://example.com/api')
    })
  })

  describe('callApi', () => {
    beforeEach(() => {
      vi.restoreAllMocks()
      vi.spyOn(global, 'setTimeout')
    })

    it('成功時にJSONレスポンスを返すべき', async () => {
      const mockResponse = { data: 'テストデータ' }
      const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const params: FetchParams = {
        url: 'http://example.com/api',
      }

      const result = await callApi(params)

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        params.url,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      )
    })

    it('失敗時にFetchErrorをスローするべき', async () => {
      const errorResponse = { message: 'エラーが発生しました' }
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve(errorResponse),
        url: 'http://example.com/api',
      } as Response)

      const params: FetchParams = {
        url: 'http://example.com/api',
      }

      await expect(callApi(params)).rejects.toThrow(FetchError)
      await expect(callApi(params)).rejects.toMatchObject({
        statusCode: 500,
        statusText: 'Internal Server Error',
        response: errorResponse,
      })
    })

    it('タイムアウトが設定されるべき', async () => {
      const mockResponse = { data: 'テストデータ' }
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const params: FetchParams = {
        url: 'http://example.com/api',
        timeout: 3000,
      }

      await callApi(params)

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000)
    })

    it('デフォルトのタイムアウトが5000msであるべき', async () => {
      const mockResponse = { data: 'テストデータ' }
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const params: FetchParams = {
        url: 'http://example.com/api',
      }

      await callApi(params)

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000)
    })

    it('カスタムヘッダーがマージされるべき', async () => {
      const mockResponse = { data: 'テストデータ' }
      const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const params: FetchParams = {
        url: 'http://example.com/api',
        headers: {
          Authorization: 'Bearer token',
        },
      }

      await callApi(params)

      expect(mockFetch).toHaveBeenCalledWith(
        params.url,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line @stylistic/quote-props
            Authorization: 'Bearer token',
          },
        }),
      )
    })
  })
})
