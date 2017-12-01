import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createNavItems from '../util/createNavItems';
import pureUpdate from '../util/pure';

class PageNav extends Component {
  static propTypes = {
    offset: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
    minLevel: PropTypes.number,
    maxLevel: PropTypes.number,
    width: PropTypes.number,
    scrollBar: PropTypes.string,
    coverId: PropTypes.bool,
    fixed: PropTypes.bool,
    showOrderNumber: PropTypes.bool
  }
  static defaultProps = {
    offset: {
      top: 100,
      left: 30
    },
    minLevel: 2,
    maxLevel: 4,
    scrollBar: 'right',
    coverId: true,
    show: true,
    fixed: true,
    showOrderNumber: true
  }
  static contextTypes = {
    content: PropTypes.any
  }
  static childContextTypes = {
    scrollBar: PropTypes.string,
    activeAnchor: PropTypes.string,
    showOrderNumber: PropTypes.bool
  }
  constructor(props) {
    super(props);
    this.state = {
      anchors: []
    };
  }
  getChildContext() {
    const { scrollBar, fixed, showOrderNumber } = this.props;
    const { anchors, activeAnchor = fixed ? anchors[0] : '' } = this.state;
    return {
      scrollBar,
      activeAnchor,
      showOrderNumber
    };
  }
  shouldComponentUpdate = pureUpdate.bind(this);
  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.context.content !== nextContext.content) {
      this.handelContentMount(nextContext.content);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  setScrollListener(ref, anchors) {
    this.scrollWrap = ref;
    const elList = anchors.map(anchor => document.getElementById(anchor));
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    this.scrollListener = () => {
      let index = 0;
      elList.find((el, i) => {
        const position = el.getBoundingClientRect();
        index = i;
        return position.top > 100;
      });
      const nextAnchor = anchors[index - 1] || anchors[0];
      this.setState({
        activeAnchor: nextAnchor
      });
    };
    window.addEventListener('scroll', this.scrollListener);
  }

  // 遍历所有标题
  traverseTitle(node, titleList, anchors) {
    const type = node.tagName;
    const { coverId } = this.props;
    if (/^H[1-6]/.test(type)) {
      let r = `${Math.round(Math.random() * 10000)}`;
      let anchor = node.id;
      if (coverId || !anchor) {
        anchor = r;
        node.id = anchor;
      }

      let level = parseInt(type.replace('H', ''), 10);
      const { minLevel, maxLevel } = this.props;
      if (level >= minLevel && level <= maxLevel) {
        titleList.push({
          title: node.innerText,
          anchor,
          level
        });
        anchors.push(anchor);
      }
    } else {
      const { children } = node;
      for (let i = 0; i < children.length; i += 1) {
        this.traverseTitle(children[i], titleList, anchors);
      }
    }
  }

  handelContentMount(content) {
    const titleList = [];
    const anchors = [];
    const { children, minLevel, maxLevel, fixed } = this.props;
    if (!children) {
      this.traverseTitle(content, titleList, anchors);
      this.setState({
        anchors
      });
      const list = titleList.filter(item => item.level >= minLevel && item.level <= maxLevel);
      const navItems = createNavItems(list, 0);
      this.setState({
        navItems
      });
    } else {
      this.setState({
        navItems: this.renderNavItems()
      });
    }
    fixed && this.setScrollListener(content, anchors);
  }

  renderNavItems() {
    let anchors = [];
    const { children, scrollBar = 'left' } = this.props;
    const { activeAnchor } = this.state;
    const navItems = React.Children.map(children, (item, i) => {
      anchors.push(item.props.anchor);
      return React.cloneElement(item, {
        index: `${i + 1}`,
        level: 1,
        activeAnchor,
        scrollBar
      });
    });
    this.setState({
      anchors
    });
    return navItems;
  }

  render() {
    const { offset, width, fixed } = this.props;
    const { navItems } = this.state;
    return (
      <div
        className="page-nav"
        style={{
          width: fixed ? width || 250 : width || '100%',
          position: fixed ? 'fixed' : 'relative',
          ...(fixed && offset)
        }}
      >
        { navItems }
      </div>
    );
  }
}

export default PageNav;

