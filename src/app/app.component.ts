import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Artworks', url: '/artworks', icon: 'color-palette' },
    { title: 'Artists', url: '/artists', icon: 'people' },
  ];

  public userPages = [
    { title: 'Sign-in', url: '/sign-in', icon: 'person' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private splashScreen: SplashScreen,
    private platform: Platform
  ) {
    this.initializeApp();
  }


  initializeApp() {
      this.platform.ready().then(() => {
        this.splashScreen.hide();
      });
  }
}
