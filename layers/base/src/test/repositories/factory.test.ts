import { describe, it, expect } from 'vitest'
import { RepositoryFactory } from '../../repositories/factory'
import { exampleRepository } from '../../repositories/exampleRepository'

describe('RepositoryFactory', () => {
  it('exampleリポジトリを提供するべき', () => {
    expect(RepositoryFactory.example).toBeDefined()
    expect(RepositoryFactory.example).toBe(exampleRepository)
  })

  it('正しいメソッドを持つインスタンスを返すべき', () => {
    const repository = RepositoryFactory.example()
    expect(repository.get).toBeDefined()
    expect(repository.get.getExample).toBeDefined()
    expect(typeof repository.get.getExample).toBe('function')
  })

  it('予期しないリポジトリにはアクセスできないべき', () => {
    // @ts-expect-error - 存在しないリポジトリへのアクセス
    expect(RepositoryFactory.nonexistent).toBeUndefined()
  })
})
