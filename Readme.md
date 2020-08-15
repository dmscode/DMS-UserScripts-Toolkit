DMS UserScripts Toolkit
===

GreasyMonkey 脚本工具类

因脚本中一些基础功能函数需要复用，所以写了这个小的工具库。为对用户安全负责，并符合 GreasyFork 审核规则，代码未作压缩，仅用 Parcel 简单过了一下，一方面是为了用 babel 转码，另一方为后期分文件书写不同类别功能做准备。**这导致代码中注释未能精确对应，使用方法请依照此说明**。

## 引入

GreasyFork 发布地址： https://greasyfork.org/zh-CN/scripts/408776

请依照说明，在脚本元数据部分引入对应的最新地址。此工具库仍在更新中，所以请注意保持更新。

## 初始化

```js
const DMSTookit = new DMS_UserScripts.Toolkit({GM_info, GM_getValue})
```

**参数：** 为一个对象，其中放入会用到的油猴 API。

**返回：** 没有返回值。

**输出：**

* 会在控制台输出当前工具库的名称+版本号徽章
* 如果在初始化时传入了 `GM_info` 接口，并可用，会输出当前脚本的名称+版本号徽章

## 属性

* `.version` 本库当前版本号
* `.GM` 传入的 API 会存入此对象以供使用
* `.is_debug` 是否开启 debug 模式

> **Debug 模式开启方法：** 手动为此脚本设置一个数据： `is_debug: 1`（在脚本设置页面中）。值可以任意，因为会当作字符串处理，所以不为空即为真。
>
> **注意：** 这需要 `GM_getValue` API 的支持

## 方法

### `.info` 输出信息

用 `console.info` 方法输出信息。如多条内容，则以折叠组的形式输出。主要为了便于 debug。

**参数：**

* { string } 信息来源标识
* { ...any } 要输出的内容，任意多个参数

**返回：** 没有返回值。

**输出：** 控制台信息输出

**示例：**

```js
DMSTookit.info('Demo', 'Some thing want to print to console.')  // 仅一项需输出内容
DMSTookit.info('Demo', 'Some thing want to print to console.', 'And more.')  // 多项输出内容
```

### `.dblog` 输出 debug 信息

用 `.info` 方法输出。但仅在 `.is_debug` 为真时输出。这样在发布版本时可不删除这些调试内容。

用法一切同上。

### `.badge` 输出徽章

除了好看也没什么特别的用途。

**参数：**

* { string } 徽章左侧文字
* { string } 徽章右侧文字
* { string } 徽章之后的附带说明
* { object } （可选）徽章样式对象，以下属性只写需要修改的就可以
  * leftBGColor 左侧文字背景色
  * leftColor 左侧文字颜色
  * rightBGColor 右侧文字背景色
  * rightColor 右侧文字颜色

**返回：** 没有返回值。

**输出：** 控制台输出一枚徽章

**演示：**

```js
DMSTookit.badge(
  'DMS UserScripts Toolkit',
  DMSTookit.version,
  'https://greasyfork.org/zh-CN/scripts/408776'
)
```