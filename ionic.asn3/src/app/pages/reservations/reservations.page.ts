import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ReservationEditComponent } from 'src/app/modals/reservation-edit/reservation-edit.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  reservations;

  constructor(public modal: ModalController, public api: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.refresh();
  }

  add = async () => {
    const modal = await this.modal.create({ component: ReservationEditComponent });
    await modal.present();
    if ( (await modal.onDidDismiss()).data.created ) {
      this.refresh();
    }
  }

  refresh = async () => {
    this.reservations = await this.api.get('reservation/list', {});
  }
}
