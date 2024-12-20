const nuxtEnv = process.env.NUXT_ENV ?? 'development'

const commonConfig = {
  public: {},
}

const developmentConfig = {
  ...commonConfig,
  public: {
    ...commonConfig.public,
    baseUrl: 'http://localhost:3000',
  },
}

const productionConfig = {
  ...commonConfig,
  public: {
    ...commonConfig.public,
    baseUrl: 'http://localhost:3000',
  },
}

export const getRuntimeConfig = () => {
  switch (nuxtEnv) {
    case 'development':
      return developmentConfig
    case 'production':
      return productionConfig
    default:
      return commonConfig
  }
}
