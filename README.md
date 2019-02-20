# Document Nav

Document navigation is automatically generated based on the HTML title (h1-h6) tag.

## Install

```
npm i @rsuite/document-nav --save
```

## Examples

```js
import { NavProvider, Content, Nav } from '@rsuite/document-nav';
import '@rsuite/document-nav/lib/less/index.less';

function render() {
  return (
    <NavProvider>
      <div className="row">
        <div className="col col-md-4">
          <Nav />
        </div>
        <div className="col col-md-20">
          <Content>{require('redeme.md')}</Content>
        </div>
      </div>
    </NavProvider>
  );
}
```

## Style

```less
@doc-nav-active-color: #34c3ff;
```

## Props

### `<Nav>`

| Name            | Type `(Default)`                | Description                                                                                                            |
| --------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| fixed           | boolean `(true)`                | 是否固定在屏幕的某一个位置？仅当为 `true` 时，`offset` 属性才会生效，为 `false` 时，导航菜单跟随文档流，也没有链接高亮 |
| offset          | object `({left: 30, top: 60})` | 定位，属性为 `top`, `right`, `bottom`, `left`                                                                          |
| width           | number `(250)`                  | 导航部分的宽。当 `fixed` 为 `true` 时，默认为 `250`， 为 `false` 时默认为 `100%`                                       |
| scrollBar       | string `('right')`              | 导航栏边上的滚动条位置，`left` 或 `right`                                                                              |
| minLevel        | number `(2)`                    | 最小导航级别，默认为 `2` 即 `h2`                                                                                       |
| maxLevel        | number `(4)`                    | 最大导航级别，默认为 `4` 即 `h4`                                                                                       |
| showOrderNumber | boolean `(true)`                | 是否显示标题前的序号                                                                                                   |
| once            | boolean `(true)`                | 只解析一次文档？设为`true`则只会解析一次，文档发生变化时不会重新解析，性能较好。                                       |

### `<Nav.Item>`

| Name     | Type `(Default)` | Description      |
| -------- | ---------------- | ---------------- |
| anchor   | string           | 对应的锚点 id    |
| title    | string           | 显示的标题       |
| children | node             | 可选，子导航菜单 |

## License

MIT licensed
