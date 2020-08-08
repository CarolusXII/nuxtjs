import VueRouter from 'vue-router'
import UserInfo from '../pages/user_info.vue'

const routes = [
  {name: 'user_info', path: '/user_info', component: UserInfo}
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  console.log(to, from);
})


export default router;
