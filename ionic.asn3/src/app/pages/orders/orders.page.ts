import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders;

  constructor(public api: ApiService, public toast: ToastController) { }

  ngOnInit() {
    this.orders = [];
  }

  async ionViewWillEnter() {
    this.orders = await this.api.get('order/list', {});
  }

  serve = async order => {
    this.api.post('order/serve', order);
    this.orders = this.orders.filter( o => o !== order );
    (await this.toast.create({
      message: `Order for table ${order.tableId} served`,
      duration: 2000,
      position: 'top'
    })).present();
  }
}
