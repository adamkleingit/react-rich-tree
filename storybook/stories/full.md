# Demo
Use knobs to control behaviour of the tree:

<!-- STORY -->

# All options
| name  | type | description | default value | example |
|---|---|---|---|---|
| childrenField  | string  | A string representing the attribute of the node that contains the array of children.  | 'children'  | If your nodes have a `nodes` attribute, that contains the children, use: `{ childrenField: 'nodes' }`
| displayField  | string  | A string representing the attribute of the node to display  | 'name'  | if your nodes have a `title` attribute that should be displayed, use: `{ displayField: 'title' } `  |
| idField  | string  |  A string representing the attribute of the node that contains the unique ID. This will be used to construct the `path`, which is an array of IDs that point to the node. | 'id'  | if your nodes have a `uuid` attribute, that contains the unique key, use: `{ idField: 'uuid' }`  |
| getChildren  | (node: ITreeNode): any  | Function for loading a node's children. The function receives a TreeNode, and returns a value or a promise that resolves to the node's children. This function will be called whenever a node is expanded, the `hasChildren` field is true, and the `children` field is empty. The result will be loaded into the node's children attribute. | -  | `{ getChildren: (node:TreeNode) => fetch('/api/children/' + node.id) }` |
| actionMapping  | IActionMapping  | Rewire which trigger causes which action using this attribute, or create custom actions / event bindings |  | See action mapping section ahead  |
| allowDrag  | boolean or (node: ITreeNode): boolean | Specify if dragging tree nodes is allowed. This could be a boolean, or a function that receives a TreeNode and returns a boolean  | false  |  `{ allowDrag: (node) => node.isLeaf }` |
| allowDrop  |  boolean or (element: any, to: {parent: ITreeNode, index: number}, $event?: any): boolean | Specify whether dropping inside the tree is allowed. Receives either a boolean, or a function that receives the dragged element and returns a boolean.  | true  | Let's assume your nodes have a `type` property, and you only allow dropping nodes on similar types, use: `{ allowDrop: (element, {parent, index}) => parent.data.type === element.data.type }`  |
| levelPadding  |  number | Specify padding per node (integer). Each node will have padding-left value of level * levelPadding, instead of using the default padding for children. This option is good for example for allowing whole row selection, etc. You can alternatively use the tree-node-level-X classes to give padding on a per-level basis.  | 0  | `20`  |
| nodeClass  |  (node: ITreeNode): string | Specify a function that returns a class per node. Useful for styling the nodes individually  |  - |  `{ nodeClass: (node:TreeNode) => 'icon-' + node.data.icon }` |
| useVirtualScroll  | boolean  | Boolean flag to use the virtual scroll option. To use this option, you must supply the height of the container, and the height of each node in the tree. You can also specify height for the dropSlot which is located between nodes.  |  false | `{ useVirtualScroll: true, nodeHeight: 30, dropSlotHeight: 3 }` |
|  LoadingComponent | React.Component | See Custom Components section |
|  TreeNodeComponent | React.Component | See Custom Components section |
|  TreeNodeWrapperComponent | React.Component | See Custom Components section |
|  TreeNodeFullComponent | React.Component | See Custom Components section |