import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaautoriPageRoutingModule } from './listaautori-routing.module';

import { ListaautoriPage } from './listaautori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaautoriPageRoutingModule
  ],
  declarations: [ListaautoriPage]
})
export class ListaautoriPageModule {}
