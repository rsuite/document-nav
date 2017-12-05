## 使用方法

有**自动解析**和**手动设置**两种使用方式：

### 自动解析

只需按照如下结构组合代码，rsuite-page-nav 会自动从 `PageContent` 中解析出所有的 `h` 标签，并生成导航菜单。

`PageProvider` 负责 `PageContent` 与 `PageNav` 的协作，需放在外层，中间可以任意布局。

```
<PageProvider>
  <PageNav />
  <PageContent>
    ...content
  </PageContent>
</PageProvider>
```

可以使用 `minLevel` 和 `maxLevel` 来限制导航的标题级别，如 `minLevel = 2` 且 `maxLevel = 4` 时，只有 `h2, h3, h4` 会被导航。



**注意** 

该方法使用标题作为锚点 ID，请尽量避免标题名称重复。

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'markdownloader';
import { PageProvider, PageContent, PageNav} from 'rsuite-page-nav';

class App extends Component {
  renderContent() {
    return (
      <Markdown>
        { require('../README.md') }
      </Markdown>
    )
  }
  render() {
    return (
      <PageProvider>
        <Row>
          <Col md={2} xsHidden smHidden>
            <PageNav
              width={150}
            />
          </Col>
          <Col md={10}>
            <PageContent>
              {this.renderContent()}
            </PageContent>
          </Col>
        </Row>
      </PageProvider>
    );
  }
}

```

### 手动设置

在 PageNav 组件中通过 NavItem 组件设置导航。

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PageProvider, PageContent, PageNav, NavItem } from 'rsuite-page-nav';

class App extends Component {
  renderContent() {
    return (
      <div>
        <h2 id="h-3">二级标题---2</h2>
        <div>第二段</div>
        <h3 id="h-3-1">三级标题</h3>
        <div>第三段</div>
        <h2 id="h-4">二级标题---3</h2>
        <div>第四段</div>
      </div>
    )
  }
  render() {
    return (
      <PageProvider>
        <Row>
          <Col md={2} xsHidden smHidden>
            <PageNav
              width={150}
            >
              <NavItem anchor="h-3" title="二级标题---2">
                <NavItem anchor="h-3-1" title="三级标题">
              </NavItem>
              <NavItem anchor="h-4" title="二级标题---3" />
            </PageNav>
          </Col>
          <Col md={10}>
            <PageContent>
              {this.renderContent()}
            </PageContent>
          </Col>
        </Row>
      </PageProvider>
    );
  }
}
```