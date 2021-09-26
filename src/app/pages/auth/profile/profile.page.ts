import { Component, OnInit } from '@angular/core';
import {UtenteResponse} from '../../../model/utenteResponse.model';
import {UtenteService} from '../../../service/utente.service';
import {NavController} from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  utente: UtenteResponse;

  constructor(
    private navController: NavController,
    private location: Location,
    private utenteService: UtenteService
  ) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }

  lastPage(){
    this.location.back();
  }

  signOut() {
    this.utenteService.logout();
    this.utente = null;
    this.navController.navigateRoot('home');
  }

}
