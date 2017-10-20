# Custom Components
TODO

# Example

```
const LoadingComponent = ({ node }) => <img height="22" src="loading.gif"/>

const TreeNodeComponent = ({ node }) => (
  <span>
    <img style={ { height: 14, verticalAlign: 'middle', marginRight: 3 } } src={ node.data.icon }/>
    { node.data.name }
  </span>
);
class TreeNodeWrapperComponent extends NodeWrapper {
  render() {
    const { node } = this.props;
    
    return (
      <div className="node-wrapper">
        <input
          type="checkbox"
          style={ { margin: '7px 3px' } }
          checked={ !!node.isActive }
          onChange={ () => node.toggleActivated() }/>
        <NodeExpander node={ node }/>
        <div
          className={ this.getClassName() }
          onClick={ this.handleClick }>
          { node.data.name }
        </div>
      </div>
    );
  }
}
class TreeNodeFullComponent extends Node {
  render() {
    const { node, treeModel } = this.props;

    return (
      <div className={ this.getClassName() }>
        <NodeWrapper node={ node }/>
        { node.isActive ? <div style={{marginLeft: 50}}>{ node.data.details }</div> : null }
        <NodeChildren treeModel={ treeModel } node={ node }/>
      </div>
    );
  }
}

```

<!-- STORY -->
