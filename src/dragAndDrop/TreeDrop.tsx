import * as React from 'react';
import { injectDraggedElement } from './injectDraggedElement';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

interface CallbackParam {
  event: any;
  element: any;
}

interface Callback {
  (a: CallbackParam): any;
}
interface AllowDrop {
  (element: any, event: any): boolean;
}

interface Props {
  allowDrop: boolean | AllowDrop;
  onDragOver?: Callback;
  onDragLeave?: Callback;
  onDragEnter?: Callback;
  onDrop?: Callback;
  draggedElement: any;
}

interface State {
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
  // @Output('treeDrop') onDropCallback = new EventEmitter();
  // @Output('treeDropDragOver') onDragOverCallback = new EventEmitter();
  // @Output('treeDropDragLeave') onDragLeaveCallback = new EventEmitter();
  // @Output('treeDropDragEnter') onDragEnterCallback = new EventEmitter();

  // private _allowDrop = (element, $event) => true;
  // @Input() set treeAllowDrop(allowDrop) {
  //   if (allowDrop instanceof Function) {
  //     this._allowDrop = allowDrop;
  //   }
  //   else this._allowDrop = (element, $event) => allowDrop;
  // }
  // allowDrop($event) {
  //   return this._allowDrop(this.treeDraggedElement.get(), $event);
  // }

  // constructor(private el: ElementRef, private renderer: Renderer, private treeDraggedElement: TreeDraggedElement) {
  // }

  // @HostListener('dragover', ['$event']) onDragOver($event) {
  //   if (!this.allowDrop($event)) return this.addDisabledClass();

  //   this.onDragOverCallback.emit({event: $event, element: this.treeDraggedElement.get()});

  //   $event.preventDefault();
  //   this.addClass();
  // }

  // @HostListener('dragenter', ['$event']) onDragEnter($event) {
  //   if (!this.allowDrop($event)) return;

  //   this.onDragEnterCallback.emit({event: $event, element: this.treeDraggedElement.get()});
  // }

  // @HostListener('dragleave', ['$event']) onDragLeave($event) {
  //   if (!this.allowDrop($event)) return this.removeDisabledClass();

  //   this.onDragLeaveCallback.emit({event: $event, element: this.treeDraggedElement.get()});

  //   this.removeClass();
  // }

  // @HostListener('drop', ['$event']) onDrop($event) {
  //   if (!this.allowDrop($event)) return;

  //   $event.preventDefault();
  //   this.onDropCallback.emit({event: $event, element: this.treeDraggedElement.get()});
  //   this.removeClass();
  //   this.treeDraggedElement.set(null);
  // }

  // private addClass() {
  //   this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, true);
  // }

  // private removeClass() {
  //   this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, false);
  // }

  // private addDisabledClass() {
  //   this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, true);
  // }

  // private removeDisabledClass() {
  //   this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, false);
  // }

}

export default injectDraggedElement(TreeDrop);
