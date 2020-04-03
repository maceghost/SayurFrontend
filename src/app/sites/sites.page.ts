// import { Component,ViewChildren,QueryList } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
// import { LocationComponent } from '../../components/location/location';
import {MatToolbarModule} from '@angular/material/toolbar';

import { Router, NavigationStart, NavigationEnd, NavigationError, Event, ActivatedRoute } from '@angular/router';


// import { Observable, Subject } from "rxjs";
// import { of } from 'rxjs';


@Component({
  selector: 'page-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss']

})
export class SitesPage {

  filterclick = false;
  filter: any = "all";
  pushPage: any = "LocationPage";
  type: any = "hvac";
  colorfilter: any = "all";
  hvacpage: any = "HvacPage";
  modalopen:boolean = false;
  firstvisit:boolean = true;
  public searchOpen:boolean = false;
  // @ViewChildren('locComp')  locComps: QueryList<LocationComponent>;
  @ViewChild('searchbar') searchbar:any;


  hvacFilters = [

    { value:"all",notselected:"abtn",selected:"abtn selected", filter:"all", text:"ALL"},
    { value:"lightgreen", notselected:"gbtn",selected:"gbtn selected", filter:"lightgreen"},
    { value:"yellow", notselected:"ybtn", selected:"ybtn selected", filter:"#FEFE83"},
    { value:"red", notselected:"rbtn", selected:"rbtn selected", filter:"#F45151"},
    { value:"offline", notselected:"obtn", selected:"obtn selected", filter:"offline",
         image:"assets/img/icons8-offline-100.png" }
  ];
  freezerFilters = [
    { value:"all",notselected:"abtn",selected:"abtn selected", filter:"all", text:"ALL"},
    { value:"lightblue", notselected:"bbtn",selected:"bbtn selected", filter:"lightblue"},
    { value:"orange", notselected:"orangebtn", selected:"orangebtn selected", filter:"orange"},
    { value:"offline", notselected:"obtn", selected:"obtn selected", filter:"offline",
         image:"assets/img/icons8-offline-100.png" }

  ];
  lightFilters = [];
  foods: any[] = [
   {value: 'steak-0', viewValue: 'Steak'},
   {value: 'pizza-1', viewValue: 'Pizza'},
   {value: 'tacos-2', viewValue: 'Tacos'}
 ];

  mylocs: any = this.auth.locations;

  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  constructor(private router: Router, public modalCtrl: ModalController, public navCtrl: NavController, private auth: AuthenticateProvider) {

  }
  anyMethodName() {
     this.searchOpen = true;
     setTimeout(() => {
      this.searchbar.setFocus();
    }, 1);
   }

  logout() {


    this.router.navigate(['cloud-login']);
    this.auth.locsubpaused = true
    for (let loc of this.auth.locations){
      this.auth.unsubscribeLoc(loc)
      // I don't know if this needs this? At this point it seems like there shouldn't be
      // a time subscription on any loc
      if (loc.timesubscription){
        this.auth.unsubscribeLocFromLoc(loc)

      }
    }

  }

  typeClick() {
    this.auth.homefiltertype = this.type
    this.auth.homefilter = 'all'

    if (this.type == 'freezer'){
      this.auth.homelocs = []
      for (let i of this.auth.locations){
        if (!i.initialized || (i.coolers && i.coolers.length > 0)){
          this.auth.homelocs.push(i)

        }
      }
    }
    if (this.type == 'light'){
      this.auth.homelocs = []
      for (let i of this.auth.locations){
        if (!i.initialized || (i.lights && i.lights.length > 0)){
          this.auth.homelocs.push(i)

        }
      }
    }
    else{
      this.auth.homelocs = this.auth.locations
    }
    this.auth.homelocsloaded = true


  }
  lightSelected(e){
    if (e == true){
      this.modalopen = true
    }
    else{
      this.modalopen = false
    }
  }
  returned(e){
    // if (!this.auth.locsubpaused){
    //   let complete = true
    //   this.locComps.forEach((child) => {
    //     if (!child.loc.returned){
    //       complete = false
    //     }
    //
    //
    //   })
    //   for (let loc of this.auth.locs){
    //     if (!loc.returned){
    //       complete = false
    //     }
    //   }
    //   if (complete){
    //     this.locComps.forEach((child) => {
    //       child.loc.returned = false
    //       // if (child.loc.initialized == true){
    //         child.mySubscribe()
    //       // }
    //
    //     })
    //     for (let loc of this.auth.locs){
    //       if (!loc.returned){
    //         complete = false
    //       }
    //     }
    //   }
    // }

    if (this.auth.homefiltertype == 'hvac'){
      this.mylocs = [];
      if (this.auth.homefilter == 'lightgreen') {

        for (let i of this.auth.locations) {
          if (i.hvacs){
            if ((i.hvacs.length > 0 && i.hvaccolor == 'lightgreen' )){
              this.mylocs.push(i)
            }
          }
          if (!i.returned){
            this.mylocs.push(i)
          }

        }
      }
      if (this.auth.homefilter == '#FEFE83') {

        for (let i of this.auth.locations) {
          if (i.hvacs){
            if ((i.hvacs.length > 0 &&i.hvaccolor == '#FEFE83' )){
              this.mylocs.push(i)
            }
          }
          if (!i.returned){
            this.mylocs.push(i)
          }

          // this would be if yellow gets red as well
          // if (i.hvaccolor == '#F45151' ){
          //   this.mylocs.push(i)
          // }
        }
      }
      if (this.auth.homefilter == '#F45151') {

        for (let i of this.auth.locations) {
          if (i.hvacs){
            if ((i.hvacs.length > 0 &&i.hvaccolor == '#F45151' )){
              this.mylocs.push(i)
            }
          }
          if (!i.returned){
            this.mylocs.push(i)
          }

        }
      }
      if (this.auth.homefilter == 'all') {
        this.mylocs = this.auth.locations

      }
      if (this.auth.homefilter == 'offline') {
        for (let i of this.auth.locations) {
          if (!i.online){
            this.mylocs.push(i)
          }
        }
      }

    }
    if (this.auth.homefiltertype == 'freezer'){
      this.mylocs = [];
      if (this.auth.homefilter == 'lightblue') {

        for (let i of this.auth.locations) {
          if (i.coolers){
            if ((i.coolers.length > 0 && i.coolercolor == 'lightblue' )){
              console.log(i.coolercolor)

              this.mylocs.push(i)
            }
          }
          if (!i.returned){
            this.mylocs.push(i)
          }

        }
      }
      if (this.auth.homefilter == 'orange') {

        for (let i of this.auth.locations) {
          if (i.coolers){
            if ((i.coolers.length > 0 && i.coolercolor == 'orange' )){
              this.mylocs.push(i)
            }
          }
          if (!i.returned){
            this.mylocs.push(i)
          }

        }
      }

      if (this.auth.homefilter == 'all') {
        for (let i of this.auth.locations) {
          if ((i.coolers && i.coolers.length > 0  )|| !i.returned){
            this.mylocs.push(i)
          }
        }

        // for (let i of this.auth.locations) {
        //   if (i.hascoolers){
        //     this.mylocs.push(i)
        //   }
        // }
      }
      if (this.auth.homefilter == 'offline') {
        for (let i of this.auth.locations) {
          if (!i.online){
            this.mylocs.push(i)
          }
        }
      }

    }

  }
  openModal(light: any, loc: any){
    console.log(light)
    var data = []
    data[0] = light
    // data[1] = this.hvac;
    data[1] = loc;
    //
    // var modalPage = this.modalCtrl.create('LightmodalPage', data);
    // modalPage.onDidDismiss((newdata) => {
    //   this.modalopen = false
    // });
    // modalPage.present();
    this.modalopen = true;
  }
  specialClick(color: string) {
    this.auth.homefilter = color;

    if (this.auth.homefiltertype == 'hvac'){
      this.auth.homelocs = [];
      if (this.auth.homefilter == 'lightgreen') {

        for (let i of this.auth.locations) {
          if (i.hvacs){
            if ((i.hvacs.length > 0 && i.hvaccolor == 'lightgreen' )){
              this.auth.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.auth.homelocs.push(i)
          }

        }
      }
      if (this.auth.homefilter == '#FEFE83') {

        for (let i of this.auth.locations) {
          if (i.hvacs){
            if ((i.hvacs.length > 0 &&i.hvaccolor == '#FEFE83' )){
              this.auth.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.auth.homelocs.push(i)
          }

        }
      }
      if (this.auth.homefilter == '#F45151') {

        for (let i of this.auth.locations) {
          if (i.hvacs){
            if (i.hvacs.length > 0 && i.hvaccolor == '#F45151' ){
              this.auth.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.auth.homelocs.push(i)
          }

        }
      }
      if (this.auth.homefilter == 'all') {
        this.auth.homelocs = this.auth.locations

      }
      if (this.auth.homefilter == 'offline') {
        for (let i of this.auth.locations) {
          if (!i.online){
            this.auth.homelocs.push(i)
          }
        }
      }

    }
    if (this.auth.homefiltertype == 'freezer'){
      this.auth.homelocs = [];
      if (this.auth.homefilter == 'lightblue') {

        for (let i of this.auth.locations) {
          if (i.coolers){
            if (i.coolers.length > 0 && i.coolercolor == 'lightblue' ){

              this.auth.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.auth.homelocs.push(i)
          }

        }
      }
      if (this.auth.homefilter == 'orange') {

        for (let i of this.auth.locations) {
          if (i.coolers){
            if ((i.coolers.length > 0 && i.coolercolor == 'orange' )){
              this.auth.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.auth.homelocs.push(i)
          }

        }
      }

      if (this.auth.homefilter == 'all') {
        for (let i of this.auth.locations) {
          if ((i.coolers && i.coolers.length > 0  )|| !i.initialized){
            this.auth.homelocs.push(i)
          }
        }


      }
      if (this.auth.homefilter == 'offline') {
        for (let i of this.auth.locations) {
          if (!i.online){
            this.auth.homelocs.push(i)
          }
        }
      }

    }
    this.auth.homelocsloaded = true


  }
  ngOnInit(){
    this.auth.homefilter = 'all'
    this.auth.homefiltertype = 'hvac'
  }
  ionViewDidEnter() {
      this.auth.locsubpaused = false
      this.auth.page = 'home'

      let complete = true
      for (let loc of this.auth.locations) {
        // console.log(child.loc.secret_key)
        // console.log(child.loc.loc.returned)
        if (!loc.returned){

          complete = false
          this.auth.getLoc(loc)
        }

      }
      if (complete){
        this.auth.roundstart = null
        for (let loc of this.auth.locations){
          loc.returned = false
          this.auth.getLoc(loc)
        }

      }



  }

  getItems(event: any){

  }

  itemSelected(item:any){

  }



  leaveToLoc(e){
    this.auth.locsubpaused = true
    // ideally only unsubscribe not the location you're going to but for now just blanket unsubscribe
    for (let loc of this.auth.locations){
      this.auth.unsubscribeLoc(loc)
    }

  }

  leaveToHvac(e){
    // ideally only unsubscribe not the location you're going to but for now just blanket unsubscribe
    this.auth.locsubpaused = true
    for (let loc of this.auth.locations){
      this.auth.unsubscribeLoc(loc)
    }

  }
  getSelectedClass(filter:any) {
      if (this.auth.homefilter == filter.filter)
        return filter.selected;
      else
        return filter.notselected;
  }

}
