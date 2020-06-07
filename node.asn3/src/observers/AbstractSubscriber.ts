import { AbstractDispatcher } from "./AbstractDispatcher";

export abstract class AbstractSubscriber {
  
  abstract notify(args: any): void;
  dispatchers: AbstractDispatcher[];

  constructor() {
    this.dispatchers = [];
  }

  subscribe(dispatcher: AbstractDispatcher): void {
    dispatcher.subscribe(this);
    this.dispatchers.push(dispatcher);
  }

  unsubscribe = () => {
    this.dispatchers.map( d => { d.unsubscribe(this); });
  }
}