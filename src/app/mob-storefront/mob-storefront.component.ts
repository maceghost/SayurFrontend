import { ViewChildren,Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';

import { DataService } from '../data.service';
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

// import * as moment from 'moment';
// import * as _ from 'lodash';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // @IonicPage()


@Component({
  selector: 'app-mob-storefront',
  templateUrl: './mob-storefront.component.html',
  styleUrls: [  'css/webflow.css','css/normalize.css','css/jacks-business-starter-819719.webflow.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [ state('collapsed, void', style({ height: '0px' })), state('expanded', style({ height: '*' })), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')) ])
  ],
})
export class MobStorefrontComponent implements AfterViewInit{
  columnsToDisplay: string[] = ['name', 'price', 'measurement'];
  cartColumnsToDisplay: string[] = ['name','quantity', 'price', 'measurement'];

  // dataSource = this.auth.storeproducts;
  dataSource = new MatTableDataSource(this.auth.storeproducts);
  cart = new MatTableDataSource(this.auth.cart);
  filterOpen = false;
  loading: any;
  username: string;
  password: string;
  remember: boolean = false;
  expandedElement: any | null;
  numbers:any = []; // [0,1,2,3,4]
  currency:any = 'Rp';
  currencies:any = ['Rp','Usd','Rub']
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

  constructor(private cdRef: ChangeDetectorRef,private router: Router,public auth: DataService) {

    let i: number = 1;

    while (i < 101) {
        this.numbers.push(i);
        i++;
    }
    console.log(this.numbers)

  }
  ngOnInit(){
    // for (let i of this.auth.storeproducts){
    //   i.added = false
    //   i.measurements = []
    //   if (i.price_per_kg){
    //     i.measurements.push('Kg')
    //   }
    //   if (i.price_per_unit){
    //     i.measurements.push('Unit')
    //   }
    //   if (i.price_per_tied_bunch){
    //     i.measurements.push('Tied Bunch')
    //   }
    //
    //   i.measurement = i.measurements[0]
    //   i.quantity = 1
    // }
  }
  getPrice(item:any){
    let total = 0
    switch(item.measurement) {
      case 'Kg':
        total = item.price_per_kg
        break;
      case 'Unit':
        total = item.price_per_unit
        break;
      case 'Tied Bunch':
        total = item.price_per_tied_bunch
        break;
    }
    total = total * item.quantity
    console.log(item.quantity)
    console.log(this.currency)
    let returntotal:string;
    switch(this.currency) {
      case 'Usd':
        console.log(total / 16146.20)
        returntotal = "$" + (total / 16146.20).toFixed(2).toString()
        break;
      case 'Rub':
        returntotal = "₽" + (total / 214.26).toFixed(2).toString()
        break;
      default:
        returntotal = "Rp" + total.toString()
    }
    console.log(returntotal)
    return returntotal

  }

  checkout(){
    this.router.navigate(['checkout']);
  }
  getTotalCost() {
    let total = 0
    for (let i of this.auth.cart){
      console.log(i)
      total = total + i.quantity*i.price
    }
    return total
    // return this.cart.map(t => t.price*t.quantity).reduce((acc, value) => acc + value, 0);
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
// this.cdRef.detectChanges()
//       for (let p of this.auth.storeproducts ){
//         p.expanded = true;
//         p.quantity = 0
//       }

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
