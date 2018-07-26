<template>
  <div class="part-wrapper">
    <div v-show="showTitle" class="head">
      <div class="title">{{ title }}</div>
    </div>

    <el-form v-if="typeof type === 'undefined' || type === 'form'" class="body" label-position="top" label-width="80px">
      <el-row :gutter="30">
        <slot></slot>
      </el-row>
    </el-form>
    <div v-else class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: { type: String },
      type: { type: String }, // form: 表单, panel: 非表单
      hidden: {} // 隐藏head
    },

    data() {
      return {
        showTitle: !(!this.title || (typeof this.hidden !== 'undefined' && this.hidden !== false))
      }
    }
  }
</script>

<style lang="scss">
  @import '../global.scss';

  .part-wrapper {
    margin-bottom: 60px;

    .head {
      border-bottom: solid 1px $base;
      margin-bottom: 30px;

      .title {
        padding: 5px 8px;
        background-color: $base;
        display: inline-block;
        color: #fff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
    }

    .body {
    }
  }
</style>
