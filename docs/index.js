import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Header, Navbar, Grid, Row, Col, Button } from 'rsuite';
import { NavProvider, Content as PageContent, Nav } from '../src';
import Content from './component/content';
import './less/index.less';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rtl: false
    };
  }
  toggleRtl = () => {
    this.setState({
      rtl: !this.state.rtl
    });
  };
  render() {
    return (
      <NavProvider>
        <Grid>
          <Button onClick={this.toggleRtl}>切换 rtl</Button>
          <Row>
            <Col md={6}>
              <Nav
                width={150}
                showOrderNumber={false}
                rtl={this.state.rtl}
                // offset={{
                //   [this.state.rtl ? 'left' : 'right']: 10,
                //   top: 50
                // }}
                scrollBar="left"
                deep={3}
              />
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
