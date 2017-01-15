/**
 * Component功能：页面级Component的模板类，同时负责绑定logic、初始化state、执行logic方法并setState
 *
 * Created by ex90rts on 11/12/2016.
 */
import React, { PropTypes } from 'react';
import { context } from './utils';
import isArray from 'isarray';
import assign from 'object-assign';

export default class Component extends React.Component {
  static childContextTypes = {
    host: PropTypes.any,
  }
  constructor(props, logic) {
    super(props);
    this.logic = logic;
    this.state = {};
    if (typeof logic.defaults === 'function') {
      this.execute('defaults');
    }
  }

  // 将宿主对象传给所有的LogicRender，供其调用logic方法
  getChildContext() {
    return { host: this };
  }

  execute(...params) {
    const t = this;
    let actions = params.shift();
    const ctx = assign({}, context, {
      /*setState: (nextState) => {
        t.setState(nextState=>nextState);
      },*/
      setState: t.setState.bind(t),
      getState() { return t.state },
      getProps() { return t.props },
    });

    if (!isArray(actions)) {
      actions = [actions];
    }

    (function execAction(args) {
      if (actions.length) {

        const action = actions.shift();

        // 如果不存在 logic中不存在action就报错退出
        if (t.logic[action]) {
          const ret = t.logic[action].apply(null, [ctx, ...params].concat([args]));
          if (ret && typeof ret.then === 'function') {
            ret.then((data) => {
              if (data !== false) {
                execAction(data);
              }
            });
          } else {
            if (ret !== false) {
              execAction(ret);
            }
          }
        } else {
          throw Error(`action ${action} is not defined`);
        }
      }
    })();
  }

  renderPage() {
    return <div>Hello, World!</div>;
  }

  render() {
    return this.renderPage();
  }
}