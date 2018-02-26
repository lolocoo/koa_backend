// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Framework7 from 'framework7/dist/framework7.esm.bundle';
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle';
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import App from './App';
import router from './router';

Vue.use(Framework7Vue, Framework7);

Vue.config.productionTip = false;
// /* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  framework7: {

  },
  router,
  components: { App },
  template: '<App/>',
});

