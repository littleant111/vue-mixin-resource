<!--
  包含暂存的提交面板组件
-->
<template>
  <div>
    <el-button v-if="submitting" type="primary">{{ label || '提交' }}中...</el-button>
    <el-button v-else-if="disabled" type="primary" :disabled="true">{{ label || '提交' }}</el-button>
    <el-button v-else type="primary" @click="_submit()">{{ label || '提交' }}</el-button>

    <template v-if="onPend">
      <el-button v-if="pending" type="primary">{{ label || '暂存' }}中...</el-button>
      <el-button v-else type="primary" @click="_pend()">{{ label || '暂存' }}</el-button>
    </template>
    
  	<template v-if="onCancel">
      <el-button @click="_cancel()">{{ cancelLabel || '取消' }}</el-button>
    </template>
  </div>
</template>
<script>
  export default {
    props: {
      label: { type: String },
      pendingLabel: { type: String },
      cancelLabel: { type: String },
      onSubmit: { type: Function },
      onPend: { type: Function },
      onCancel: { type: Function },
    },

    data() {
      return {
        disabled: false,
        submitting: false,
        pending: false,
      }
    },

    methods: {
      disable(result) {
        this.disabled = result
      },

      submit() {
        this.submitting = true
      },

      pend() {
        this.pending = true
      },

      cancel() {
        this.submitting = false
      },

      finished() {
        this.submitting = false
        this.pending = false
      },

      _submit() {
        if(this.onSubmit) this.onSubmit()
      },

      _pend() {
        if(this.onPend) this.onPend()
      },

      _cancel() {
        if(this.onCancel) this.onCancel()
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
