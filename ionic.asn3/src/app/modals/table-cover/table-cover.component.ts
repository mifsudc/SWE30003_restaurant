import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-cover',
  templateUrl: './table-cover.component.html',
  styleUrls: ['./table-cover.component.scss'],
})
export class TableCoverComponent implements OnInit {

  id;
  cover;

  constructor(public modal: ModalController, public params: NavParams, public api: ApiService, public router: Router) { }

  ngOnInit() {
    this.id = this.params.get('id');
  }

  validate = (cover) => /^\d+$/g.test(cover);

  accept = async (cover) => {
    await this.api.post(`table/${this.id}/cover/${cover}`, {});
    this.router.navigate([ 'table', this.id ]);
    await this.modal.dismiss();
  }
}
