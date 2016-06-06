import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'
import socketio from 'socket.io-client'
import vueResource from 'vue-resource'
import auth from './auth'

var MyConfig = {}
MyConfig.install = Vue => {
  Vue.prototype.$mServerHost = 'http://localhost:9090'
  Vue.prototype.$socket = socketio(Vue.prototype.$mServerHost)
  Vue.prototype.$auth = auth
}
Vue.use(MyConfig)

Vue.use(VueRouter)
var router = new VueRouter({
})
configRouter(router)

Vue.use(vueResource)

var App = Vue.extend(require('./App.vue'))
router.start(App, 'app')

export { Vue }
