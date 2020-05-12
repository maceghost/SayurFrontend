


// import { IonicModule, ModalController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
// import { map } from 'rxjs/operators'
import 'rxjs/add/operator/catch'
// import {Observable} from 'rxjs/Observable';
// import * as moment from 'moment';
// import * as _ from 'lodash';
// import { throwError } from 'rxjs';
import {_throw} from 'rxjs/observable/throw';
// import { interval } from 'rxjs';
// import Rx from 'rxjs'
// import { DataService } from '../data.service';
// import { PopupService } from '../popup.service';

// import { NavController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { of } from 'rxjs';
import { Observable, Subject } from "rxjs";
import { environment }  from  '../environments/environment';

const USER_TIMEOUT = 3 * 60 * 1000;

const PROVISION_STATE = 0;
const LOGIN_STATE = 1;
const AUTH_STATE = 2;
import * as _ from 'lodash';


// import { Chart } from 'chart.js';

// import { filter, map, catchError } from 'rxjs/operators';


// declare var google;

/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var siteKey;
var siteSecretKey;
var self;

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
@Injectable({
  providedIn: 'root'
})


export class DataService {


  s1Animated = false;
  s2Animated = false;

  slidechange = false;
  order:any = {};
  view:any = 'home';
  authState = new BehaviorSubject(0);
  rootPage:any = 'LoginPage';
  user: any;
  public loginTime:number;
  loginTimer;
  client: any = null;
  locations: any = [];
  datainterval: any;
  hvacinterval: any;
  locationConfig: any;
  rpcInfo:any;
  authenticated = false;
  currentPage;
  location:any;
  pausesubs:any = false
  currentpage:any;
  currentController:any;
  time_offset:any;
  timezone:any;
  graphviewing:any;
  currentUrl:string;
  lastUrl:string;
  backButton:boolean = false;
  viewitem = null;



  catfilter = 'All items';
  subfilter = null;


  id:number = 1220;

  http: HttpClient;

  hostname: any;
  port: any;
  protocol: any;
  key: any;

  urlBase: string;
  apiUrl:  string;
  products :any;
  storeproducts:any = [];
  cart:any = [];

  aisles:any;
  aisle:any = {name:"All",categories:[]};
  categories:any = [];
  randcats:any;
  category:any = null;
  subcategory:any = null;
  minprice:any = null;
  maxprice:any = null;
  placed:any = false;
  email:any;
  phone:any;
  address:any = {
    'address':"",
    'optional':"",
    'city':"",
    'postalcode':"",
    'province':"",
    'state':"",
    'country':"Indonesia"
  }

  countries: any = [
{"name": "Afghanistan", "code": "AF"},
{"name": "land Islands", "code": "AX"},
{"name": "Albania", "code": "AL"},
{"name": "Algeria", "code": "DZ"},
{"name": "American Samoa", "code": "AS"},
{"name": "Andorra", "code": "AD"},
{"name": "Angola", "code": "AO"},
{"name": "Anguilla", "code": "AI"},
{"name": "Antarctica", "code": "AQ"},
{"name": "Antigua and Barbuda", "code": "AG"},
{"name": "Argentina", "code": "AR"},
{"name": "Armenia", "code": "AM"},
{"name": "Aruba", "code": "AW"},
{"name": "Australia", "code": "AU"},
{"name": "Austria", "code": "AT"},
{"name": "Azerbaijan", "code": "AZ"},
{"name": "Bahamas", "code": "BS"},
{"name": "Bahrain", "code": "BH"},
{"name": "Bangladesh", "code": "BD"},
{"name": "Barbados", "code": "BB"},
{"name": "Belarus", "code": "BY"},
{"name": "Belgium", "code": "BE"},
{"name": "Belize", "code": "BZ"},
{"name": "Benin", "code": "BJ"},
{"name": "Bermuda", "code": "BM"},
{"name": "Bhutan", "code": "BT"},
{"name": "Bolivia", "code": "BO"},
{"name": "Bosnia and Herzegovina", "code": "BA"},
{"name": "Botswana", "code": "BW"},
{"name": "Bouvet Island", "code": "BV"},
{"name": "Brazil", "code": "BR"},
{"name": "British Indian Ocean Territory", "code": "IO"},
{"name": "Brunei Darussalam", "code": "BN"},
{"name": "Bulgaria", "code": "BG"},
{"name": "Burkina Faso", "code": "BF"},
{"name": "Burundi", "code": "BI"},
{"name": "Cambodia", "code": "KH"},
{"name": "Cameroon", "code": "CM"},
{"name": "Canada", "code": "CA"},
{"name": "Cape Verde", "code": "CV"},
{"name": "Cayman Islands", "code": "KY"},
{"name": "Central African Republic", "code": "CF"},
{"name": "Chad", "code": "TD"},
{"name": "Chile", "code": "CL"},
{"name": "China", "code": "CN"},
{"name": "Christmas Island", "code": "CX"},
{"name": "Cocos (Keeling) Islands", "code": "CC"},
{"name": "Colombia", "code": "CO"},
{"name": "Comoros", "code": "KM"},
{"name": "Congo", "code": "CG"},
{"name": "Congo, The Democratic Republic of the", "code": "CD"},
{"name": "Cook Islands", "code": "CK"},
{"name": "Costa Rica", "code": "CR"},
{"name": "Cote D'Ivoire", "code": "CI"},
{"name": "Croatia", "code": "HR"},
{"name": "Cuba", "code": "CU"},
{"name": "Cyprus", "code": "CY"},
{"name": "Czech Republic", "code": "CZ"},
{"name": "Denmark", "code": "DK"},
{"name": "Djibouti", "code": "DJ"},
{"name": "Dominica", "code": "DM"},
{"name": "Dominican Republic", "code": "DO"},
{"name": "Ecuador", "code": "EC"},
{"name": "Egypt", "code": "EG"},
{"name": "El Salvador", "code": "SV"},
{"name": "Equatorial Guinea", "code": "GQ"},
{"name": "Eritrea", "code": "ER"},
{"name": "Estonia", "code": "EE"},
{"name": "Ethiopia", "code": "ET"},
{"name": "Falkland Islands (Malvinas)", "code": "FK"},
{"name": "Faroe Islands", "code": "FO"},
{"name": "Fiji", "code": "FJ"},
{"name": "Finland", "code": "FI"},
{"name": "France", "code": "FR"},
{"name": "French Guiana", "code": "GF"},
{"name": "French Polynesia", "code": "PF"},
{"name": "French Southern Territories", "code": "TF"},
{"name": "Gabon", "code": "GA"},
{"name": "Gambia", "code": "GM"},
{"name": "Georgia", "code": "GE"},
{"name": "Germany", "code": "DE"},
{"name": "Ghana", "code": "GH"},
{"name": "Gibraltar", "code": "GI"},
{"name": "Greece", "code": "GR"},
{"name": "Greenland", "code": "GL"},
{"name": "Grenada", "code": "GD"},
{"name": "Guadeloupe", "code": "GP"},
{"name": "Guam", "code": "GU"},
{"name": "Guatemala", "code": "GT"},
{"name": "Guernsey", "code": "GG"},
{"name": "Guinea", "code": "GN"},
{"name": "Guinea-Bissau", "code": "GW"},
{"name": "Guyana", "code": "GY"},
{"name": "Haiti", "code": "HT"},
{"name": "Heard Island and Mcdonald Islands", "code": "HM"},
{"name": "Holy See (Vatican City State)", "code": "VA"},
{"name": "Honduras", "code": "HN"},
{"name": "Hong Kong", "code": "HK"},
{"name": "Hungary", "code": "HU"},
{"name": "Iceland", "code": "IS"},
{"name": "India", "code": "IN"},
{"name": "Indonesia", "code": "ID"},
{"name": "Iran, Islamic Republic Of", "code": "IR"},
{"name": "Iraq", "code": "IQ"},
{"name": "Ireland", "code": "IE"},
{"name": "Isle of Man", "code": "IM"},
{"name": "Israel", "code": "IL"},
{"name": "Italy", "code": "IT"},
{"name": "Jamaica", "code": "JM"},
{"name": "Japan", "code": "JP"},
{"name": "Jersey", "code": "JE"},
{"name": "Jordan", "code": "JO"},
{"name": "Kazakhstan", "code": "KZ"},
{"name": "Kenya", "code": "KE"},
{"name": "Kiribati", "code": "KI"},
{"name": "Korea, Democratic People's Republic of", "code": "KP"},
{"name": "Korea, Republic of", "code": "KR"},
{"name": "Kuwait", "code": "KW"},
{"name": "Kyrgyzstan", "code": "KG"},
{"name": "Lao People'S Democratic Republic", "code": "LA"},
{"name": "Latvia", "code": "LV"},
{"name": "Lebanon", "code": "LB"},
{"name": "Lesotho", "code": "LS"},
{"name": "Liberia", "code": "LR"},
{"name": "Libyan Arab Jamahiriya", "code": "LY"},
{"name": "Liechtenstein", "code": "LI"},
{"name": "Lithuania", "code": "LT"},
{"name": "Luxembourg", "code": "LU"},
{"name": "Macao", "code": "MO"},
{"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
{"name": "Madagascar", "code": "MG"},
{"name": "Malawi", "code": "MW"},
{"name": "Malaysia", "code": "MY"},
{"name": "Maldives", "code": "MV"},
{"name": "Mali", "code": "ML"},
{"name": "Malta", "code": "MT"},
{"name": "Marshall Islands", "code": "MH"},
{"name": "Martinique", "code": "MQ"},
{"name": "Mauritania", "code": "MR"},
{"name": "Mauritius", "code": "MU"},
{"name": "Mayotte", "code": "YT"},
{"name": "Mexico", "code": "MX"},
{"name": "Micronesia, Federated States of", "code": "FM"},
{"name": "Moldova, Republic of", "code": "MD"},
{"name": "Monaco", "code": "MC"},
{"name": "Mongolia", "code": "MN"},
{"name": "Montenegro", "code": "ME"},
{"name": "Montserrat", "code": "MS"},
{"name": "Morocco", "code": "MA"},
{"name": "Mozambique", "code": "MZ"},
{"name": "Myanmar", "code": "MM"},
{"name": "Namibia", "code": "NA"},
{"name": "Nauru", "code": "NR"},
{"name": "Nepal", "code": "NP"},
{"name": "Netherlands", "code": "NL"},
{"name": "Netherlands Antilles", "code": "AN"},
{"name": "New Caledonia", "code": "NC"},
{"name": "New Zealand", "code": "NZ"},
{"name": "Nicaragua", "code": "NI"},
{"name": "Niger", "code": "NE"},
{"name": "Nigeria", "code": "NG"},
{"name": "Niue", "code": "NU"},
{"name": "Norfolk Island", "code": "NF"},
{"name": "Northern Mariana Islands", "code": "MP"},
{"name": "Norway", "code": "NO"},
{"name": "Oman", "code": "OM"},
{"name": "Pakistan", "code": "PK"},
{"name": "Palau", "code": "PW"},
{"name": "Palestinian Territory, Occupied", "code": "PS"},
{"name": "Panama", "code": "PA"},
{"name": "Papua New Guinea", "code": "PG"},
{"name": "Paraguay", "code": "PY"},
{"name": "Peru", "code": "PE"},
{"name": "Philippines", "code": "PH"},
{"name": "Pitcairn", "code": "PN"},
{"name": "Poland", "code": "PL"},
{"name": "Portugal", "code": "PT"},
{"name": "Puerto Rico", "code": "PR"},
{"name": "Qatar", "code": "QA"},
{"name": "Reunion", "code": "RE"},
{"name": "Romania", "code": "RO"},
{"name": "Russian Federation", "code": "RU"},
{"name": "RWANDA", "code": "RW"},
{"name": "Saint Helena", "code": "SH"},
{"name": "Saint Kitts and Nevis", "code": "KN"},
{"name": "Saint Lucia", "code": "LC"},
{"name": "Saint Pierre and Miquelon", "code": "PM"},
{"name": "Saint Vincent and the Grenadines", "code": "VC"},
{"name": "Samoa", "code": "WS"},
{"name": "San Marino", "code": "SM"},
{"name": "Sao Tome and Principe", "code": "ST"},
{"name": "Saudi Arabia", "code": "SA"},
{"name": "Senegal", "code": "SN"},
{"name": "Serbia", "code": "RS"},
{"name": "Seychelles", "code": "SC"},
{"name": "Sierra Leone", "code": "SL"},
{"name": "Singapore", "code": "SG"},
{"name": "Slovakia", "code": "SK"},
{"name": "Slovenia", "code": "SI"},
{"name": "Solomon Islands", "code": "SB"},
{"name": "Somalia", "code": "SO"},
{"name": "South Africa", "code": "ZA"},
{"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
{"name": "Spain", "code": "ES"},
{"name": "Sri Lanka", "code": "LK"},
{"name": "Sudan", "code": "SD"},
{"name": "Suriname", "code": "SR"},
{"name": "Svalbard and Jan Mayen", "code": "SJ"},
{"name": "Swaziland", "code": "SZ"},
{"name": "Sweden", "code": "SE"},
{"name": "Switzerland", "code": "CH"},
{"name": "Syrian Arab Republic", "code": "SY"},
{"name": "Taiwan, Province of China", "code": "TW"},
{"name": "Tajikistan", "code": "TJ"},
{"name": "Tanzania, United Republic of", "code": "TZ"},
{"name": "Thailand", "code": "TH"},
{"name": "Timor-Leste", "code": "TL"},
{"name": "Togo", "code": "TG"},
{"name": "Tokelau", "code": "TK"},
{"name": "Tonga", "code": "TO"},
{"name": "Trinidad and Tobago", "code": "TT"},
{"name": "Tunisia", "code": "TN"},
{"name": "Turkey", "code": "TR"},
{"name": "Turkmenistan", "code": "TM"},
{"name": "Turks and Caicos Islands", "code": "TC"},
{"name": "Tuvalu", "code": "TV"},
{"name": "Uganda", "code": "UG"},
{"name": "Ukraine", "code": "UA"},
{"name": "United Arab Emirates", "code": "AE"},
{"name": "United Kingdom", "code": "GB"},
{"name": "United States", "code": "US"},
{"name": "United States Minor Outlying Islands", "code": "UM"},
{"name": "Uruguay", "code": "UY"},
{"name": "Uzbekistan", "code": "UZ"},
{"name": "Vanuatu", "code": "VU"},
{"name": "Venezuela", "code": "VE"},
{"name": "Viet Nam", "code": "VN"},
{"name": "Virgin Islands, British", "code": "VG"},
{"name": "Virgin Islands, U.S.", "code": "VI"},
{"name": "Wallis and Futuna", "code": "WF"},
{"name": "Western Sahara", "code": "EH"},
{"name": "Yemen", "code": "YE"},
{"name": "Zambia", "code": "ZM"},
{"name": "Zimbabwe", "code": "ZW"}
]

  days:any = []
  day:any = {times:[]};
  time:any;


  searching = false;
  searchTxt = '';
  searchitems = []
  searchTouched = false;

  constructor(
    public _http: HttpClient,
    // private ds:DataService,
    // private popup:PopupService,
    // private storage: Storage,
    private router:Router,
    // private modalCtrl: ModalController,

  )
  {

    self = this;
    this.http = _http;
    // if (0) {
    this.hostname = environment.api_host;
    this.port = environment.api_port;
    this.protocol = environment.api_protocol;
    if (environment.key){
      this.key = environment.key;

    }
    else{
      this.key = false
    }


    if (this.port) {
      this.urlBase = this.protocol + '//' + this.hostname + ':' + this.port;
    } else {
      this.urlBase = this.protocol + '//' + this.hostname

    }
    this.apiUrl = this.urlBase +  '/ng_api';


    this.get_products().then(result => {
      let myresult:any = result
      console.log(myresult)

      this.categories = myresult.categories


      this.categories.unshift({name:'All items',subcategories:[]})
      this.category = this.categories[0]

      for (let i of myresult.products){
        i.added = false
        // i.measurements = []
        // if (i.price_per_kg){
        //   i.measurements.push('Kg')
        // }
        // if (i.price_per_unit){
        //   i.measurements.push('Unit')
        // }
        // if (i.price_per_tied_bunch){
        //   i.measurements.push('Tied Bunch')
        // }
        //
        // i.measurement = i.measurements[0]
        i.quantity = 1
        if (i.image){
          i.image = this.urlBase + i.image

        }
        else{
          i.image = ''
        }
        // let cheapest = []
        //
        // if (i.price_per_kg){
        //
        //   cheapest.push(i.price_per_kg)
        // }
        // if (i.price_per_unit){
        //
        //   cheapest.push(i.price_per_unit)
        // }
        // if (i.price_per_tied_bunch){
        //
        //   cheapest.push(i.price_per_tied_bunch)
        // }
        // let mycheap = Math.min.apply(null, cheapest);
        // i.cheapest = mycheap
      }
      this.products = myresult.products
      this.storeproducts = this.products

      this.getDates(myresult.occupied)

      this.retrieveCart()

      // if (false === this.location.setup_complete) {
      // // if (this.location.setup_complete && this.location.setup_complete == false) {
      //   // console.log('setting rootPage to Provision');
      //   // this.rootPage = 'ProvisionPage';
      //   this.authState.next(PROVISION_STATE);
      // } else {
      //   siteKey = this.location.key;
      //   siteSecretKey = this.location.secret_key;
      //   // console.log('setup_complete : ',this.location);
      //   this.authState.next(LOGIN_STATE);
      // }
    });
    // ds.get_server_time().then(spec => {
    //   this.time_offset = spec.utc_offset_sec
    //   if (spec.dst == 1){
    //     this.time_offset = this.time_offset + 3600
    //   }
    //   console.log(spec)
    // });

    // console.log('constructor - route : '+window.location.href);
    // siteKey = (<any>window).getSiteKey();
    // console.log('siteKey : '+siteKey);
    // siteSecretKey = (<any>window).getSiteSecretKey();
    // console.log('siteSecretKey : '+siteSecretKey);
    // if (siteKey === '<%= @key %>') {
    // // if (!siteKey || !siteSecretKey) {
    //   // dang, if this works it's way too easy!
    //   console.log('setting rootPage to Provision');
    //   // this.rootPage = 'ProvisionPage';
    //   this.authState.next(PROVISION_STATE);
    //   // siteKey = "9ff9044d36fa87810b87574002710551b24fe096";
    //   // siteSecretKey= "e8631e2ba93601ab5959";
    // } else {
    //   this.authState.next(LOGIN_STATE);
    // }
    // ds.get_location_config().then(result => {
    //   this.location = result;
    // });
  }

  // ngOnInit(){
  //   console.log('hello')
  //   console.log(localStorage.getItem("cart"));


  // }
  getProduce(){
    let temp = [];
    let i = 0;
    while (i<4){
      for (let i of this.storeproducts){
        if (i.category == 'Fruits and Vegetables'){
          temp.push(i)
          i = i + 1
        }
      }
      break;
    }
    return temp

  }

  randCats(){
    // console.log()
    // if (this.categories){
    //   let i = 0
    //   let temp = _.clone(this.categories);
    //   console.log(this.categories)
    //
    //   console.log(temp)
    //   this.randcats = []
    //   while (i < 8){
    //
    //     let item = this.categories[Math.floor(Math.random() * this.categories)];
    //     this.randcats.push(item)
    //     i = i + 1
    //   }
    //   return true
    // }
    // else{
    //   return false
    // }



    // if (this.categories){
    //   let i = 0
    //   let temp = _.clone(this.categories);
    //   console.log(this.categories)
    //
    //   console.log(temp)
    //   let newarr = []
    //   while (i < 8){
    //
    //     let item = temp.splice(Math.floor(Math.random() * temp),1);
    //     console.log(item[0])
    //     newarr.push(item[0])
    //     i = i + 1
    //   }
    //   console.log(newarr)
    //   return newarr
    // }

  }

  searchClick(){
    this.searchTouched = !this.searchTouched
    // if (this.searchitems.length == 0){
    //
    //   this.searching = true
    //
    //   let i = 0
    //   while (i < 4){
    //     let item = this.storeproducts[Math.floor(Math.random() * this.storeproducts)];
    //     this.searchitems.push(item)
    //     i = i + 1
    //   }
    //   setTimeout(() =>
    //       {
    //
    //         this.searching = false
    //       },
    //       1000)
    //
    //
    // }

  }

  goToItem(item:any){
    this.viewitem = item
    this.searchTouched = false;
    this.view = 'shop'

  }

  getPrice(item:any){
    let total = item.price * item.quantity

    let returntotal:string;
    returntotal = "Rp" + total.toString()

    return returntotal

  }
  async search(x:any){
    if (!this.searchTouched){
      this.searchTouched = true
    }
    if (this.searchTxt == ""){
      this.searchitems = []
    }
    else{
      let tmp = this.searchTxt
      this.searchitems = await _.filter(this.storeproducts, function(o){
        return JSON.stringify(o).toLowerCase().indexOf(tmp.toLowerCase()) > -1;
      });
    }

  }

  async search1(x:any){
    console.log(this.searchTxt)

    if (this.searchTxt == ""){
      this.searchitems = []
      this.searching = true

      let i = 0
      while (i < 4){
        let item = this.storeproducts[Math.floor(Math.random() * this.storeproducts)];
        this.searchitems.push(item)
        i = i + 1
      }
      // setTimeout(() =>
      //     {
      //
      //       this.searching = false
      //     },
      //     1500)

    }
    else{
      this.searching = true

      let tmp = this.searchTxt
      this.searchitems = await _.filter(this.storeproducts, function(o){
        return JSON.stringify(o).toLowerCase().indexOf(tmp.toLowerCase()) > -1;
      });
      console.log(this.searchitems)
      if (this.searchitems.length == 0){

        let i = 0
        while (i < 4){
          let item = this.storeproducts[Math.floor(Math.random() * this.storeproducts)];
          this.searchitems.push(item)
          i = i + 1
        }
        this.searching = false

      }
      else{
        this.searching = false

      }
    }

  }

  getUTCTime(day:any,time:any){
    let hour:any;
    hour = parseInt(time.split(':')[0])
    if (hour<9){
      hour = hour + 12

    }


    let myts = day.ts + hour*60*60*1000
    return myts
  }
  getDates(occupied:any){
    occupied = [...new Set(occupied)]
    let times = ['9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00','5:00']
    let gsDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
    ];
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let i = 1
    while (i < 4){
      let date = new Date()

      date.setDate(date.getDate() + i)
      date.setHours(0,0,0,0)
      date = new Date(date)
      let day = {times:['9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00','5:00'],ts:date.getTime(),name:gsDayNames[date.getDay()],date:monthNames[date.getMonth()] + ' ' + date.getDate()}



      if (i == 1){
        day.name = 'Tomorrow'
      }
      this.days.push(day)
      i = i + 1
    }


    for (let j of occupied){

      // day.times = day.times.filter(function(value, index, arr){
      //   console.log(value,day)
      //   return this.getUTCTime(day,value) != j*1000;
      // });
      for (let day of this.days){
      for (let hour of times){
        // console.log(this.getUTCTime(day,hour))

        if (this.getUTCTime(day,hour) == j*1000){
          console.log(j,day,hour)
          console.log(day.times)
          day.times.splice(day.times.indexOf(hour),1)
          console.log(day.times)


        }
      }
      }
    }


    this.day = this.days[0]
    this.time = this.day.times[0]
  }

  saveCart(){

    let temp = []
    for (let i of this.cart){
      let ob = {name:i.name,quantity:i.quantity,measurement:i.measurement}
      temp.push(ob)
    }
    localStorage.setItem("cart", JSON.stringify(temp));
    console.log(localStorage.getItem("cart"));

  }


  saveUser(object:any){

    console.log(object)
    localStorage.setItem("user", JSON.stringify(object));
    console.log(localStorage.getItem("user"));

  }
  retrieveUser(){


    if (localStorage.getItem("user")){
      return JSON.parse(localStorage.getItem("user"))

    }
    else{
      return null
    }
  }

  retrieveCart(){
    let cart = []
    if (localStorage.getItem("cart")){
      for (let i of JSON.parse(localStorage.getItem("cart"))){
        console.log(i)
        console.log(this.storeproducts)
        for (let j of this.storeproducts){
          if (j.name == i.name){
            j.added = true
            j.quantity = i.quantity
            j.measurement = i.measurement
            cart.push(j)
            break
          }
        }



      }
      this.cart = cart
    }

  }

  get_products(){

    let headers = new Headers();
    var url = this.apiUrl + '/get_products/';
    var map: any = {};
    // map.method = SET_PROCESS_VALUE;
    map.id = self.id++;
    // map.clientid = this.clientId;;
    headers = new Headers({ 'Content-Type': "application/json" });
    if (this.key){
      map.key = this.key
    }

    let promise = new Promise((resolve, reject) => {
      // map.params = [name, key, val];
      this.http.get<any>(url)
           .toPromise()
           .then(
             res => { // Success
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               // console.log('get_location_config - result : '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  post_order(order) {
    console.log(order)
    let headers = new Headers();
    var url = this.apiUrl + '/post_order/';

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      // console.log('get_user_by_password - url : '+url+' , mparams : '+JSON.stringify(mparms));
      // console.log('get_user_by_password - params : '+mparms);
      this.http.post<any>(url, order)
           .toPromise()
           .then(
             res => { // Success
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }

               resolve(json.result);
             }
           ).catch((error: any) => {
             console.log('get_user_by_password err : '+error);
           });
       });
       return promise;

  }

  // resumeSubscriptions(){
  //   this.pausesubs = setTimeout(() =>
  //     {
  //       // if (this.currentpage == 'home'){
  //       //   this.subscribeHomePage()
  //       // }
  //       // else if (this.currentpage == 'controller'){
  //       //   this.subscribeHomePage()
  //       //   this.subscribeHvacPage(this.currentcontroller)
  //       // }
  //       this.pausesubs = false
  //
  //     },
  //     5000)
  //
  //
  // }
  //
  // handleControllerSettings(result: any, original: any){
  //
  //   // console.log(result,original)
  //   // original.settings = result
  //   console.log(original.settings)
  //   console.log(result)
  //   original.settings = result
  //   // original.settings = {};
  //   // for (let setting of result) {
  //   //    if (setting.name == 'override_level'){
  //   //      original.test = setting.val
  //   //    }
  //   //    // console.log('setting : '+JSON.stringify(setting));
  //   //
  //   //    original.settings[setting.name]=setting.val;
  //   // }
  //   // console.log(original.settings)
  //   original.retrievedSettings = true;
  // }
  // handleControllerStatHist(result: any, original: any){
  //   // console.log('got back from getLocalControllerStatus - settings : '+JSON.stringify(result.settings));
  //
  //     console.log(result)
  //     original.stathist = result
  //     original.timearray = [];
  //     original.valuearray = [];
  //     original.supplyarray = [];
  //     original.minvalue = 1000
  //     original.maxvalue = -1000
  //
  //     for (let i of original.stathist){
  //       let dt = moment.utc(moment.unix(Math.floor(i.ts) + this.time_offset))
  //       let hour = dt.format('h:mm')
  //       let ampm = dt.format('a')
  //       let day = dt.format('MM/D')
  //       console.log(this.time_offset)
  //       original.timearray.push(day + ', ' +hour + ' '+ ampm)
  //       if (original.type == "HVAC" || original.type == 'VPAT4'){
  //         console.log('handelControllerStatHist : ',i.sockets);
  //         original.valuearray.push(i.sockets.space)
  //         original.supplyarray.push(i.sockets.supply)
  //
  //         if ((i.sockets.space) < original.minvalue){
  //           original.minvalue = i.sockets.space
  //         }
  //         if ((i.sockets.space) > original.maxvalue){
  //           original.maxvalue = i.sockets.space
  //         }
  //         if ((i.sockets.return) < original.minvalue){
  //           original.minvalue = i.sockets.return
  //         }
  //         if ((i.sockets.return) > original.maxvalue){
  //           original.maxvalue = i.sockets.return
  //         }
  //       }
  //       if (original.type == "LIGHT" ){
  //         original.valuearray.push(i.level)
  //
  //         if ((i.level) < original.minvalue){
  //           original.minvalue = i.level
  //         }
  //         if ((i.level) > original.maxvalue){
  //           original.maxvalue = i.level
  //         }
  //       }
  //       if (original.type == "MAP ICON" ){
  //         original.valuearray.push(i.sockets.input)
  //
  //         if ((i.sockets.input) < original.minvalue){
  //           original.minvalue = i.sockets.input
  //         }
  //         if ((i.sockets.input) > original.maxvalue){
  //           original.maxvalue = i.sockets.input
  //         }
  //       }
  //
  //
  //
  //     }
  //
  //
  // }
  //
  // getDateObject(){
  //   let location = this.location
  //
  //   let dt = moment.utc(moment.unix(Math.floor(new Date().getTime()/1000) + this.time_offset))
  //   // location.ts = dt._i
  //   location.hour = dt.format('h:mm')
  //   location.ampm = dt.format('a')
  //   location.day = dt.format('dddd, MMM D')
  //   return dt
  // }
  //
  // formatName(name:string) {
  //   let n = name.replace(/_/g," ").toUpperCase();
  //   return n;
  // }
  //
  //
  //
  // handleControllers(controllers: any){
  //
  //   let location = this.location
  //
  //   let dt = moment.utc(moment.unix(Math.floor(new Date().getTime()/1000) + this.time_offset))
  //   // location.ts = dt._i
  //   location.hour = dt.format('h:mm')
  //   location.ampm = dt.format('a')
  //   location.day = dt.format('dddd, MMM D')
  //
  //   location.hvaccolor = 'lightgreen' //green
  //   location.coolercolor = 'lightblue' //green
  //   let newothers = [];
  //   let newsensors = [];
  //   let newpower = [];
  //   location.controllers = controllers
  //   for (let i of location.controllers){
  //     i.order = 0
  //     i.border = 'black'
  //     i.color = 'lightgrey'
  //
  //     // i forget what this is for
  //     if (!Array.isArray(i.settings)){
  //       // if (!i.settings.isArray()){
  //         i.settings = []
  //       // }
  //     }
  //
  //     if (i.modes){
  //       for (let j of i.modes){
  //         j.capname = j.name.toUpperCase()
  //         j.editable = true;
  //         j.validentry = true
  //
  //       }
  //
  //       i.modes = _.orderBy(i.modes, ['order'], ['asc']);
  //     }
  //
  //     if (i.status){
  //       i.order = 1
  //       i.border = 'dodgerblue'
  //       i.color = 'white'
  //     }
  //     if (i.type == 'kw_meter'){
  //       // if (i.status){
  //         // i.type = "KW METER"
  //         // i.capname = i.name.toUpperCase();
  //         if (i.status){
  //           i.status.d = Math.round(i.status.d * 100) / 100
  //         }
  //         newpower.push(i)
  //       // }
  //     }
  //     if (i.type == 'map_icon'){
  //       // if (i.status){
  //         // i.type = "MAP ICON"
  //         // i.capname = i.name.toUpperCase();
  //
  //         // if (i.name.toLowerCase().indexOf('kw') > -1){
  //         //   newpower.push(i)
  //         // }
  //         if (this.otherSensor(i.name)) {
  //
  //
  //           newsensors.push(i)
  //         }
  //
  //
  //
  //         //handle location wide values
  //
  //         if (this.contains(i.name, 'outdoor temp') || this.contains(i.name, 'od temp') || this.contains(i.name, 'outside temp')) {
  //           if (i.status){
  //             location.outtemp = parseFloat(i.status.sockets.input).toFixed(0);
  //           }
  //         }
  //         if (i.name.toLowerCase() == 'pressure'){
  //           if (i.status){
  //             location.pressure = i.status.sockets.input;
  //           }
  //         }
  //         if (this.contains(i.name, 'co2') || this.contains(i.name, 'c02')){
  //           if (i.status){
  //             if (i.status.sockets){
  //               location.co2 = i.status.sockets.input;
  //             }
  //           }
  //         }
  //         if (i.name.toLowerCase() == 'light level'){
  //           if (i.status){
  //             location.outlight = i.status.sockets.input;
  //           }
  //         }
  //       // }
  //     }
  //
  //     if (i.type == 'light'){
  //       // i.capname = i.name.toUpperCase();
  //       if (i.status){
  //         if (i.status.ov){
  //           i.status.ov.r = moment.utc(i.status.ov.r*1000).format('HH:mm:ss');
  //         }
  //         if (i.status.dur){
  //           i.status.dur = moment.utc(i.status.dur*1000).format('HH:mm:ss');
  //         }
  //         if (i.status.level == 0){
  //           i.color = "darkgrey";
  //         }
  //         else {
  //           i.color = "#fffc66";
  //         }
  //         if (!i.status.dimmable){
  //           if (i.status.level == 100){
  //             i.status.levelbool = true
  //           }
  //           else{
  //             i.status.levelbool = false
  //           }
  //         }
  //         // remedy a possible problem caused by the flash app and
  //         // this app working in tandem
  //         for (let action of i.schedule.actions){
  //           if (action.extra){
  //             if (action.extra.level && action.extra.lm_threshold ||
  //                 action.extra.level && action.extra.lm_match ||
  //                 action.extra.lm_threshold && action.extra.lm_match){
  //                   action.extra = {}
  //                   this.ds.set_controller_schedule(i._id.$oid, i.schedule).then((data:any) => {
  //                       // console.log('set_controller_schedule returns : ',data);
  //                       // this.resumeSubscriptions()
  //                   }).catch((error) => {
  //                       console.log(error);
  //                   });
  //
  //                 }
  //           }
  //         }
  //
  //         //what the hell is this FOR??
  //         // if (light.ov && i.status && !i.status.ov){
  //         //   i.status.ov = {}
  //         //   i.status.ov.r = moment.utc((2700-2)*1000).format('HH:mm:ss');
  //         // }
  //
  //       }
  //
  //       // if (location.lights){
  //       //   let found = false
  //       //   for (let light of location.lights){
  //       //     if (light._id.$oid == i._id.$oid ){
  //       //       if (light.ov && i.status && !i.status.ov){
  //       //         i.status.ov = {}
  //       //         i.status.ov.r = moment.utc((2700-2)*1000).format('HH:mm:ss');
  //       //       }
  //       //
  //       //       if (!light.changed){
  //       //         light = i
  //       //         // light.status = i.status
  //       //         //
  //       //         //
  //       //         //
  //       //         // light.schedule = i.schedule
  //       //
  //       //         // remedy a possible problem caused by the flash app and
  //       //         // this app working in tandem
  //       //         if (light.status){
  //       //           for (let action of light.schedule.actions){
  //       //             if (action.extra){
  //       //               if (action.extra.level && action.extra.lm_threshold ||
  //       //                   action.extra.level && action.extra.lm_match ||
  //       //                   action.extra.lm_threshold && action.extra.lm_match){
  //       //                     action.extra = {}
  //       //                     this.ds.set_controller_schedule(light._id.$oid, light.schedule).then((data:any) => {
  //       //                         // console.log('set_controller_schedule returns : ',data);
  //       //                         // this.resumeSubscriptions()
  //       //                     }).catch((error) => {
  //       //                         console.log(error);
  //       //                     });
  //       //
  //       //                   }
  //       //             }
  //       //           }
  //       //         }
  //       //
  //       //         if (i.status){
  //       //           for (let action of i.schedule.actions){
  //       //             if (action.extra){
  //       //               if (action.extra.level && action.extra.lm_threshold ||
  //       //                   action.extra.level && action.extra.lm_match ||
  //       //                   action.extra.lm_threshold && action.extra.lm_match){
  //       //                     action.extra = {}
  //       //                     this.ds.set_controller_schedule(i._id.$oid, i.schedule).then((data:any) => {
  //       //                         // console.log('set_controller_schedule returns : ',data);
  //       //                         // this.resumeSubscriptions()
  //       //                     }).catch((error) => {
  //       //                         console.log(error);
  //       //                     });
  //       //
  //       //                   }
  //       //             }
  //       //           }
  //       //         }
  //       //         // light = i
  //       //       }
  //       //       found = true
  //       //     }
  //       //   }
  //       //   if (!found){
  //       //     // remedy a possible problem caused by the flash app and
  //       //     // this app working in tandem
  //       //     if (i.status){
  //       //     for (let action of i.schedule.actions){
  //       //       if (action.extra){
  //       //         if (action.extra.level && action.extra.lm_threshold ||
  //       //             action.extra.level && action.extra.lm_match ||
  //       //             action.extra.lm_threshold && action.extra.lm_match){
  //       //               action.extra = {}
  //       //               this.ds.set_controller_schedule(i._id.$oid, i.schedule).then((data:any) => {
  //       //                   // console.log('set_controller_schedule returns : ',data);
  //       //                   // this.resumeSubscriptions()
  //       //               }).catch((error) => {
  //       //                   console.log(error);
  //       //               });
  //       //             }
  //       //       }
  //       //     }
  //       //     }
  //       //
  //       //     location.lights.push(i)
  //       //   }
  //       // }
  //       // else{
  //       //   location.lights = []
  //       //   // remedy a possible problem caused by the flash app and
  //       //   // this app working in tandem
  //       //   if (i.status){
  //       //   for (let action of i.schedule.actions){
  //       //     if (action.extra){
  //       //       if (action.extra.level && action.extra.lm_threshold ||
  //       //           action.extra.level && action.extra.lm_match ||
  //       //           action.extra.lm_threshold && action.extra.lm_match){
  //       //             action.extra = {}
  //       //             this.ds.set_controller_schedule(i._id.$oid, i.schedule).then((data:any) => {
  //       //                 // console.log('set_controller_schedule returns : ',data);
  //       //                 // this.resumeSubscriptions()
  //       //             }).catch((error) => {
  //       //                 console.log(error);
  //       //             });
  //       //           }
  //       //     }
  //       //   }
  //       //   }
  //       //   location.lights.push(i)
  //       // }
  //
  //     }
  //     if (i.type == 'hvac' || i.type == 'vpat4'){
  //       // i.capname = i.name.toUpperCase();
  //
  //       if (i.status){
  //         if (i.status.sockets){
  //           if (i.status.sockets.space){
  //
  //             // formatting
  //             i.status.state = i.status.state.toUpperCase();
  //             i.status.sched.mode_name = i.status.sched.mode_name.toUpperCase();
  //
  //             if (i.status.substate == 'stage2'){
  //               i.status.substate = "STAGE 2"
  //             }
  //             if (i.status.substate == 'stage1'){
  //               i.status.substate = "STAGE 1"
  //             }
  //             if (i.status.substate == 'blower_cooldown'){
  //               i.status.substate = "BLOWER COOLDOWN"
  //             }
  //             if (i.status.ov){
  //               i.status.ov.dur = moment.utc(i.status.ov.dur*1000).format('HH:mm:ss');
  //             }
  //
  //
  //             if (i.status.dur){
  //               i.status.dur = moment.utc(i.status.dur*1000).format('HH:mm:ss');
  //             }
  //             i.status.sockets.space = parseInt(i.status.sockets.space).toFixed(1)
  //             if (i.status.sockets.g){
  //               if (i.status.sockets.g == '1'){
  //                 i.status.fan = "ON"
  //               }
  //               else {
  //                 i.status.fan = "OFF"
  //               }
  //             }
  //
  //             if (i.status.sockets.dmp){
  //               i.status.sockets.dmp = parseFloat(i.status.sockets.dmp).toFixed(0)
  //             }
  //
  //             if (i.status.sockets.humidity){
  //               i.status.sockets.humidity = parseFloat(i.status.sockets.humidity).toFixed(1)
  //             }
  //
  //
  //           }
  //         }
  //       }
  //       if (
  //         this.contains(i.name,'cooler') ||
  //         this.contains(i.name,'freezer') ||
  //         (this.contains(i.name,'ice') && !this.contains(i.name, 'office'))
  //       )
  //       {
  //         if (!i.status){
  //           i.status = {}
  //         }
  //         i.status.cooler = true
  //         if (i.status){
  //           let state = this.getTempState(i);
  //           switch (state) {
  //             case 0:
  //             case 1:
  //               i.order = 1;
  //               location.coolercolor = 'lightblue';
  //               i.color = 'lightblue'
  //               break;
  //             case 2:
  //               i.order = 2;
  //               location.coolercolor = 'orange';
  //               i.color = 'orange'
  //               break;
  //           }
  //         }
  //
  //         if (location.coolers){
  //           let found = false
  //           for (let hvac of location.coolers){
  //             if (hvac._id.$oid == i._id.$oid){
  //               found = true
  //               if (!hvac.changed){
  //                 // hvac = i
  //                 hvac.status = i.status
  //                 hvac.schedule = i.schedule
  //               }
  //             }
  //           }
  //           if (!found){
  //             location.coolers.push(i)
  //           }
  //         }
  //         else{
  //           location.coolers = []
  //           location.coolers.push(i)
  //
  //         }
  //       }
  //       else if (this.contains(i.name,'water')) {
  //         // if (i.status){
  //         //   let state = this.getTempState(i)
  //         //   switch (state) {
  //         //     case 2:
  //         //       i.order = 3;
  //         //       i.hvaccolor = '#F45151';
  //         //       location.hvaccolor = '#F45151';
  //         //       break;
  //         //     case 1:
  //         //       i.order = 2;
  //         //       i.hvaccolor = '#FEFE83';
  //         //       if (location.hvaccolor != '#F45151') {
  //         //           location.hvaccolor = '#FEFE83';
  //         //       }
  //         //       break;
  //         //     case 0:
  //         //     default:
  //         //       i.order = 1;
  //         //       i.hvaccolor = 'lightgreen';
  //         //       break;
  //         //
  //         //   }
  //         // }
  //
  //         newsensors.push(i)
  //       }
  //       else if (this.contains(i.name,'dehu')) {
  //         newsensors.push(i)
  //       } else {
  //         if (i.status){
  //           let state = this.getTempState(i)
  //           switch (state) {
  //             case 2:
  //               i.order = 3;
  //               i.color = '#F45151';
  //               location.hvaccolor = '#F45151';
  //               break;
  //             case 1:
  //               i.order = 2;
  //               i.color = '#FEFE83';
  //               if (location.hvaccolor != '#F45151') {
  //                   location.hvaccolor = '#FEFE83';
  //               }
  //               break;
  //             case 0:
  //             default:
  //               i.order = 1;
  //               i.color = 'lightgreen';
  //               break;
  //
  //           }
  //           if (i.subtype == 'master'){
  //             i.order = 4
  //             i.color = 'dodgerblue'
  //           }
  //         }
  //
  //
  //
  //         if (location.hvacs){
  //           let found = false
  //           for (let hvac of location.hvacs){
  //             if (hvac._id.$oid == i._id.$oid ){
  //               found = true
  //               if (!hvac.changed){
  //                 // hvac = i
  //                 hvac.status = i.status
  //                 hvac.schedule = i.schedule
  //                 hvac.modes = i.modes
  //
  //               }
  //               // hvac.status = i.status
  //             }
  //
  //           }
  //           if (!found){
  //             location.hvacs.push(i)
  //
  //           }
  //         }
  //         else{
  //           location.hvacs = []
  //           location.hvacs.push(i)
  //         }
  //       }
  //     }
  //
  //
  //
  //     // i.type = i.type.toUpperCase();
  //     // i.subtype = i.subtype.toUpperCase();
  //
  //   }
  //   location.hvacs = _.orderBy(location.hvacs, ['order'], ['desc']);
  //   location.coolers = _.orderBy(location.coolers, ['order'], ['desc']);
  //   location.others = _.orderBy(newothers, ['order'], ['desc']);
  //   // if (location.sensors){
  //   //   let found = false
  //   //   for (let income of newsensors){
  //   //     for (let og of location.sensors){
  //   //       if (income._id.$oid == og._id.$oid ){
  //   //         if (og.status){
  //   //         if (income.ov && !og.status.ov){
  //   //           og.status.ov = {}
  //   //           og.status.ov.r = moment.utc((2700-2)*1000).format('HH:mm:ss');
  //   //         }
  //   //         income.status = og.status
  //   //
  //   //         }
  //   //         // if (!income.changed){
  //   //         // }
  //   //         // console.log(og)
  //   //         // console.log(income)
  //   //         income.settings = og.settings
  //   //         found = true
  //   //       }
  //   //     }
  //   //     if (!found){
  //   //       location.sensors.push(income)
  //   //     }
  //   //   }
  //   //
  //   // }
  //   // else{
  //   //   location.sensors = newsensors
  //   // }
  //
  //   location.power = newpower
  //   this.location.online = true
  //   console.log(this.location)
  //
  // }
  //
  // getOGMode(hvac:any){
  //
  //   if (this.location.schedules){
  //     // dont really know how to do this any other way, hvac has to basically wait
  //     // for this to come back. maybe eventually make a series of checks that once theyve all been completed
  //     // then the hvac page can be clicked on or displayed or something. component based vs page
  //   for (let i of this.location.schedules.result){
  //     if (i.name == hvac.status.sched.name){
  //       // this is hoping there's no duplicately named schedules glboally!!
  //       for (let j of hvac.schedule.actions){
  //         //figure out what my action is given ive found the id of my current schedule using the globals
  //         if (i._id.$oid == j.schedule_id){
  //           if (j.mode_name){
  //           return j.mode_name.toUpperCase()
  //           }
  //
  //         }
  //       }
  //
  //     }
  //   }
  //   }
  //   return '--'
  //
  // }
  //
  // processHomeControllers(data: any){
  //   // let location = this.location
  //   let controllers = data
  //   this.handleControllers(controllers)
  //
  //
  //
  // }

  //
  // unsubscribeHvacPage(controller:any) {
  //   if (controller.stathistsub){
  //     controller.stathistsub.unsubscribe();
  //     controller.stathistsub = null;
  //
  //   }
  //   if (controller.settingssub){
  //     controller.settingssub.unsubscribe();
  //     controller.settingssub = null;
  //   }
  // }
  // subscribeHvacPage(controller:any){
  //
  //   this.unsubscribeHvacPage(controller)
  //   // let headers = new Headers();
  //   // var url = this.ds.apiUrl;
  //   // // let fromtime = this.getUTCTime() - 86400
  //   // let fromtime = this.getUTCTime() - 172800
  //   // let totime = this.getUTCTime()
  //   // let obj = this.ds.build_get_controller_status(controller,fromtime,totime)
  //   // headers = new Headers({ 'Content-Type': "application/json" });
  //   //
  //   // const stathistpolling$ = new Subject()
  //   // controller.stathistsub = Observable
  //   //
  //   //   .of(null)
  //   //   .merge(stathistpolling$)
  //   //   .switchMap(_ =>
  //   //     this.http.post<any>(url, obj)
  //   //       .do(data => {
  //   //         let json = null;
  //   //         if (typeof data !== 'string'){
  //   //           json = data
  //   //         }
  //   //         else{
  //   //           json = JSON.parse(data);
  //   //         }
  //   //         console.log('back with controllers')
  //   //         if (!this.pausesubs && this.window) {
  //   //           this.handleControllerStatHist(json.result, controller)
  //   //         }
  //   //         setTimeout(time => stathistpolling$.next(null), 20000)
  //   //       })
  //   //     )
  //   //     .subscribe(
  //   //       error => {})
  //
  //
  //   let headers = new Headers();
  //   let url = this.ds.apiUrl;
  //
  //   let map: any = {};
  //   map.method = "kl.get_controller_settings_group";
  //   map.id = this.ds.id++;
  //   console.log(controller.type)
  //   map.params = [controller._id.$oid, controller.type];
  //   map.key=this.ds.key
  //
  //   headers = new Headers({ 'Content-Type': "application/json" });
  //   const settingpolling$ = new Subject()
  //   controller.settingssub = Observable
  //
  //       .of(null)
  //       .merge(settingpolling$)
  //       .switchMap(_ =>
  //         this.http.post<any>(url, map)
  //           .do(data => {
  //             let json = null;
  //             if (typeof data !== 'string'){
  //               json = data
  //             }
  //             else{
  //               json = JSON.parse(data);
  //             }
  //             if (!this.pausesubs) {
  //               console.log('yeah')
  //               this.handleControllerSettings(json.result, controller)
  //             }
  //             setTimeout(time => settingpolling$.next(null), 20000)
  //           })
  //         )
  //         .subscribe(
  //           error => {})
  //
  // }
  // unsubscribeHomePage(){
  //   if (this.location.timesubscription){
  //     this.location.timesubscription.unsubscribe()
  //     this.location.timesubscription = null
  //   }
  //
  //
  // }
  // subscribeHomePage(){
  //
  //   this.unsubscribeHomePage()
  //   var map: any = {};
  //   if (this.ds.key){
  //     map.key = this.ds.key
  //   }
  //   map.method = 'kl.get_controllers'
  //   map.params = [this.ds.locationSteps[0].params.fields, this.ds.locationSteps[0].params.sort]
  //   const polling$ = new Subject()
  //   this.location.timesubscription = Observable
  //
  //     .of(null)
  //     .merge(polling$)
  //     .switchMap(_ =>
  //       this.http.post<any>(this.ds.apiUrl, map)
  //         .do(data => {
  //           let json = null;
  //           if (typeof data !== 'string'){
  //             json = data
  //           }
  //           else{
  //             json = JSON.parse(data);
  //           }
  //           if (!this.pausesubs) {
  //             this.handleControllers(json.result)
  //           }
  //           setTimeout(time => polling$.next(null), 20000)
  //         })
  //       )
  //       .subscribe(
  //         error => {
  //           // console.log('error')
  //           // location.received = true;
  //           // location.initialized = true
  //           // location.returned = true
  //           //
  //           // location.online = false;
  //         })
  //
  //
  //
  //
  //
  // }
  //
  // handleErrorObservable (error: Response | any) {
  //   console.error(error);
  //
  //   return _throw(error);
  //
  // }
  //
  //
  // isAuthenticated() {
  //   if (this.user) {
  //     return true;
  //   // } else {
  //     // setTimeout(() => { nav.setRoot("LoginPage") }, 0);
  //   }
  //   return false;
  //
  // 	// return this.storage.get("token").then(token => {
  // 	// 	if (token == null) {
  // 	// 		setTimeout(() => { nav.setRoot("SignInPage") }, 0);
  // 	// 		return false
  // 	// 	} else {
  // 	// 		return true
  // 	// 	}
  // 	// }).catch(() => {
  // 	// 	setTimeout(() => { nav.setRoot("SignInPage") }, 0);
  // 	// 	return false
  // 	// });
  // }

  // getControllerStatusHistory(location: any, controller: any, fromtime: any, totime: any){
  //
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/status_history/', {loc: location, con: controller, fromtime: fromtime, totime: totime})
  //   .map(user => {
  //       return user.status;
  //   })
  //   .catch(this.handleErrorObservable);
  // }

  // getControllerStatus(location: any, controller: any, fromtime: any, totime: any){
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/status_history1/', {loc: location, con: controller, fromtime: fromtime, totime: totime})
  //   .map(user => {
  //       return user;
  //   })
  //   .catch(this.handleErrorObservable);
  // }

  // getLocalControllerStatusHistory(location: any, controller: any, fromtime: any, totime: any):Promise<any> {
  //
  //   return this.ds.state_for_controller(controller._id.$oid)
  //   .then(status => {
  //       return status;
  //   })
  //   .catch(this.handleErrorObservable);
  // }

  // populateControllerSettings(controller):Promise<any> {
  //   console.log('pop_cs : id : '+controller._id.$oid+' , type : '+controller.type);
  //   let promise = new Promise((resolve, reject) => {
  //     console.log('pop_cs executing promise ...');
  //     this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(gsettings => {
  //     // this.ds.get_settings([controller.type]).then(gsettings => {
  //         console.log('pop_cs gsettings : '+gsettings);
  //         this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(csettings => {
  //             var keys = Object.getOwnPropertyNames(csettings);
  //             for (let key of keys) {
  //                gsettings[key] = csettings[key];
  //             }
  //             controller.settings = gsettings;
  //             resolve(controller);
  //         }).catch(err =>{
  //             console.log('populateControllerSettings err : '+err);
  //             reject(err);
  //         });
  //     }).catch(err =>{
  //         console.log('populateControllerSettings err : '+err);
  //         reject(err);
  //     });
  //   });
  //   return promise;
  // }

  // populateControllerSettings(controller):Promise<any> {
  //   console.log('pop_cs : id : '+controller._id.$oid+' , type : '+controller.type);
  //   let promise = new Promise((resolve, reject) => {
  //     console.log('pop_cs executing promise ...');
  //     // this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(settings => {
  //     let type = controller.type.toLowerCase();
  //     this.ds.get_controller_settings_group(controller._id.$oid, type).then(settings => {
  //         console.log('storing settings by type : ',type);
  //         controller.settings[type] = settings;
  //         // console.log('populateControllerSettings settings : '+settings);
  //         // for (let setting of <any[]>settings) {
  //         //   console.log('setting name : '+setting['name']);
  //         // }
  //         resolve(controller);
  //     }).catch(err =>{
  //         console.log('populateControllerSettings error : '+err);
  //         reject(err);
  //     });
  //   });
  //   return promise;
  // }
  //
  //
  // getControllerSettings(controller):Promise<any> {
  //   // console.log('pop_cs : id : '+controller._id.$oid+' , type : '+controller.type.toLowerCase());
  //   let promise = new Promise((resolve, reject) => {
  //     // console.log('pop_cs executing promise ...');
  //     // this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(settings => {
  //     this.ds.get_controller_settings_group(controller._id.$oid, controller.type.toLowerCase()).then(settings => {
  //         //console.log('getControllerSettings settings : '+settings.length);
  //         resolve(<any>settings);
  //     }).catch(err =>{
  //         console.log('getControllerSettings error : '+err);
  //         reject(err);
  //     });
  //   });
  //   return promise;
  // }
  //
  // getLocalControllerSettingsGroup(controller: any) {
  //   // "get_controller_settings_group","mod":"kl","args":[{"role":"administrator","username":"Installer","user_id":"0"},"5d23ff9ae6102851f79d99f8","hvac"]}
  //   return this.ds.get_controller_settings_group(controller._id.$oid, controller.type)
  //   .then(settings => {
  //       return settings;
  //   })
  //   .catch(this.handleErrorObservable);
  // }


  // getUTCTime(){
  //
  //   return Math.floor(new Date().getTime()/1000)
  // }

  // async getLocalControllerStatusAsync(controller:any):Promise<any> {
  //   let params = ["name","type","subtype","enabled","status","modes","schedule","map_entries"];
  //   let status_params = ["state","2c3s","sockets","ts"]
  //   let fromtime = this.getUTCTime() - 86400
  //   let totime = this.getUTCTime()
  //   try {
  //     const status = controller;
  //     // const status = await this.ds.get_controller(controller._id.$oid, params);
  //     // const status_hist = await this.ds.get_controller_status(controller,fromtime,totime);
  //     // status['stat_hist'] = status_hist
  //     const modes = await this.ds.get_controller_modes(controller._id.$oid);
  //     status['modes'] = modes
  //     const settings = await this.getControllerSettings(controller);
  //     status['settings'] = settings;
  //
  //     // let type = controller.type.toLowerCase();
  //     // if (!status.settings) {
  //     //   status.settings = {};
  //     // }
  //     // status.settings[type] = settings;
  //     // console.log('getLocalControllerStatusAsync - settings : ',status.settings);
  //     // settings.forEach((setting) => {
  //     //     status.settings[type].push(setting);
  //     // });
  //     return status;
  //   } catch (error) {
  //   }
  // }

  // async preLoadControllerModes(controller:any):Promise<any> {
  //
  //   try {
  //     const status = controller;
  //
  //     const modes = await this.ds.get_controller_modes(controller._id.$oid);
  //     status['modes'] = modes
  //
  //     return status;
  //   } catch (error) {
  //   }
  // }

  // getLocalControllerStatus(controller:any) :any {
  //   let params = ["name","type","subtype","enabled","status","modes","schedule","map_entries"];
  //   try {
  //
  //     const status = await this.ds.get_controllera(controller._id.$oid, params);
  //     const result = await this.populateControllerSettings(controller);
  //   } catch (error) {
  //       // handle errors
  //   } finally {
  //       connection.close();
  //   }
  // }


  // getLocalControllerStatusSave(controller: any):any {
  //   let params = ["name","type","subtype","enabled","status","modes","schedule","map_entries"];
  //   // console.log('getLocalControllerStatus : '+JSON.stringify(controller));
  //
  //   return this.ds.get_controller(controller._id.$oid, params)
  //   .then(data => {
  //     console.log('getLocalControllerStatus found controller : '+data);
  //     let pop = this.populateControllerSettings(data);
  //     console.log('getLocalControllerStatus calling pop promise with : '+data._id.$oid);
  //     pop.then(uctrl => {
  //         console.log('getLocalControllerStatus returning : '+uctrl);
  //         return uctrl;
  //     }).catch(error => {
  //           console.log("getLocalControllerStatus - error calling populate : "+error);
  //     });
  //     // this.ds.get_controller_settings_group(controller._id.$oid, controller.type)
  //     // .then(settings => {
  //     //     data.settings = settings;
  //     //     return data;
  //     // })
  //     // .catch(this.handleErrorObservable);
  //   }).catch(this.handleErrorObservable);
  // }
  //
  // setHvacOverride(init: number, adj: number, location: any, controller: any){
  //
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/set_hvac_override/', {init: init, adj: adj, loc: location, con: controller})
  //   .map(user => {
  //
  //
  //       return user;
  //   })
  //   .catch(this.handleErrorObservable);
  // }
  //
  // setLightOverride(init: number, adj: number, location: any, controller: any){
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/set_light_override/', {init: init, adj: adj, loc: location, con: controller})
  //   .map(user => {
  //       return user;
  //   })
  //   .catch(this.handleErrorObservable);
  // }
  //
  //
  //
  // setHvacSetting(changes: any, hvac: any, location: any){
  //
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/set_hvac_setting/', {changes: changes, loc: location, con: hvac})
  //   .map(user => {
  //
  //
  //       return user;
  //   })
  //   .catch(this.handleErrorObservable);
  //
  //
  // }
  //
  // getUTCTime(){
  //
  //   // console.log(moment.utc(moment.unix(Math.floor(new Date().getTime()/1000))).format('h:mm'))
  //   return Math.floor(new Date().getTime()/1000)
  //
  //
  // }
  //
  // formatSnakeToCaps(name:string){
  //   let n = name.replace(/_/g," ").toUpperCase();
  //   return n;
  // }
  //
  // formatCapsToSnake(){
  //
  // }
  //
  // getTodaySiteMidnightUTC(){
  //
  //   // "today" is basically gonna be whatever day the client thinks it is right now, so
  //   // get the date from what the corrected (according to client side timezone offset) time is from the
  //   // utc date (which might be a day ahead)
  //   var d = new Date();
  //   console.log(d.getDate())
  //
  //   d.setHours(0,0,0,0);
  //   let clientOffset = d.getTimezoneOffset()*60
  //   console.log(clientOffset)
  //   console.log((d.getTime()/1000) - clientOffset )
  //   return Math.floor(d.getTime()/1000) - clientOffset - this.time_offset
  // }
  //
  //
  // async formatLocationInfo(data) {
  //   // console.log('getLocationData returns : '+JSON.stringify(data));
  //   let location = this.location
  //   if (data.offline){
  //     location.online = false;
  //     return location;
  //   }
  //   else {
  //
  //     if (data.daily_logs_stuff){
  //       location.daily_logs_stuff = data.daily_logs_stuff
  //       for (let i of location.daily_logs_stuff.alarms){
  //         i.alarmtime = moment.utc(moment.unix(i.ts.$date/1000)).format("lll");
  //         for (let cb of this.codes) {
  //           if (cb.code == i.code.trim()) {
  //              i.prettycode = cb.display;
  //
  //           }
  //         }
  //       }
  //     }
  //     if (data.controllers){
  //       //need a preloaded settings for lights at least
  //       for (let i of data.controllers){
  //         if (i.status){
  //           console.log(i.type)
  //           if (i.type.toLowerCase() == 'light'){
  //             this.ds.get_controller_settings_group(i._id.$oid, i.status.type.toLowerCase()).then((data:any) => {
  //               this.handleControllerSettings(data,i)
  //                 // this.loadControllerSetting(path);
  //                 // this.loadControllerGroupSettings();
  //             }).catch((error) => {
  //                 console.log(error);
  //             });
  //             // const settings = await this.getControllerSettings(i);
  //             // this.handleControllerSettings(settings,i)
  //           }
  //         }
  //
  //
  //       }
  //       this.handleControllers(data.controllers)
  //
  //     }
  //
  //     if (data.time){
  //       this.time_offset = data.time.utc_offset_sec
  //       if (data.time.dst == 1){
  //         this.time_offset = this.time_offset + 3600
  //       }
  //       this.timezone = "(" + data.time.tz_code.toLowerCase() + ")"
  //
  //       // let zonecord = offset/3600
  //       //
  //       // if (location.dst) {
  //       //   zonecord = zonecord - 1
  //       // }
  //       //
  //       // let left = 50 + (zonecord/24)*100
  //       // location.left = left.toString() + "%"
  //     }
  //     if (data.schedules){
  //       location.schedules = data.schedules
  //
  //     }
  //   }
  //   console.log('formatLocationInfo returning : ',location);
  // }

  // locationQueryComplete() {
  //   console.log('locationBuilding Complete...');
  //   if (!this.locations) {
  //      this.locations = [];
  //   }
  //   let data:any = {};
  //
  //   console.log('...setting controllers: '+this.ds.controllers.length);
  //   data.controllers = this.ds.controllers;
  //   data.devices = this.ds.devices;
  //   data.schedules = this.ds.schedules;
  //   data.time = this.ds.server_time;
  //   for (let controller of data.controllers) {
  //     //  console.log("controller : "+JSON.stringify(controller));
  //     // let modes = this.ds.get_controller_modes(controller._id.$oid).then(result => {
  //     //     controller.modes = result;
  //     // }).catch(this.handleErrorObservable);
  //     //
  //     // let schedule = this.ds.get_controller_schedule(controller._id.$oid).then(result => {
  //     //     controller.schedule = result;
  //     // }).catch(this.handleErrorObservable);
  //   }
  //   let location = this.formatLocationInfo(data);
  //   this.locations.push(location);
  //   location.online = true;
  //   location.init = true;
  // }

  // buildLocationObject(cb) {
  //   this.ds.processUpdateSteps(this.locationSteps,()=>
  //     {
  //       console.log('locationBuilding Complete...');
  //       let data:any = {};
  //
  //       console.log('...setting controllers: '+this.ds.controllers.length);
  //       data.controllers = this.ds.controllers;
  //       data.devices = this.ds.devices;
  //       data.schedules = this.ds.schedules;
  //       data.time = this.ds.server_time;
  //       // let settingsPromises = [];
  //       // for (let controller of data.controllers) {
  //       //   // let sp:Promise<any> = this.getLocalControllerStatusAsync(controller);
  //       //   // settingsPromises.push(sp);
  //       //   let sp:Promise<any> = this.preLoadControllerModes(controller);
  //       //   settingsPromises.push(sp);
  //       //   // let sp:Promise<any> = this.populateControllerSettings(controller);
  //       //   // settingsPromises.push(sp);
  //       // }
  //       // Promise.all(settingsPromises).then(value => {
  //       //   this.ds.controllers = value;
  //       //   data.controllers = value;
  //       //   // if (!this.locations) {
  //       //   //    this.locations = [];
  //       //   // } else {
  //       //   //   this.locations.length = 0;
  //       //   // }
  //       //   // console.log('buildLocationObject settings returned : '+JSON.stringify(value));
  //       //   this.formatLocationInfo(data);
  //       //
  //       //   this.location.online = true;
  //       //   this.location.init = true;
  //       //   console.log('location:', this.location)
  //       //   cb();
  //       // });
  //       this.formatLocationInfo(data);
  //
  //       this.location.online = true;
  //       this.location.init = true;
  //       console.log('location:', this.location)
  //     })
  //
  //     // this.locationQueryComplete.bind(this));
  //
  // }
  //
  //
  // public getPhone(location: any) {
  //
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/google/', {loc: location})
  //   .map(user => {
  //       return user;
  //   })
  //   .catch(this.handleErrorObservable);
  // }

  // public login(credentials) {
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/authenticate/', { username: credentials.username, password: credentials.password })
  //       .map(user => {
  //           user.is_authenticated = true;
  //           // login successful if there's a jwt token in the response
  //           if (user && user.token) {
  //               this.user=user;
  //
  //               this.locations = [];
  //               if (user.locations == 'null') {
  //
  //                 if (user.dealers){
  //                   this.client = user.dealers[0].clients[0]
  //                   this.locations = this.client.locations
  //                 }
  //
  //               }
  //               if (user.locations != 'null') {
  //                 for (let location of user.locations)  {
  //                   if (location.secret_key == siteSecretKey) {
  //                       location.init = false;
  //                       console.log('location : '+JSON.stringify(location));
  //                       this.locations.push(location);
  //                   }
  //
  //                 }
  //                 // this.locations = user.locations
  //                 // for (let loc of this.locations){
  //                 //   loc.init = false;
  //                 // }
  //               }
  //
  //           }
  //
  //           return user;
  //       })
  //       .catch(this.handleErrorObservable);
  //       // .catch('hello');
  //   // if (credentials.email === null || credentials.password === null) {
  //   //   return Observable.throw("Please insert credentials");
  //   // } else {
  //   //   return Observable.create(observer => {
  //   //     // At this point make a request to your backend to make a real check!
  //   //     let access = (credentials.password === "pass" && credentials.email === "email");
  //   //     this.currentUser = new User('Simon', 'saimon@devdactic.com');
  //   //     observer.next(access);
  //   //     observer.complete();
  //   //   });
  //   // }
  // }

  // ifLoggedIn() {
  //     this.storage.get('USER_INFO').then((response) => {
  //       if (response) {
  //         this.authState.next(true);
  //       }
  //     });
  //   }


    // login() {
    //   var dummy_response = {
    //     user_id: '007',
    //     user_name: 'test'
    //   };
    //   this.storage.set('USER_INFO', dummy_response).then((response) => {
    //     this.router.navigate(['dashboard']);
    //     this.authState.next(true);
    //   });
    // }

    // logout() {
    //   this.storage.remove('USER_INFO').then(() => {
    //     this.router.navigate(['login']);
    //     this.authState.next(false);
    //   });
    // }

    // isAuthenticated() {
    //   return this.authState.value;
    // }


  // public logout() {
  //   this.rpcInfo = null;
  //   this.user = null;
  //   this.loginTime = null;
  //   this.authenticated = false;
  //   if (siteKey && siteSecretKey) {
  //     this.authState.next(LOGIN_STATE);
  //   } else {
  //     this.authState.next(PROVISION_STATE);
  //   }
  // }
  //
  // // async closeModal() {
  // //     let this.modal = await this.modalController.create({
  // //       component: RegisterPage
  // //     });
  // //     return this.modal.present();
  // // }
  //
  // loginTimedOut() {
  //   console.log('loginTimedOut!');
  //   this.rpcInfo = null;
  //   this.user = null;
  //   this.loginTime = null;
  //   this.authenticated = false;
  //   this.locations = [];
  //   // this.app.getActiveNav().setRoot('LoginPage');
  //   clearInterval(this.loginTimer);
  //   this.loginTimer = null;
  //   // const isModalOpened = this.modalCtrl.getTop();
  //   this.popup.closePopup();
  //   // if (isModalOpened) {
  //   //    this.modalCtrl.dismiss();
  //   // }
  //   this.router.navigate(['login']);
  // }
  //
  // public registerKeypress() {
  //   this.loginTime = Date.now();
  // }
  //
  // public loginLocalSite(credentials):Promise<any> {
  //   console.log('AuthLocal calling get_user_by_password');
  //   let promise = new Promise((resolve, reject) => {
  //     this.ds.get_user_by_password(credentials).then(result => {
  //          console.log('loginLocalSite : '+JSON.stringify(result));
  //          if (result) {
  //              this.rpcInfo = result;
  //              this.user = result;
  //              this.loginTime = Date.now();
  //              this.authenticated = true;
  //              // this.loginTimer = setInterval(() => {
  //              //   if (this.loginTime) {
  //              //     let now = Date.now();
  //              //     if (now > (this.loginTime + USER_TIMEOUT)) {
  //              //       this.loginTimedOut();
  //              //     }
  //              //
  //              //   } else {
  //              //     this.loginTimedOut();
  //              //   }
  //              // }, 1000);
  //              this.authState.next(AUTH_STATE);
  //          }
  //          resolve(result);
  //     });
  //   });
  //   return promise;
  // }
  //
  //
  //
  //   // get the cooling set point
  //   getCoolingSP(controller:any):number {
  //     let c_sp = 0.0;
  //     if (controller.status && controller.status.sp) {
  //         let sp:any = controller.status.sp;
  //         c_sp = (sp.c) ? sp.c : 0;
  //     }
  //     return c_sp;
  //   }
  //
  //   // get the heating set point
  //   getHeatingSP(controller:any):number {
  //     let h_sp = 0.0;
  //     if (controller.status && controller.status.sp) {
  //         let sp:any = controller.status.sp;
  //         h_sp = (sp.h) ? sp.h : 0;
  //     }
  //     return h_sp;
  //   }
  //
  //   getSpaceTemp(controller:any):number {
  //     let temp = 0.0;
  //     if (controller.status && controller.status.sockets) {
  //         let sockets:any = controller.status.sockets;
  //         temp = sockets.space;
  //     }
  //     return temp;
  //   }
  //
  //   getTempStyle(controller:any) {
  //
  //       let sp = this.getSpaceTemp(controller);
  //       let hsp = this.getHeatingSP(controller);
  //       let csp = this.getCoolingSP(controller);
  //       controller.hsp = hsp;
  //       controller.csp = csp;
  //
  //
  //       let myStyles = [
  //          'lightgreen',
  //          'yellow',
  //          '#F45151'
  //
  //       ];
  //
  //       if (sp <= ( hsp - 5))  {
  //           return myStyles[2];
  //       } else if (sp < (hsp -2)) {
  //           return myStyles[1];
  //       } else if (sp >= (csp + 5)) {
  //           return myStyles[2];
  //       } else if (sp > (csp + 2)) {
  //           return myStyles[1];
  //       }
  //       return myStyles[0];
  //   }
  //
  //   getTempState(controller:any) {
  //
  //       let sp = this.getSpaceTemp(controller);
  //       let hsp = this.getHeatingSP(controller);
  //       let csp = this.getCoolingSP(controller);
  //       controller.hsp = hsp;
  //       controller.csp = csp;
  //
  //       if (controller.status.state == 'cooling'){
  //              controller.state = "Cooling"
  //              if (sp >= (csp + 5)) {
  //                  return 2;
  //              } else if (sp > (csp + 2)) {
  //                  return 1;
  //              }
  //       }
  //       if (controller.status.state == 'heating') {
  //         if (sp <= ( hsp - 5))  {
  //             return 2;
  //         } else if (sp < (hsp -2)) {
  //             return 1;
  //         }
  //       }
  //       return 0;
  //     }
  //
  //   otherSensor(src) {
  //     // 1. Co2 - contains “Co2, CO2”
  //     // 2. Pressure - Contains “Pressure, BP”
  //     // 3. Door - Contains “Door”
  //     // 4. Humidity - Contains “Humidity, RH”
  //     // 5. Hot Water - Contains “Hot, Water”
  //     if (this.contains(src,'co2') ||
  //         this.contains(src,'dehu') ||
  //         this.contains(src,'pressure') ||
  //         this.contains(src,'bp') ||
  //         this.contains(src,' door') ||
  //         this.contains(src,'humidity') ||
  //         this.contains(src,'temp') ||
  //         this.contains(src,'rh') ||
  //         this.contains(src,'water') ||
  //         this.contains(src,'c02')
  //     ){
  //       return true;
  //     }
  //
  //     else
  //       return false;
  //
  //
  //
  //   }
  //
  //
  //   getSystemStatus():Promise<any> {
  //     let promise:Promise<any> = new Promise((resolve, reject) => {
  //       console.log('getSystemStatus executing promise ...');
  //       // this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(settings => {
  //       this.ds.get_system_status().then(result => {
  //            resolve(result);
  //       }).catch(err => {
  //           reject(err);
  //       });
  //     });
  //     return promise;
	// 	}
  //
  //
  //   loadNextLogs(ts):Promise<any> {
  //     let promise:Promise<any> = new Promise((resolve, reject) => {
  //       console.log('loadNextLogs executing promise ...');
  //       // this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(settings => {
  //       this.ds.get_logs_since(ts).then(result => {
  //
  //            // console.log('loadNextLogs : '+JSON.stringify(result));
  //            // console.log('loadNextLogs - result : '+result);
  //            resolve(result);
  //            // if (result.length > 0) {
  //            //    this._lastTS = result[result.length-1].ts;
  //            //    for (let log of result) {
  //            //       console.log('logEntry : '+JSON.stringify(log));
  //            //    }
  //            // }
  //       }).catch(err => {
  //           reject(err);
  //       });
  //   });
  //   return promise;
  //
  //
  //       // this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(settings => {
  //       //     controller.settings = settings;
  //       //     // console.log('populateControllerSettings settings : '+settings);
  //       //     // for (let setting of <any[]>settings) {
  //       //     //   console.log('setting name : '+setting['name']);
  //       //     // }
  //       //     resolve(controller);
  //       // }).catch(err =>{
  //       //     console.log('populateControllerSettings error : '+err);
  //       //     reject(err);
  //       // });
  //
  //
  //
	// 	}
  //
  // 		// private function handleLogs(res:Array):void {
  // 		// 	if (res.length > 0) {
  // 		// 		_lastTS = res[res.length-1].ts
  // 		// 		dispatchEvent(new QuickEvent(ModelEvents.ON_NEW, res));
  // 		// 	}
  // 		// 	_timeoutIV = setTimeout(this.loadNext, _interval);
  // 		// }
  //     //
  // 		// public function unload():void {
  // 		// 	clearTimeout(_timeoutIV);
  // 		// }
  //
  //   contains(src, test) {
  //     if(src.toLowerCase().indexOf(test) >= 0)
  //       return true;
  //     else
  //       return false;
  //   }
  //
  //   reloadControllers() {
  //     let map:any = {};
  //     map.fields =  ["name","type","subtype","enabled","status","map_entries","schedule","settings","modes"];
  //     map.sort = [["type",1],["subtype",1],["name",1]];
  //   }

    }
