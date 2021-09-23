import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FirebaseAuthService } from './service/firebase-auth.service';

import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import {InMemoryCache} from '@apollo/client/core';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SocialShareComponent } from './components/social-share/social-share.component';

@NgModule({
  declarations: [AppComponent, SocialShareComponent],
  entryComponents: [SocialShareComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'handart__db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [
    FirebaseAuthService,
    SplashScreen,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://metaphysics-production.artsy.net/',
            headers: new HttpHeaders({
              'x-access-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZmIxNDA4ZjIzNjQxYjAwMGU4NDAzZjEiLCJzYWx0X2hhc2giOiI1ZjYwN2Q1YWU0ODJlZDAyODBjYzY5MjYyNjZlNjVmYiIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwib3RwIjpmYWxzZSwiZXhwIjoxNjMwMzE0MzI0LCJpYXQiOjE2MjUxMzAzMjQsImF1ZCI6IjVkNDA5OTZlNmU2MDQ5MDAwNzQ5MGZhMiIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI2MGRkODU1NGZhMmNkMjAwMTQwMDZmYzMifQ.9Eas9rKrjsuCpdJ5YnBAFghsBnyBfvHaIwppJDv4Owc'
            })
          }),
        };
      },
      deps: [HttpLink],
    },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
