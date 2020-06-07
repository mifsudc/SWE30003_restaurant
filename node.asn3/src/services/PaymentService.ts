import { Table } from "../models/Table";

export class PaymentService {
  
  // dummy handler
  paymentHandler: null;

  constructor() {}

  static instance: PaymentService;
  static get = (): Promise<PaymentService> => {
    return new Promise<PaymentService>( resolve => {
      if (!PaymentService.instance) {
        PaymentService.instance = new PaymentService();
      }
      resolve(PaymentService.instance);
    });
  }

  process( table: Table ): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, 5000 ));
  }
}