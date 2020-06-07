import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TableCoverComponent } from 'src/app/modals/table-cover/table-cover.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {

  public tables;

  constructor(public api: ApiService, public modal: ModalController, public router: Router) {
    this.tables = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.tables = await this.api.get('table/list', {});
  }

  displayOrInitTable = async (table) => {

    if (!table.seatingCover) {
      const modal = await this.modal.create({
        component: TableCoverComponent,
        componentProps: { id: table.id }
      });

      await modal.present();
    }
    else {
      this.router.navigate([ 'table', table.id ]);
    }
  }
}
