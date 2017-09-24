import { object } from 'prop-types';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';

export const TreeComponentsContextType = {
  treeModel: object
};

export interface ITreeComponentsContext {
  treeModel: TreeModel;
}

export interface ITreeCustomComponent {
  node: TreeNode;
}
