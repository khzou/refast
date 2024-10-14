import Component from './lib/Component';
import PureComponent from './lib/PureComponent';
import utils from './lib/utils';

export default {
  Component,
  PureComponent,
  use: utils.use,
  setup: utils.use,
};
