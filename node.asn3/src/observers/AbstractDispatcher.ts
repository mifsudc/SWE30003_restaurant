import { AbstractSubscriber } from "./AbstractSubscriber";

export abstract class AbstractDispatcher {
    subscribers: AbstractSubscriber[];

    constructor() {
      this.subscribers = [];
    }

    subscribe( subscriber: AbstractSubscriber) {
      this.subscribers.push(subscriber);
    }
    
    notify = (args: any) => {
      this.subscribers.forEach( s => s.notify(args) );
    }

    unsubscribe = (subscriber: AbstractSubscriber) => {
      this.subscribers = this.subscribers.filter( s => s !== subscriber );
    }
}