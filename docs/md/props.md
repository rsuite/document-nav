### PageNav

Name | Type | Default | Description |
---- | ---- | ------- | ----------- |
content | node |  | 要展示的文章
offset | object | `{left: 30, top: 100}` | 定位，属性为 `top`, `right`, `bottom`, `left`
width | number | `250` | 导航部分的宽
scrollBar | string | `right` | 导航栏边上的滚动条位置，`left` 或 `right`
coverId | boolean | `true` | 是否使用随机 id 覆盖原有的 id
children | node |  | 导航菜单


### NavItem

Name | Type | Default | Description |
---- | ---- | ------- | ----------- |
anchor | string |  | 对应的锚点 id
title | string |  | 显示的标题
children | node |  | 可选，子导航菜单

