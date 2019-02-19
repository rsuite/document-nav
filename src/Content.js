// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from './utils/shallowCompare';
import NavContext from './NavContext';

type Props = {
  children: React.Node,
};

class Content extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <NavContext.Consumer>
        {context => <div ref={ref => context.setContent(ref)}>{children}</div>}
      </NavContext.Consumer>
    );
  }
}

export default Content;
