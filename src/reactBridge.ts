import { reduce } from 'lodash';
import { TREE_EVENTS } from './constants/events';

export class EventEmitter {
  subscribers: any[] = [];

  emit(event) {
    this.subscribers.forEach((sub) => sub(event));
  }

  subscribe(fn) {
    this.subscribers.push(fn);
    const index = this.subscribers.length;

    return () => {
      this.subscribers.splice(index, 1);
    };
  }
}

export const events = reduce(
  TREE_EVENTS,
  (result, value) => ({
    ...result,
    [value]: new EventEmitter()
  }),
  {}
);
