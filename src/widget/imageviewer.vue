<!--
  图片浏览组件
-->
<template>
  <div id="image-viewer">
    <ul id="images" class="pictures">
      <li v-for="img in imgList">
        <img :src="img.url" :alt="img.name" />
      </li>
    </ul>
  </div>
</template>

<script>
  import Viewer from 'viewerjs'

  export default {
    props: {
      imgList: { type: Array }
    },

    created() {
      this.initViewer()
    },

    watch: {
      imgList() {
        this.initViewer()
      }
    },

    methods: {
      initViewer() {
        setTimeout(() => {
          if(this.viewer) return this.viewer.update()

          let options = {
          }

          this.viewer = new Viewer(document.getElementById('images'), options)
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #image-viewer {
    ul {
      margin-left: -45px;
      list-style: none;

      li {
        width: 15%;
        margin: 5px;
        float: left;

        img {
          width: 100%;
          height: auto;
          border: solid 1px #eee;
          cursor: zoom-in;
        }
      }
    }
  }
</style>
