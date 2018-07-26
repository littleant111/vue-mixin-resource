'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Element)
Vue.use(VueRouter)

import Mixin from './mixin'
Mixin.init()

// test page
import WidgetTest from '../src/widget/test.vue'

// login related page
import Index from '../src/index.vue'

let routes = [
  { name: 'widgetTest', path: '/test', component: WidgetTest },
  { path: '*', redirect: { name: 'widgetTest' } },
]

let router = new VueRouter({
  routes,
  hashbang: false,
  mode: 'history',
  root: '/',
  saveScrollPosition: true,
});

new Vue({ el: '#app', router, render: h => h(Index) })
