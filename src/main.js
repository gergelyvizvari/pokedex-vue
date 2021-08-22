import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);

window.eventHub = new Vue(); // Single event hub

new Vue({ el: '#app', store, render: h => h(App) });