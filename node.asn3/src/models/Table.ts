import { Order } from "./Order";
import { MenuItem } from "./MenuItem";

import * as async from 'async';

export class Table {
  
  seatingCover: number;
  orders: Order[];
  id: string;

  constructor(id: string) {
    this.id = id;
    this.seatingCover = 0;
    this.orders = [];
  }

  assignCover(cover: number) {
    this.seatingCover = cover;
  }

  reset() {
    this.seatingCover = 0;
    this.orders = [];
  }

  createOrder = ( orderId: string, items: { item: MenuItem, quantity: number }[] ): Order => {
    const order = new Order(this.id, orderId);
    order.itemList = items;
    this.orders.push( order );
    console.log(order)
    return order;
  }

  flattenOrders = (): Promise<Order> => {
    return new Promise<Order>( async resolve => {
      const result = new Order(this.id, '');
      await async.eachSeries( this.orders, (order, next) => {
        async.eachSeries( order.itemList, (item, innerNext) => {
          const orderItem = result.itemList.find( i => i.item === item.item );
          if (orderItem)
            orderItem.quantity += item.quantity;
          else
            result.itemList.push({ ...item });
          innerNext();
        }, () => next() );
      });
      resolve(result);
    });
  }
}