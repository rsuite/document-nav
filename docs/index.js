import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'markdownloader';
import { Header, Navbar, Nav, Row, Col } from 'rsuite';
import { PageProvider, PageContent, PageNav} from '../src';
import './less/index.less';
// import '../src/less/index.less';

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
        <PageProvider>
          <Row>
            <Col md={2} xsHidden smHidden>
              <PageNav
                width={150}
                showOrderNumber={false}
                // fixed={false}
              />
            </Col>
            <Col md={10}>
              <PageContent>
                {this.renderContent()}
              </PageContent>
            </Col>
          </Row>
        </PageProvider>
          
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
