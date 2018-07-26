'use strict'

// 内部使用，以及提供给进行通用验证模块的validate方法
// return value
// true: validate passed
// false: validate failed
export default function(emitType) {
  // console.log('execute validate', this.isEmpty())
  // 用于判断当前输入项是否包含验证逻辑
  var noValidate = emitType === 'change' ? true : false

  // first check if required
  if(typeof this.required !== 'undefined' && this.required !== false) {
    noValidate = false

    if(this.isEmpty()) {
      this.feedback = {
        type: 'error',
        text: this.label + (this.language === 'en' ? ' can not be empty' : '不能为空')
      }

      this.broc.$emit('validate')
      return false
    }
  }

  // sync validate
  if(this.validate) {
    noValidate = false

    // ['error', '验证说明']
    var result = this.validate()

    if(result) {
      var type = result[0]
      var text = result[1]

      if(type === 'error') {
        this.feedback = { type: type, text: text }
      } else {
        if(this.feedback && this.feedback.type === 'error') {
          this.feedback = { type: type, text: text }
        } else {
          this.feedback = null
        }
      }

      this.broc.$emit('validate')
      return type === 'success' ? true : false
    }
  }

  // async validate (send request to server)
  if(typeof this.asyncValidate !== 'undefined') {
    this.validating = true
    this.asyncValidate(function(type, text) {
      this.validating = false
      this.feedback = { type: type, text: text }
    })
  }

  // 如果当前输入项不包含验证逻辑，但是feedback有内容，说明feedback的内容是server端返回的
  // 所以需要在输入项内容发生变化后将feedback消除，以便能够正常提交
  if(noValidate && this.feedback) {
    this.feedback = null
    this.broc.$emit('validate')
  } else {
    if(this.feedback && this.feedback.type === 'error') {
      this.feedback = { type: 'success' }
    } else {
      this.feedback = null
    }

    this.broc.$emit('validate')
  }
}
