import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Header, Navbar, Grid, Row, Col } from 'rsuite';
import { NavProvider, Content as PageContent, Nav } from '../src';
import Content from './component/content';
import './less/index.less';

class App extends Component {
  render() {
    return (
      <NavProvider>
        <Grid>
          <Row>
            <Col md={6}>
              <Nav width={150} showOrderNumber={false} />
              {/* <Nav>
                <Nav.Item title="Title" />
                <Nav.Item title="Title2" />
              </Nav> */}
            </Col>
            <Col md={18}>
              <PageContent>
                <Content />
              </PageContent>
            </Col>
          </Row>
        </Grid>
      </NavProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
