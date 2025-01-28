import { describe, it, expect, vi } from 'vitest'
import * as api from '../../utils/api'
import * as zod from '../../utils/zod'
import { exampleRepository } from '../../repositories/exampleRepository'

describe('exampleRepository', () => {
  describe('get.getExample', () => {
    it('正常系のレスポンスを返すべき', async () => {
      const mockResponse = {
        hoge: 'テスト',
        fuga: 123,
        piyo: true,
      }

      const mockCallApi = vi
        .spyOn(api, 'callApi')
        .mockResolvedValue(mockResponse)
      const mockRequireValueOf = vi
        .spyOn(zod, 'requireValueOf')
        .mockReturnValue(mockResponse)

      const repository = exampleRepository()
      const result = await repository.get.getExample()

      expect(mockCallApi).toHaveBeenCalledWith({
        url: 'http://localhost:3000/api/example',
        method: 'GET',
      })

      expect(mockRequireValueOf).toHaveBeenCalledWith(
        expect.any(Object),
        mockResponse,
      )

      expect(result).toEqual(mockResponse)
    })

    it('APIエラー時にエラーを伝播させるべき', async () => {
      const mockError = new Error('API Error')
      vi.spyOn(api, 'callApi').mockRejectedValue(mockError)

      const repository = exampleRepository()
      await expect(repository.get.getExample()).rejects.toThrow(mockError)
    })

    it('バリデーションエラー時にエラーを伝播させるべき', async () => {
      const mockResponse = {
        hoge: 123, // 文字列である必要がある
        fuga: 'invalid', // 数値である必要がある
        piyo: 'invalid', // 真偽値である必要がある
      }

      const mockError = new Error('Validation Error')
      vi.spyOn(api, 'callApi').mockResolvedValue(mockResponse)
      vi.spyOn(zod, 'requireValueOf').mockImplementation(() => {
        throw mockError
      })

      const repository = exampleRepository()
      await expect(repository.get.getExample()).rejects.toThrow(mockError)
    })

    it('レスポンスの型が正しいべき', async () => {
      const mockResponse = {
        hoge: 'テスト',
        fuga: 123,
        piyo: true,
      }

      vi.spyOn(api, 'callApi').mockResolvedValue(mockResponse)
      vi.spyOn(zod, 'requireValueOf').mockReturnValue(mockResponse)

      const repository = exampleRepository()
      const result = await repository.get.getExample()

      expect(typeof result.hoge).toBe('string')
      expect(typeof result.fuga).toBe('number')
      expect(typeof result.piyo).toBe('boolean')
    })
  })
})
