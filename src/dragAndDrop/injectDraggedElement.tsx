import * as React from 'react';
import { object } from 'prop-types';
import { observer } from 'mobx-react';
import { TreeDraggedElement } from '../models/tree-dragged-element';

export const draggedElementProvider = new TreeDraggedElement();

export function injectDraggedElement(WrappedComponent): any {
  @observer
  class HOC extends React.Component<any, any> {
    static contextTypes = {
      draggedElement: object
    };

    render() {
      return (
        <WrappedComponent
          draggedElement={ draggedElementProvider.get() }
          setDraggedElement={ (element) => draggedElementProvider.set(element) }
          { ...this.props }
        />
      );
    }
  }

  return HOC;
}
