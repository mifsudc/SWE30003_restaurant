import { Order } from "../models/Order";
import { AbstractDispatcher } from "../observers/AbstractDispatcher";
import { OrderWaitExceededSubscriber } from "../observers/OrderWaitExceededSubscriber";
import { TimedEventDispatcher } from "../observers/TimedEventDispatcher";

export class OrderService extends AbstractDispatcher {

  orders: Order[];

  // singleton
  static instance: OrderService;
  static get = (): Promise<OrderService> => {
    return new Promise<OrderService>( resolve => {
      if (!OrderService.instance) {
        OrderService.instance = new OrderService();
      }
      resolve(OrderService.instance);
    });
  }
  
  constructor() {
    super();
    this.orders = [];
  }

  receive = async (order: Order) => {
    this.orders.push(order);
    const subscriber = new OrderWaitExceededSubscriber(order.orderId);
    this.subscribe(subscriber);
    const timedDispatcher = new TimedEventDispatcher();
    timedDispatcher.subscribe(subscriber);
    timedDispatcher.register(20000, { order: order, type: 'WaitExceeded' });
  }

  serve(order: Order) {
    this.orders = this.orders.filter( o => o !== order);
    this.notify({ order: order, type: 'OrderServed' })
  }
}