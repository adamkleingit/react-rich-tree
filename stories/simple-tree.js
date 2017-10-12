/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Tree } from '../src/react-tree';

const nodes = [
  {
    name: 'root1',
    children: [
      { name: 'child1' },
      { name: 'child2' }
    ]
  }
];

storiesOf('Tree', module)
  .add('Simple', () => (
    <Tree nodes={ JSON.parse(text('nodes', JSON.stringify(nodes, null, 2))) }/>
  ));
