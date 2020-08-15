/**
 * GreasyMonkey 脚本工具类
 * @description 因脚本中一些基础功能函数需要复用，所以写了这个小的工具库。为对用户安全负责，并符合 GreasyFork 审核规则，代码未作压缩，仅用 Parcel 简单过了一下，一方面是为了用 babel 转码，另一方为后期分文件书写不同类别功能做准备。
 * @author 稻米鼠
 * @version 0.0.1
 */
class DMS_Toolkit {
  GM = {};  // GreasyMonkey Api 对象
  is_debug = false; // debug 状态
  /**
   * Tag: 构造函数
   * @param {*} GM GreasyMonkey Api 对象
   */
  constructor(GM={}) {
    // 获取需要用到的 API
    for(const key in GM){
      this[key] = GM[key]
    }
    // 设定是否是开发状态
    this.is_debug =
      this.GM_getValue && this.GM_getValue('is_debug', false) ? true : false;
  }
  /**
   * Tag: 日志输出
   * @param {*} by 由谁输出
   * @param  {...any} args 输出内容
   */
  info(by, ...args){
    if(args.length > 1){
      console.groupCollapsed(by+'： ')
      for(const arg of args){
        console.info(arg)
      }
      console.groupEnd()
    }else if(args.length === 1){
      console.info(by+'： ', args[0])
    }
  }
  /**
   * Debug 输出，仅开发时输出
   * @param  {...any} args 参数同上
   */
  dblog(...args){
    if(this.is_debug){
      this.info.apply(this, args)
    }
  }
  /**
   * Tag: 徽章输出
   * @param {*} leftText 徽章左侧文字
   * @param {*} rightText 徽章右侧文字
   * @param {*} endText 徽章后描述
   * @param {*} options 徽章配置项
   */
  badge (leftText, rightText, endText, options={}) {
    const opt = Object.assign({
      type: 'log',
      leftBGColor: '#555555',
      leftColor: '#ededed',
      rightBGColor: '#ffc107',
      rightColor: '#262318',
    }, options)
    console[opt.type](
      '%c'+leftText+'%c'+rightText
      + endText ? '%c - '+endText : '',
      'color: '+opt.leftColor+'; '
      +'background-color: '+opt.leftBGColor+'; '
      +'border-radius: 3px 0 0 3px;'
      +'padding: 0 5px',
      'color: '+opt.rightColor+'; '
      +'background-color: '+opt.rightBGColor+'; '
      +'border-radius: 0 3px 3px 0;'
      +'padding: 0 5px;',
      '',
    )
  }
}
