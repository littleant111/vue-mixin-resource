<!--
  右侧导航栏组件

  主要用于内容较多的页面，和part-wrapper组件配合使用
-->
<template>
  <div class="side-navbar">
    <div class="inner">
      <div class="nav-list">
        <a
          v-for="part in partList"
          :class="'nav-item ' + ('level-' + part.level) + ' ' + (part === currPart ? 'active' : '')"
          @click="scrollTo(part)"
        ><span>{{ part.name }}</span></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        partList: [],
        currPart: null,
        appendOffsetTopFinished: false
      }
    },

    mounted() {
      setTimeout(() => {
        this.getPartList()

        document.addEventListener('scroll', this.scroll, false)
        this.scroll()
      }, 300)
    },

    methods: {
      /*
       * 用于提取生成右侧的导航栏所需要的数据
       * 页面中各部分的格式是固定的，统一使用part-wrapper组件进行展现
       * 详细规则见part-wrapper组件
      */
      getPartList() {
        let partElList = $('.part-wrapper', this.$el.parentNode)

        let partList = []

        for(let i=0; i<partElList.length; i++) {
          let formEl = partElList[i]

          let name = $('.title', formEl).html()
          let level = parseInt($(formEl).attr('level') || '1')

          if(name) partList.push({ name, level, el: formEl })
        }

        this.partList = partList
      },

      appendOffsetTop() {
        // 
        if(this.appendOffsetTopFinished || this.isNotInViewport(this.$el)) {
          return
        }

        this.partList.forEach((part) => {
          part.offsetTop = this.getOffsetTop(part.el)
        })

        this.appendOffsetTopFinished = true
      },

      scroll() {
        this.appendOffsetTop()

        this.partList.forEach((part) => {
          let scrollTop = window.pageYOffset || document.body.scrollTop
          if(scrollTop >= part.offsetTop - 60) {
            this.currPart = part
          }
        })
      },

      scrollTo(part) {
        if(part.el) {
          $('html, body').animate({
            scrollTop: $(part.el).offset().top - 25
          }, 300);
        }
      },

      getOffsetTop(el) {
        var top, clientTop, clientLeft, scrollTop, scrollLeft,
          doc = document.documentElement,
          body = document.body
        if (typeof el.getBoundingClientRect !== "undefined") {
          top = el.getBoundingClientRect().top
        } else {
          top = 0
        }
        clientTop = doc.clientTop || body.clientTop || 0
        scrollTop = window.pageYOffset || doc.scrollTop
        return (top + scrollTop - clientTop)
      },

      isNotInViewport(el) {
        if(!el.getBoundingClientRect) return true

        var { top, left, bottom, right } = el.getBoundingClientRect()
        var html = document.documentElement;

        return (
          top >= 0 &&
          left >= 0 &&
          bottom <= (window.innerHeight || html.clientHeight) &&
          right <= (window.innerWidth || html.clientWidth)
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .side-navbar {
    height: 100%;
    position: fixed;
    top: 20%;
    right: 50px;

    .inner {
      .nav-list {
        text-align: center;

        .nav-item {
          color: #48576a;
          padding: 5px;
          border-radius: 3px;
          text-decoration: none;
          cursor: pointer;
          text-align: left;
          display: list-item;
        }

        .nav-item.active {
          color: #20a0ff;
        }

        .nav-item:not(.active):hover {
          color: #20a0ff;
        }
      }

      .level-1 {

      }

      .level-2 {
        margin-left: 20px;
        color: #999;
      }

      .level-3 {
        margin-left: 40px;
        color: #999;
      }
    }
  }
</style>
