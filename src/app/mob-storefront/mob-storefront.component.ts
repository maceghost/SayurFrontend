import { ViewChildren,Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';

import { DataService } from '../data.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event, ActivatedRoute } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatTable} from '@angular/material/table';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


// import * as moment from 'moment';
import * as _ from 'lodash';
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
  styleUrls: [  '../css/webflow.css','../css/normalize.css','./mob-storefront.component.css'],
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
  aisle: any;
  categories: any;
  subcategories:any;
  products:any = this.auth.storeproducts;
  queryTxt:any;
  sort:any = 'none';
  minprice:any = null;
  maxprice:any = null;

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
    // this.aisle = this.auth.aisles[0];
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

  updateFilters(){
    this.auth.category = this.auth.aisle.categories[0]

  }
  updateSubCatFilter(){
    this.auth.subcategory = this.auth.category.subcategories[0]

  }
  getCategories(){
    console.log(this.auth.aisle)
    console.log(this.categories)

    this.categories = this.auth.aisle.categories
    console.log(this.categories)

    if (this.categories.length > 0){
      return true

    }
    else{
      return false
    }
  }

  getSubCategories(){
    this.subcategories = this.auth.category.subcategories
    if (this.subcategories.length != 0){
      return true

    }
    else{
      return false
    }
  }


  filterProducts(){
    console.log(this.products)

    if (this.auth.aisle){
      if (this.auth.aisle.name == 'All'){
        this.products = this.auth.storeproducts
      }
      else{
        this.products = _.filter(this.auth.storeproducts, {aisle: this.auth.aisle.name});

      }
    }
    if (this.auth.category){
      if (this.auth.category.name == 'All'){
        this.products = _.filter(this.auth.storeproducts, {aisle: this.auth.aisle.name});
        // this.products = this.auth.storeproducts
      }
      else{
        this.products = _.filter(this.auth.storeproducts, {category: this.auth.category.name});

      }
    }
    if (this.auth.subcategory){
      if (this.auth.subcategory == 'All'){
        this.products = _.filter(this.auth.storeproducts, {category: this.auth.category.name});
        // this.products = this.auth.storeproducts
      }
      else{
        this.products = _.filter(this.auth.storeproducts, {subcategory: this.auth.subcategory});

      }
    }

    if (this.queryTxt){
      let tmp = this.queryTxt
      this.products = _.filter(this.products, function(o){
        console.log(JSON.stringify(o));
        return JSON.stringify(o).toLowerCase().indexOf(tmp.toLowerCase()) > -1;
      });
    }
    if (this.sort == 'pricelow'){
      this.products = _.orderBy(this.products, ['cheapest'], ['asc']);
    }
    if (this.sort == 'pricehigh'){
      this.products = _.orderBy(this.products, ['cheapest'], ['desc']);
    }

    let maxprice = 1000000000
    let minprice = 0
    if (this.auth.maxprice){
      maxprice = parseInt(this.auth.maxprice)
    }
    if (this.auth.minprice){
      minprice = parseInt(this.auth.minprice)
    }

    // this.products = _.filter(this.products, function(o){
    //   console.log(minprice,maxprice,o.cheapest);
    //   if (minprice <= o.cheapest <= maxprice){
    //     return true
    //   }
    //   else{
    //     return false
    //   };
    // })
    console.log(this.products)
    this.products = this.products.filter(function (o) {
      console.log(minprice,maxprice,o.cheapest);

      return minprice <= o.cheapest && o.cheapest <= maxprice;
    });
    // this.products = this.products.filter(function (o) {
    //
    //   return minprice <= o.cheapest <= maxprice;
    // });


    return this.products

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
    let cheapest:any = []

    if (item.price_per_kg){

      cheapest.push(item.price_per_kg)
    }
    if (item.price_per_unit){

      cheapest.push(item.price_per_unit)
    }
    if (item.price_per_tied_bunch){

      cheapest.push(item.price_per_tied_bunch)
    }
    item.cheapest = Math.min(cheapest)
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
      // this.auth.storeproducts = this.auth.storeproducts.filter( el => el !== product )
      product.added = true
      this.auth.cart.push(product)
      // this.cart = new MatTableDataSource(this.auth.cart)
      // this.dataSource = new MatTableDataSource(this.auth.storeproducts);
      // this.refreshTables()

    }
    removeFromCart(product:any){
      product.added = false

      this.auth.cart = this.auth.cart.filter( el => el !== product );
      // this.auth.storeproducts.push(product)
      // this.cart = this.auth.cart
      // this.dataSource = this.auth.storeproducts
      // this.refreshTables()

    }
  // ngOnInit(){
  //   this.dataSource.sort = this.sort;
  // }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.products = _.filter(this.auth.storeproducts, function(o){return o.name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1});
    this.products = _.filter(this.auth.storeproducts, function(o)
    { console.log(JSON.stringify(o));

      return JSON.stringify(o).toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
       });
    console.log(this.products)

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
