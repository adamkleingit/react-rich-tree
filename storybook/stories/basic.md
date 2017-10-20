# React Rich Tree

## Demo
<!-- STORY -->

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

nodes = [
  {
    name: 'root1',
    children: [
      { name: 'child1.1' },
      { name: 'child1.2' }
    ]
  },
  {
    name: 'root2',
    children: [
      { name: 'child2.1' },
      { name: 'child2.2' }
    ]
  }
];

options = {}

onEvent = (event) => console.log(event)

<Tree nodes={ nodes } options={ options } onEvent={ onEvent }/>

```
