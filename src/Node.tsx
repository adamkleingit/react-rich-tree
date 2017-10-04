import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { TreeNode } from './models/tree-node.model';
import { TreeModel } from './models/tree.model';
import NodeWrapper from './NodeWrapper';
import NodeChildren from './NodeChildren';
import DropSlot from './dragAndDrop/DropSlot';

interface Props {
  node: TreeNode;
  treeModel: TreeModel;
  index: number;
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
    const { node, treeModel, index } = this.props;

    return node.options.TreeNodeFullComponent
      ? <node.options.TreeNodeFullComponent node={ node } treeModel={ treeModel }/>
      : (
        <div className={ this.getClassName() }>
          { index === 0 ? <DropSlot dropIndex={ node.index } node={ node.parent }/> : null }
          <NodeWrapper node={ node }/>
          <NodeChildren treeModel={ treeModel } node={ node }/>
          <DropSlot dropIndex={ node.index + 1 } node={ node.parent }/>
        </div>
      );
  }
}
  
export default Node;
