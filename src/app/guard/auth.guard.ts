import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {UtenteService} from '../service/utente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private utenteService: UtenteService, private navController: NavController) {
  }

  canActivate(): Observable<boolean> {

    return this.utenteService.isLogged()
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          console.log(isLoggedIn);
          if (!isLoggedIn) {
            this.navController.navigateRoot('sign-in');
            return false;
          }
          return true;
        })
      );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }

}
