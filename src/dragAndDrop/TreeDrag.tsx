import * as React from 'react';
import { Draggable } from '@shopify/draggable';
import { TreeNode } from '../models/tree-node.model';
import { injectDraggedElement } from './injectDraggedElement';

export interface Props {
  enabled: boolean;
  node: TreeNode;
  setDraggedElement: any;
}

class TreeDrag extends React.Component<Props, {}> {
  draggable: Draggable;
  ref: HTMLElement;

  onRef = (ref) => {
    this.ref = ref;
    this.setupDraggable(this.props.enabled);
  }

  componentDidReceiveProps(nextProps) {
    if (this.props.enabled !== nextProps.enabled) {
      this.setupDraggable(nextProps.enabled);
    }
  }

  componentWillUnmount() {
    this.setupDraggable(false);
  }

  setupDraggable(enabled) {
    if (enabled && this.ref && !this.draggable) {
      this.draggable = new Draggable([this.ref]);
      this.setupEvents();
    } else if (this.draggable) {
      this.draggable.destroy();
    }
  }

  setupEvents() {
    const { setDraggedElement } = this.props;

    this.draggable
      .on('drag:start', () => {
        setDraggedElement(this.props.node);
      })
      .on('drag:stop', () => {
        setDraggedElement(undefined);
      });
  }

  render() {
    return (
      <span ref={ this.onRef } className="draggable-source">
        { this.props.children }
      </span>
    );
  }
}

export default injectDraggedElement(TreeDrag);
