import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { TreeNode } from './models/tree-node.model';

export interface Props {
  node: TreeNode;
}

@observer
class NodeExpander extends React.Component<Props, {}> {
  handleClick = (e) => {
    this.props.node.mouseAction('expanderClick', e);
  }

  renderExpander() {
    const { node } = this.props;
    const className = classNames('toggle-children-wrapper', {
      'toggle-children-wrapper-expanded': node.isExpanded,
      'toggle-children-wrapper-collapsed': node.isCollapsed
    });

    return (
      <span
        className={ className }
        onClick={ this.handleClick }
      >
        <span className="toggle-children"/>
      </span>
    );
  }

  renderPlaceholder() {
    return <span className="toggle-children-placeholder"/>;
  }

  render() {
    const { node } = this.props;

    return node.hasChildren ? this.renderExpander() : this.renderPlaceholder();
  }
}
  
export default NodeExpander;
