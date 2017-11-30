import React, { PureComponent, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NavItem from './component/NavItem';
import createNavItems from './util/createNavItems';
import pureUpdate from './util/pure';

class PageNav extends Component {
  static propTypes = {
    content: PropTypes.node.isRequired,
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
    show: PropTypes.bool
  }
  static defaultProps = {
    offset: {
      top: 100,
      left: 30
    },
    minLevel: 2,
    maxLevel: 4,
    scrollBar: 'right',
    width: 250,
    coverId: true,
    show: true
  }
  static childContextTypes = {
    scrollBar: PropTypes.string,
    activeAnchor: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      anchors: []
    };
  }
  getChildContext() {
    const { scrollBar } = this.props;
    const { anchors, activeAnchor = anchors[0] } = this.state;
    return {
      scrollBar,
      activeAnchor
    };
  }
  shouldComponentUpdate = pureUpdate.bind(this);
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  setScrollListener(ref, anchors) {
    if (!this.scrollListener) {
      this.scrollWrap = ref;
      const elList = anchors.map(anchor => document.getElementById(anchor));
      this.scrollListener = () => {
        let index = 0;
        elList.find((el, i) => {
          const position = el.getBoundingClientRect();
          index = i;
          return position.top > 100;
        });
        const nextAnchor = anchors[index - 1] || anchors[0];
        // console.log(nextAnchor);
        this.setState({
          activeAnchor: nextAnchor
        });
      };
    }
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

  handelContentMount(ref) {
    if (!this.content) {
      this.content = ref;
      const content = ReactDOM.findDOMNode(ref);
      const titleList = [];
      const anchors = [];
      this.traverseTitle(content, titleList, anchors);
      // console.log(titleList);
      // console.log(anchors)
      this.setState({
        anchors
      });
      const { children, minLevel, maxLevel } = this.props;
      if (!children) {
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
      this.setScrollListener(ref, anchors);
    }
  }

  renderNavItems() {
    const { anchors } = this.state;
    const { children, scrollBar = 'left' } = this.props;
    const { activeAnchor = anchors[0] } = this.state;
    return React.Children.map(children, (item, i) => {
      return React.cloneElement(item, {
        index: `${i + 1}`,
        level: 1,
        activeAnchor,
        scrollBar
      });
    });
  }

  render() {
    const { offset, width, content, show } = this.props;
    const { navItems } = this.state;
    return (
      <div>
        <div ref={ref => this.handelContentMount(ref)}>
          { content }
        </div>
        <div
          className="float-nav"
          style={{
            ...offset,
            width,
            // height
          }}
        >
          { show && navItems }
        </div>
      </div>
    );
  }
}

PageNav.NavItem = NavItem;

export default PageNav;

