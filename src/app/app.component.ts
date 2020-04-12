import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthLocalProvider } from './providers/authenticate/authlocal';
import { PopupService } from './providers/popup.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { environment }  from  '../environments/environment';

const PROVISION_STATE = 0;
const LOGIN_STATE = 1;
const AUTH_STATE = 2;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  // @ViewChild('back') backButtonElement:ElementRef;
  homeButton = false;
  backButton = false;
  modalPage:any;
  modalOpen = false;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  urlAfterRedirects:string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private route:ActivatedRoute,
    public auth: AuthLocalProvider,
    public modalCtrl: ModalController,
    public popup: PopupService,
    private idle: Idle, private keepalive: Keepalive,

    // private state: RouterStateSnapshot
  ) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    // idle.setIdle(60*3);
    idle.setIdle(10000000000);

    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(1);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.auth.loginTimedOut()
      // this.router.navigate(['login']);
    });

    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
        // this.childModal.show();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();

    this.initializeApp();
    this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                // Show loading indicator
                console.log('NavStart : '+event);
            }

            if (event instanceof NavigationEnd) {

                // let route = this.router.config.find(r => r.path === event.toString());
                // // Hide loading indicator
                // // console.log('NavEnd - extras : '+this.router.getCurrentNavigation().extras);
                // // if (route && route.data) {
                // //   console.log('Route has data : '+route.data);
                // // }
                // console.log('NavEnd : '+route+' , '+event);


                // console.log('nav listener triggered : ');
                // let view = this.nav.getActive();
            // //prints out component name as string
                // console.log('current Page : '+this.auth.currentPage);
                // this.auth.currentPage = data.component.name;

            // prints out component name as string

                // console.log('navEnd router : ', this.router);
                // this.backButton = this.showBackButton();
                // console.log('navEnd route : ', this.route);
                // this.backButton = true;

                this.auth.loginTime = Date.now();
                console.log('navEnd event : ', event);
                this.urlAfterRedirects = event.urlAfterRedirects;
                let url = event.urlAfterRedirects;
                if (url.indexOf('home/') > 0) {
                   this.backButton = true;
                } else {
                  this.backButton = false;
                }
                console.log('currentNavigation : ', this.router.getCurrentNavigation());
             }

            if (event instanceof NavigationError) {
                // Hide loading indicator
                // Present error to user
                console.log(event.error);
            }
        });

  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (!environment.sayur){
        this.auth.authState.subscribe(state => {
          switch (state) {
            case PROVISION_STATE:
              this.router.navigate(['provision']);
              break;
            case LOGIN_STATE:
              this.router.navigate(['login']);
              break;
            case AUTH_STATE:
              this.router.navigate(['tabs']);
              break;

          }
          // if (state) {
          //   this.router.navigate(['tabs']);
          // } else {
          //   this.router.navigate(['login']);
          // }
        });
      }
      else{
        this.router.navigate(['storefront-mobile']);
      }

    });
  }

  getConfigName() {
    if (this.auth.location) {
      return this.auth.location.name
    }
    return '';
  }

  logout() {
    console.log('logout ...');
    this.auth.user = null;
    this.auth.locations = null;
    if (this.auth.datainterval) {
      clearInterval(this.auth.datainterval)
    }
    this.router.navigate(['login']);
  }

  showBackButton() {
    let show = false;

    if (this.router &&
        this.router.getCurrentNavigation() &&
        this.router.getCurrentNavigation().extras &&
        this.router.getCurrentNavigation().extras.state &&
        this.router.getCurrentNavigation().extras.state.back ) {
          // console.log('showBackButton returning true');
        show = true;
    }
    return show;
  }

  back() {
     this.router.navigate([this.auth.lastUrl])
     // console.log('back() - ');
     // if (this.urlAfterRedirects) {
     //    let idx = this.urlAfterRedirects.lastIndexOf("/");
     //    if (idx > 0) {
     //      let url = this.urlAfterRedirects.substr(0, idx);
     //      console.log('back() - navigating to url : ',url);
     //      this.router.navigate([url]);
     //    }
     //
     // }
    // this.router.navigate(['../'], { relativeTo: this.route });

    // this.router.navigate(['/tabs/home']);
    // this.router.navigate(['.'], { relativeTo: this.route.parent });

  }

  home() {
     this.router.navigate(['/tabs/home'])
     // console.log('back() - ');
     // if (this.urlAfterRedirects) {
     //    let idx = this.urlAfterRedirects.lastIndexOf("/");
     //    if (idx > 0) {
     //      let url = this.urlAfterRedirects.substr(0, idx);
     //      console.log('back() - navigating to url : ',url);
     //      this.router.navigate([url]);
     //    }
     //
     // }
    // this.router.navigate(['../'], { relativeTo: this.route });

    // this.router.navigate(['/tabs/home']);
    // this.router.navigate(['.'], { relativeTo: this.route.parent });

  }

  schedulesExpanded = false;
  schedules:any [];
  // toggleSchedules() {
  //   console.log('toggleSchedules()...');
  //   this.schedulesExpanded = !this.schedulesExpanded;
  //   if (this.schedulesExpanded) {
  //     delete this.schedules;
  //     this.ds.get_schedules().then((data:any) => {
  //         console.log('get_schedules : '+ JSON.stringify(data));
  //         this.schedules = data;
  //         var modalPage = await this.modalCtrl.create({
  //           component: TestmodalPage,componentProps: data }
  //         );
  //
  //         modalPage.onDidDismiss();
  //         await modalPage.present();
  //         this.modalopen = true;
  //
  //
  //
  //     }).catch((error) => {
  //         console.log(error);
  //     });
  //   }
  // }

  toggleSettings() {
    // console.log('toggleSettings()...')
  }

  editSchedule(schedule) {
    // console.log('schedule : ',schedule);
  }

  ionViewWillLeave() {
    if (this.modalOpen) {
      this.modalPage.dismiss();
    }
  }

  async openModal(type) {



    let componentInfo:any = {};
    switch (type) {
      case 'schedules':
          componentInfo.component = ScheduleComponent;
          componentInfo.cssClass = 'schedules-modal-css';
          break;

      case 'settings':
          componentInfo.component = SettingsComponent;
          componentInfo.cssClass = 'settings-modal-css';
          break;
    }
    this.popup.openModal(componentInfo);
    //
    // this.modalPage = await this.modalCtrl.create( componentInfo );
    // this.modalOpen = true;
    //
    // this.modalPage.onDidDismiss().then(data=>{
    //   this.modalOpen = false;
    //   console.log(data)
    // })
    // return await this.modalPage.present();

  }


}
