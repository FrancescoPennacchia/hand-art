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
    { title: 'Home', url: '/', icon: 'home' },
    { title: 'Opere', url: '/listaopere', icon: 'color-palette' },
    { title: 'Autori', url: '/listaautori', icon: 'people' },
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
