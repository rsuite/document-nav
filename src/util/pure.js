/**
 * 通用的 shouldComponentUpdate 比较方法，目的是解决以下问题：
 *    1. 组件不必要的渲染
 *    2. React 15 的 PureComponent 在 14 及以前版本不可用，易有兼容问题
 *    3. 不管是 15 以前的 PureRenderMixin 还是 15 以后的 PureComponent，都只比较 props 和 state，
 *       不比较 context，导致 context 更新时组件不更新
 * @example shouldComponentUpdate = pureUpdate.bind(this);
 * @param { [Array] } nextProps 
 * @param { [Array] } nextState 
 * @param { [Array] } nextContext 
 */
function pureUpdate(nextProps, nextState, nextContext) {
  for (let key in nextProps) {
    if (!equal(this.props[key], nextProps[key])) {
      return true;
    }
  }
  for (let key in nextState) {
    if (!equal(this.state[key], nextState[key])) {
      return true;
    }
  }
  for (let key in nextContext) {
    if (!equal(this.context[key], nextContext[key])) {
      return true;
    }
  }
  return false;
}

export function equal(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a === 'object' && a && b && Object.keys(a).length === 0 && Object.keys(b).length === 0) {
    return true;
  }
  return false;
}

export default pureUpdate;
