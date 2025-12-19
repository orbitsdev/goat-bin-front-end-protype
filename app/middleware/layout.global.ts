export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.layout === false) return

  if (to.path.startsWith('/admin')) {
    to.meta.layout = 'admin'
  } else if (to.path.startsWith('/farmer')) {
    to.meta.layout = 'farmer'
  } else {
    to.meta.layout = 'default'
  }
})
