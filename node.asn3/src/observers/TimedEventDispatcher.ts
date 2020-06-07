import { Order } from "../models/Order";
import { AbstractDispatcher } from "./AbstractDispatcher";

export class TimedEventDispatcher extends AbstractDispatcher {

  register = (time: number, payload: any): void => {
    setTimeout( () => {
      this.notify(payload);
    }, time);
  }
}