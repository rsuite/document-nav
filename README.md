# rsuite-page-nav

简单易用的文章导航组件

**版本与状态**

[![npm](https://img.shields.io/npm/v/rsuite-page-nav.svg)](https://www.npmjs.com/package/rsuite-page-nav)

[![Coverage Status](https://coveralls.io/repos/github/rsuite/rsuite-page-nav/badge.svg?branch=master)](https://coveralls.io/github/rsuite/rsuite-page-nav?branch=master)

## 快速开始

### 安装

```
npm i rsuite-page-nav --save
```

或

```
yarn add rsuite-page-nav
```

### 样式

在 `less` 文件中引入

```
@import '~rsuite-page-nav/lib/less/index.less';
```

### 示例

```js
import PageNav from 'rsuite-page-nav';

<PageProvider>
  <PageNav/>
  <PageContent>
    ...content
  </PageContent>
</PageProvider>
```