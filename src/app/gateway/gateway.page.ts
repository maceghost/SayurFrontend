import { Component, OnInit, Pipe, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DataService } from '../providers/data.service'
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.page.html',
  styleUrls: ['./gateway.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GatewayPage implements OnInit {

  radios:any[];
  r:any = {};
  ts:any[];

  isDiscovering = false;
  showing = '1';
  faCoffee = faCoffee;
  // myForm = this.fb.group({
  //  options: ['1']
  // })
  // showingType = [
  //   { name:'Radios'},
  //   { name:'Modbus Devices'}
  // ]
  //
  // showing = this.showingType[0];
  searchText:string;

// , private fb: FormBuilder
  constructor(public ds:DataService, private cdr:ChangeDetectorRef) {
    console.log('gateway()');
  }

  ngOnInit() {
    console.log('gateway - ngOnInit()');
    this.reload();
    // this.ds.proxy_gateway("/radios.json").then((data:any) => {
    //     console.log('proxy_gateway returned : '+JSON.stringify(data.result));
    //     this.radios = data.result;
    // }).catch((error) => {
    //     console.log(error);
    // });
  }

  refresh() {
     setTimeout(() => {
       console.log('GatewayPage.refresh()');
       this.cdr.markForCheck();
       this.cdr.detectChanges();
     }, 100);
  }

  reload() {
    this.ds.proxy_gateway("/radios.json").then((data:any) => {
        // console.log('proxy_gateway radios returned : ',data.result);

        this.radios = data.result;
        if (this.radios) {
          for (var i=0; i < this.radios.length;i++) {
            var r = this.radios[i];
            console.log('proxy_gateway radio r : ',r);
            r.displayDevices = r.originalDevices = r.devices.join(",");
            if (r.route == null) {
              r.displayRoute = r.originalRoute = "no route";
            }
            else {
              r.displayRoute = r.originalRoute = r.route.join(", ");
            }

            r.supportsDevices = (
               (r.device_type == "RS485Adapter") ||
               (r.device_type.toLowerCase().indexOf('xbeedigimesh900') != -1)
             );
          }
        }
        // var r = data[i];
        // r.displayDevices = r.originalDevices = r.devices.join(",");
        // if (r.route == null) {
        //   r.displayRoute = r.originalRoute = "no route";
        // }
        // else {
        //   r.displayRoute = r.originalRoute = r.route.join(", ");
        // }
        //
        // r.supportsDevices = r.device_type == "RS485Adapter";

    }).catch((error) => {
        console.log("reload() error : "+error);
    });
    this.ds.proxy_gateway("/translations.json").then((data:any) => {
        console.log('proxy_gateway translations returned : ',data.result);
        this.ts = data.result;
    }).catch((error) => {
        console.log("reload() error : "+error);
    });

    //
    // $http.get('/radios.json').success(function(data) {
    //     for (var i=0;i<data.length;i++) {
    //       var r = data[i];
    //       this.r.displayDevices = this.r.originalDevices = this.r.devices.join(",");
    //       if (this.r.route == null) {
    //         this.r.displayRoute = this.r.originalRoute = "no route";
    //       }
    //       else {
    //         this.r.displayRoute = this.r.originalRoute = this.r.route.join(", ");
    //       }
    //
    //       this.r.supportsDevices = this.r.device_type == "RS485Adapter";
    //     }
    //     rs = data;
    // });
  }

  exportRoutes() {
    this.ds.proxy_gateway("/radios/routes/export").then((data:any) => {
        console.log('proxy_gateway exportRoutes returned : ',data.result);
        // this.radios = data.result;
    }).catch((error) => {
        console.log(error);
    });
    // $("#export-btn").button('loading');
    // $http.post('/radios/routes/export')
    //   .success(function() {
    //       setTimeout(function() {
    //         $("#export-btn").button('reset');
    //       }, 500);
    //   });
  }

  // DEVICES

  isConfigured(r) {
    return r.status == 'configured' || r.status == 'locked';
  }

  onDevicesChange(r) {
    r.status = 0;
    r.devicesChanged = true;
    return true;
  }

  cancelDevicesChange(r) {
    r.displayDevices = this.r.originalDevices;
    r.devicesChanged = false;
  }

  saveDevices(r) {
    console.log('saveDevices : ',r.displayDevices);
    this.ds.proxy_gateway_post("/radios/" + r.address64 + "/nodeid",r.displayDevices).then((data:any) => {
        console.log('proxy_gateway saveDevices returned : ',data.result);
        // this.radios = data.result;
        r.originalDevices = r.displayDevices;
        r.devicesChanged = false;
    }).catch((error) => {
        console.log(error);
    });

    // $http.post('/radios/' + r.address64 + '/nodeid', r.displayDevices)
    //   .success(function(data) {
    //     r.originalDevices = r.displayDevices;
    //     r.devicesChanged = false;
    //   });
  }

  // ROUTE

  routeDesc(r) {
    // return "0 hops";
    if (r) {
      if (r.displayRoute) {
        if (r.displayRoute != "no route") {
          if (r.displayRoute.length == 0) {
            return "0 hops";
          }
          else {
            return r.displayRoute.split(",").length.toString() + " hops";
          }
        } else {
          return r.displayRoute;
        }
      } else {
          return "no route";
      }
    }
  }

  editRoute(r) {
    r.originalRoute = r.displayRoute;
    r.editingRoute = true;
  }

  cancelEditRoute(r) {
    r.displayRoute = this.r.originalRoute;
    r.editingRoute = false;
  }

  clearRoute(r) {
    this.ds.proxy_gateway_post("/radios/" + r.address64 + "/route","clear").then((data:any) => {
        console.log('proxy_gateway clearRoute returned : ',data.result);
        // this.radios = data.result;
    }).catch((error) => {
        console.log(error);
    });

    // $http.post('/radios/' + this.r.address64 + '/route', "clear")
    //   .success(function(data) {
    //     this.r.displayRoute = this.r.originalRoute = "no route";
    //     this.r.editingRoute = false;
    //   });
  }

  saveRoute(r) {
    this.ds.proxy_gateway_post("/radios/" + r.address64 + "/route",r.displayRoute).then((data:any) => {
        console.log('proxy_gateway saveRoute returned : ',data.result);
        // this.radios = data.result;

    }).catch((error) => {
        console.log(error);
    });
    // $http.post('/radios/' + r.address64 + '/route', r.displayRoute)
    //   .success(function(data) {
    //     r.originalRoute = r.displayRoute;
    //     r.editingRoute = false;
    //   });
  }

  clear() {
    if (this.isDiscovering) return;
    this.ds.proxy_gateway("/radios/clear").then((data:any) => {
        console.log('proxy_gateway proxy_gateway_get returned : ',data.result);
        this.reload();
        // this.radios = data.result;

    }).catch((error) => {
        console.log(error);
    });
  }

  discover() {
    if(this.isDiscovering) {
      console.log('discover isDiscovering');
      return;
    }
    this.isDiscovering = true;
    this.ds.proxy_gateway("/radios/discover").then((data:any) => {
        console.log('proxy_gateway discover returned : ',data);
        this.isDiscovering = false;
        this.reload();
        // this.radios = data.result;

    }).catch((error) => {
        console.log(error);
    });
    setTimeout(()=> {
      console.log('discover timeout expired : ',this.isDiscovering);
      if (this.isDiscovering) {
        this.isDiscovering = false;
        this.reload();
      }
    },10000);
    // $http.get('/radios/discover');
    // setTimeout(function(){
    //     isDiscovering = false;
    //     reload()
    // }, 10000);
  }

  setShowingValue(v) {
    this.reload();
    this.showing = v;
    this.refresh();
  }

}
