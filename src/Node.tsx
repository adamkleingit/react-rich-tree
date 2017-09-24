import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { TreeNode } from './models/tree-node.model';
import { TreeModel } from './models/tree.model';
import NodeWrapper from './NodeWrapper';
import NodeChildren from './NodeChildren';

interface Props {
  node: TreeNode;
  treeModel: TreeModel;
}

@observer
class Node extends React.Component<Props, {}> {
  getClassName() {
    const { node } = this.props;
    
    return classNames(
      node.getClass(),
      'tree-node',
      {
        'tree-node-expanded': node.isExpanded && node.hasChildren,
        'tree-node-collapsed': node.isCollapsed && node.hasChildren,
        'tree-node-leaf': node.isLeaf,
        'tree-node-active': node.isActive,
        'tree-node-focused': node.isFocused
      }
    );
  }

  render() {
    const { node, treeModel } = this.props;

    return node.options.TreeNodeFullComponent
      ? <node.options.TreeNodeFullComponent node={ node } treeModel={ treeModel }/>
      : (
        <div className={ this.getClassName() }>
          <NodeWrapper node={ node }/>
          <NodeChildren treeModel={ treeModel } node={ node }/>
        </div>
      );
  }
}
  
export default Node;
