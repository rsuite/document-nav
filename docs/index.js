import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PageContainer } from 'rsuite-docs';
import Content from './component/content';
import './less/index.dev.less';

class App extends Component {
  render() {
    return (
      <PageContainer
        activeKey="PageNav"
        githubURL="https://github.com/rsuite/rsuite-page-nav"
      >
        <Content />
      </PageContainer>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);

