# Action Mapping

Action mapping is used to determine what happens on certain user actions.
For example what happens when the user click a node, or presses the down arrow.

Example:
```
import { KEYS, TREE_ACTIONS } from 'react-rich-tree';

options = {
  actionMapping: {
    mouse: {
      click: TREE_ACTIONS.TOGGLE_SELECTED_MULTI,
      contextMenu: (tree, node, event) => // do something
    },
    keys: {
      [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_EXPANDED
    }
  }
};
```

# TREE_ACTIONS
The callbacks have a signature `(tree:TreeModel, node:TreeNode, event) => ...`.
You can use some predefined actions by importing `{ TREE_ACTIONS }` from the library, which are just functions.
Checkout the code in `tree-options.model.ts` to see the available actions and what they do.

# The Default
```
{
  mouse: {
    click: TREE_ACTIONS.TOGGLE_SELECTED,
    dblClick: null,
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
}
```

# Keys
For keyboard actions, the keycode is the key of the actionMapping object.
You can use predefined key codes by importing `{ KEYS }` from the library, or specify any keycode you'd like

# Demo
Use knobs to control behaviour of the tree:

<!-- STORY -->
