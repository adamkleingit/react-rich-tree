import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { TreeNode } from './models/tree-node.model';
import NodeContent from './NodeContent';
import NodeExpander from './NodeExpander';
import TreeDrag from './dragAndDrop/TreeDrag';
import TreeDrop from './dragAndDrop/TreeDrop';

interface Props {
  node: TreeNode;
}

@observer
class NodeWrapper extends React.Component<Props, {}> {
  handleClick = (e) => {
    this.props.node.mouseAction('click', e);
  }
  handleDblClick = (e) => {
    this.props.node.mouseAction('dblClick', e);
  }
  handleContextmenu = (e) => {
    this.props.node.mouseAction('contextMenu', e);
  }

  getClassName() {
    const { node } = this.props;

    return classNames(
      node.getClass(),
      'node-content-wrapper',
      {
        'node-content-wrapper-active': node.isActive,
        'node-content-wrapper-focused': node.isFocused
      }
    );
  }

  render() {
    const { node } = this.props;

    return node.options.TreeNodeWrapperComponent
      ? <node.options.TreeNodeWrapperComponent node={ node }/>
      : (
        <div className="node-wrapper">
          <NodeExpander node={ node }/>
          <TreeDrop
            onDrop={ node.onDrop }
            onDragLeave={ (event) => node.mouseAction('dragLeave', event) }
            onDragEnter={ (event) => node.mouseAction('dragEnter', event) }
            allowDrop={ (element, event) => node.allowDrop(element, 0, event) }
          >
            <TreeDrag enabled={ node.allowDrag() } node={ node }>
              <div
                className={ this.getClassName() }
                onClick={ this.handleClick }
                onDoubleClick={ this.handleDblClick }
                onContextMenu={ this.handleContextmenu }
              >
                <NodeContent node={ node }/>
              </div>
            </TreeDrag>
          </TreeDrop>
        </div>
      );
  }
}
  
export default NodeWrapper;
