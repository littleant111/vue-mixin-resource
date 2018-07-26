<!--
  用于测试组件的页面
-->
<template>
  <div id="widget-test" class="main">
    <part-wrapper title="测试面板" type="form">
      <text-input label="姓名" placeholder="小明" required ></text-input>
      <text-input label="年龄" append="岁"></text-input>
      <text-input label="身高"></text-input>
      <text-input label="性别" value="未知" readonly></text-input>
    </part-wrapper>
    <el-button @click="updateVal">更新</el-button>

    <part-wrapper class="submit-panel" title="提交" type="panel">
      <submit-panel ref="submit" label="提交提交" :on-submit="submit" :on-cancel="cancel"/>
    </part-wrapper>
  </div>
  </template>

<script>
  export default {
    data() {
      return {
        main: {
          checkBoxVal: []
        }
      }
    },

    mounted() {
    },

    methods: {
      updateVal() {
        this.main.checkBoxVal = ['1', '2']
      },

      submit() {
        console.log(JSON.stringify(this.main, null, 4))
      },

      cancel() {},

      getData() {
        let params = this.$refs.list.getParams()
        console.log(JSON.stringify(params, null, 4))
      }
    }
  }
</script>

<style lang="scss">
#widget-test {
  width:80%;
  margin-top: 50px;
  margin-left: 50px;

    .submit-panel {
      margin-top: 50px;
    }
  }
</style>
