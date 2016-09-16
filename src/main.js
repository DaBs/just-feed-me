import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

import Front from './pages/Front.vue';
import Result from './pages/Result.vue';


Vue.use(Router);

const router = new Router({
  history: true
});

router.map({
  '/result': {
    name: 'result',
    component: Result
  },
  '/': {
    name: 'front',
    component: Front
  }
});


router.start(App, '#app');
