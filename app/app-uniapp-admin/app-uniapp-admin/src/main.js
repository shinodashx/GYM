import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import '@iconify/vue2'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)
uni.$u.config.unit = 'rpx'
// Vue.component('icon', Icon);
// Vue.use(Icon);

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

uni.addInterceptor({
  returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res) => {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  },
});

const app = new Vue({
  ...App
})
app.$mount()
