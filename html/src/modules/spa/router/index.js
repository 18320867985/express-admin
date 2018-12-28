import Vue from 'vue';
import Router from 'vue-router';
import hello from '../components/hello.vue';
import router1 from '../components/router1.vue';
import router2 from '../components/router2.vue';


Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [
  
    {
      path: '/',
      name: 'hello',
      component: hello
    },
    {
      path:"/router1",
      name:"router1",
      component:router1
    },
    {
      path:"/router2",
      name:"router2",
      component:router2
    }
  ]
})

