import { observable, action } from 'mobx';

export class TreeDraggedElement {
  @observable _draggedElement: any = null;

  @action set(draggedElement: any) {
    this._draggedElement = draggedElement;
  }

  get(): any {
    return this._draggedElement;
  }

  isDragging() {
    return !!this.get();
  }
}
