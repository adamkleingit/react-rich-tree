import { observable, computed, reaction } from 'mobx';
import * as React from 'react';
import { observer } from 'mobx-react';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { TreeNode } from './models/tree-node.model';
import { TreeModel } from './models/tree.model';
import Node from './Node';

interface Props {
  nodes: TreeNode[];
  treeModel: TreeModel;
}

@observer
class NodeCollection extends React.Component<Props, {}> {
  _dispose = [];

  @observable viewportNodes: TreeNode[];

  private virtualScroll: TreeVirtualScroll;

  @computed get marginTop(): string {
    const firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
    const relativePosition = firstNode
      ? firstNode.position - firstNode.parent.position - firstNode.parent.getSelfHeight()
      : 0;

    return `${relativePosition}px`;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.nodes !== this.props.nodes) {
      this.viewportNodes = this.virtualScroll.getViewportNodes(nextProps.nodes);
    }
  }

  componentWillMount() {
    this.virtualScroll = this.props.treeModel.virtualScroll;
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(
        () => {
          return this.virtualScroll.getViewportNodes(this.props.nodes).map(n => n.index);
        },
        (nodeIndexes) => {
          this.viewportNodes = nodeIndexes.map((i) => this.props.nodes[i]);
        },
        { compareStructural: true, fireImmediately: true }
      )
    ];
  }

  componentwillUnmount() {
    this._dispose.forEach(d => d());
  }

  render() {
    return (
      <div style={ { marginTop: this.marginTop } }>
        {
          this.viewportNodes.map((node, i) => (
            <Node node={ node } index={ i } key={ node.id } treeModel={ this.props.treeModel }/>
          ))
        }
      </div>
    );
  }
}
  
export default NodeCollection;
