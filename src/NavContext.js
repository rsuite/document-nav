//@flow

import * as React from 'react';

function createContext(defaultValue) {
  const context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };

  const ReactContext: React.Context<any> = React.createContext
    ? React.createContext(defaultValue)
    : context;

  return ReactContext;
}

export const NavContext = createContext({});
export const NavItemContext = createContext({});

export default NavContext;
