// @flow
import * as React from 'react';
import NavContext from './NavContext';

type Props = {
  children: React.Node
};

type State = {
  content: ?HTMLElement
};

class NavProvider extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: null
    };
  }

  setContent = (content: HTMLElement) => {
    this.setState({
      content
    });
  };

  getContext() {
    return {
      content: this.state.content,
      setContent: this.setContent
    };
  }
  render() {
    return (
      <NavContext.Provider value={this.getContext()}>{this.props.children}</NavContext.Provider>
    );
  }
}

export default NavProvider;
