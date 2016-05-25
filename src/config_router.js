export function configRouter (router) {
  router.map({
    '/contact': {
      component: require('./src/components/Contact.vue')
    },
    '/chat': {
      component: require('./src/components/Chat.vue')
    },
    '/me': {
      conponent: require('./src/components/Me.vue')
    }
  })
}
