import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('tabs') tabs:IonTabs;

  constructor(private auth:AuthLocalProvider) { }

  ngOnInit() {
    // let content = document.querySelector('ion-content');
    // content.scrollEvents = true;
    // content.addEventListener('ionScrollStart', () => {
    //       document.querySelector('ion-tab-bar').style.display = 'none';
    // });
    // content.addEventListener('ionScrollEnd', () => {
    //       document.querySelector('ion-tab-bar').style.display = 'flex';
    // });
  }

  ionViewCanEnter() {
     return this.auth.authenticated;
  }

  ionChange() {
      this.auth.registerKeypress();
      console.log('tab changed : ',this.tabs.getSelected());
  }

  isActive(tab) {
      if (this.tabs.getSelected() == tab) return true;
      return false;
  }

}
