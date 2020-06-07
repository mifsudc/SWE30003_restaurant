import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  tableId;
  total;
  order;

  constructor(public modal: ModalController, public api: ApiService, public params: NavParams, public load: LoadingController ) {
    this.tableId = this.params.get('tableId');
    this.total = this.params.get('total');
    this.order = this.params.get('order');
  }

  ngOnInit() {  }

  print = order => {
    console.log('Would print invoice here through external device');
  }

  dismiss = () => {
    this.modal.dismiss({ paid: false });
  }

  process = async order => {
    const load = await this.load.create({
      message: 'Processing payment'
    });
    await load.present();

    const paymentDetails  = { fake: 'Stuff' };

    await this.api.post(`table/${ this.tableId }/payment`, paymentDetails);

    load.dismiss();
    this.modal.dismiss({ paid: true });
  }
}
