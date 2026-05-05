/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mhghazy.github.io/dar-elmeamar-next-v2',
  generateRobotsTxt: true,
  outDir: './out',
  robotsTxtOptions: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      }
    ]
  },
  exclude: ['/admin', '/admin/*'],
}
