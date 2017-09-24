import * as React from 'react';
import { observer } from 'mobx-react';
import { TreeNode } from './models/tree-node.model';

interface Props {
  node: TreeNode;
}

@observer
class LoadingComponent extends React.Component<Props, {}> {
  render() {
    const { node } = this.props;

    return node.options.LoadingComponent
      ? <node.options.LoadingComponent node={ node }/>
      : <span>loading...</span>;
  }
}
  
export default LoadingComponent;
