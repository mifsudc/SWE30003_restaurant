import { MenuItem } from "./MenuItem";
import { OrderWaitExceededSubscriber } from "../observers/OrderWaitExceededSubscriber";

export class Order {
  itemList: { item: MenuItem, quantity: number }[];
  tableId: string;
  orderId: string;
  subscriber: OrderWaitExceededSubscriber | null;

  constructor(tableId: string, orderId: string) {
    this.itemList = [];
    this.tableId = tableId;
    this.orderId = orderId;
    this.subscriber = null;
  }
}