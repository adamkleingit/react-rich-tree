/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Tree, TreeNode, TreeModel, KEYS, TREE_ACTIONS } from 'react-rich-tree';
import actionMappingReadme from './action-mapping.md'
import { withDocs } from '../storybook-readme/src';

const babel = require('babel-standalone');

window.TREE_ACTIONS = TREE_ACTIONS;
window.KEYS = KEYS;
window.React = React;
window.uuid = uuid;
let a;

const parseES6 = (code) => {
  return eval(babel.transform(code, { plugins: ['transform-react-jsx'], presets: ['stage-3'] }).code);
}

const nodes = [{
  id: 1,
  name: 'root1',
  children: [{
    id: 2,
    name: 'child1.1',
    children: [{
      id: 7,
      name: 'grandChild1.1.1'
    }, {
      id: 8,
      name: 'grandChild1.1.2'
    }]
  }, {
    id: 3,
    name: 'child1.2'
  }]
}, {
  id: 4,
  name: 'root2',
  children: [{
    id: 5,
    name: 'child2.1'
  }, {
    id: 6,
    name: 'child2.2'
  }]
}];

const options = {
  actionMapping: `{
    mouse: {
      click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI,
      dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
      contextMenu: (tree, node, event) => event.preventDefault() || alert('context menu for node ' + node.displayField),
      expanderClick: (tree, node, event) => event.shiftKey ? node.expandAll() : node.toggleExpanded(),
      drop: (tree, node, event) => alert('drop node')
    },
    keys: {
      [KEYS.RIGHT]: () => alert('right'),
      [KEYS.LEFT]: () => alert('left'),
      [KEYS.DOWN]: () => alert('down'),
      [KEYS.UP]: () => alert('up'),
      [KEYS.SPACE]: () => alert('space'),
      [KEYS.ENTER]: () => alert('enter')
    }
  }`
}

storiesOf('API', module)
  .add('Action Mapping', withDocs(actionMappingReadme, () => (
    <Tree
      nodes={ nodes }
      options={ {
        allowDrag: true,
        actionMapping: parseES6('a = ' + text('actionMapping', options.actionMapping))
      } }
    />
  )));
