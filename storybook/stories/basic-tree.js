/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import BasicReadme from './basic.md';
import { withDocs } from '../storybook-readme/src';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Tree } from 'react-rich-tree';

const nodes = [
  {
    name: 'root1',
    children: [
      { name: 'child1.1' },
      { name: 'child1.2' }
    ]
  },
  {
    name: 'root2',
    children: [
      { name: 'child2.1' },
      { name: 'child2.2' }
    ]
  }
];

const options = {};

const onEvent = (event) => console.log(event);

storiesOf('Guides', module)
  .add('Getting Started', withDocs(BasicReadme, () => (
    <Tree
      nodes={ JSON.parse(text('nodes', JSON.stringify(nodes, null, 2))) }
      options={ JSON.parse(text('options', JSON.stringify(options, null, 2))) }
      onEvent={ onEvent }
    />
  )));
