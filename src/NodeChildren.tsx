import * as React from 'react';
import { observer } from 'mobx-react';
import { TreeNode } from './models/tree-node.model';
import { TreeModel } from './models/tree.model';
import NodeCollection from './NodeCollection';
import LoadingComponent from './LoadingComponent';

interface Props {
  node: TreeNode;
  treeModel: TreeModel;
}

@observer
class NodeChildren extends React.Component<Props, {}> {
  renderChildren() {
    const { node, treeModel } = this.props;

    return node.children
      ? <NodeCollection treeModel={ treeModel } nodes={ node.children }/>
      : <LoadingComponent node={ node }/>;
  }

  render() {
    const { node } = this.props;

    return (
      <div className="tree-children">
        {
          node.isExpanded ? this.renderChildren() : null
        }
      </div>
    );
  }
}
  
export default NodeChildren;
