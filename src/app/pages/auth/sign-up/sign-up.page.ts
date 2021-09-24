import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../../service/firebase-auth.service';
import { Subscription } from 'rxjs';
import {UtenteService} from '../../../service/utente.service';
import {Utente} from '../../../model/utente.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  signUpForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;
  user: Utente;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name must be at least 4 characters long.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' },
      { type: 'minlength', message: 'Surname must be at least 4 characters long.' }
    ],
    'username': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 4 characters long.' }
    ]
  };

  constructor(
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService,
    private utenteService: UtenteService
  ) {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'name': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      'username': new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
      'surname': new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ]))
    });
    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService.getRedirectResult()
    .subscribe(result => {
      if (result.user) {
        this.redirectLoggedUserToProfilePage();
      } else if (result.error) {
        this.submitError = result.error;
      }
    });
  }

  // this.signUpForm.value['email']
  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['profile']);
    });
  }

  signUpWithEmail() {
    this.user.username = this.signUpForm.value['username'];
    this.user.nome = this.signUpForm.value['name'];
    this.user.cognome = this.signUpForm.value['surname'];
    this.user.email = this.signUpForm.value['email'];
    this.user.password = this.signUpForm.value['password'];

    //this.utenteService.
  }

  facebookSignUp() {
    this.authService.signInWithFacebook()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.redirectLoggedUserToProfilePage();
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }

  googleSignUp() {
    this.authService.signInWithGoogle()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.redirectLoggedUserToProfilePage();
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }

  twitterSignUp() {
    this.authService.signInWithTwitter()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
      }
      // This gives you a Twitter Access Token. You can use it to access the Twitter API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
      this.redirectLoggedUserToProfilePage();
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }
}
