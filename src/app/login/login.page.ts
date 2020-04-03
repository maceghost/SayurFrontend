import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
// import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { Storage } from '@ionic/storage';
import { KeyboardFormComponent } from '../components/keyboard-form/keyboard-form.component'
import { KeypadFormComponent } from '../components/keypad-form/keypad-form.component'
// import Keyboard from "assets/keyboard/index";
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import Keyboard from "simple-keyboard";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // @IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit, AfterViewInit {

  // loading: LoadingProvider;
  // @ViewChild('userKeyboard') userKeyboard:KeyboardFormComponent;
  // @ViewChild('userKeypad') userKeypad:KeypadFormComponent;
  @ViewChild('pwInput') pwInput:ElementRef;


  username: string;
  password: string;
  // remember: boolean = false;
  // registerCredentials = { username: '', password: '' };
  value = "";
  // keyboard: Keyboard;
  entry_method = 1;
  type = "password";
  placeholder ="Enter Password";
  active = true;
  capslock = false;

  numberKeyboardOptions = {
    onChange: input => this.onChange(input),
    onKeyPress: button => this.onKeyPress(button),
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    layout: {
      default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{bksp} {enter}" ],
      shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp} {enter}"]
    },
    display: {
       "{escape}": "esc ⎋",
       "{tab}": "⇥",
       "{bksp}": "⌫",
       "{enter}": "↵",
       "{lock}": "⇪",
       "{shift}": "⇧",
       "{space}": "␣",
       "{controlleft}": "ctrl ⌃",
       "{controlright}": "ctrl ⌃",
       "{altleft}": "alt ⌥",
       "{altright}": "alt ⌥",
       "{metaleft}": "cmd ⌘",
       "{metaright}": "cmd ⌘"
    },
    mergeDisplay: true,
    debug: true
  };

  commonKeyboardOptions = {
      onChange: (input: string) => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      display: {
         "{escape}": "esc ⎋",
         "{tab}": "⇥",
         "{bksp}": "⌫",
         "{enter}": "↵",
         "{lock}": "⇪",
         "{shift}": "⇧",
         "{space}": "␣",
         "{controlleft}": "ctrl ⌃",
         "{controlright}": "ctrl ⌃",
         "{altleft}": "alt ⌥",
         "{altright}": "alt ⌥",
         "{metaleft}": "cmd ⌘",
         "{metaright}": "cmd ⌘"
      },
      // physicalKeyboardHighlight: true,
      // syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true
  };
  keyboard:Keyboard;
  // keyboardControlPad: Keyboard;
  // keyboardArrows: Keyboard;
  // keyboardNumPad: Keyboard;
  // keyboardNumPadEnd: Keyboard;

  // constructor(private storage: Storage, private nav: NavController, private authService: AuthLocalProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  constructor(
    private storage: Storage,
    private authService: AuthLocalProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    // private ds:DataService,

  ) {
    console.log('login page constructor');
  }


  ngOnInit() {
      this.value = '';
      // this.ds.

      console.log('ngOnInit : '+this.value);

  }

  ngAfterViewInit() {
    // this.keyboard.keyboardDiv.nativeElement
    this.value = '';
    console.log('ngAfterViewInit : '+this.value);
    this.startFullKeyboard();
  }

  startFullKeyboard() {
    if (this.keyboard) {
      this.removeKeyboard();
    }
    this.keyboard = new Keyboard("#loginKeyboardDiv",
          this.commonKeyboardOptions
    );
  }

  startNumericKeyboard() {
    if (this.keyboard) {
      this.removeKeyboard();
    }
    this.keyboard = new Keyboard("#loginKeyboardDiv",
          this.numberKeyboardOptions
    );
  }

  // rememberme(){
  //   this.remember = !this.remember;
  // }

  ionViewWillEnter () {
    // this.active = true;
    console.log('login ionViewWillEnter : '+this.value+" , keyboard : "+this.keyboard);
    this.value = '';
    if (this.keyboard) {
      this.keyboard.clearInput();
    }
    // this.keyboard = new Keyboard("#keyboardDiv",
    //       this.commonKeyboardOptions
    // );
    // if (this.keyboard) {
    //   this.keyboard.clear();
    // }
    // if (this.userKeyboard) {
    //   this.userKeyboard.clear();
    // }
    // if (this.userKeypad) {
    //   this.userKeypad.clear();
    // }

    // this.storage.get('remember').then((val) => {
    //   console.log('login remember : '+val);
    //   if (val == 'true'){
    //     // no username for LocalUnity
    //     this.remember = true;
    //     // this.storage.get('user').then((val) => {
    //     //   console.log('login setting user name : '+val);
    //     //   this.username = val;
    //     //
    //     // });
    //   }
    //   console.log(val);
    // });

    // this.showLoading()
    // this.authService.login(this.registerCredentials).subscribe(user => {
    //   if (user) {
    //     console.log(user)
    //     this.nav.setRoot('HomePage');
    //   } else {
    //     console.log('weird')
    //     // this.showError("Access Denied");
    //   }
    // },
    //   error => {
    //     console.log('weird')
    //
    //     // this.showError(error);
    //   });
    //   console.log('fired every time you enter the view');
  }


  // public login() {
    // this.showLoading()
    // this.authService.login({username: this.username, password: this.password}).subscribe(user => {
    //   if (user) {
    //     console.log(user)
    //     if (user.permission){
    //       if (this.remember){
    //         this.storage.set('remember', 'true');
    //         this.storage.set('user', this.username)
    //
    //       }
    //       this.nav.setRoot('HomePage');
    //
    //     }
    //     else {
    //       this.showPermissionError();
    //     }
    //   } else {
    //     this.showLoginError();
    //   }
    // },
    //   error => {
    //     console.log(error)
    //
    //     this.showLoginError();
    //   });
  // }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
          message: 'Please wait...',
          duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();

        console.log('Loading dismissed!');

    // this.loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   dismissOnPageChange: true
    // });
    // this.loading.present();
  }

  async presentAlert() {
    this.loadingCtrl.dismiss();
    const alert = await this.alertCtrl.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK']
      });

      await alert.present();
  }

  async showLoginError() {
    this.loadingCtrl.dismiss();

    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: '',
      message: 'Invalid Credentials',
      buttons: ['OK']
    });
    await alert.present();
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);
  }


  async showPermissionError() {
    this.loadingCtrl.dismiss();

    let alert = await this.alertCtrl.create({
      header:'',
      subHeader:'Access Denied',
      // title: 'Access Denied',
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
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);

  }

  ionViewDidLoad() {
    this.value = '';
    console.log("Login - ionViewDidLoad");
  }

  onChange = (input: string) => {
    this.value = input;
    this.keyboard.setInput(input);
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
     if (button === "{lock}") {
       this.capslock = !this.capslock;
       if (this.capslock) {
         this.keyboard.setOptions({
           layoutName: "shift"
         });
       } else {
         this.keyboard.setOptions({
           layoutName: "default"
         });
       }
     }
     if (button === "{shift}") {
       if ('shift' === this.keyboard.options.layoutName) {
         this.keyboard.setOptions({
           layoutName: "default"
         });
       } else {
         this.keyboard.setOptions({
           layoutName: "shift"
         });
       }
     } else {
       console.log('not shiftleft');
       if ('shift' === this.keyboard.options.layoutName) {
           console.log('layout already shift');
           if (!this.capslock) {
             console.log('capslock not set');
             this.keyboard.setOptions({
               layoutName: "default"
             });
           }
       }
     }


    // if (button === "{shift}" || button === "{lock}") this.handleShift();
    if (button === "{enter}") {
       this.enterKey(this.value);
    }

  };

  onInputChange = (event: any) => {
    // this.keyboard.setInput(event.target.value);
    this.value = event.target.value;
  };

  handleShift = () => {
    // let currentLayout = this.keyboard.options.layoutName;
    // let shiftToggle = currentLayout === "default" ? "shift" : "default";
    //
    // this.keyboard.setOptions({
    //   layoutName: shiftToggle
    // });
  };

  changeEntryMethod(event, type) {
     this.entry_method = type;
     switch (type) {
       case 1:
          this.startFullKeyboard();
          break;
      case 2:
          this.startNumericKeyboard();
          break;
     }
     event.target.blur();
  }

  enterKey(value) {
    if (value.length != 0){
      this.login(value);

    }
  }

  login(value) {
      console.log("logging in with : "+value);
      // this.auth.loginLocalSite(value);
      this.showLoading()
      let params = { password:value};
      this.authService.loginLocalSite(params).then(user => {
        if (user) {
          console.log(user)

          // if (user.permission){
          if (user.role){
            console.log("user has role : "+user.role);
            // if (this.remember){
            //   this.storage.set('remember', 'true');
            //   this.storage.set('user', this.username)
            //
            // }
            // if (this.keyboard) {
            //   this.keyboard.destroy();
            //   delete this.keyboard;
            // }
            this.value = '';
            this.pwInput.nativeElement.value = "";
            if (this.keyboard) {
              this.keyboard.clearInput();
            }
            // setTimeout(() => {
            //   console.log("login navigating to tabs ...");
            //   this.router.navigate(['tabs/home']);
            // },200);

            // this.nav.setRoot('HomePage');

          }
          else {
            this.showPermissionError();
            this.value = '';
            this.router.navigate(['login']);

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


  ngOnDestroy() {
    console.log("LoginForm ngOnDestroy ...");
  }

  ionViewDidLeave() {
    console.log("LoginForm ionViewDidLeave ...");
  }

  ionViewWillLeave() {
    // this.active = false;
    this.value = "";
    console.log("LoginForm ionViewWillLeave ...");
    // if (this.userKeyboard) {
    //     this.userKeyboard.destroy();
    // }
  }

  removeKeyboard() {
    if (this.keyboard) {
      this.keyboard.destroy();
      delete this.keyboard;
    }
  }


}
