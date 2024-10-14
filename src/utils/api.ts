export class FetchError extends Error {
  statusCode: number
  statusText: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any // レスポンスの内容（JSONなど）
  url: string

  constructor(
    message: string,
    statusCode: number,
    statusText: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any,
    url: string,
  ) {
    super(message) // 親クラスErrorのコンストラクタを呼び出す
    this.name = 'FetchError' // エラー名
    this.statusCode = statusCode // ステータスコード
    this.statusText = statusText // ステータステキスト
    this.response = response // レスポンスの内容
    this.url = url
  }
}

export type FetchParams = {
  url: string
  timeout?: number
} & RequestInit

export const callApi = (params: FetchParams) => {
  const controller = new AbortController()
  const signal = controller.signal
  const headers = {
    'Content-Type': 'application/json',
    ...params.headers,
  }
  const body = params.body ?? JSON.stringify(params.body)
  return fetch(params.url, {
    ...params,
    headers,
    body,
    signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new FetchError(
          response.statusText,
          response.status,
          response.statusText,
          await response.json(),
          response.url,
        )
      }
      return await response.json()
    })
    .finally(() => {
      clearTimeout(
        setTimeout(() => {
          controller.abort()
        }, params.timeout ?? 5000),
      )
    })
}
