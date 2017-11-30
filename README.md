# rsuite-page-nav

简单易用的文章导航组件

[![npm](https://img.shields.io/npm/v/rsuite-page-nav.svg)](https://www.npmjs.com/package/rsuite-page-nav)

[![Coverage Status](https://coveralls.io/repos/github/rsuite/rsuite-page-nav/badge.svg?branch=master)](https://coveralls.io/github/rsuite/rsuite-page-nav?branch=master)

## 示例

👈 左边那个就是

## 使用方法

有两种使用方式：

### 傻瓜式

只需传入 `content`，rsuite-page-nav 会自动从 `content` 中解析出所有的 `h` 标签，并生成导航。

可以使用 `minLevel` 和 `maxLevel` 来限制导航的标题级别，如 `minLevel = 2` 且 `maxLevel = 4` 时，只有 `h2, h3, h4` 会被导航。

#### DEMO

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'markdownloader';
import PageNav from '../src';

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
      <div className="doc-page">
        <PageNav
          content={this.renderContent()}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
```

**注意** 

该方法会对 `content` 中的每一个要导航的 `h` 标签添加一个随机 `id`，并覆盖原有的 `id`。所以如果有需要为某个 `h` 标签使用自定义的 `id`，则需要将 `coverId` 属性设置为 `false`，但此时如果多个 `h` 标签本身已拥有重复的 `id` 则会出现错误的导航，应尽量避免，如撰写本文的使用的 `markdownloader` 组件就会将每一个标题添加一个 `'-'` 的 `id`，必须予以覆盖才能正确导航，如果无法避免，则只能使用下面的手动设置的方式。

### 手动设置

在 PageNav 组件中通过 NavItem 组件设置导航。

#### DEMO

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageNav from '../src';

const { NavItem } = PageNav;

class App extends Component {
  renderContent() {
    return (
      <div>
        <h1 id="h-1">一级标题</h1>
        <h2 id="h-2">二级标题---1</h2>
        <div>第一段</div>
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
      <div className="container">
        <Row>
          <Col md={2} xsHidden smHidden>
            
          </Col>
          <Col md={10}>
            <PageNav
              content={this.renderContent()}
            >
              <NavItem anchor="h-2" title="二级标题---1" />
              <NavItem anchor="h-3" title="二级标题---2">
                <NavItem anchor="h-3-1" title="三级标题">
              </NavItem>
              <NavItem anchor="h-4" title="二级标题---3" />
            </PageNav>
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);



```

