const nuxtEnv = process.env.NUXT_ENV ?? 'development'

const commonConfig = {}

const developmentConfig = {
  ...commonConfig,
}

const productionConfig = {
  ...commonConfig,
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
