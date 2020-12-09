import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import musicians from '../views/musicians.vue'
import Order from '../views/orders.vue'
import Style from '../views/style.vue'

Vue.use(VueRouter)

const routes = [
  
    {
       path: '/',
        component: Index
    },
    { path: '/musicians', component: musicians },
    { path: '/order', component: Order },
    { path: '/style', component: Style }
    

]

const router = new VueRouter({
  routes
})

export default router
