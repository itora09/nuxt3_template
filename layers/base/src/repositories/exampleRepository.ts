import { callApi } from '@base/utils/api'
import { exampleSchema } from '@base/models/exampleModel'

export const ExampleResponseSchema = exampleSchema

export const exampleRepository = () => {
  return {
    get: {
      getExample: async () => {
        const result = await callApi({
          url: 'http://localhost:3000/api/example',
          method: 'GET',
        })
        return requireValueOf(ExampleResponseSchema, result)
      },
    },
    post: {},
    put: {},
    patch: {},
    delete: {},
  } as const
}
