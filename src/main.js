import Vue from 'vue';
import ElementUI from 'element-ui';
// import { Row, Button } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false

// 全局引入
Vue.use(ElementUI);

//  按需引入
// Vue.use(Row)
// Vue.use(Button)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
