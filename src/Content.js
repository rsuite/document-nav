// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from './utils/shallowCompare';

type Props = {
  children: React.Node
};

class Content extends React.Component<Props> {
  static contextTypes = {
    setContent: PropTypes.func
  };
  shouldComponentUpdate = shallowCompare.bind(null, this);
  render() {
    const { children } = this.props;
    const { setContent } = this.context;
    return <div ref={ref => setContent(ref)}>{children}</div>;
  }
}

export default Content;
