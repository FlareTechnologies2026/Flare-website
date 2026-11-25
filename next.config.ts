import type { NextConfig } from 'next'

const config: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/home/', destination: '/', permanent: true },
      { source: '/results', destination: '/', permanent: true },
      { source: '/results/', destination: '/', permanent: true },
      { source: '/main-services/automated-systems', destination: '/custom-development', permanent: true },
      { source: '/main-services/automated-systems/', destination: '/custom-development', permanent: true },
      { source: '/video-production', destination: '/demand-generation-agency', permanent: true },
      { source: '/video-production/', destination: '/demand-generation-agency', permanent: true },
      { source: '/portfolio', destination: '/case-studies', permanent: true },
      { source: '/portfolio/', destination: '/case-studies', permanent: true },
    ]
  },
}

export default config
