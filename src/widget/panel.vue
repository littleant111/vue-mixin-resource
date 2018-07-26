<!--
  面板组件

  Element未实现panel组件，但实际项目中会经常用到，所以在此增加此组件。
-->
<template>
  <div class="panel">
    <div class="panel-head">
      {{ title }}
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: { type: String },
    }
  }
</script>

<style lang="scss" scoped>
  .panel {
    border: solid 1px #ddd;
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }

  .panel .panel-head {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 18px;
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
  }

  .panel .panel-body {
    padding: 15px;
  }
</style>
