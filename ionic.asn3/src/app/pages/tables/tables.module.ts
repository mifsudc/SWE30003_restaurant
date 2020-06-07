import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tables-routing.module';

import { TablesPage } from './tables.page';
import { TableCoverComponent } from 'src/app/modals/table-cover/table-cover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablesPageRoutingModule
  ],
  declarations: [TablesPage, TableCoverComponent],
  entryComponents: [TableCoverComponent]
})
export class TablesPageModule {}
