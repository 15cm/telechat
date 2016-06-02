import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'

Vue.use(VueRouter)
var router = new VueRouter({
})
configRouter(router)

var App = Vue.extend(require('./App.vue'))
router.start(App, 'app')

// Just for debug
window.router = router

export { router }
