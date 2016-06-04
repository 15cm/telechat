// import App from './App'
import Contacts from './components/contacts/Contacts'
import Profile from './components/contacts/Profile'
import Chats from './components/chats/Chats'
import ChatWindow from './components/chats/ChatWindow'
import Settings from './components/settings/Settings'
import Index from './components/Index'
export function configRouter (router) {
  router.map({
    '/index': {
      component: Index,
      subRoutes: {
        '/contacts': {
          name: 'contacts',
          component: Contacts
        },
        '/chats': {
          name: 'chats',
          component: Chats,
          subRoutes: {
          }
        },
        '/settings': {
          name: 'settings',
          component: Settings
        }
      }
    },
    '/chatting': {
      name: 'chatting',
      component: ChatWindow
    },
    '/profile': {
      name: 'profile',
      component: Profile
    }
  })
  router.redirect({
    '*': './index'
  })
}
