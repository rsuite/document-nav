// @flow
import * as React from 'react';
import createNavItems from './utils/createNavItems';
import { NavItemContext } from './NavContext';

type Props = {
  index: string,
  level: number,
  title: string,
  anchor: string,
  subItems?: Array<{
    title: string,
    level: number,
    anchor: string
  }>,
  children?: React.Node,
  scrollBar: 'left' | 'right',
  activeAnchor: string,
  showOrderNumber: boolean
};

type State = {
  active: boolean
};

const BASE_PADDING_LEFT = 15;

class NavItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false
    };
  }
  renderSubNavItems() {
    const { children, index, level, subItems, rtl } = this.props;
    if (children) {
      return React.Children.map(children, (item, i) =>
        React.cloneElement(item, {
          index: `${index}.${i + 1}`,
          level: level + 1,
          key: `${index}.${i + 1} ${item.props.anchor}`,
          rtl
        })
      );
    }
    return createNavItems(subItems, level, index, rtl);
  }
  render() {
    const { title, anchor, subItems, children, index, level, rtl } = this.props;
    const { scrollBar = 'right', activeAnchor, showOrderNumber } = this.props;
    const active = anchor === activeAnchor;
    const content = showOrderNumber ? `${index} ${title}` : title;
    return (
      <div className="nav-item" title={content}>
        <a
          href={`#${anchor}`}
          className={`nav-link ${active ? 'active' : ''} scroll-bar-${scrollBar}`}
          style={{
            [rtl ? 'paddingRight' : 'paddingLeft']: `${(level - 1) * 20 + BASE_PADDING_LEFT}px`
          }}
        >
          {content}
        </a>
        {subItems || children ? (
          <div className="sub-nav-item">{this.renderSubNavItems()}</div>
        ) : null}
      </div>
    );
  }
}

export default props => (
  <NavItemContext.Consumer>
    {context => <NavItem {...props} {...context} />}
  </NavItemContext.Consumer>
);
