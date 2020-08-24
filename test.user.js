// ==UserScript==
// @name        DMS UserScripts Toolkit Tester
// @namespace   DMS UserScripts Toolkit Tester
// @match       *://*/*
// @version     0.0.1
// @author      稻米鼠
// @grant       GM_info
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_addValueChangeListener
// @grant       GM_removeValueChangeListener
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// @grant       GM_addStyle
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @grant       GM_download
// @created     2020/8/20 上午7:39:07
// @update      2020/8/20 上午7:39:07
// @require     http://127.0.0.1:8887/UserScript-Toolkit.user.js?static=1
// @description 
// ==/UserScript==

/* ====== 初始化工具对象 ====== */
// 输出类似如下效果
// DMS UserScripts Toolkit 0.0.2 https://script.izyx.xyz
// DMS UserScripts Toolkit Tester 0.0.1
// Constructor - No. of Apis = 2：
//  GM_info
//  GM_getValue
const DMSTookit = new DMS_UserScripts.Toolkit({
  GM_info,
  GM_getValue,
  GM_setValue,
  GM_deleteValue,
  GM_listValues,
  GM_registerMenuCommand,
  GM_unregisterMenuCommand,
})
/* ====== 信息输出测试 ====== */
DMSTookit.info('单一内容输出：', '会在同一行显示')
DMSTookit.info('多项内容输出：', '会输出一个折叠组', '默认状态下折叠显示')
/* ====== Debug 输出测试 ====== */
DMSTookit.dblog('仅在开启 debug 模式时输出：', DMSTookit.is_debug)
/* ====== 徽章输出测试 ====== */
// 在初始化时已经输出
/* ====== API 可用性测试 ====== */
// 私有方法，暂无法测试
/* ====== 数据读写测试 ====== */
DMSTookit.setGMData('test_data', {a: 1, b: 'lovely', c: [2, 3,4]} )
DMSTookit.setLocalData('test_data', {a: 1, b: 'lovely', c: [2, 3,4]} )
DMSTookit.setSessionData('test_data', {a: 1, b: 'lovely', c: [2, 3,4]} )
DMSTookit.info('listGMData', DMSTookit.listGMData())
DMSTookit.info('listLocalData', DMSTookit.listLocalData())
DMSTookit.info('listSessionData', DMSTookit.listSessionData())
DMSTookit.info('getGMData', DMSTookit.getGMData('test_data'))
DMSTookit.info('getLocalData', DMSTookit.getLocalData('test_data'))
DMSTookit.info('getSessionData', DMSTookit.getSessionData('test_data'))
DMSTookit.removeGMData('test_data')
DMSTookit.removeLocalData('test_data')
DMSTookit.removeSessionData('test_data')

const a_1 = DMSTookit.proxyGMData('test_data_1')
const a_2 = DMSTookit.proxyLocalData('test_data_1')
const a_3 = DMSTookit.proxySessionData('test_data_1')
const a_4 = DMSTookit.proxyDataAuto('test_data_x')
a_1.b = 6
a_2.b = 6
a_3.b = 6
a_4.b = 6
a_1.c = [1, 2]
a_2.c = [1, 2]
a_3.c = [1, 2]
a_4.c = [1, 2]
DMSTookit.info('proxyGMData', DMSTookit.getGMData('test_data_1'))
DMSTookit.info('proxyLocalData', DMSTookit.getLocalData('test_data_1'))
DMSTookit.info('proxySessionData', DMSTookit.getSessionData('test_data_1'))
DMSTookit.info('proxyDataAuto', a_4)
DMSTookit.info('proxyGMData', a_1.b)
DMSTookit.info('proxyLocalData', a_2.b)
DMSTookit.info('proxySessionData', a_3.b)
DMSTookit.info('proxyDataAuto', a_4.b)
DMSTookit.removeGMData('test_data_1')
DMSTookit.removeLocalData('test_data_1')
DMSTookit.removeSessionData('test_data_1')

const DMSTookit_1 = new DMS_UserScripts.Toolkit({
  GM_info,
})
const a = DMSTookit_1.proxyDataAuto('test_data_y')
a.b = 6
a.c = [1, 2]
DMSTookit_1.info('proxyDataAuto', a)
DMSTookit_1.info('proxyDataAuto', a.b)

const options = DMSTookit.proxyDataAuto('options')
DMSTookit.menuToggle(options, 'toggleMenuMark', '开启状态', '关闭状态', false)
DMSTookit.menuDebug()
DMSTookit.menuLink('更多脚本', 'https://script.izyx.xyz/')