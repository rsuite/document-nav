// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import createNavItems from './utils/createNavItems';
import NavItem from './NavItem';
import { itemHeight } from './constants';
import throttle from './utils/throttle';
import NavContext, { NavItemContext } from './NavContext';
import getInnerText from './utils/innerText';

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
  rtl: boolean,
  /** 通过传入 basePath 来支持使用 base 标签的场景 */
  basePath: string
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

class Nav extends React.PureComponent<Props, State> {
  static defaultProps = {
    offset: {
      top: 60,
      left: 'auto'
    },
    minLevel: 2,
    maxLevel: 4,
    deep: 10,
    scrollBar: 'right',
    show: true,
    fixed: true,
    showOrderNumber: true,
    once: true,
    rtl: false,
    basePath: ''
  };

  static Item = NavItem;

  constructor(props: Props) {
    super(props);
    this.state = {
      anchors: []
    };
    this.reload = throttle(() => {
      if (typeof document === 'undefined') {
        return;
      }
      this.handelContentMount(document.querySelector('.rs-document-nav-content'), this.props.rtl);
    }, 200);
  }
  scrollListener: ?any;
  resizeListener: ?any;
  scrollWrap: ?HTMLElement;
  pageNav: ?HTMLElement;
  prevInnerHTML: ?string; // 兼容没有 MutationObserver 的浏览器

  getContext() {
    const { scrollBar, fixed, showOrderNumber, basePath } = this.props;
    const { anchors, activeAnchor = fixed ? anchors[0] : '' } = this.state;
    return {
      scrollBar,
      activeAnchor,
      showOrderNumber,
      basePath
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentDidUpdate(nextProps: Props, nextState: State) {
    const { once, rtl } = this.props;
    if (rtl !== nextProps.rtl) {
      this.reload();
      return;
    }
    if (once && !this.props.content && nextProps.content) {
      this.reload();
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }
    // 无 MutationObserver 时使用传统判断

    if (!once && !window.MutationObserver) {
      // 这里的 content 引用值理论上是不会变的，其实不需要这个判断，暂且先留着吧
      if (this.props.content !== nextProps.content) {
        this.reload();
        return;
      }
      if (nextProps.content && this.prevInnerHTML !== nextProps.content.innerHTML) {
        this.reload();
        return;
      }
    }
  }
  componentWillUnmount() {
    if (typeof window === 'undefined') {
      return;
    }
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.resizeListener);
    this.pageNav = null;
  }

  setScrollListener(ref: HTMLElement, anchors: Array<string>) {
    if (typeof window === 'undefined') {
      return;
    }
    this.scrollWrap = ref;
    const elList = anchors.map(anchor => document.getElementById(anchor));
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    this.scrollListener = throttle(() => {
      const { basePath } = this.props;
      const { activeAnchor } = this.state;
      const index = elList.findIndex((el, i) => {
        if (!el) {
          return false;
        }
        const position = el.getBoundingClientRect();
        // 在 windows 电脑中点击锚点跳转后定位的元素，它的 position.top 不是 0，而是一个大于 0 小于 1 的数，所有需要减去 1，来兼容这种情况
        // 而在 mac 电脑中这个值为 0，0 本来就不大于 0，所以即使减去 1 也对原有的逻辑没有影响，原有逻辑不减 1
        // 实际情况中也不会存在锚点高度为 1且与下个锚点没有间隙的锚点
        return position.top - 1 > 0;
      });
      // 第一个 position.top 大于 0 的元素且它的索引大于 0，它的上一个元素便是需要被激活的导航，
      // 当找到节点的索引为 0 时，直接取该索引，当找不到时，说明所有锚点都在窗口上方，直接取最后一个锚点
      const nextAnchor =
        index > 0 ? anchors[index - 1] : index === 0 ? anchors[0] : anchors[anchors.length - 1];
      if (nextAnchor !== activeAnchor && this.pageNav) {
        this.setState({
          activeAnchor: nextAnchor
        });
        const nav = document.querySelector(`a[href='${basePath}#${nextAnchor}']`);
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
    window.addEventListener('scroll', this.scrollListener);
  }

  // 遍历所有标题
  traverseTitle(node: HTMLElement, titleList: TitleList, anchors: Array<string>, deep) {
    if (!node || !titleList || !anchors || deep > this.props.deep) {
      return false;
    }
    const type = node.tagName;
    if (/^H[1-6]/.test(type)) {
      const title = getInnerText(node) || '';
      const anchor = node.id || title;
      node.id = anchor;

      let level = parseInt(type.replace('H', ''), 10);
      const { minLevel, maxLevel } = this.props;
      if (level >= minLevel && level <= maxLevel) {
        titleList.push({
          title,
          anchor,
          level
        });
        anchors.push(anchor);
      }
    } else {
      const children = node.children || [];
      for (let i = 0; i < children.length; i += 1) {
        this.traverseTitle(children[i], titleList, anchors, deep + 1);
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
    if (typeof window === 'undefined') {
      return;
    }
    if (content) {
      if (window.MutationObserver) {
        if (!this.observe) {
          this.observe = new MutationObserver(() => {
            if (!this.props.once) {
              this.reload();
            }
          });
          const config = {
            childList: true,
            subtree: true
          };
          this.observe.observe(content, config);
        }
      } else {
        this.prevInnerHTML = content.innerHTML;
      }
    }
    const titleList: TitleList = [];
    const anchors: Array<string> = [];
    const { children, minLevel, maxLevel, fixed } = this.props;
    if (!children) {
      this.traverseTitle(content, titleList, anchors, 0);
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

export default Nav;
