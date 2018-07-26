<!--
  错误提示组件

  该组件主要用于大表单页面，用来展现当先页面里错误输入项的个数
  以及跳转至第一个错误输入项的快捷方式
-->
<template>
  <div id="errorer">
    <el-alert
      v-if="errorCount > 0"
      :title="'剩余' + errorCount + '处错误'"
      type="error"
      :closable="false"
      show-icon>
      <a href="javascript:" class="jump" @click="scrollToErr()">跳转至错误</a>
    </el-alert>
    </el-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        errorCount: 0
      }
    },

    created() {
      this.broc.$on('validate', () => {
        // give a timeout to control meanless repeat update
        if(this.timeout) clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          this.updateCount()
        }, 100)
      })
    },

    methods: {
      updateCount() {
        let errorCount = $('.is-error').length
        this.errorCount = errorCount
      }
    }
  }
</script>

<style lang="scss">
  @import '../global.scss';

  #errorer {
    width: 220px;
    display: block;
    position: fixed;
    top: 7px;
    left: calc((100% - 300px)/2);

    .jump {
      color: darkslateblue;
      margin-left: 10px;
      font-size: 12px;
    }

    .jump:hover, .jump:active {
      color: purple;
    }

    .el-alert__icon.is-big {
      font-size: 16px;
      width: 16px;
    }
  }
</style>
