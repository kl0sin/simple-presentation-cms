import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import './registerServiceWorker';
import firebaseApp from 'firebase/app';
import firebase from 'firebase';
import { config } from './firebase';
import VueHighlightJS from 'vue-highlightjs';

firebaseApp.initializeApp(config);

Vue.config.productionTip = false;

Vue.use(VueHighlightJS);

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('sign-in');
  else next();
});

firebase.auth().onAuthStateChanged(user => {
  store.commit('setUser', user);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
