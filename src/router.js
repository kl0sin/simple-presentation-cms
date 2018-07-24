import Vue from 'vue';
import Router from 'vue-router';
import About from './views/About.vue';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Panel from './views/Panel';
import Home from './views/Home';
import CodeSnippets from './views/CodeSnippets';
import UsefulLinks from './views/UsefulLinks';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/code-snippets',
      name: 'codeSnippets',
      component: CodeSnippets,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/useful-links',
      name: 'usefulLinks',
      component: UsefulLinks,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/panel',
      name: 'panel',
      component: Panel,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
