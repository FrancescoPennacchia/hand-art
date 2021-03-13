import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaoperePageRoutingModule } from './listaopere-routing.module';

import { ListaoperePage } from './listaopere.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaoperePageRoutingModule
  ],
  declarations: [ListaoperePage]
})
export class ListaoperePageModule {}
