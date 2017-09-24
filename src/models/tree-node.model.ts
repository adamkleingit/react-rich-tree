import { observable, computed, action } from 'mobx';
import { TreeModel } from './tree.model';
import { TreeOptions } from './tree-options.model';
import { ITreeNode } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';

import * as _ from 'lodash';
const { first, last, compact } = _;

export class TreeNode implements ITreeNode {
  @computed get isHidden() { return this.treeModel.isHidden(this); };
  @computed get isExpanded() { return this.treeModel.isExpanded(this); };
  @computed get isActive() { return this.treeModel.isActive(this); };
  @computed get isFocused() { return this.treeModel.isNodeFocused(this); };

  @observable children: TreeNode[];
  @observable index: number;
  @observable position = 0;
  @observable height: number;
  @computed get level(): number {
    return this.parent ? this.parent.level + 1 : 0;
  }
  @computed get path(): string[] {
    return this.parent ? [...this.parent.path, this.id] : [];
  }
  @computed get pathToNode(): string[] {
    return this.parent ? [...this.parent.pathToNode, 'children', this.getIndexInParent().toString()] : [];
  }
  @computed get pathToNodeInData(): string[] {
    return this.parent ? compact([
      ...this.parent.pathToNodeInData,
      this.realParent ? this.options.childrenField : null,
      this.getIndexInParent().toString()
    ]) : [];
  }

  get elementRef(): any {
    throw `Element Ref is no longer supported since introducing virtual scroll\n
      You may use a template to obtain a reference to the element`;
  }

  private _originalNode: any;
  get originalNode() { return this._originalNode; };

  constructor(public data: any, public parent: TreeNode, public treeModel: TreeModel, index: number) {
    if (this.id === undefined || this.id === null) {
      this.id = uuid();
    } // Make sure there's a unique id without overriding existing ids to work with immutable data structures
    this.index = index;

    if (this.getField('children')) {
      this._initChildren();
    }
  }

  // helper get functions:
  get hasChildren(): boolean {
    return !!(this.data.hasChildren || (this.children && this.children.length > 0));
  }
  get isCollapsed(): boolean { return !this.isExpanded; }
  get isLeaf(): boolean { return !this.hasChildren; }
  get isRoot(): boolean { return this.parent.data.virtual; }
  get realParent(): TreeNode { return this.isRoot ? null : this.parent; }

  // proxy functions:
  get options(): TreeOptions { return this.treeModel.options; }
  fireEvent(event) { this.treeModel.fireEvent(event); }

  // field accessors:
  get displayField() {
    return this.getField('display');
  }

  get id() {
    return this.getField('id');
  }

  set id(value) {
    this.setField('id', value);
  }

  getField(key) {
    return this.data[this.options[`${key}Field`]];
  }

  setField(key, value) {
    this.data[this.options[`${key}Field`]] = value;
  }

  // traversing:
  _findAdjacentSibling(steps, skipHidden = false) {
    return this._getParentsChildren(skipHidden)[this.index + steps];
  }

  findNextSibling(skipHidden = false) {
    return this._findAdjacentSibling(+1, skipHidden);
  }

  findPreviousSibling(skipHidden = false) {
    return this._findAdjacentSibling(-1, skipHidden);
  }

  getVisibleChildren() {
    return this.visibleChildren;
  }

  @computed get visibleChildren() {
    return (this.children || []).filter((node) => !node.isHidden);
  }

  getFirstChild(skipHidden = false) {
    let children = skipHidden ? this.visibleChildren : this.children;

    return first(children || []);
  }

  getLastChild(skipHidden = false) {
    let children = skipHidden ? this.visibleChildren : this.children;

    return last(children || []);
  }

  findNextNode(goInside = true, skipHidden = false) {
    return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
           this.findNextSibling(skipHidden) ||
           this.parent && this.parent.findNextNode(false, skipHidden);
  }

  findPreviousNode(skipHidden = false) {
    let previousSibling = this.findPreviousSibling(skipHidden);
    if (!previousSibling) {
      return this.realParent;
    }
    return previousSibling._getLastOpenDescendant(skipHidden);
  }

  _getLastOpenDescendant(skipHidden = false) {
    const lastChild = this.getLastChild(skipHidden);
    return (this.isCollapsed || !lastChild)
      ? this
      : lastChild._getLastOpenDescendant(skipHidden);
  }

  private _getParentsChildren(skipHidden = false): any[] {
    const children = this.parent &&
      (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);

    return children || [];
  }

  getIndexInParent(skipHidden = false) {
    return this._getParentsChildren(skipHidden).indexOf(this);
  }

  isDescendantOf(node: TreeNode) {
    if (this === node) return true;
    else return this.parent && this.parent.isDescendantOf(node);
  }

  getNodePadding(): string {
    return this.options.levelPadding * (this.level - 1) + 'px';
  }

  getClass(): string {
    return [this.options.nodeClass(this), `tree-node-level-${ this.level }`].join(' ');
  }

  onDrop($event) {
    this.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this, index: 0, dropOnNode: true }
    });
  }

  allowDrop = (element, $event?) => {
    return this.options.allowDrop(element, { parent: this, index: 0 }, $event);
  }

  allowDrag() {
    return this.options.allowDrag(this);
  }

  // helper methods:
  loadNodeChildren() {
    if (!this.options.getChildren) {
      return Promise.resolve(); // Not getChildren method - for using redux
    }
    return Promise.resolve(this.options.getChildren(this))
      .then((children) => {
        if (children) {
          this.setField('children', children);
          this._initChildren();
          this.children.forEach((child) => {
            if (child.getField('isExpanded') && child.hasChildren) {
              child.expand();
            }
          });
      }}).then(() => {
        this.fireEvent({
          eventName: TREE_EVENTS.loadNodeChildren,
          node: this
        });
      });
  }

  expand() {
    if (!this.isExpanded) {
      return this.toggleExpanded();
    }

    return Promise.resolve();
  }

  collapse() {
    if (this.isExpanded) {
      this.toggleExpanded();
    }

    return this;
  }

  doForAll(fn: (node: ITreeNode) => any) {
    Promise.resolve(fn(this)).then(() => {
      if (this.children) {
        this.children.forEach((child) => child.doForAll(fn));
      }
    });
  }

  expandAll() {
    this.doForAll((node) => node.expand());
  }

  collapseAll() {
    this.doForAll((node) => node.collapse());
  }

  ensureVisible() {
    if (this.realParent) {
      this.realParent.expand();
      this.realParent.ensureVisible();
    }

    return this;
  }

  toggleExpanded() {
    return this.setIsExpanded(!this.isExpanded);
  }

  setIsExpanded(value) {
    if (this.hasChildren) {
      this.treeModel.setExpandedNode(this, value);

      if (!this.children && this.hasChildren && value) {
        return this.loadNodeChildren();
      }
    }

    return Promise.resolve();
  };

  setIsActive(value, multi = false) {
    this.treeModel.setActiveNode(this, value, multi);
    if (value) {
      this.focus(this.options.scrollOnSelect);
    }

    return this;
  }

  toggleActivated(multi = false) {
    this.setIsActive(!this.isActive, multi);

    return this;
  }

  setActiveAndVisible(multi = false) {
    this.setIsActive(true, multi)
      .ensureVisible();

    setTimeout(this.scrollIntoView.bind(this));

    return this;
  }

  scrollIntoView(force = false) {
    this.treeModel.virtualScroll.scrollIntoView(this, force);
  }

  focus(scroll = true) {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(this);
    if (scroll) {
      this.scrollIntoView();
    }
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.blur, node: previousNode });
    }
    this.fireEvent({ eventName: TREE_EVENTS.focus, node: this });

    return this;
  }

  blur() {
    let previousNode = this.treeModel.getFocusedNode();
    this.treeModel.setFocusedNode(null);
    if (previousNode) {
      this.fireEvent({ eventName: TREE_EVENTS.blur, node: this });
    }

    return this;
  }

  setIsHidden(value) {
    this.treeModel.setIsHidden(this, value);
  }

  hide() {
    this.setIsHidden(true);
  }

  show() {
    this.setIsHidden(false);
  }

  mouseAction(actionName: string, $event, data: any = null) {
    this.treeModel.setFocus(true);

    const actionMapping = this.options.actionMapping.mouse;
    const action = actionMapping[actionName];

    if (action) {
      action(this.treeModel, this, $event, data);
    }
  }

  getSelfHeight() {
    return this.options.nodeHeight(this);
  }

  @action _initChildren() {
    this.children = this.getField('children')
      .map((c, index) => new TreeNode(c, this, this.treeModel, index));
  }
}

function uuid() {
  return Math.floor(Math.random() * 10000000000000);
}