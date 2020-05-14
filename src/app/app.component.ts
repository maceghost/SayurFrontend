import { OnInit,Component } from '@angular/core';
import { DataService } from './data.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/webflow.css','./css/normalize.css','./app.component.css',]
})
export class AppComponent implements OnInit {
  title = 'Sayur Stall';
  subscription:Subscription;

  constructor(

    public ds: DataService

    // private state: RouterStateSnapshot
  ){}

  // window.onbeforeunload = function(e) {
  //     return 'Dialog text here.';
  //   };

  ngOnInit() {
    this.subscription = this.ds.navItem$
       .subscribe(item => {

         document.body.scrollTop = 0;

       }
       )
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}
