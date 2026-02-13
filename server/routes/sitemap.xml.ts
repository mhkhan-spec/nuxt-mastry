export default defineEventHandler(async (event) => {
  // 1. Fetch your dynamic data (e.g., from your project API)
  const projects = await $fetch('/api/projects')
  
  const sitemap = [
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url><loc>https://saaspro.com/</loc></url>',
    '  <url><loc>https://saaspro.com/projects</loc></url>',
    ...projects.map(p => `  <url><loc>https://saaspro.com/projects/${p.id}</loc></url>`),
    '</urlset>'
  ].join('\n')

  // 2. Set the correct header
  setHeader(event, 'content-type', 'application/xml')
  
  return sitemap
})