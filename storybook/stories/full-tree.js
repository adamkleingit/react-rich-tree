/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number, object } from '@storybook/addon-knobs';
import { Tree } from 'react-rich-tree';
import fulltreeReadme from './full.md'
import { withDocs } from '../storybook-readme/src';
import uuid from 'uuid';
import { map } from 'lodash';
const babel = require('babel-standalone');

window.React = React;
window.uuid = uuid;
let a;

const parseES6 = (code) => {
  return eval(babel.transform(code, { plugins: ['transform-react-jsx'], presets: ['stage-3'] }).code);
}

const nodes = [{
  id: 1,
  name: 'drag and drop here',
  type: 'dnd',
  children: [{
    id: 2,
    type: 'dnd',
    name: 'drag and drop me1'
  }, {
    id: 4,
    type: 'dnd',
    name: 'drag and drop me2'
  }, {
    id: 5,
    type: 'dnd',
    name: 'drag and drop me3'
  }]
}, {
  id: 6,
  type: 'async',
  name: 'async children',
  hasChildren: true // async
}, {
  id: 7,
  type: 'large',
  name: 'large tree',
  children: map(Array(1000), (_, i) => ({
    id: 10 + i,
    name: `child${i}`
  }))
}];

const options = {
  childrenField: 'children',
  displayField: 'name',
  idField: 'id',
  getChildren: `(node) => new Promise((resolve) => {
    setTimeout(() => resolve([{ name: 'lonely child' }, { name: 'child with children', hasChildren: true }]), 1000);
  })`,
  allowDrag: `(node) => node.data.type === 'dnd'`,
  allowDrop: `(node) => true`,
  levelPadding: 4,
  nodeClass: `(node) => node.data.type`,
  useVirtualScroll: true,
  nodeHeight: 25,
  dropSlotHeight: 2,
  animateExpand: true,
  animateSpeed: 50,
  animateAcceleration: 1.1,
  scrollOnSelect: true,
  getNodeClone: `(node) => ({ ...node.data, id: uuid.v4() })`
}

storiesOf('API', module)
  .add('Options', withDocs(fulltreeReadme, () => (
    <div style={ { height: 300, width: 300 } }>    
      <Tree
        nodes={ nodes }
        options={ {
          childrenField: text('childrenField', options.childrenField),
          displayField: text('displayField', options.displayField),
          idField: text('idField', options.idField),
          getChildren: parseES6(text('getChildren', options.getChildren)),
          allowDrag: parseES6(text('allowDrag', options.allowDrag)),
          allowDrop: parseES6(text('allowDrop', options.allowDrop)),
          levelPadding: number('levelPadding', options.levelPadding),
          nodeClass: parseES6(text('nodeClass', options.nodeClass)),
          useVirtualScroll: boolean('useVirtualScroll', options.useVirtualScroll),
          nodeHeight: number('nodeHeight', options.nodeHeight),
          dropSlotHeight: number('dropSlotHeight', options.dropSlotHeight),
          animateExpand: boolean('animateExpand', options.animateExpand),
          animateSpeed: number('animateSpeed', options.animateSpeed),
          animateAcceleration: number('animateAcceleration', options.animateAcceleration),
          scrollOnSelect: boolean('scrollOnSelect', options.scrollOnSelect),
          getNodeClone: parseES6(text('getNodeClone', options.getNodeClone))
        } }
      />
    </div>
  )));
