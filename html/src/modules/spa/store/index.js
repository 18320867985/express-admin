
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

 export  const store=new Vuex.Store({
     state:{
         count:0

     },
     mutations:{
         js:(state,start)=>{
             state.count=start;
         },

     },
     actions:{
           at({commit,state}){
                setTimeout(() => {
                    commit("js",1000) ;
                }, 1000*5);
           }
     },
     getters:{
         
     },
    
 });

