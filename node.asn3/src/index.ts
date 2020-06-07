import { Menu } from "./models/Menu";
import { Table } from "./models/Table";
import { Application, Request, Response } from 'express';
import { OrderService } from "./services/OrderService";
import { ReservationService } from "./services/ReservationService";
import { PaymentService } from "./services/PaymentService";
import { PushService } from "./services/PushService";

const express: any = require('express');
const cors: any = require('cors');
const bp: any = require('body-parser');
const version: string = '1.0.0';
const port: number = 4000;
const app: Application = express();

const init = async () => {
  const menu: Menu = await Menu.get();
  const tables: Table[] = [];

  for (let i = 1; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      tables.push( new Table(`${i}${j}`) );
    }
  }
  tables.push( new Table('30') );
  tables.push( new Table('31') );

  app.use(cors());
  app.use(bp.json({ limit: '50mb', extended: true }))
  app.use(bp.urlencoded({ limit: '50mb', extended: true }))

  app.get('/', (req: Request, res: Response): void => {
    res.send(`Cuddly Wombat API v${version}`)
  });

  app.get('/table/list', (req: Request, res: Response): void => {
    res.send( tables.map( t => ({ id: t.id, seatingCover: t.seatingCover })) );
  });

  app.post('/table/:id/cover/:cover', (req: Request, res: Response): void => {
    tables.find( t => t.id === req.params.id )?.assignCover( Number(req.params.cover) );
    res.send();
  })

  app.get('/table/:id', async (req: Request, res: Response): Promise<void> => {
    const table = tables.find( t => t.id === req.params.id );
    if (!table) return;
    const orders = await table.flattenOrders();
    res.send({ ...table, orders });
  });

  app.get('/menu', (req: Request, res: Response): void => {
    res.send( menu.menuItems );
  });

  app.get('/order/list', async (req: Request, res: Response): Promise<void> => {
    const orderService: OrderService = await OrderService.get();
    res.send( orderService.orders );
  });

  app.post('/order/serve', async (req: Request, res: Response): Promise<void> => {
    const orderService: OrderService = await OrderService.get();
    const order = orderService.orders.find( o => o.orderId === req.body.orderId );
    if (!order) return;
    orderService.serve(order);
    res.send();
  });

  app.post('/table/:tableId/order/:orderId', async (req: Request, res: Response): Promise<void> => {
    const m = req.body;
    const table = tables.find( t => t.id === req.params.tableId );
    if (!table) {
      res.send();
      return;
    }

    const items = m.map( (i: { name: string, quantity: number }) => 
      ({ item: menu.getItem(i.name), quantity: i.quantity })
    );

    const order = table.createOrder( req.params.orderId, items );
    const orderService: OrderService = await OrderService.get();
    orderService.receive( order );
    res.send();
  });

  app.get('/reservation/list', async (req: Request, res: Response): Promise<void> => {
    const rs = await ReservationService.get();
    res.send( rs.reservations );
  });

  app.post('/reservation', async (req: Request, res: Response): Promise<void> => {
    const m = req.body;
    const rs = await ReservationService.get();
    rs.createReservation( m );
    res.send();
  });

  app.post('/table/:id/payment', async (req: Request, res: Response): Promise<void> => {
    const paymentService: PaymentService = await PaymentService.get();

    const table: Table | undefined = tables.find( t => t.id === req.params.id );
    if (!table) return;

    await paymentService.process( table );
    res.send();
  });

  app.post('/table/:id/reset', async (req: Request, res: Response): Promise<void> => {
    const table: Table | undefined = tables.find( t => t.id === req.params.id );
    if (!table) return;
    table.reset();
    res.send();
  });

  app.post('/subscribe', async (req: Request, res: Response): Promise<void> => {
    const subscription = req.body;
    const pushService: PushService = await PushService.get();
    pushService.registerSubscriber(subscription);
    res.send();
  });

  app.get('/test', async (req: Request, res: Response): Promise<void> => {
    const notification = {
      notification: {
        title: 'New notification',
        body: 'This is the body of the notification'
      }
    }
    const pushService: PushService = await PushService.get();
    await pushService.sendNotification(notification);
    res.send(notification);
  });

  app.listen(port, (): void => {
    console.log(`App v${version} listening at http://localhost:${port}`);
  })
}

init();