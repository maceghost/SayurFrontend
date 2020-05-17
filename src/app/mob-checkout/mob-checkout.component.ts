import { ViewChildren,Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';

import { DataService } from '../data.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event, ActivatedRoute } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatTable} from '@angular/material/table';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
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
 import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mob-checkout',
  templateUrl: './mob-checkout.component.html',
  styleUrls: ['../css/webflow.css','../css/normalize.css','../desk-portal/desk-portal.component.css','./mob-checkout.component.css']
})
export class MobCheckoutComponent implements OnInit {

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

  columnsToDisplay: string[] = ['name', 'price', 'measurement'];
  cartColumnsToDisplay: string[] = ['name','quantity', 'price', 'measurement'];


  filterOpen = false;
  loading: any;
  username: string;
  password: string;
  expandedElement: any | null;
  numbers:any = []; // [0,1,2,3,4]
  currency:any = 'Rp';
  currencies:any = ['Rp','Usd','Rub']
  aisle: any;
  categories: any;
  subcategories:any;
  products:any = [];
  queryTxt:any;
  sort:any = 'none';
  minprice:any = null;
  maxprice:any = null;
  days:any = []
  day:any;
  name:any;
  email:any;
  address1:any;
  address2:any;
  city:any;
  province:any;
  postal:any;
  country:any;
  payment:any = "COD";
  time:any;
  error:any;
  phone:any = ' ';
  remember:any = true;
  placing:any = false;
  touchmap:any = {name:false,phone:false,email:false,address1:false,city:false}


  constructor(private cdRef: ChangeDetectorRef,private router: Router,public auth: DataService) {

    let i: number = 1;

    while (i < 101) {
        this.numbers.push(i);
        i++;
    }
    console.log(this.numbers)



  }
  getUTCTime(day:any){
    let time:any;
    time = parseInt(this.auth.time.split(':')[0])
    if (time<9){
      time = time + 12

    }


    let mytime = this.auth.day.ts + time*60*60*1000
    return mytime
  }


  formsValid(){
    if (this.amIWrong('name') ||
        (this.amIWrong('phone') && this.amIWrong('email')) ||
        this.amIWrong('address1') ||
        this.amIWrong('city') ||
        // this.amIWrong('province') ||
        // this.amIWrong('postal') ||
        // this.amIWrong('country') ||
        !this.auth.time ){
      return false
    }
    else{
      return true
    }
  }
  placeOrder(){



      let temp = []
      for (let i of this.auth.cart){
        let ob = {name:i.name,quantity:i.quantity,measurement:i.measurement}
        temp.push(ob)
      }
      let order:any = {
        ts: this.getUTCTime(this.auth.day),
        custinfo: {
          name: this.name || '',
          email: this.email || '',
          address1: this.address1 || '',
          address2: this.address2 || '',
          city: this.city || '',
          province: this.province || '',
          postal: this.postal || '',
          country: this.country || '',
          phone: this.phoneForm.value.phone || ''
        },
        cart: temp,
        total: this.getTotalCost(),
        additional:''
      }
      this.auth.phone = this.phoneForm.value.phone
      if (this.auth.phone){
        this.auth.internationalNumber = this.auth.phone.internationalNumber

      }
      this.auth.email = this.email
      this.auth.placing = true
      if (this.remember){
        this.auth.saveUser(order.custinfo)
      }
      this.auth.post_order(order).then(result => {
        this.auth.placed = true
        this.auth.placing = false
        this.auth.cart = []
        for (let i of this.auth.storeproducts){
          i.added = false
        }

        this.auth.changeView('home');



      })

    // }
    // if (this.error){
    //
    // }

    // if (!this.name || this.name.length == 0){
    //   this.name.error = true
    // }
    // console.log(this.name)
  }
  isAvailable(item:any){
    if (item.times.length != 0){
      return 'Available'
    }
    else{
      return 'Not Available'
    }
  }
  amIWrong(item:any){
    if (item == 'name'){
      if (!this.name || this.name.length == 0 || !this.name.match(/[a-zA-Z]+/g)){
        return true
      }

    }
    // if (item == 'phone'){
    //   if (!this.phoneForm || !this.phoneForm.value.phone || this.phoneForm.value.phone.number.length == 0 || !phoneForm.value.phone.number.match(/[\d -]+/g)){
    //     return true
    //   }
    //
    // }
    if (item == 'email'){
      if (!this.email || this.email.length == 0 || !this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        return true
      }

    }
    if (item == 'address1'){
      if (!this.address1 || this.address1.length == 0){
        return true
      }

    }
    if (item == 'city'){
      if (!this.city || this.city.length == 0){
        return true
      }

    }
    if (item == 'province'){
      if (!this.province || this.province.length == 0){
        return true
      }

    }
    if (item == 'postal'){
      if (!this.postal || this.postal.length == 0 || !this.postal.match(/^(?=.*\d)[\d ]+$/)){
        return true
      }

    }
    if (item == 'country'){
      if (!this.country || this.country.length == 0){
        return true
      }

    }
    return false
  }

  getTotal(){
    let carttotal = 0
    for (let item of this.auth.cart){
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
      carttotal = carttotal + total
    }

    let returntotal:string = "Rp" + (carttotal + 12000).toString();


    return returntotal

  }
  getCartPrice(){
    let carttotal = 0
    for (let item of this.auth.cart){
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
      carttotal = carttotal + total
    }

    let returntotal:string = "Rp" + carttotal.toString();


    return returntotal

  }
  ngOnInit(){

    console.log(this.phoneForm)
    let user = this.auth.retrieveUser()
    if (user){
      console.log(user)
      this.name = user.name
      this.email = user.email
      this.address1 = user.address1
      this.address2 = user.address2
      this.city = user.city
      this.province = user.province
      this.postal = user.postal
      this.country = user.country
      this.phoneForm = new FormGroup({
    		phone: new FormControl(null, [Validators.required])
    	});
      // this.phoneForm.setValue({
      //   phone: {
      //     countryCode:  user.phone.countryCode,
      //     dialCode : user.phone.dialCode,
      //     internationalNumber : user.phone.internationalNumber,
      //     number : user.phone.number
      //   }
      //
      // });
      // // this.phoneForm.value.phone = user.phone
      this.phoneForm.controls.phone.setValue(user.phone.number);

    }


      // this.phoneForm.controls.phone.setValue({
      //     countryCode:  user.phone.countryCode,
      //     dialCode : user.phone.dialCode,
      //     internationalNumber : user.phone.internationalNumber,
      //     number : user.phone.number
      //   });

      this.cdRef.detectChanges();




  }

  updateFilters(){
    this.auth.category = this.auth.aisle.categories[0]

  }
  updateSubCatFilter(){
    this.auth.subcategory = this.auth.category.subcategories[0]

  }
  getCategories(){

    this.categories = this.auth.aisle.categories

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

    this.products = this.products.filter(function (o) {
      return minprice <= o.cheapest && o.cheapest <= maxprice;
    });

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


    addToCart(product:any){
      // this.auth.storeproducts = this.auth.storeproducts.filter( el => el !== product )
      product.added = true
      this.auth.cart.push(product)
      // console.log(JSON.parse(JSON.stringify(this.auth.cart)))
      this.auth.saveCart()

      // this.cart = new MatTableDataSource(this.auth.cart)
      // this.dataSource = new MatTableDataSource(this.auth.storeproducts);
      // this.refreshTables()

    }
    removeFromCart(product:any){
      product.added = false

      this.auth.cart = this.auth.cart.filter( el => el !== product );
      this.auth.saveCart()
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



  rememberme(){
    this.remember = !this.remember;
  }
  onMatSortChange(){
    console.log('here')
  }
}
