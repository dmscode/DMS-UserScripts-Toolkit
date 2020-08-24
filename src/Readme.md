DMS UserScripts Toolkit
===

![](https://img.shields.io/badge/Version-```version```-blue?style=for-the-badge)

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
* 框架中页面不输出，避免重复输出

## 注意！！！

目前本工具库仅作者个人使用，随时发生变更，不提供任何保证