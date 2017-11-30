import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownloader';

const propTypes = {
  md: PropTypes.any
};

const defaultProps = {};

class CodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState((prevState) => {
      return {
        open: !prevState.open
      };
    });
  }

  render() {
    const { open } = this.state;
    const { md } = this.props;
    return (
      <div>
        <div className="doc-example-toolbar" >
          <button type="button" className="btn btn-xs btn-default" onClick={this.handleToggle}>
            <i className="icon icon-code" />
            <span>代码</span>
          </button>
        </div>
        {
          open &&
          <Markdown>
            {md}
          </Markdown>
        }
      </div>

    );
  }
}

CodeComponent.propTypes = propTypes;

CodeComponent.defaultProps = defaultProps;

export default CodeComponent;
