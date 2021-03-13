import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaautoriPage } from './listaautori.page';

const routes: Routes = [
  {
    path: '',
    component: ListaautoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaautoriPageRoutingModule {}
