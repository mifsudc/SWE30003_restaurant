import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { v4 as uuid } from 'uuid';
import { PaymentComponent } from 'src/app/modals/payment/payment.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

  table;
  menu;
  section;

  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    public toast: ToastController,
    private location: Location,
    public alert: AlertController,
    public modal: ModalController) {
    this.table = { orders: []};
    this.menu = {};
    this.section = '';
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.table = await this.api.get(`table/${id}`, {});
    this.table.orders = this.table.orders.itemList;

    this.menu = (await this.api.get('menu', {}))
      .reduce( (acc, {name, price, category}) => {
        acc[category].push( ( { price, name } ) );
        return acc;
      }, { Chicken: [], Beef: [], Vegetarian: [], Drinks: [] } );

    this.section = Object.keys(this.menu)[0];

    this.order.state = [];
  }

  checkReset = async () => {
    const confirm = await new Promise<boolean>( async resolve => {
      (await this.alert.create({
        message: 'This table has not paid. Reset anyway?',
        buttons: [
          { text: 'Cancel', role: 'cancel', handler: () => resolve(false) },
          { text: 'Confirm', handler: () => resolve(true) },
        ]
      })).present();
    });

    if (confirm) {
      this.reset();
    }
  }

  reset = async () => {
    await this.api.post(`table/${this.table.id}/reset`, {});
    (await this.toast.create({
      message: 'Table cleared.',
      duration: 3000,
      position: 'top'
    })).present();
    this.location.back();
  }

  order = {
    state: [],

    total: () => {
      return(this.table.orders.reduce( (acc, { quantity, item }) => acc + quantity * Number(item.price), 0) +
      this.order.state.reduce( (acc, {quantity, item }) => acc + quantity * Number(item.price), 0) ).toFixed(2)},

    add: (item) => {
      const orderedItem = this.order.state.find( i => i.item.name === item.name );
      if (orderedItem)
        orderedItem.quantity++;
      else
        this.order.state.push({ quantity: 1, item });
    },

    remove: (item) => {
      const orderedItem = this.order.state.find( i => i.item.name === item.name );
      if (!--orderedItem.quantity) {
        this.order.state = this.order.state.filter( i => i.item.name !== item.name );
      }
    },

    send: async (tableId, order) => {
      await this.api.post(`table/${tableId}/order/${uuid()}`,
        order.map( ({ item, quantity, }) => ({ name: item.name, quantity}))
      );
      (await this.toast.create({ message: 'Order Sent.', duration: 3000, position: 'top' })).present();
      this.location.back();
    },

    pay: async () => {
      const modal = await this.modal.create({
        component: PaymentComponent,
        componentProps: {
          tableId: this.table.id,
          order: this.table.orders,
          total: this.order.total()
        }
      });

      await modal.present();

      if ( (await modal.onDidDismiss()).data.paid ) {
        this.reset();
      }
    }
  };
}
