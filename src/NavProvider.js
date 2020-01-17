// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

type State = {
  content: ?HTMLElement
};

const NavProvider = ({ children }) => children;

export default NavProvider;
