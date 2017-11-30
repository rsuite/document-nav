import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'markdownloader';
import { Header, Navbar, Nav, Row, Col } from 'rsuite';
import PageNav from '../src';
import './less/index.less';
import '../src/less/index.less';

const { NavItem } = PageNav;

class App extends Component {
  renderContent() {
    return (
      <div>
        <Markdown>
          { require('../README.md') }
        </Markdown>
        <br />
        <h2 id="API">
          <code>{'API'}</code>
        </h2>
        <Markdown>
          {require('./md/props.md')}
        </Markdown>
      </div>
    )
  }
  render() {
    return (
      <div className="doc-page">
        <Header inverse>
          <div className="container">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#"><span className="prefix">R</span>Suite Page Nav</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <Nav.Item href="#API">API</Nav.Item>
              </Nav>
              <Nav pullRight>
                <Nav.Item href="https://rsuite.github.io">RSuite</Nav.Item>
                <Nav.Item href="https://github.com/rsuite/rsuite-page-nav">GitHub</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Header>

        <div className="container">
          <Row>
            <Col md={2} xsHidden smHidden>
              
            </Col>
            <Col md={10}>
              <PageNav
                content={this.renderContent()}
                offset={{
                  top: 100,
                  left: 30
                }}
                width={150}
                startLevel={2}
                scrollBar="right"
              >
                {/* <NavItem anchor="examples" title="示例" />
                <NavItem anchor="relation" title="DEMO" />
                <NavItem anchor="API" title="API" >
                  <NavItem anchor="pagenav" title="PageNav" />
                  <NavItem anchor="navitem" title="NavItem" />
                </NavItem> */}
              </PageNav>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
