import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePageRoutingModule } from './table-routing.module';

import { TablePage } from './table.page';
import { PaymentComponent } from 'src/app/modals/payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablePageRoutingModule
  ],
  declarations: [TablePage, PaymentComponent],
  entryComponents: [PaymentComponent]
})
export class TablePageModule {}
