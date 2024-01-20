import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)


// 1、创建路由组件,src/views/*.vue

// 2、将路由与组件进行映射
const routes = [
  // 主路由
  {
    path: '/',
    component: Main,
    name: 'Main',
    redirect: '/home', //重定向到home页面
    children: [
      // // 子路由，嵌套路由
      // { path: 'home', name: 'home', component: Home }, //首页
      // { path: 'user', name: 'user', component: User }, //用户管理
      // { path: 'mall', name: 'mall', component: Mall }, //商品管理
      // { path: 'Page1', name: 'page1', component: PageOne }, //页面1
      // { path: 'Page2', name: 'page2', component: PageTwo }, //页面2
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

// 3、创建router实例
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 路由守卫:全局前置导航守卫
// router.beforeEach((to, from, next) => {
//   // 获取token
//   const token = Cookie.get('token')

//   if (!token && to.name !== 'login') {
//       next({ name: 'login' })
//   } else if (token && to.name === 'login') {
//       next({ name: 'home' })
//   } else {
//       next()
//   }
// })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 暴露路由
export default router

