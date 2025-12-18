export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.layout === false) return
  if (to.meta.layout) return
  if (to.path.startsWith('/admin')) {
    to.meta.layout = 'admin'
    return
  }
  if (to.path.startsWith('/farmer')) {
    to.meta.layout = 'farmer'
    return
  }
})
