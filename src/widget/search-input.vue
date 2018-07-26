<template>
  <el-form-item :label="label" class="search-input-form-item">
    <el-input
      ref="input"
      v-model="myval"
      :icon="myval ? 'close' : 'none'"
      :on-icon-click="clearInput"
      :placeholder="placeholder"
      @input="_handleInput"
      @blur="_handleBlur($event)"
      @change.native="_handleChange($event)"
      @keypress.enter.native.prevent="_handleEnter($event)"
      ></el-input>
  </el-form-item>
</template>

<script>
  export default {
    props: {
      label: { type: String },
      placeholder: { type: String },
      value: {},
    },

    data() {
      return {
        myval: this.value,
      }
    },

    methods: {
      clearInput() {
        this.myval = ''

        this.$emit('input', '')

        $('input', this.$refs.input.$el).focus()
      },

      _handleInput(newValue) {
        // console.log('handle input')

        this.$emit('input', newValue)
      },

      _handleBlur(e) {
        // console.log('handle blur', e)
        this.$emit('blur', e)
      },

      _handleEnter(e) {
        // console.log('handle enter')

        this.$emit('enter', e)
      },

      _handleChange(e) {
        // console.log('handel change', e)
      },
    }
  }
</script>

<style lang="scss">
  .search-input-form-item {
    label.el-form-item__label {
      padding: 11px 12px 11px 0;
    }
  }
</style>
