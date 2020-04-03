import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
// import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { Storage } from '@ionic/storage';
import { KeyboardFormComponent } from '../components/keyboard-form/keyboard-form.component'
import { KeypadFormComponent } from '../components/keypad-form/keypad-form.component'
// import Keyboard from "assets/keyboard/index";
// import { NavController, AlertController, LoadingController, Loading, IonicPage } from '@ionic/angular';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

import Keyboard from "simple-keyboard";

// import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event, ActivatedRoute } from '@angular/router';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // @IonicPage()

@Component({
  selector: 'page-cloud-login',
  templateUrl: './cloud-login.page.html',
  styleUrls: ['./cloud-login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CloudLoginPage{

  loading: any;
  username: string;
  password: string;
  remember: boolean = false;
  // registerCredentials = { username: '', password: '' };

  constructor(private router: Router, private storage: Storage, private nav: NavController, private authService: AuthenticateProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }


  rememberme(){
    this.remember = !this.remember;
  }

  ionViewWillEnter () {
    // this.login()

    // this.storage.get('remember').then((val) => {
    //   if (val == 'true'){
    //     this.remember = true;
    //     this.storage.get('user').then((val) => {
    //       this.username = val;
    //
    //     });
    //
    //   }
    // });

  }
  public login() {
    this.showLoading()

    this.authService.login({username: this.username, password: this.password}).subscribe(user => {
      if (user) {
        console.log(user)
        if (user.permission){
          this.dismissLoading()
          if (this.remember){
            this.storage.set('remember', 'true');
            this.storage.set('user', this.username)

          }
          this.router.navigate(['sites']);

        }
        else {
          this.showPermissionError();
        }
      } else {
        this.showLoginError();
      }
    },
      error => {
        console.log(error)

        this.showLoginError();
      });
  }

  public login1() {
    this.showLoading()

    this.authService.internal_login().subscribe(user => {
      if (user) {
        console.log(user)
        if (user.permission){
          if (this.remember){
            this.storage.set('remember', 'true');
            this.storage.set('user', this.username)

          }
          this.router.navigate(['sites']);

        }
        else {
          this.showPermissionError();
        }
      } else {
        this.showLoginError();
      }
    },
      error => {
        console.log(error)

        this.showLoginError();
      });
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // dismissOnPageChange: true
    });
    await this.loading.present();
  }
  async dismissLoading() {
    return await this.loading.dismiss();
  }
  async showLoginError() {
    await this.loading.onDidDismiss();

    const alert = await this.alertCtrl.create({
      header: 'Invalid Credentials',
      buttons: ['OK']
    });
    await alert.present();
  }
  async showPermissionError() {
    await this.loading.onDidDismiss();

    const alert = await this.alertCtrl.create({
      header: 'Access Denied',
      message: 'Your account does not currently have access to mobile functions. Please contact customer support with any questions.',
          // buttons: [
          //   {
          //     text: 'Phone',
          //     // role: 'cancel',
          //     handler: () => {
          //       console.log('Cancel clicked');
          //     }
          //   },
          //   {
          //     text: 'Email',
          //     handler: () => {
          //       console.log('Buy clicked');
          //     }
          //   }
          // ]

      // title: 'It looks like you don't currently have access to the mobile app. Please call or e-mail customer support with questions',
      buttons: ['OK']
    });
    await alert.present();
  }

  ionViewDidLoad() {

  }


}
