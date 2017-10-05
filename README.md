# React Rich Tree

## A full featured tree component for React
We've built so many projects that required a tree component, and could never find a library that supported all features.
And building your own tree component is not an easy task.

So, we decided to build one for React, with all the features you can think of:
* Simple to use
* Well Documented
* Customizable & Extensible (override field names, custom templates, etc...)
* Keyboard navigation
* Async data
* Drag & Drop
* Select & Multiselect
* Filtering
* Virtual Scrolling
* Save & restore tree state
* Event callbacks
* API for accessing & altering the tree state
* Easily styled (comes with very minimal styling)

## Getting started
`npm i -S react-rich-tree`

```
import { Tree } from 'react-rich-tree';

nodes = [{
  id: 1,
  name: 'root',
  children: [{
    id: 2,
    name: 'child'
  }, {
    id: 4,
    name: 'child2'
  }]
}, {
  id: 5,
  name: 'root2'
}];

options = {}

onEvent = (event) => console.log(event)

<Tree nodes={ nodes } options={ options } onEvent={ onEvent }/>

```

## Full example
```
import { Tree, TreeNode, TreeModel, TREE_ACTIONS } from 'react-rich-tree';

nodes = [{
  id: 1,
  name: 'root',
  type: 'folder',
  children: [{
    id: 2,
    type: 'file',
    name: 'child'
  }, {
    id: 4,
    type: 'file',
    name: 'child2'
  }]
}, {
  id: 5,
  type: 'folder',
  name: 'root2',
  hasChildren: true // async
}];

options = {
  childrenField: 'children',
  displayField: 'name',
  idField: 'id',
  getChildren: (node: TreeNode) => http.get(`/children/${node.id}`), // async load children - to be used with `hasChildren` property on the node
  actionMapping: { // override key and mouse actions
    mouse: {
      click: TREE_ACTIONS.TOGGLE_SELECTED,
      dblClick: (tree: TreeModel, node: TreeNode, $event: any) => node.toggleExpanded(),
      contextMenu: null,
      expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
      drop: TREE_ACTIONS.MOVE_NODE
    },
    keys: {
      [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
      [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
      [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
      [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
      [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_SELECTED,
      [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_SELECTED
    }
  },
  allowDrag: (node: TreeNode) => node.isLeaf, // boolean or function. isLeaf is a function on TreeNode wrapper class
  allowDrop: (node: TreeNode) => node.data.type === 'folder', // data is the original data supplied by nodes
  levelPadding: 4, // to be used for whole row selection (instead of putting padding on children)
  nodeClass: (node: TreeNode) => node.type, // for styling
  useVirtualScroll: true,
  nodeHeight: 30,
  dropSlotHeight: 3,
  animateExpand: true,
  animateSpeed: 50,
  animateAcceleration: 1.1,
  scrollOnSelect: true,
  getNodeClone: (node: TreeNode) => ({ ...node.data, id: uuid.v4() }), // for dragging with ctrl pressed
  TreeNodeComponent: ({ node }) => <span>{ node.data.name } ({node.children.length})</span>
  TreeNodeWrapperComponent: MyCustomNodeWrapper, // a component class that extends NodeWrapper component (or replaces it)
  TreeNodeFullComponent: MyCustomFullNode, // a component class that extends Node component (or replaces it)
  LoadingComponent: ({ node }) => <img src="loading.gif"/>
}

<Tree
  nodes={ nodes }
  options={ options }
  onToggleExpanded={ onToggleExpanded }
  onActivate={ onActivate }
  onDeactivate={ onDeactivate }
  onFocus={ onFocus }
  onBlur={ onBlur }
  onInitialized={ onInitialized }
  onUpdateData={ onUpdateData }
  onMoveNode={ onMoveNode }
  onCopyNode={ onCopyNode }
  onEvent={ onEvent }
  onLoadNodeChildren={ onLoadNodeChildren }
  onChangeFilter={ onChangeFilter }
  onStateChange={ onStateChange }
/>

```

## Storybook
coming soon

## Docs
coming soon

## What's next
We would always love to hear suggestions for features & improvements - just open an issue.

Some things on our mind down the road:
* Context menu
* Checkbox & master checkbox support
* Add Demo & StoryBook
* Add Tests

## Contributing
Run once:
`npm run setup`

Run after changing code:
`npm run build`
`npm run start:example`

Please check the issues / project before starting to work on a feature / bug to make sure it's not already in progress.
