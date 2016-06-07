// import App from './App'
import auth from './auth'
import Login from './components/Login'
import Register from './components/Register'
import Index from './components/Index'
import Contacts from './components/contacts/Contacts'
import Profile from './components/contacts/Profile'
import Chats from './components/chats/Chats'
import ChatWindow from './components/chats/ChatWindow'
import Settings from './components/settings/Settings'
export function configRouter (router) {
  router.map({
    '/login': {
      name: 'login',
      component: Login
    },
    '/register': {
      name: 'register',
      component: Register
    },
    '/index': {
      name: 'index',
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
  router.beforeEach(transition => {
    if (!auth.uid && transition.to.path !== '/register') {
      router.go({name: 'login'})
    }
    if (transition.to.path === '/login') {
      auth.uid = null
    }
    transition.next()
  })
}
