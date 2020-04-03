import { ViewChildren,Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
// import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { AuthLocalProvider } from './providers/authenticate/authlocal';

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

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import * as moment from 'moment';
import * as _ from 'lodash';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // @IonicPage()

@Component({
  selector: 'page-storefront',
  templateUrl: './storefront.page.html',
  styleUrls: ['./storefront.page.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [ state('collapsed, void', style({ height: '0px' })), state('expanded', style({ height: '*' })), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')) ])
  ],
})
export class StorefrontPage implements AfterViewInit{
  columnsToDisplay: string[] = ['name', 'price', 'measurement'];
  cartColumnsToDisplay: string[] = ['name','quantity', 'price', 'measurement'];

  // dataSource = this.auth.storeproducts;
  dataSource = new MatTableDataSource(this.auth.storeproducts);
  cart = new MatTableDataSource(this.auth.cart);

  loading: any;
  username: string;
  password: string;
  remember: boolean = false;
  expandedElement: any | null;
  numbers:any = Array(101).fill().map((x,i)=>i); // [0,1,2,3,4]

  // registerCredentials = { username: '', password: '' };
  @ViewChild('storeSort', { read: MatSort, static: true }) storeSort: MatSort;
  @ViewChild('cartSort', { read: MatSort, static: true }) cartSort: MatSort;
  // @ViewChildren(MatSort) set matSort(s: QueryList<MatSort>) {
  // const ref = this;
  //   s.forEach((matSort: any, index: number) => {
  //     const dataSource;
  //     if (index == 0){
  //       dataSource = ref['storeSort'];
  //     }
  //     else{
  //       dataSource = ref['cartSort']
  //     }
  //
  //     dataSource.sort = matSort;
  //   });
  // }

  constructor(private cdRef: ChangeDetectorRef,private router: Router, private storage: Storage, private nav: NavController, private auth: AuthLocalProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {


  }
  getTotalCost() {
    return this.cart.map(t => t.price*t.quantity).reduce((acc, value) => acc + value, 0);
  }
  collapseall(){
    for (let p of this.auth.storeproducts ){
      p.expanded = false;
      // p.quantity = 0
    }
  }
  expandall(){
    for (let p of this.auth.storeproducts ){
      p.expanded = true;
      // p.quantity = 0
    }
  }
  collapseall1(){
    for (let p of this.auth.cart ){
      p.expanded = false;
      // p.quantity = 0
    }
  }
  expandall1(){
    for (let p of this.auth.cart ){
      p.expanded = true;
      // p.quantity = 0
    }
  }
  ngAfterViewInit (){
      this.dataSource.sort = this.storeSort;
      this.cart.sort = this.cartSort;
this.cdRef.detectChanges()
      for (let p of this.auth.storeproducts ){
        p.expanded = true;
        p.quantity = 0
      }

    }

    refreshTables(){
      this.cart = new MatTableDataSource(this.auth.cart)
      this.dataSource = new MatTableDataSource(this.auth.storeproducts);
      this.dataSource.sort = this.storeSort;
      this.cart.sort = this.cartSort;
    }
    addToCart(product:any){
      this.auth.storeproducts = this.auth.storeproducts.filter( el => el !== product )
      this.auth.cart.push(product)
      this.cart = new MatTableDataSource(this.auth.cart)
      this.dataSource = new MatTableDataSource(this.auth.storeproducts);
      this.refreshTables()

    }
    removeFromCart(product:any){
      this.auth.cart = this.auth.cart.filter( el => el !== product );
      this.auth.storeproducts.push(product)
      this.cart = this.auth.cart
      this.dataSource = this.auth.storeproducts
      this.refreshTables()

    }
  // ngOnInit(){
  //   this.dataSource.sort = this.sort;
  // }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cart.filter = filterValue.trim().toLowerCase();
  }

  rememberme(){
    this.remember = !this.remember;
  }
  onMatSortChange(){
    console.log('here')
  }




}
