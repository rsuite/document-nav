// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import createNavItems from '../util/createNavItems';
import NavItem from './NavItem';
import shallowCompare from '../util/shallowCompare';
import { itemHeight } from '../constants';
import throttle from '../util/throttle';

type Props = {
  offset: {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number
  },
  minLevel: number,
  maxLevel: number,
  width?: number,
  scrollBar: 'left' | 'right',
  fixed: boolean,
  showOrderNumber: boolean,
  once: boolean,
  children?: React.Element<typeof NavItem>
}

type State = {
  anchors: Array<string>,
  activeAnchor?: string,
  navItems?: React.Node
}

type TitleList = Array<{
  title: string,
  anchor: string,
  level: number
}>

class PageNav extends React.Component<Props, State> {
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
    showOrderNumber: true,
    once: true
  }
  static contextTypes = {
    content: PropTypes.any
  }
  static childContextTypes = {
    scrollBar: PropTypes.string,
    activeAnchor: PropTypes.string,
    showOrderNumber: PropTypes.bool
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      anchors: []
    };
  }
  scrollListener: ?any;
  resizeListener: ?any;
  scrollWrap: ?HTMLElement;
  pageNav: ?HTMLElement;
  getChildContext() {
    const { scrollBar, fixed, showOrderNumber } = this.props;
    const { anchors, activeAnchor = fixed ? anchors[0] : '' } = this.state;
    return {
      scrollBar,
      activeAnchor,
      showOrderNumber
    };
  }
  shouldComponentUpdate = shallowCompare.bind(null, this);
  componentWillUpdate(nextProps: Props, nextState: State, nextContext: any) {
    const { once } = this.props;
    if (once && !this.context.content && nextContext.content) {
      this.handelContentMount(nextContext.content);
    } else if (!once && this.context.content !== nextContext.content) {
      this.handelContentMount(nextContext.content);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.resizeListener);
  }

  setScrollListener(ref: HTMLElement, anchors: Array<string>) {
    this.scrollWrap = ref;
    const elList = anchors.map(anchor => document.getElementById(anchor));
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    this.scrollListener = () => {
      let index = 0;
      const { activeAnchor } = this.state;
      elList.find((el, i) => {
        if (!el) {
          return false;
        }
        const position = el.getBoundingClientRect();
        index = i;
        return position.top > 100;
      });
      const nextAnchor = anchors[index - 1] || anchors[0];
      if (nextAnchor !== activeAnchor) {
        this.setState({
          activeAnchor: nextAnchor
        });
        const nav = document.querySelector(`a[href='#${nextAnchor}']`);
        const pageNav = this.pageNav;
        if (nav && pageNav) {
          const navTop = nav.getBoundingClientRect().top - pageNav.getBoundingClientRect().top;
          const maxCount = parseInt(pageNav.clientHeight / nav.offsetHeight, 10);
          if (navTop + (itemHeight * 2) > pageNav.clientHeight) {
            pageNav.scrollTop = pageNav.scrollTop + ((maxCount - 1) * itemHeight);
          }
          if (navTop < 2 * itemHeight) {
            pageNav.scrollTop = pageNav.scrollTop - ((maxCount - 1) * itemHeight);
          }
        }
      }
    };
    window.addEventListener('scroll', throttle(this.scrollListener, 150));
  }

  // 遍历所有标题
  traverseTitle(node: HTMLElement, titleList: TitleList, anchors: Array<string>) {
    if (!node || !titleList || !anchors) {
      return false;
    }
    const type = node.tagName;
    // const { coverId } = this.props;
    if (/^H[1-6]/.test(type)) {
      const title = node.innerText || '';
      node.id = title;

      let level = parseInt(type.replace('H', ''), 10);
      const { minLevel, maxLevel } = this.props;
      if (level >= minLevel && level <= maxLevel) {
        titleList.push({
          title,
          anchor: title,
          level
        });
        anchors.push(title);
      }
    } else {
      const { children } = node;
      for (let i = 0; i < children.length; i += 1) {
        this.traverseTitle(children[i], titleList, anchors);
      }
    }
  }

  handelContentMount(content: HTMLElement) {
    const titleList: TitleList = [];
    const anchors: Array<string> = [];
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

  handelNavMount(nav: HTMLDivElement): any {
    if (!nav) {
      return false;
    }
    this.pageNav = nav;
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    const resizeListener = () => {
      const pageNav = this.pageNav;
      if (pageNav) {
        pageNav.style.height = `${itemHeight * parseInt((innerHeight - pageNav.offsetTop) / itemHeight, 10)}px`;
      }
    };
    window.addEventListener('resize', resizeListener);
    this.resizeListener = resizeListener;
    resizeListener();
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
        scrollBar,
        key: `${i + 1} ${item.props.anchor}`
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
          ...(fixed ? offset : {})
        }}
        ref={ref => this.handelNavMount(ref)}
      >
        { navItems }
      </div>
    );
  }
}

export default PageNav;

