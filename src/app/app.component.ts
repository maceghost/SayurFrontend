import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sayur Stall';

  constructor(

    public ds: DataService

    // private state: RouterStateSnapshot
  ){}

  // window.onbeforeunload = function(e) {
  //     return 'Dialog text here.';
  //   };

  ngOnDestroy(){
    // console.log('hello')
    // localStorage.setItem("cart", this.auth.cart);
  }
  ngOnInit(){
    // this.ds.retrieveCart()

  }

}
