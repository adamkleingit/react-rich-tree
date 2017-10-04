import * as React from 'react';
import { object } from 'prop-types';

class DraggedElement {
  private element: any;

  setElement(element: any) {
    this.element = element;
  }
}

class DragProvider extends React.Component {  
  static childContextTypes = {
    draggedElement: object
  };

  draggedElement: DraggedElement;

  getChildContext() {
    if (!this.draggedElement) {
      this.draggedElement = new DraggedElement();
    }
    return this.draggedElement;
  }

  render() {
    return <div>{ this.props.children }</div>;
  }
}

export default DragProvider;