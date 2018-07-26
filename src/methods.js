'use strict'

export default {
  // 检测所有的输入项
  // 如果所有validate均通过，则返回true，否则返回false
  validateAll: function(form) {
    if($('.is-error').length > 0) {
      this.scrollToErr()
      return false
    }

    var allSuccess = true

    var once = function(children) {
      children.forEach(function(child) {
        // 首先检测是否指定了需要validate的form，同时检测当前元素是否在form内
        if(form && !form.contains(child.$el)) return

        // var label = child.$options.propsData ? child.$options.propsData.label : ''
        // if(label === '服务方式') console.log(child)

        var isRequired = child.required !== undefined && child.required !== false
        if((isRequired || child.validate) && child._validate) {
          var checkResult = child._validate()

          // 若无返回值，则默认为true，主要是针对交叉验证、关联验证以及异步验证
          if(checkResult === undefined) checkResult = true

          allSuccess = allSuccess && checkResult
        }

        if(child.$children) once(child.$children)
      })
    }

    once(this.$children)

    return allSuccess
  },

  // 滚动至第一个有错误提示的输入项
  scrollToErr: function() {
    // 考虑固定header的情况
    var fixedHeaderHeight = this.fixedHeaderHeight || 0

    setTimeout(function() {
      var errElList = $('.is-error')
      if(errElList && errElList.length > 0) {
        var firstEl = $(errElList[0])

        $('html, body').animate({
          scrollTop: firstEl.offset().top - 25 - fixedHeaderHeight
        }, 300);

        // 有时一个输入项中有多个input，比如包含append和prepend的输入项，这时候不好定位
        // 所以暂时先去掉自动定位
        // $('input', firstEl).focus()
      }
    }, 100)
  },

  /*
    将来自server端错误提示信息append到当前页面form的各输入项上
    对应规则是：
    server端发来的errors格式：
    {
      'path.to.attr': '针对该字段的错误提示信息'
    }
    前端根据path找到相应的输入项，然后将错误信息append到输入项张
  */
  appendErrors: function(errors, prePath) {
    prePath = prePath || 'main'

    var once = function(children) {
      children.forEach(function(child) {
        var modelAttr = child.$vnode.data.model
        var pathAttr = child.$vnode.data.attrs ? child.$vnode.data.attrs.path : null

        if(modelAttr || pathAttr) {
          // 首先读取path属性
          // 因为有些字段是放在其他组件里的，这时候model属性的内容与当前字段在data中的真实路径并不对应
          // 所以需要增加path属性来明确当前字段在data中的真实路径
          // 例如：Party组件里的所有字段
          var path1 = pathAttr ? pathAttr : modelAttr.expression

          for(var path in errors) {
            var str = prePath + '.' + path
            if(str === path1) {
              child.updateValidate('error', errors[path], true)
            }
          }
        }

        if(child.$children) once(child.$children)
      })
    }

    once(this.$children)

    this.scrollToErr()
  },

  // 该方法是widget通用的方法，用于在外部更新validate状态
  updateValidate: function(type, text, noDelay) {
    // 当因为其他属性值的变化，而需要同时执行validate和updateValidate的时候，
    // 需要先执行validate，然后再执行updateValidate
    // TODO 此处需要再根据实际需求仔细考虑
    var self = this
    var update = function() {
      self.feedback = { type: type, text: text }
      self.broc.$emit('validate')
    }

    if(noDelay === true) {
      update()
    } else {
      setTimeout(function() {
        update()
      }, 200)
    }
  },

  // back
  back: function() {
    this.$router.go(window.history.back())
  }
}
