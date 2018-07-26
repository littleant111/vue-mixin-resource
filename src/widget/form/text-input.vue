<!--
  输入项组件

  包含input和textarea，并且可以灵活添加prepend和append

  详细的参数解释：
    - label: 输入项标题
    - value: 输入项值
    - valueType: 输入项值类型，int/float/text三种
    - type: text/password/textarea三种
    - widthType: 宽度类型，half/full两种
    - required: 是否是必输项，如果没有该值或者该值为false，则说明不是必输项，否则是必输项
    - readonly: 是否只读，如果没有该值或者该值为false，则说明不是只读，否则是只读
    - placeholder: 占位符
    - prepend: 前置内容，如果prepend以参数形式传入，则只支持文字类型；如果需要使用更丰富的类型，可以使用prepend slot
    - append: 后置内容，用法同prepend
    - rows: 当type为textarea时，用来设置行数
    - asyncValidate: 是否为异步验证
    - validate: 额外的验证方法
    - tip: 尾部的提示信息
-->
<template>
  <el-col :span="widthType && widthType === 'full' ? 24 : 12">
    <el-form-item
      :class="{
        'is-required': (required !== undefined && required !== false),
        'is-error': feedback && feedback.type === 'error',
        'is-success': feedback && feedback.type === 'success'
      }"
      :label="label"
    >
      <template slot="label" v-if="$slots.label">
        <slot name="label"></slot>
      </template>
      <el-input
        :value="value"
        :type="type || 'text'"
        :disabled="(typeof myReadonly !== 'undefined' && myReadonly !== false)"
        :placeholder="placeholder"
        :rows="parseInt(rows)"
        @input="_handleInput"
        @blur="_handleBlur($event)"
        @change.native="_handleChange($event)"
        @keypress.enter.native="_handleEnter($event)"
        :icon="icon"
      >
        <template slot="prepend" v-if="$slots.prepend">
          <slot name="prepend"></slot>
        </template>
        <template slot="append" v-if="$slots.append">
          <slot name="append"></slot>
        </template>

        <!-- shortcut for text prepend and append -->
        <template slot="prepend" v-if="prepend">{{ prepend }}</template>
        <template slot="append" v-if="append">{{ append }}</template>
      </el-input>
      <div v-if="feedback && feedback.type === 'error'" class="el-form-item__error">{{ feedback.text }}</div>
    </el-form-item>
  </el-col>
</template>

<script>
  import validateFunc from '../validate-func'

  export default {
    props: {
      widthType: { type: String },
      label: { type: String },
      value: {},
      valueType: { type: String },
      type: { type: String },
      required: {},
      readonly: {},
      placeholder: { type: String },
      prepend: { type: String },
      append: { type: String },
      rows: { type: String },
      asyncValidate: { type: String },
      validate: { type: Function },
      tip: { type: String },
      icon: { type: String }
    },

    data() {
      return {
        init: true,
        // 异步验证时的指示符
        validating: false,
        myReadonly: this.readonly,

        // 输入项验证结果
        feedback: null
      }
    },

    mounted() {
      setTimeout(() => {
        this.init = false
      }, 100)

      if(this.readonly === undefined) {
        if($(this.$el).parents('[readonly=readonly]').length > 0) {
          this.myReadonly = true
        }
      }
    },

    watch: {
      value(newValue) {
        this.value = newValue

        if(this.init) return

        // TODO consider this place
        setTimeout(() => {
          this._validate('change')
        }, 100)
      },

      readonly(newVal) {
        this.myReadonly = newVal
      }
    },

    methods: {
      _handleInput(newValue) {
        // console.log('handle input')

        if(newValue) {
          if(this.valueType === 'int') newValue = parseInt(newValue)
          if(this.valueType === 'float') newValue = parseFloat(newValue)
        }

        this.$emit('input', newValue)
      },

      _handleBlur(e) {
        // console.log('handle blur', e)
        this.$emit('blur', e)
      },

      _handleEnter(e) {
        // console.log('handle enter')

        this.$emit('enter', e)

        setTimeout(() => {
          this._validate('enter')
        }, 100)
      },

      _handleChange(e) {
        // console.log('handel change', e)

        setTimeout(() => {
          this._validate('change')
        }, 100)
      },

      isEmpty() {
        if(typeof this.value === 'number') {
          return !this.value && this.value !== 0
        } else {
          return !this.value
        }
      },

      _validate(emitType) {
        return validateFunc.call(this, emitType)
      }
    }
  }
</script>
