import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss'],
})
export class ReservationEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public modal: ModalController,
    public toast: ToastController,
    public api: ApiService ) {
      this.form = this.fb.group({
        name: [null, Validators.required],
        time: [null, Validators.required],
        cover: [null, Validators.required],
        contact: [null, Validators.required],
        notes: ['']
      });
    }

  ngOnInit() {
  }

  dismiss = () => {
    this.modal.dismiss({ created: false });
  }

  confirm = async () => {
    await this.api.post('reservation', this.form.value);

    (await this.toast.create({
      message: 'Reservation created',
      duration: 2000,
      position: 'top'
    }) ).present();

    this.modal.dismiss({ created: true });
  }
}
