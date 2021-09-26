import {Component, OnInit} from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {NavController, Platform} from '@ionic/angular';
import {UtenteService} from './service/utente.service';
import {BehaviorSubject} from 'rxjs';
import {UtenteResponse} from './model/utenteResponse.model';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  private utente$: BehaviorSubject<UtenteResponse>;
  private token: string;
  private utente: UtenteResponse;

  public appPagesNotLog = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Artworks', url: '/artworks', icon: 'color-palette' },
    { title: 'Artists', url: '/artists', icon: 'people' }
  ];

  public appPagesIsLog = [
    { title: 'Favorites Artworks', url: '/artworks', icon: 'color-palette' },
    { title: 'Favorites Artists', url: '/artists', icon: 'people' }
  ];

  public userNotLog = [
    { title: 'Sign-in / Sign-up', url: '/sign-in', icon: 'log-in' }
  ];

  public userIsLog = [
    { title: 'Your profile', url: '/profile', icon: 'person' },
    { title: 'Logout', url: '/logout', icon: 'log-out' }
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private splashScreen: SplashScreen,
    private platform: Platform,
    private navController: NavController,
    private utenteService: UtenteService,
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }

  initializeApp() {
      this.platform.ready().then(() => {
        this.splashScreen.hide();
      });
  }

  profilo() {
    this.navController.navigateForward('profile');
  }

  logout() {
    this.utenteService.logout();
    this.utente = null;
    this.navController.navigateRoot('home');
  }
}
