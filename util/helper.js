'use strict'

let helper = {
  // getRemoteApiHost() {
  //   let default = 'http://103.235.221.97:8080'
  // },
  //
  // getApiHost: function() {
  //   // return 'http://103.235.221.97:8080'
  //   // return 'http://192.168.199.177:8080'
  //
  //   let preHost = location.host.split('.')[0]
  //
  //   if(preHost === 'dev' || preHost === 'remote') {
  //     return 'http://103.235.221.97:8080'
  //   } else {
  //     return 'http://localhost:8080'
  //   }
  // },

  formatDate: function(date) {
    date = new Date(date);

    var str = date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2);

    return str;
  },

  formatFullDate: function(date) {
    date = new Date(date);

    var str = date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2) + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2) + ':' +
      ('0' + date.getSeconds()).slice(-2);

    return str;
  },

  formatMoney: function(val) {
    val = String(val)
    val = val.replace(/,/g, '')

    let decimalPart = val.split('.')[1]
    let numPart = val.split('.')[0]

    let newNumPart = _.chunk(numPart.split('').reverse(), 3).map((item) => {
      return item.join('')
    }).join(',').split('').reverse().join('')

    return `${newNumPart}${decimalPart ? ('.' + decimalPart) : ''}`
  },

  clearMoneyFormat: function(val) {
    let cleared = val.toString().replace(/,/g, '')
    return cleared ? parseFloat(cleared) : cleared
  },

  cookier: {
    getObj: function() {
      var obj = {};
      var pairList = document.cookie.split('; ');
      for(var i=0; i<pairList.length; i++) {
        var pair = pairList[i].split('=');
        obj[pair[0]] = pair[1];
      }

      return obj;
    },

    get: function(key) {
      return this.getObj()[key];
    },

    set: function(key, value) {
      document.cookie = key + '=' + value;
      return true;
    },

    del: function(key) {
      document.cookie = key + '=;';
      return true;
    }
  },

  convertCurrency: function(money) {
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money === '') { return ''; }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return '';
    }
    if (money === 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') === -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n === '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum !== '') {
      var decLen = decimalNum.length;
      for (let i = 0; i < decLen; i++) {
        let n = decimalNum.substr(i, 1);
        if (n !== '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr === '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === '') {
      chineseStr += cnInteger;
    }
    return chineseStr;
  },

  openDisplay(path) {
    window.open(location.origin + '/display.html?file=' + path, 'new window', 'width=960, height=1040, top=0, left=960')
  },

  openPdf(path) {
    window.open(location.origin + '/pdfviewer/web/viewer.html?file=' + path, 'new window', 'width=960, height=1040, top=0, left=960')
  },

  fitWidth(el, value) {
    let baseSize = 14
    // 之所以不直接从element中取值，是因为vue的赋值过程有一定的延迟。
    // 虽然可以通过setTimeout来解决，但总归不优雅，所以目前暂时使用
    // 参数进行传值的方式。
    // let value = $(el).val()

    let newSize = parseInt($(el).width()/value.length)
    if(newSize > baseSize) newSize = baseSize

    $(el).css('fontSize', newSize)
  },

  getPageCanvas(elId, cb) {
    // open all textarea
    $('textarea').each(function() {
      $(this).height($(this).prop('scrollHeight'));
    });

    window.scrollTo(0, 0)

    setTimeout(() => {
      html2canvas($(elId)[0], {
        background: '#fff',
        onrendered(canvas) {
          cb(canvas.toDataURL())
        }
      })
    }, 1000)
  },

  compactObj(obj) {
    let newObj = {}

    for(let key in obj) {
      if(obj[key]) {
        newObj[key] = obj[key]
      }
    }

    return newObj
  }
}

module.exports = helper
