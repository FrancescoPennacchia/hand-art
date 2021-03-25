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


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [
    FirebaseAuthService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://metaphysics-production.artsy.net/',
            headers: new HttpHeaders({
              'x-access-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZmIxNDA4ZjIzNjQxYjAwMGU4NDAzZjEiLCJzYWx0X2hhc2giOiI1ZjYwN2Q1YWU0ODJlZDAyODBjYzY5MjYyNjZlNjVmYiIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwib3RwIjpmYWxzZSwiZXhwIjoxNjIwOTQzNTczLCJpYXQiOjE2MTU3NTk1NzQsImF1ZCI6IjVkNDA5OTZlNmU2MDQ5MDAwNzQ5MGZhMiIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI2MDRlODhkNmM1M2VjYTAwMTJiY2RmODUifQ.5E0ULQbPgcOn5DxU8YjmlGE-53g5OE3fvCjIbvnGUsk'
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
