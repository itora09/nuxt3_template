const commonConfig = {}

const developmentConfig = {
  ...commonConfig,
}

const productionConfig = {
  ...commonConfig,
}

export const getAppConfig = () => {
  const nuxtEnv = process.env.NUXT_ENV ?? 'development'
  switch (nuxtEnv) {
    case 'development':
      return developmentConfig
    case 'production':
      return productionConfig
    default:
      return commonConfig
  }
}
