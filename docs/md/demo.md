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
              offset={{
                top: 100,
                left: 20
              }}
              width={130}
              startLevel={2}
              scrollBar="right"
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
