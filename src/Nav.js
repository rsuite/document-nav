// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import createNavItems from './utils/createNavItems';
import NavItem from './NavItem';
import { itemHeight } from './constants';
import throttle from './utils/throttle';
import NavContext, { NavItemContext } from './NavContext';

type Props = {
  offset: {
    top?: number | 'auto',
    right?: number | 'auto',
    bottom?: number | 'auto',
    left?: number | 'auto'
  },
  minLevel: number,
  maxLevel: number,
  width?: number,
  scrollBar: 'left' | 'right',
  fixed: boolean | 'vertical',
  showOrderNumber: boolean,
  once: boolean,
  children?: React.Element<typeof NavItem>,
  scrollBar: string,
  activeAnchor: string,
  showOrderNumber: boolean,
  rtl: boolean
};

type State = {
  anchors: Array<string>,
  activeAnchor?: string,
  navItems?: React.Node
};

type TitleList = Array<{
  title: string,
  anchor: string,
  level: number
}>;

class Component extends React.PureComponent<Props, State> {
  static defaultProps = {
    offset: {
      top: 60,
      left: 'auto'
    },
    minLevel: 2,
    maxLevel: 4,
    scrollBar: 'right',
    show: true,
    fixed: true,
    showOrderNumber: true,
    once: true,
    rtl: false
  };

  static Item = NavItem;

  constructor(props: Props) {
    super(props);
    this.state = {
      anchors: []
    };
    this.reload = throttle((content = this.props.content, rtl = this.props.rtl) => {
      this.handelContentMount(content, rtl);
    }, 200);
    this.reload();
  }
  scrollListener: ?any;
  resizeListener: ?any;
  scrollWrap: ?HTMLElement;
  pageNav: ?HTMLElement;
  prevInnerHTML: ?string;

  getContext() {
    const { scrollBar, fixed, showOrderNumber } = this.props;
    const { anchors, activeAnchor = fixed ? anchors[0] : '' } = this.state;
    return {
      scrollBar,
      activeAnchor,
      showOrderNumber
    };
  }
  componentWillUpdate(nextProps: Props, nextState: State) {
    const { once, rtl } = this.props;
    if (rtl !== nextProps.rtl) {
      this.reload(nextProps.content, nextProps.rtl);
      return;
    }
    if (once && !this.props.content && nextProps.content) {
      this.handelContentMount(nextProps.content, nextProps.rtl);
      return;
    }
    if (!once) {
      if (this.props.content !== nextProps.content) {
        this.reload(nextProps.content, nextProps.rtl);
        return;
      }
      if (nextProps.content && this.prevInnerHTML !== nextProps.content.innerHTML) {
        this.reload(nextProps.content, nextProps.rtl);
        return;
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.resizeListener);
    this.pageNav = null;
  }

  setScrollListener(ref: HTMLElement, anchors: Array<string>) {
    this.scrollWrap = ref;
    const elList = anchors.map(anchor => document.getElementById(anchor));
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    this.scrollListener = throttle(() => {
      let index = 0;
      const { activeAnchor } = this.state;
      elList.find((el, i) => {
        if (!el) {
          return false;
        }
        const position = el.getBoundingClientRect();
        index = i;
        return position.top > 0;
      });
      const nextAnchor = anchors[index - 1] || anchors[0];
      if (nextAnchor !== activeAnchor && this.pageNav) {
        this.setState({
          activeAnchor: nextAnchor
        });
        const nav = document.querySelector(`a[href='#${nextAnchor}']`);
        const pageNav = this.pageNav;
        if (nav && pageNav) {
          const navTop = nav.getBoundingClientRect().top - pageNav.getBoundingClientRect().top;
          const maxCount = parseInt(pageNav.clientHeight / nav.offsetHeight, 10);
          if (navTop + itemHeight * 2 > pageNav.clientHeight) {
            pageNav.scrollTop = pageNav.scrollTop + (maxCount - 1) * itemHeight;
          }
          if (navTop < 2 * itemHeight) {
            pageNav.scrollTop = pageNav.scrollTop - (maxCount - 1) * itemHeight;
          }
        }
      }
    }, 300);
    window.addEventListener('scroll',this.scrollListener);
  }

  // 遍历所有标题
  traverseTitle(node: HTMLElement, titleList: TitleList, anchors: Array<string>) {
    if (!node || !titleList || !anchors) {
      return false;
    }
    const type = node.tagName;
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

  getNavItems() {
    let anchors = [];
    const { children, scrollBar = 'left', rtl } = this.props;
    const { activeAnchor } = this.state;
    const navItems = React.Children.map(children, (item, i) => {
      anchors.push(item.props.anchor);
      return React.cloneElement(item, {
        index: `${i + 1}`,
        level: 1,
        activeAnchor,
        scrollBar,
        key: `${i + 1} ${item.props.anchor}`,
        rtl
      });
    });
    this.setState({
      anchors
    });

    return navItems;
  }

  handelContentMount(content: HTMLElement, rtl) {
    if (content) {
      this.prevInnerHTML = content.innerHTML;
    }
    const titleList: TitleList = [];
    const anchors: Array<string> = [];
    const { children, minLevel, maxLevel, fixed } = this.props;
    if (!children) {
      this.traverseTitle(content, titleList, anchors);
      this.setState({
        anchors
      });
      const list = titleList.filter(item => item.level >= minLevel && item.level <= maxLevel);
      const navItems = createNavItems(list, 0, undefined, rtl);
      this.setState({
        navItems
      });
    } else {
      this.setState({
        navItems: this.getNavItems()
      });
    }
    this.setScrollListener(content, anchors);
  }

  bindPageNavRef(nav: React.Ref<any>): any {
    if (!nav) {
      return false;
    }
    const { offset } = this.props;

    this.pageNav = nav;

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    const resizeListener = () => {
      const pageNav = this.pageNav;
      if (pageNav) {
        pageNav.style.height = `${itemHeight *
          parseInt((window.innerHeight - (offset.top || offset.bottom) - 60) / itemHeight, 10)}px`;
      }
    };

    window.addEventListener('resize', resizeListener);
    this.resizeListener = resizeListener;

    resizeListener();
  }

  render() {
    const { offset, width, fixed, style, className } = this.props;
    const { navItems } = this.state;
    const styles = {
      width: fixed ? width || 250 : width || '100%',
      position: fixed ? 'fixed' : 'relative',
      ...(fixed ? offset : {})
    };
    return (
      <NavItemContext.Provider value={this.getContext()}>
        <div
          className={classnames('document-nav', className)}
          style={{ ...styles, ...style }}
          ref={ref => this.bindPageNavRef(ref)}
        >
          {navItems}
        </div>
      </NavItemContext.Provider>
    );
  }
}

const Nav = props => (
  <NavContext.Consumer>{context => <Component {...props} {...context} />}</NavContext.Consumer>
);

Nav.Item = NavItem;

export default Nav;
