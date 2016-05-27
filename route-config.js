export function configRouter (router) {
  router.map({
    '/contacts': {
      name: 'contacts',
      component: require('./src/components/contacts/Contacts.vue')
    },
    '/chats': {
      name: 'chats',
      component: require('./src/components/chats/Chats.vue')
    },
    '/settings': {
      name: 'settings',
      component: require('./src/components/settings/Settings.vue')
    }
  })
}
