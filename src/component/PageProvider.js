// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from '../util/shallowCompare';

type Props = {
  children: React.Node
}

type State = {
  content: ?HTMLElement
}

class PageProvider extends React.Component<Props, State> {
  static childContextTypes = {
    content: PropTypes.any,
    setContent: PropTypes.func,
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      content: null,
    };
  }
  getChildContext() {
    return {
      ...this.state,
      setContent: this.setContent
    };
  }
  shouldComponentUpdate = shallowCompare.bind(this);
  setContent = (content: HTMLElement) => {
    this.setState({
      content
    });
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>
    );
  }
}

export default PageProvider;
