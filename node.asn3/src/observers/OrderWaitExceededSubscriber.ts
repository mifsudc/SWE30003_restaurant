import { AbstractSubscriber } from "./AbstractSubscriber";
import { PushService } from "../services/PushService";

export class OrderWaitExceededSubscriber extends AbstractSubscriber {
  orderId: string;

  constructor(orderId: string) {
    super();
    this.orderId = orderId;
  }

  async notify(args: any) {
    if (args.order.orderId === this.orderId ) {
      if (args.type === 'WaitExceeded') {
        const push = await PushService.get();
        const notification = {
          notification: {
            title: 'Order taking too long!',
            body: `Customers at table ${ args.order.tableId } have been waiting too long for their order.`
          }
        };
        await push.sendNotification(notification);
      }
      this.unsubscribe();
    }
  }
}