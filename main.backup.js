/**
 * @file DMS UserScripts Toolkit
 *
 * @author 稻米鼠
 * @version 0.0.2
 */
/**
 * @classdesc GreasyMonkey 脚本工具类
 *
 * 因脚本中一些基础功能函数需要复用，所以写了这个小的工具库。为对用户安全负责，并符合 GreasyFork 审核规则，代码未作压缩，仅用 Parcel 简单过了一下，一方面是为了用 babel 转码，另一方为后期分文件书写不同类别功能做准备。**这导致代码中注释未能精确对应，使用方法请依照此说明**。
 *
 * @export
 * @class Toolkit
 */
export class Toolkit {
  /**
   * @summary 当前库的版本号
   * @name version
   * @memberof Toolkit
   */
  version = '0.0.2'
  /**
   * @summary 当前是否处于 debug 状态。
   * @description **Debug 模式开启方法：** 手动为此脚本设置一个数据： `is_debug: 1`（在脚本设置页面中）。值可以任意，因为会当作字符串处理，所以不为空即为真。
   *
   * **注意：** 这需要 `GM_getValue` API 的支持
   * @memberof Toolkit
   */
  is_debug = false; // debug 状态
  /**
   * @summary 引入方法
   * @description GreasyFork 发布地址： https://greasyfork.org/zh-CN/scripts/408776
   *
   * 请依照说明，在脚本元数据部分引入对应的最新地址。此工具库仍在更新中，所以请注意保持更新。
   *
   * * 会在控制台输出当前工具库的名称+版本号徽章
   * * 如果在初始化时传入了 `GM_info` 接口，并可用，会输出当前脚本的名称+版本号徽章
   * * 框架中页面不输出，避免重复输出
   * @constructor
   * @param {object} [GM={}] 其中放入会用到的 GreasyMonkey Api 对象
   * @example const DMSTookit = new DMS_UserScripts.Toolkit({GM_info, GM_getValue})
   * @memberof Toolkit
   */
  constructor(GM={}) {
    // 获取需要用到的 API
    for(const key in GM){
      this[key] = GM[key]
    }
    // 设定是否是开发状态
    this.is_debug =
      this.GM_getValue && this.GM_getValue('is_debug', false) ? true : false;
    // 输出版本标记
    if (self != top) return // 框架中页面不输出，避免重复
    this.badge('DMS UserScripts Toolkit', this.version, 'https://greasyfork.org/zh-CN/scripts/408776')
    if(this.GM_info && this.GM_info.script && this.GM_info.script.name && this.GM_info.script.version){
      this.badge(this.GM_info.script.name, this.GM_info.script.version, this.GM_info.script.description ? this.GM_info.script.description : '', { rightBGColor: '#71baeb' })
    }
  }
  /* ====== 输出相关 ====== */
  /**
   * @summary 日志输出
   * @description 用 `console.info` 方法输出信息。如多条内容，则以折叠组的形式输出。主要为了便于 debug。
   * @param {string} by 由信息来源标识
   * @param  {...any} args 输出内容，任意多个参数
   * @example
   * DMSTookit.info('Demo', 'Some thing want to print to console.')  // 仅一项需输出内容
   * DMSTookit.info('Demo', 'Some thing want to print to console.', 'And more.')  // 多项输出内容
   * @memberof Toolkit
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
   * @summary Debug 输出，仅开发时输出
   * @description 用 `.info` 方法输出。但仅在 `.is_debug` 为真时输出。这样在发布版本时可不删除这些调试内容。参数同 {@link Toolkit#info}
   * @param {string} by 由信息来源标识
   * @param  {...any} args 输出内容，任意多个参数
   * @memberof Toolkit
   */
  dblog(...args){
    if(this.is_debug){
      this.info.apply(this, args)
    }
  }
  /**
   * @summary 【私有】验证是否具有所需的 Api
   * @description 如无法获取此 API，且处于 debug 状态，则在控制台输出提示
   * @param {string} apiName API 的名称
   * @param {string} by='DMS_Toolkit' （可选）调用来源
   * @returns {boolean}
   * @memberof Toolkit
   * @private
   */
  #hasGMApi(apiName, by='DMS_Toolkit'){
    if(this[apiName]) return true
    this.dblog(by+' - 未能获取 '+apiName+' 接口', '* 请检查初始化时是否传入对应接口', '* 脚本元数据中是否声明对该接口的使用')
    return false
  }
  /**
   * @summary 徽章输出
   * @description 类似这种效果 ![](https://img.shields.io/badge/%E5%B7%A6%E4%BE%A7%E6%96%87%E5%AD%97-%E5%8F%B3%E4%BE%A7%E6%96%87%E5%AD%97-%23ffc107?style=flat&labelColor=555555)， 但并不一致。具体可在引用此库，并正确初始化后看控制台输出。其实除了好看也没什么特别的用途。
   * @param {string} leftText 徽章左侧文字
   * @param {string} rightText 徽章右侧文字
   * @param {string} endText 徽章后描述
   * @param {object} options={} 徽章配置项
   * * options.leftBGColor 左侧文字背景色
   * * options.leftColor 左侧文字颜色
   * * options.rightBGColor 右侧文字背景色
   * * options.rightColor 右侧文字颜色
   * @example
   * DMSTookit.badge(
   *   'DMS UserScripts Toolkit',
   *   DMSTookit.version,
   *   'https://greasyfork.org/zh-CN/scripts/408776'
   * )
   * @memberof Toolkit
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
      + (endText ? '%c - '+endText : ''),

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
  /* ====== 数据相关 ====== */
  /**
   * @summary 获取数据
   * @description 获取 localStorage 或者脚本存储的全局数据。当获取脚本存储数据时，需要如下 API：
   * * `GM_getValue` 【必须】读取脚本数据必须
   *
   * 提供如下语法糖：
   *
   * * `getLocalData` 认定 `is_Local` 参数为 `true`，并省略此参数
   * * `getGMData` 认定 `is_Local` 参数为 `false`，并省略此参数
   * @param {boolean} is_Local 是否 localStorage 数据，为否时则使用 GM_ 的全局数据
   * @param {string} storageName 存储数据的名称
   * @param {any} defaultValue 默认值
   * @param {string} prefix='' （可选）存储数据名称的前缀
   * @returns 读取到的数据，或默认值。如果没有这个数据，并且没有定义默认值，就会返回 `undefined`
   * @example
   * DMSTookit.getData(
   *   'true',
   *   'dataInLocalStorage',
   *   'Meow~',
   *   'DMSToolkit'
   * )
   * @memberof Toolkit
   */
  getData (is_Local, storageName, defaultValue, prefix='') {
    if(!is_Local && !this.#hasGMApi('GM_getValue', 'getGMData')) return false
    const getMethod = is_Local ? localStorage.getItem : this.GM_getValue
    storageName = prefix ? prefix+'_'+storageName : storageName
    if (!getMethod(storageName)) {
      return defaultValue;
    }
    return JSON.parse(String(getMethod(storageName)))
  }
  getLocalData (...args) {
    return this.getData.apply(this, [true].concat(args))
  }
  getGMData (...args) {
    return this.getData.apply(this, [false].concat(args))
  }
  /**
   * @summary 写入数据
   * @description 写入数据到 localStorage 或者脚本存储的全局数据。当写入脚本存储数据时，需要如下 API：
   * * `GM_setValue` 【必须】写入脚本数据必须
   *
   * 提供如下语法糖：
   *
   * * `setLocalData` 认定 `is_Local` 参数为 `true`，并省略此参数
   * * `setGMData` 认定 `is_Local` 参数为 `false`，并省略此参数
   * @param {boolean} is_Local 是否 localStorage 数据，为否时则使用 GM_ 的全局数据
   * @param {string} storageName 存储数据的名称
   * @param {any} data 要写入的数据
   * @param {string} prefix='' （可选）存储数据名称的前缀
   * @example
   * DMSTookit.setData(
   *   'true',
   *   'dataInLocalStorage',
   *   'Meow~',
   *   'DMSToolkit'
   * )
   * @memberof Toolkit
   */
  setData (is_Local, storageName, data, prefix='') {
    if(!is_Local && !this.#hasGMApi('GM_setValue', 'setGMData')) return
    const setMethod = is_Local ? localStorage.setItem : this.GM_setValue
    storageName = prefix ? prefix+'_'+storageName : storageName
    setMethod(storageName, JSON.stringify(data));
  }
  setLocalData (...args) {
    this.setData.apply(this, [true].concat(args))
  }
  setGMData (...args) {
    this.setData.apply(this, [false].concat(args))
  }
  /**
   * @summary 移除数据
   * @description 移除 localStorage 或者脚本存储的全局数据中的指定数据。当移除脚本存储数据时，需要如下 API：
   * * `GM_deleteValue` 【必须】移除脚本数据必须
   *
   * 提供如下语法糖：
   *
   * * `removeLocalData` 认定 `is_Local` 参数为 `true`，并省略此参数
   * * `removeGMData` 认定 `is_Local` 参数为 `false`，并省略此参数
   * @param {boolean} is_Local 是否 localStorage 数据，为否时则使用 GM_ 的全局数据
   * @param {string} storageName 存储数据的名称
   * @param {string} prefix='' （可选）字段名称
   * @example
   * DMSTookit.removeData(
   *   'true',
   *   'dataInLocalStorage',
   *   'DMSToolkit'
   * )
   * @memberof Toolkit
   */
  removeData (is_Local, storageName, prefix='') {
    if(!this.#hasGMApi('GM_deleteValue', 'removeGMData')) return
    const removeMethod = is_Local ? localStorage.removeItem : this.GM_deleteValue
    storageName = prefix ? prefix+'_'+storageName : storageName
    removeMethod(storageName)
  }
  removeLocalData (...arg) {
    this.removeData.apply(this, [true].concat(args))
  }
  removeGMData (...arg) {
    this.removeData.apply(this, [false].concat(args))
  }
  /**
   * @summary 监控一个数据对象的变化，并对变化进行存储
   * @description 让一些数据对象的变化事件变得简单，直接和存贮中的数据联动，而无需再次获取和写入。需要如下 API：
   *
   * * `GM_getValue` 【必须】读取脚本数据必须
   * * `GM_setValue` 【必须】写入脚本数据必须
   *
   * 提供如下语法糖：
   *
   * * `watchLocalData` 认定 `is_Local` 参数为 `true`，并省略此参数
   * * `watchGMData` 认定 `is_Local` 参数为 `false`，并省略此参数
   * @param {boolean} is_local 是否 localStorage 数据，为否时则使用 GM_ 的全局数据
   * @param {string} storageName 存储数据的名称
   * @param {string} prefix='' （可选）字段名称
   * @param {boolean} is_cache=true （可选）是否使用本地缓存，一般使用缓存就够用。如果不用缓存，每次获取数据都重新在存储中读取，性能会低一些。
   * @returns 返回数据代理对象，直接操作此对象，存储中的数据会相应变化
   * @example
   * const theData = DMSTookit.watchDate(
   *   'true',
   *   'dataInLocalStorage',
   *   'DMSToolkit'
   * )
   */
  watchDate (is_local, storageName, prefix='', is_cache=true) {
    const data = this.getData (is_Local, storageName, {}, prefix='')
    if(!data instanceof Object) {
      this.dblog('watchDate', '被监控数据必须是一个对象')
      return
    }
    return new Proxy(data, {
      get: (target, property, receiver)=>{
        if(is_cache) return data[property]
        return (this.getData (is_Local, storageName, {}, prefix=''))[property]
      },
      set: (target, property, value, receiver)=>{
        data[property] = value
        this.setData (is_Local, storageName, data, prefix='')
      }
    })
  }
  watchLocalDate (...args) {
    return this.watchDate.apply(this, [true].concat(args))
  }
  watchGMDate (...args) {
    return this.watchDate.apply(this, [false].concat(args))
  }
  /* ====== 菜单相关 ====== */
  /**
   * @summary 注册一个链接菜单
   * @description 需要如下 API：
   * * `GM_registerMenuCommand` 【必须】否则无法注册脚本菜单
   * * `GM_openInTab` 【可选】可以更稳定的在新窗口打开链接
   * @param {string} name 菜单的名称
   * @param {url} url 链接地址，含协议部分（`http://`，`https://`），否则可能按相对地址处理
   * @example DMSTookit.menuLink('更多脚本', 'https://script.izyx.xyz/')
   * @memberof Toolkit
   */
  menuLink (name, url){
    if(!this.#hasGMApi('GM_registerMenuCommand', 'menuLink')) return
    GM_registerMenuCommand(name, ()=>{
      if(this.#hasGMApi('GM_openInTab', 'menuLink')){
        GM_openInTab(url)
        return
      }
      window.open(url, '_blank')
    })
  }
  /**
   * @summary 注册一个切换菜单
   * @description 因为不同管理器下菜单的反注册方式不太一样，所以最稳妥的方法是切换后刷新页面。如果不刷新页面，会用两种方法尝试反注册菜单。需要如下 API：
     * * `GM_registerMenuCommand` 【必须】否则无法注册脚本菜单
   * @param {string} mark 标记名称
   * @param {string} onName 启用状态菜单文字
   * @param {string} offName 禁用状态菜单文字
   * @param {boolean} reload 是否需要刷新页面，默认为是
   * @returns 当前启用/禁用状态
   * @memberof Toolkit
   */
  toggleMenu (mark, onName, offName, reload=true){
    if(!this.#hasGMApi('GM_registerMenuCommand', 'toggleMenu')) return
    const nowMark = mark.key
    if(localStorage.getItem(markName)){
      // 【Menu】菜单启用状态
      GM_registerMenuCommand(onName, ()=>{
        localStorage.removeItem(markName)
        if(reload) window.location.reload(1)
      })
      return true
    }
    // 【Menu】菜单禁用状态
    GM_registerMenuCommand(offName, ()=>{
      localStorage.setItem(markName, true)
      if(reload) window.location.reload(1)
    })
    return false
  }
}
