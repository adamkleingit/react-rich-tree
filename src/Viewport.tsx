import * as React from 'react';
import { observer } from 'mobx-react';
import { TREE_EVENTS } from './constants/events';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { TreeModel } from './models/tree.model';

export interface Props {
  treeModel: TreeModel;
}

@observer
class Viewport extends React.Component<Props, {}> {
  virtualScroll: TreeVirtualScroll;
  ref: any;

  constructor(props: Props) {
    super(props);

    this.virtualScroll = new TreeVirtualScroll(props.treeModel);
  }

  componentDidMount() {
    this.virtualScroll.init();    
  }

  componentWillUnmount() {
    this.virtualScroll.clear();    
  }

  setRef = (ref) => {
    this.ref = ref;
    this.virtualScroll.setViewport(this.ref);
    this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
  }

  setViewport = () => {
    this.virtualScroll.setViewport(this.ref);
  }

  getTotalHeight() {
    return this.virtualScroll.isEnabled() && this.virtualScroll.totalHeight + 'px' || 'auto';
  }

  render() {
    return (
      <div
        className="viewport"
        ref={ this.setRef }
        onScroll={ this.setViewport }
      >
        <div style={ { height: this.getTotalHeight() } }>
          { this.props.children }
        </div>
      </div>
    );
  }
}
  
export default Viewport;
