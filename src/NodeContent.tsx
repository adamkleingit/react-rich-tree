import * as React from 'react';
import { TreeNode } from './models/tree-node.model';
import { observer } from 'mobx-react';

export interface Props {
  node: TreeNode;
}

@observer
class NodeContent extends React.Component<Props, {}> {
  render() {
    const { node } = this.props;

    return node.options.TreeNodeComponent
      ? <node.options.TreeNodeComponent node={ node }/>
      : (
        <div>
          { node.displayField }
        </div>
      );
  }
}
  
export default NodeContent;
