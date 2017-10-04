import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { TreeNode } from '../models/tree-node.model';
import TreeDrop from './TreeDrop';

interface Props {
  node: TreeNode;
  dropIndex: number;
}

@observer
class DropSlot extends React.Component<Props, {}> {
  onDrop = ({ event, element }) => {
    this.props.node.mouseAction('drop', event, {
      from: element,
      to: { parent: this.props.node, index: this.props.dropIndex }
    });
  }

  allowDrop = (element, $event) => {
    return this.props.node.allowDrop(element, this.props.dropIndex, $event);
  }

  render() {
    return (
      <TreeDrop
        onDrop={ this.onDrop }
        allowDrop={ this.allowDrop }
      >
        <span className="node-drop-slot"/>
      </TreeDrop>
    );
  }
}
  
export default DropSlot;
