import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'
import socketio from 'socket.io-client'
import vueResource from 'vue-resource'
import VueAsyncData from 'vue-async-data'
import auth from './auth'
require('script!static/plupload.full.min.js')
require('script!qiniu-js/dist/qiniu.min.js')

var MyConfig = {}
MyConfig.install = Vue => {
  Vue.prototype.$mServerHost = '/'
  Vue.prototype.$socket = socketio(Vue.prototype.$mServerHost)
  Vue.prototype.$auth = auth
}
Vue.use(MyConfig)

Vue.use(VueRouter)
var router = new VueRouter({
})
configRouter(router)

Vue.use(vueResource)

Vue.use(VueAsyncData)

var App = Vue.extend(require('./App.vue'))
router.start(App, 'app')

global.Vue = Vue
