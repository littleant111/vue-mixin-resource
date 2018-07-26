'use strict'

import Vue from 'vue'
import components from '../src/widget'
import methods from '../src/methods'
import filter from '../src/filter'

// add broadcast
let broc = new Vue()

export default {
  init() {
    Vue.mixin({
      data() {
        return {
          broc: broc,
          helper: require('../util/helper'),
          confirm(title, message, confirmCb, cancelCb) {
            this.$confirm(message, title, { type: 'warning' }).then(() => {
              confirmCb()
            }, () => {
              console.log('confirm canceled')
              if(cancelCb) cancelCb()
            })
          },
          gnotify: {
            start() {
              console.log('gnotify show')
              $('#gnotify').show()
            },

            end() {
              $('#gnotify').hide()
            }
          },
          notify: {
            // if use `success(message) {`, this will become this object instead of the current component
            // so, we should use `success: (message) => {`
            success: (message) => { this.$notify({ message, type: 'success' }) },
            warning: (message) => { this.$notify({ message, type: 'warning' }) },
            error: (message) => { this.$notify({ message, type: 'error' }) }
          }
        }
      },

      methods: methods,
      components: components
    });

    // init filter
    for(let key in filter) {
      Vue.filter(key, filter[key])
    }
  }
}
