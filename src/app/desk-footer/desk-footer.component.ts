import { ViewChildren,Component, ViewChild, ElementRef, OnInit, AfterViewInit, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';

import { DataService } from '../data.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event, ActivatedRoute } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatTable} from '@angular/material/table';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrotshasfdhgasdfghsfdhasfdghfshgfsdfghadfsfdg'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}



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
  selector: 'app-desk-footer',
  templateUrl: './desk-footer.component.html',
  styleUrls: [  '../css/webflow.css','../css/normalize.css','./desk-footer.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [ state('collapsed, void', style({ height: '0px' })), state('expanded', style({ height: '*' })), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')) ])
  ],
})
export class DeskFooterComponent implements OnInit{

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;




  columnsToDisplay: string[] = ['name', 'price', 'measurement'];
  cartColumnsToDisplay: string[] = ['name','quantity', 'price', 'measurement'];

  catfilter = 'All items';
  subfilter = null;
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
  products:any = [];
  queryTxt:any;
  sort:any = 'none';
  minprice:any = null;
  maxprice:any = null;
  shoplist:any = false;
  catexpanded = true;
  productview:any = 'grid'
  productslen:any = 0
  viewitem = null;



  constructor(private cdRef: ChangeDetectorRef,private router: Router,public auth: DataService) {
this.dataSource.data = TREE_DATA;
    let i: number = 1;

    while (i < 101) {
        this.numbers.push(i);
        i++;
    }
    console.log(this.numbers)

    console.log(this.auth.cart.length)

  }

  // getTags(item:any){
  //
  //   let retlist = []
  //   for (let i of item.categories)
  //
  // }
  goToCategory(type:any){

    if (type == 'cat'){
      this.catfilter = this.viewitem.category
      this.subfilter = null
    }
    else{
      this.subfilter = this.viewitem.subcategory
      this.catfilter = null

    }
    this.viewitem = null

  }
  modQuant(item:any, number:number){
    console.log(number)
    if (number == -1 && item.quantity == 1 ){
      return

    }
    else{
      item.quantity = item.quantity + number
    }
  }
  hitCat(cat:any){
    if (cat.subcategories.length == 0){
      this.subfilter = null

      this.catfilter = cat.name
      for (let i of this.auth.aisle.categories){
        if (i.name != cat.name){
          i.expanded = false

        }
      }
    }
    else if (this.catfilter == cat.name){
      cat.expanded = !cat.expanded

    }
    else{
      if (cat.expanded){
        // if (this.catfilter == cat.name){
        //
        //   // cat.expanded = false
        // }
        // else{
        //   this.subfilter = null
        //
        //   this.catfilter = cat.name
        //
        // }
        this.subfilter = null

        this.catfilter = cat.name

        for (let i of this.auth.aisle.categories){
          if (i.name != cat.name){
            i.expanded = false

          }
        }

      }
      else{
        cat.expanded = true
      }
    }





  }

  subHit(sub:any){
    this.subfilter = sub
    this.catfilter = null
    this.newFilterProducts()




  }

  ngOnInit(){
    this.newFilterProducts()
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

  getProductslen(){
    // this.cdRef.detectChanges();

    return this.productslen
  }
  newFilterProducts(){
    // console.log(this.auth.aisle.categories)
    if (this.catfilter){
      if (this.catfilter == 'All items'){
        this.products = this.auth.storeproducts

      }
      else{
        this.products = _.filter(this.auth.storeproducts, {category: this.catfilter});

      }
    }
    if (this.subfilter){

      this.products = _.filter(this.auth.storeproducts, {subcategory: this.subfilter});

    }

    let maxprice = 1000000000
    let minprice = 0
    if (this.auth.maxprice){
      maxprice = parseInt(this.auth.maxprice)
    }
    if (this.auth.minprice){
      minprice = parseInt(this.auth.minprice)
    }

    this.products = _.filter(this.products, function(o){
      if (minprice <= o.cheapest && o.cheapest <= maxprice){
        return true
      }
      else{
        return false
      }
    });


    if (this.queryTxt){
      let tmp = this.queryTxt
      this.products = _.filter(this.products, function(o){
        return JSON.stringify(o).toLowerCase().indexOf(tmp.toLowerCase()) > -1;
      });
    }


    if (this.sort == 'pricelow'){
      this.products = _.orderBy(this.products, ['cheapest'], ['asc']);
    }
    if (this.sort == 'pricehigh'){
      this.products = _.orderBy(this.products, ['cheapest'], ['desc']);
    }

    this.productslen = this.products.length
    return this.productslen
    // return this.products

  }
  getUrl(i:any){
    console.log(i.image)
    return "url('" + i.image + "')"
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
      }
      else{
        this.products = _.filter(this.auth.storeproducts, {category: this.auth.category.name});

      }
    }
    if (this.auth.subcategory){
      if (this.auth.subcategory == 'All'){
        this.products = _.filter(this.auth.storeproducts, {category: this.auth.category.name});
      }
      else{
        this.products = _.filter(this.auth.storeproducts, {subcategory: this.auth.subcategory});

      }
    }
    let maxprice = 1000000000
    let minprice = 0
    if (this.auth.maxprice){
      maxprice = parseInt(this.auth.maxprice)
    }
    if (this.auth.minprice){
      minprice = parseInt(this.auth.minprice)
    }

    this.products = _.filter(this.products, function(o){
      if (minprice <= o.cheapest && o.cheapest <= maxprice){
        return true
      }
      else{
        return false
      }
    });


    // if (this.queryTxt){
    //   let tmp = this.queryTxt
    //   this.products = _.filter(this.products, function(o){
    //     return JSON.stringify(o).toLowerCase().indexOf(tmp.toLowerCase()) > -1;
    //   });
    // }


    if (this.sort == 'pricelow'){
      this.products = _.orderBy(this.products, ['cheapest'], ['asc']);
    }
    if (this.sort == 'pricehigh'){
      this.products = _.orderBy(this.products, ['cheapest'], ['desc']);
    }




    // this.cdRef.detectChanges()
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
    item.cheapest = Math.min.apply(null, cheapest)
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
