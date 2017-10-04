import * as React from 'react';
import { set } from 'lodash/fp';
import './App.css';
import './Tree.css';
import Tree from './Tree';
import Node from './Node';
import NodeWrapper from './NodeWrapper';
import NodeChildren from './NodeChildren';
import { TreeNode } from './models/tree-node.model';
import { ITreeOptions } from './defs/api';
import { ITreeCustomComponent } from './constants/prop-types';

const LoadingComponent = () => <div>looooooading</div>;
class TreeNodeWrapperComponent extends NodeWrapper {
  render() {
    const { node } = this.props;
    
    return (
      <span className={ this.getClassName() } onClick={ this.handleClick }>
        -> { node.displayField }
      </span>
    );
  }
}
class TreeNodeFullComponent extends Node {
  render() {
    const { node, treeModel } = this.props;

    return (
      <div className={ this.getClassName() }>
        bla
        <NodeWrapper node={ node }/>
        <NodeChildren treeModel={ treeModel } node={ node }/>
      </div>
    );
  }
}
const TreeNodeComponent = ({ node }: ITreeCustomComponent) => (
  <span>-> { node.displayField }</span>
);

interface State {
  nodes: object[];
}

class App extends React.Component<{}, State> {
  options: ITreeOptions = {
    useVirtualScroll: true,
    allowDrag: true,
    getChildren: (node: TreeNode) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const path = node.pathToNodeInData;
          const children = [{ name: 'async child' }];
          resolve(children);
        }, 1000);
      });
    }
    // TreeNodeWrapperComponent,
    // TreeNodeFullComponent
  };

  constructor(props: {}) {
    super(props);

    const nodes = [];

    for (let i = 0; i < 3; i++) {
      const root = { name: `root${i}`, children: [] };

      for (let j = 0; j < 3; j++) {
        root.children.push({ name: `node${i}.${j}`, hasChildren: true });
      }
      nodes.push(root);
    }

    this.state = {
      nodes
    };
  }

  onEvent = (event) => {
    console.log(event);
  }

  render() {
    return (
      <div style={ { height: 400, width: 300 } }>
        <Tree nodes={ this.state.nodes } options={ this.options } onEvent={ this.onEvent }/>
      </div>
    );
  }
}

export default App;
