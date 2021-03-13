import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaoperePage } from './listaopere.page';

const routes: Routes = [
  {
    path: '',
    component: ListaoperePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaoperePageRoutingModule {}
