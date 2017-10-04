import * as React from 'react';
import { object } from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

class DraggedElementProvider {
  @observable private element: any;

  @action setElement(element: any) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }
}

export const draggedElementProvider = new DraggedElementProvider();

export function injectDraggedElement(WrappedComponent) {
  @observer
  class HOC extends React.Component<any, any> {
    static contextTypes = {
      draggedElement: object
    };

    render() {
      return (
        <WrappedComponent
          draggedElement={ draggedElementProvider.getElement() }
          setDraggedElement={ (element) => draggedElementProvider.setElement(element) }
          { ...this.props }
        />
      );
    }
  }

  return HOC;
}
