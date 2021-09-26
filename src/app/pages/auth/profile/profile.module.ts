import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageResolver } from './profile.resolver';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
