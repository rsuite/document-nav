# Document Nav

Document navigation is automatically generated based on the HTML title (h1-h6) tag.

## Install

```
npm i @rsuite/document-nav --save
```

## Examples

```js
import { Content, Nav } from '@rsuite/document-nav';
import '@rsuite/document-nav/lib/less/index.less';

function render() {
  return (
    <div className="row">
      <div className="col col-md-4">
        <Nav />
      </div>
      <div className="col col-md-20">
        <Content>{require('redeme.md')}</Content>
      </div>
    </div>
  );
}
```

## Style

```less
@import '@rsuite/document-nav/lib/less/index.less';
@doc-nav-active-color: #34c3ff;
```

## 使用方法

有**自动解析**和**手动设置**两种使用方式：

### 自动解析

只需按照如下结构组合代码，document-nav 会自动从 `Content` 中解析出所有的 `h` 标签，并生成导航菜单。

```
  <Nav />
  <Content>
    ...content
  </Content>
```

可以使用 `minLevel` 和 `maxLevel` 来限制导航的标题级别，如 `minLevel = 2` 且 `maxLevel = 4` 时，只有 `h2, h3, h4` 会被导航。

`once` 设置为文档**只解析一次**，用于文章结构不会改变的情况，避免比较解析造成的性能损耗。**如果文档结构会动态改变，请务必设为 `false`**

`deep` 设置为最大解析深度，通常标题所在的层级不会太深，如果文档 DOM 很复杂同时解析层级过深的话会大大影响性能。

**注意**

该方法使用标题作为锚点 ID，请尽量避免标题名称重复。

```js
import { Content, Nav } from '@rsuite/document-nav';
import '@rsuite/document-nav/lib/less/index.less';

function render() {
  return (
    <div className="row">
      <div className="col col-md-4">
        <Nav />
      </div>
      <div className="col col-md-20">
        <Content>{require('redeme.md')}</Content>
      </div>
    </div>
  );
}
```

### 手动设置

在 Nav 组件中通过 NavItem 组件设置导航。

```js
import { Content, Nav } from '@rsuite/document-nav';
import '@rsuite/document-nav/lib/less/index.less';

function render() {
  return (
    <div className="row">
      <div className="col col-md-4">
        <Nav>
          <Nav.Item anchor="h-3" title="二级标题---2">
              <Nav.Item anchor="h-3-1" title="三级标题">
            </Nav.Item>
            <Nav.Item anchor="h-4" title="二级标题---3" />
        </Nav>
      </div>
      <div className="col col-md-20">
        <Content>{require('redeme.md')}</Content>
      </div>
    </div>
  );
}
```

## Props

### `<Nav>`

| Name            | Type `(Default)`                   | Description                                                                                            |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| fixed           | boolean `(true)`                   | 是否固定在屏幕的某一个位置？仅当为 `true` 时，`offset` 属性才会生效，为 `false` 时，导航菜单跟随文档流 |
| offset          | object `({left: 'auto', top: 60})` | 定位，属性为 `top`, `right`, `bottom`, `left`                                                          |
| width           | number `(250)`                     | 导航部分的宽。当 `fixed` 为 `true` 时，默认为 `250`， 为 `false` 时默认为 `100%`                       |
| scrollBar       | string `('right')`                 | 导航栏边上的滚动条位置，`left` 或 `right`                                                              |
| minLevel        | number `(2)`                       | 最小导航级别，默认为 `2` 即 `h2`                                                                       |
| maxLevel        | number `(4)`                       | 最大导航级别，默认为 `4` 即 `h4`                                                                       |
| showOrderNumber | boolean `(true)`                   | 是否显示标题前的序号                                                                                   |
| once            | boolean `(true)`                   | 只解析一次文档？设为`true`则只会解析一次，文档发生变化时不会重新解析，性能较好。                       |
| rtl             | boolean `(false)`                  | 文档从右侧开始阅读                                                                                     |
| deep            | number `(10)`                      | 解析的 DOM 深度，避免和标题无关的 DOM 层级过深导致的性能损耗                                           |
| basePath        | string`('')`                       | 通过传入 basePath，来支持使用了 base 标签 的场景                                                       |

### `<Nav.Item>`

| Name     | Type `(Default)` | Description      |
| -------- | ---------------- | ---------------- |
| anchor   | string           | 对应的锚点 id    |
| title    | string           | 显示的标题       |
| children | node             | 可选，子导航菜单 |

## License

MIT licensed
