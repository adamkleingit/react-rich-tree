/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Tree, NodeWrapper, Node, NodeChildren, NodeExpander } from 'react-rich-tree';
import fulltreeReadme from './custom-components.md'
import { withDocs } from '../storybook-readme/src';
import uuid from 'uuid';
import { map } from 'lodash';

const nodes = [{
  id: 1,
  name: 'assets',
  icon: 'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//folder1600.png',
  children: [{
    id: 2,
    icon: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-128.png',
    name: 'image.png',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }, {
    id: 3,
    icon: 'https://image.flaticon.com/icons/svg/29/29587.svg',
    name: 'document.pdf',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }, {
    id: 4,
    icon: 'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//file1600.png',
    name: 'Just a random file',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }]
}];
const LoadingComponent = ({ node }) => <img height="22" src="https://m.popkey.co/163fce/Llgbv_s-200x150.gif"/>

const TreeNodeComponent = ({ node }) => (
  <span>
    <img style={ { height: 14, verticalAlign: 'middle', marginRight: 3 } } src={ node.data.icon }/>
    { node.data.name }
  </span>
);
class TreeNodeWrapperComponent extends NodeWrapper {
  render() {
    const { node } = this.props;
    
    return (
      <div className="node-wrapper">
        <input
          type="checkbox"
          style={ { margin: '7px 3px' } }
          checked={ !!node.isActive }
          onChange={ () => node.toggleActivated() }/>
        <NodeExpander node={ node }/>
        <div
          className={ this.getClassName() }
          onClick={ this.handleClick }>
          { node.data.name }
        </div>
      </div>
    );
  }
}
class TreeNodeFullComponent extends Node {
  render() {
    const { node, treeModel } = this.props;

    return (
      <div className={ this.getClassName() }>
        <NodeWrapper node={ node }/>
        { node.isActive ? <div style={{marginLeft: 50}}>{ node.data.details }</div> : null }
        <NodeChildren treeModel={ treeModel } node={ node }/>
      </div>
    );
  }
}
const options = {
  TreeNodeComponent,
  TreeNodeWrapperComponent,
  TreeNodeFullComponent,
  LoadingComponent
};

storiesOf('API', module)
  .add('Custom Components', withDocs(fulltreeReadme, () => (
    <div style={ { textAlign: 'left' } }>
      <h2>LoadingComponent</h2>
      <Tree
        nodes={ [{ name: 'async loading', hasChildren: true }] }
        options={ {
          LoadingComponent: options.LoadingComponent
        } }/>
      <h2>TreeNodeComponent</h2>
      <Tree
        nodes={ nodes }
        options={ {
          TreeNodeComponent: options.TreeNodeComponent
        } }
      />
      <h2>TreeNodeWrapperComponent</h2>
      <Tree
        nodes={ nodes }
        options={ {
          TreeNodeWrapperComponent: options.TreeNodeWrapperComponent
        } }
      />
      <h2>TreeNodeFullComponent</h2>
      <Tree
        nodes={ nodes }
        options={ {
          TreeNodeFullComponent: options.TreeNodeFullComponent
        } }
      />
    </div>
  )));
