import {Component, NgZone, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../../service/firebase-auth.service';
import { Subscription } from 'rxjs';
import {Account, UtenteService} from '../../../service/utente.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Utente} from '../../../model/utente.model';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
})
export class SignInPage implements OnInit{
  private loginFormModel: FormGroup;
  private loginTitle = 'Credenziali Errate';
  private loginSubTitle = 'Credenziali Errate';

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private navController: NavController,
    private utenteService: UtenteService
  ) {

  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      username: ['Francesco', Validators.compose([
        Validators.required
      ])],
      password: ['ciao1234', Validators.compose([
        Validators.required
      ])]
    });
  }

  signInWithUsername() {
    const account: Account = this.loginFormModel.value;
    this.utenteService.login(account).subscribe((utente: Utente) => {
        this.loginFormModel.reset();
        this.navController.navigateRoot('home');
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.error('login request error: ' + err.status);
          this.showLoginError();
        }
      });
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.loginTitle,
      message: this.loginSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }





    /*
    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService.getRedirectResult()
    .subscribe(result => {
      if (result.user) {
        this.redirectLoggedUserToProfilePage();
      } else if (result.error) {
        this.submitError = result.error;
      }
    });*/
  /*
  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['profile']);
    });
  }

  signInWithEmail() {
    this.authService.signInWithEmail(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      // navigate to user profile
      this.redirectLoggedUserToProfilePage();
    })
    .catch(error => {
      this.submitError = error.message;
    });
  }


   */
/*
  facebookSignIn() {
    this.authService.signInWithFacebook()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.navController.navigateRoot('home');
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }

  googleSignIn() {
    this.authService.signInWithGoogle()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.navController.navigateRoot('home');
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }

  twitterSignIn() {
    this.authService.signInWithTwitter()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Twitter Access Token. You can use it to access the Twitter API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.navController.navigateRoot('home');
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }*/
}
