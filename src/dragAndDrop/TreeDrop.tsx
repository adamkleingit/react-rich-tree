import * as React from 'react';
import { injectDraggedElement } from './injectDraggedElement';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

export interface CallbackParam {
  event: any;
  element: any;
}

export interface Callback {
  (a: CallbackParam): any;
}
export interface AllowDrop {
  (element: any, event: any): boolean;
}

export interface Props {
  allowDrop: boolean | AllowDrop;
  onDragOver?: Callback;
  onDragLeave?: Callback;
  onDragEnter?: Callback;
  onDrop?: Callback;
  draggedElement: any;
}

export interface State {
  isDraggingOver: boolean;
  isDropEnabled: boolean;
}

class TreeDrop extends React.Component<Props, State> {
  state = {
    isDraggingOver: false,
    isDropEnabled: false
  };

  allowDrop = (element, event) => {
    const { allowDrop } = this.props;

    if (allowDrop instanceof Function) {
      return allowDrop(element, event);
    } else {
      return allowDrop;
    }
  }
  onDragEnter = (event) => {
    const { draggedElement, onDragEnter } = this.props;
    
    if (draggedElement) {
      this.setState({
        isDraggingOver: true,
        isDropEnabled: this.allowDrop(draggedElement, event)
      });
      onDragEnter && onDragEnter({ element: draggedElement, event });
    }
  }

  onDragLeave = (event) => {
    const { draggedElement, onDragLeave } = this.props;
    
    if (draggedElement) {
      this.setState({
        isDraggingOver: false
      });
      onDragLeave && onDragLeave({ element: draggedElement, event });
    }
  }

  onDragOver = (event) => {
    const { draggedElement, onDragOver } = this.props;
    
    if (draggedElement && onDragOver) {
      onDragOver({ element: draggedElement, event });
    }
  }

  onDrop = (event) => {
    const { draggedElement, onDrop } = this.props;

    if (draggedElement) {
      this.setState({
        isDraggingOver: false
      });
      if (this.allowDrop(draggedElement, event)) {
        onDrop && onDrop({ element: draggedElement, event });
      }
    }
  }

  getClassName = () => {
    const { isDraggingOver, isDropEnabled } = this.state;

    if (isDraggingOver) {
      return isDropEnabled ? DRAG_OVER_CLASS : DRAG_DISABLED_CLASS;
    }

    return null;
  }

  render() {
    return (
      <span
        className={ this.getClassName() }
        onMouseMove={ this.onDragOver }
        onMouseEnter={ this.onDragEnter }
        onMouseLeave={ this.onDragLeave }
        onMouseUp={ this.onDrop }
      >
        { this.props.children }
      </span>
    );
  }
}

export default injectDraggedElement(TreeDrop);
