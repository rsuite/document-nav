import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Header, Navbar, Row, Col } from 'rsuite';
import { NavProvider, Content as PageContent, Nav } from '../src';
import Content from './component/content';
import './less/index.less'

class App extends Component {
  render() {
    return (
      <NavProvider>
        <Row>
          <Col md={5} xsHidden>
            <Nav
              width={150}
              showOrderNumber={false}
              // fixed={false}
            />
          </Col>
          <Col md={19}>
            <PageContent>
              <Content />
            </PageContent>
          </Col>
        </Row>
      </NavProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

