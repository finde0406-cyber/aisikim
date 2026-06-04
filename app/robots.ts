import type { MetadataRoute } from 'next'

const BASE_URL = 'https://aisikim.com'
const HOSTNAME = 'aisikim.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: HOSTNAME,
  }
}
