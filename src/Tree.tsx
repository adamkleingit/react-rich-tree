import * as React from 'react';
import { observer } from 'mobx-react';
import { forEach, capitalize } from 'lodash';
import { TreeModel } from './models/tree.model';
import NodeCollection from './NodeCollection';
import Viewport from './Viewport';
import { ITreeOptions } from './defs/api';
import { events, EventEmitter } from './reactBridge';

export interface Props {
  nodes: object[];
  options: ITreeOptions;
  onToggleExpanded?: any;
  onActivate?: any;
  onDeactivate?: any;
  onFocus?: any;
  onBlur?: any;
  onInitialized?: any;
  onUpdateData?: any;
  onMoveNode?: any;
  onCopyNode?: any;
  onEvent?: any;
  onLoadNodeChildren?: any;
  onChangeFilter?: any;
  onStateChange?: any;
}

@observer
class Tree extends React.Component<Props, {}> {
  treeModel: TreeModel = new TreeModel();
  unsubscribe: any[] = [];

  constructor(props: Props) {
    super(props);

    this.init(this.props);
    this.initEvents();
  }

  initEvents() {
    forEach(events, (eventEmitter: EventEmitter, eventName: string) => {
      this.unsubscribe.push(eventEmitter.subscribe((event) => {
        const propName = `on${capitalize(eventName)}`;

        if (this.props[propName]) {
          this.props[propName](event);
        }
      }));
    });
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeydown);
    document.body.addEventListener('mousedown', this.onMousedown);
  }

  onKeydown = ($event) => {
    this.treeModel.handleKeyDown($event);
  }

  onMousedown = ($event) => {
    const insideClick = $event.target.closest('Tree');

    if (!insideClick) {
      this.treeModel.setFocus(false);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.nodes !== nextProps.nodes) {
      this.init(nextProps);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeydown);
    document.body.removeEventListener('mousedown', this.onMousedown);
  }

  init(props: Props) {
    this.treeModel.setData({
      nodes: props.nodes,
      events,
      options: props.options
    });
  }

  render() {
    const roots = this.treeModel.roots;

    return (
      <Viewport treeModel={ this.treeModel }>
        <div className="tree">
          { roots ? <NodeCollection treeModel={ this.treeModel } nodes={ roots }/> : null }
        </div>
      </Viewport>
    );
  }
}

export default Tree;
