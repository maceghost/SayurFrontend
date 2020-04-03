import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
// import { map } from 'rxjs/operators'
import 'rxjs/add/operator/catch'
// import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';
// import { throwError } from 'rxjs';
import {_throw} from 'rxjs/observable/throw';
import { Observable, Subject } from "rxjs";

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
export class AuthenticateProvider {

  locations: any = [];

  page: any = 'home';
  locationObservables = new Map<string, any>();
  homefiltertype: any = "hvac";
  homefilter: any = "all";
  locsubpaused:any = false;
  homelocs: any = this.locations;
  homelocsloaded: any = false;
  roundstart: any = null;

  user: any;
  client: any = null;
  datainterval: any;
  hvacinterval: any;
  codes = [

    { code:"fz_high", display:"Freezer High"},
    { code:"cool_fail",display:"Cool Fail"},
    { code:"heat_fail",display:"Heat Fail"},
    { code:"fz_low",display:"Freezer Low"},
    { code:"contact",display:"Trigger"},
    { code:"co2",display:"CO2"},
    { code:"fire system trouble",display:"Fire System Trouble"},
    { code:"engine running",display:"Engine Running"},
    { code:"free_cool_fail",display:"Free Cool Fail"},
    { code:"open_door",display:"Open Door"},
    { code:"back_door",display:"Back Door"},
    { code:"back_side_door",display:"Back Side Door"},
    { code:"freezer_door",display:"Freezer Door"},
    { code:"alarm",display:"Alarm"},
    { code:"door_alarm",display:"Door Alarm"},
    { code:"c/door",display:"Cooler Door"},
    { code:"f/door",display:"Freezer Door"},
    { code:"cooler_door",display:"Cooler Door"},
    { code:"keg_door",display:"Keg Door"},
    { code:"beer cooler_door",display:"Beer Cooler Door"},
    { code:"door",display:"Door"},
    { code:"prep_door",display:"Prep Door"},
    { code:"base_cooler_door",display:"Beer Cooler Door"},
    { code:"beer_door",display:"Beer Door"},
    { code:"kit_cooler_door",display:"Kit Cooler Door"},
    { code:"door alarm",display:"Door Alarm"},
    { code:"door_open",display:"Door Open"},
    { code:"comp. 2 alarm",display:"Comp 2 Alarm"},
    { code:"humidity_high",display:"Humidity High"},
    { code:"fzr_low",display:"Freezer Low"},
    { code:"fzr_high",display:"Freezer High"},
    { code:"server_hot",display:"Server Hot"},
    { code:"temp",display:"Temp"},
    { code:"door_oen",display:"Door Open"},
    { code:"boiler_alarm",display:"Boiler Alarm"},
    { code:"co2_alarm",display:"CO2 Alarm"},
    { code:"h2o_alarm",display:"H2O Alarm"},
    { code:"suction_temp_low",display:"Suction Temp Low"},
    { code:"pressure alarm",display:"Pressure Alarm"},
    { code:"temp_high",display:"Temp High"},
    { code:"co2_high",display:"CO2 High"},
    { code:"alarm output",display:"Alarm Output"},
    { code:"contact_smoke",display:"Contact Smoke"},
    { code:"contact_11",display:"Contact 11"},
    { code:"freezer door open",display:"Freezer Door Open"},
    { code:"cooler door open", display:"Cooler Door Open"}

  ];

  constructor(public http: HttpClient) {

    console.log('constructor - route : '+window.location.href);
    siteKey = (<any>window).getSiteKey();
    console.log('siteKey : '+siteKey);
    siteSecretKey = (<any>window).getSiteSecretKey();
    console.log('siteSecretKey : '+siteSecretKey);
    if (siteKey.length < 30) {
      siteKey = "9ff9044d36fa87810b87574002710551b24fe096";
      siteSecretKey= "e8631e2ba93601ab5959";
    }

  }


  public internal_login() {

    return this.http.get<any>('http://go.unityesg.net/ng_api/iauthenticate/')
        .map(user => {
          console.log(user)
            user.is_authenticated = true;

            // login successful if there's a jwt token in the response
            if (user && user.token) {
                this.user=user;


                if (user.locations == 'null') {

                  if (user.dealers){
                    this.client = user.dealers[0].clients[0]
                    this.locations = this.client.locations
                  }

                }
                if (user.locations != 'null') {
                  this.locations = user.locations
                  for (let loc of this.locations){
                    loc.init = false;
                  }
                }

            }


            for (let loc of this.locations){
              this.locationObservables.set(loc.secret_key, Observable);

            }
            return user;
        })
        .catch(this.handleErrorObservable);
        // .catch('hello');


    // if (credentials.email === null || credentials.password === null) {
    //   return Observable.throw("Please insert credentials");
    // } else {
    //   return Observable.create(observer => {
    //     // At this point make a request to your backend to make a real check!
    //     let access = (credentials.password === "pass" && credentials.email === "email");
    //     this.currentUser = new User('Simon', 'saimon@devdactic.com');
    //     observer.next(access);
    //     observer.complete();
    //   });
    // }

  }

  handleErrorObservable (error: Response | any) {
    console.error(error);

    return _throw(error);

  }

  getControllerStatusHistory(location: any, controller: any, fromtime: any, totime: any){

    return this.http.post<any>('http://go.unityesg.net/ng_api/status_history/', {loc: location, con: controller, fromtime: fromtime, totime: totime})
    .map(user => {


        return user.status.result;
    })
    .catch(this.handleErrorObservable);


  }

  getControllerStatus(location: any, controller: any, fromtime: any, totime: any){

    return this.http.post<any>('http://go.unityesg.net/ng_api/status_history1/', {loc: location, con: controller, fromtime: fromtime, totime: totime})
    .map(user => {

        return user;
    })
    .catch(this.handleErrorObservable);


  }

  setHvacOverride(init: number, adj: number, location: any, controller: any){

    return this.http.post<any>('http://go.unityesg.net/ng_api/set_hvac_override/', {init: init, adj: adj, loc: location, con: controller})
    .map(user => {


        return user;
    })
    .catch(this.handleErrorObservable);


  }
  setLightOverride(init: number, adj: number, location: any, controller: any){
    return this.http.post<any>('http://go.unityesg.net/ng_api/set_light_override/', {init: init, adj: adj, loc: location, con: controller})
    .map(user => {


        return user;
    })
    .catch(this.handleErrorObservable);


  }


  getLoc(location: any){

    if (location.subscription){
      this.unsubscribeLoc(location)
    }
    location.subscription = this.http.get<any>('http://go.unityesg.net/ng_api/location_data/?secret=' + location.secret_key)
      .subscribe(
        data => {
          let mytime = Date.now()
          if (this.roundstart == null){
            this.roundstart = mytime
          }
          this.updateLoc(location, data)

        },
        error => {
          console.log('error')
        })

  }

  unsubscribeLoc(location: any){
    location.subscription
        .unsubscribe()
  }
  unsubscribeLocFromLoc(location: any){

    location.timesubscription
        .unsubscribe()
  }

  updateLoc(location: any, data: any){
    if (data.offline){
      location.received = true;
      location.initialized = true
      location.returned = true

      location.online = false;
    }



    else {
      location.online = true;
      location.received = true;
      if (data.daily_logs_stuff){
        location.daily_logs_stuff = data.daily_logs_stuff

        for (let i of location.daily_logs_stuff.alarms){
          i.alarmtime = moment.utc(moment.unix(i.ts.$date/1000)).format("lll");
          for (let cb of this.codes) {
            if (cb.code == i.code.trim()) {
               i.prettycode = cb.display;

            }
          }
        }

      }
      if (data.controllers.result){
        // location.controllers = data.controllers.result
        location.hvaccolor = 'lightgreen' //green
        location.coolercolor = 'lightblue' //green

        // let newhvacs = [];
        // let newcoolers = [];
        let newothers = [];
        // let newlights = [];
        let newsensors = [];
        let newpower = [];



        for (let i of data.controllers.result){

          if (i.type == 'kw_meter'){

            if (i.status){
              i.capname = i.name.toUpperCase();
              i.status.d = Math.round(i.status.d * 100) / 100

              newpower.push(i)

            }


          }
          if (i.type == 'map_icon'){

            if (i.status){
              i.capname = i.name.toUpperCase();

              if (i.name.toLowerCase().indexOf('kw') > -1){
                newpower.push(i)
              }
              else if (this.otherSensor(i.name)) {
                newsensors.push(i)

              }

              if (this.contains(i.name, 'outdoor temp') || this.contains(i.name, 'od temp') || this.contains(i.name, 'outside temp')) {

                if (i.status){

                  location.outtemp = parseFloat(i.status.sockets.input).toFixed(0);
                }
              }
              if (i.name.toLowerCase() == 'pressure'){
                if (i.status){

                  location.pressure = i.status.sockets.input;
                }
              }
              if (this.contains(i.name, 'co2') || this.contains(i.name, 'c02')){
                if (i.status){
                  if (i.status.sockets){
                    location.co2 = i.status.sockets.input;

                  }
                }
              }
              if (i.name.toLowerCase() == 'light level'){
                if (i.status){

                  location.outlight = i.status.sockets.input;
                }
              }


            }


          }
          if (i.type == 'light'){
            if (i.status){

              if (i.status.ov){
                i.status.ov.r = moment.utc(i.status.ov.r*1000).format('HH:mm:ss');
                // i.status.addfalse = false
                // i.status.subfalse = false

              }

              if (i.status.dur){
                i.status.dur = moment.utc(i.status.dur*1000).format('HH:mm:ss');

              }


              if (i.status.level == 0){
                i.status.color = "darkgrey";

              }
              else {
                i.status.color = "#fffc66";
              }
              i.capname = i.name.toUpperCase();
              if (!i.status.dimmable){
                if (i.status.level == 100){
                  i.status.levelbool = true
                }
                else{
                  i.status.levelbool = false
                }
              }

              if (location.lights){
                let found = false
                for (let light of location.lights){
                  if (light.status.controller_id == i.status.controller_id ){
                    if (light.ov && !i.status.ov){
                      //we're getting an update between when view changed and backend changed
                      i.status.ov = {}
                      i.status.ov.r = moment.utc((2700-2)*1000).format('HH:mm:ss');
                      // todo: calculate time since start

                    }
                    if (!light.changed){
                      light.status = i.status

                    }
                    found = true
                    // hvac.status.dur = nhvac.status.dur

                  }

                }
                if (!found){
                  location.lights.push(i)

                }
              }
              else{
                location.lights = []
                location.lights.push(i)

              }

            }
          }
          if (i.type == 'hvac' || i.type == 'vpat4'){


            if (i.status){
              if (i.status.sockets){
                if (i.status.sockets.space){
                  //only do stuff if its a real space-reading hvac


                  i.capname = i.name.toUpperCase();
                  // match performance data
                  if (data.daily_logs_stuff){
                    for (let h of location.daily_logs_stuff.hvacs){
                      if (h.controller_id == i._id.$oid) {
                        for (let a of h.alarms){
                          a.alarmtime = moment.utc(moment.unix(a.ts.$date/1000)).format("lll");
                          for (let cb of this.codes) {
                            if (cb.code == a.code.trim()) {
                               a.prettycode = cb.display;
                            }
                          }
                        }

                        i.status.perf = h
                      }
                    }
                  }
                  // formatting
                  if (i.status.substate == 'stage2'){
                    i.status.substate = "STAGE 2"
                  }
                  if (i.status.substate == 'stage1'){
                    i.status.substate = "STAGE 1"
                  }
                  if (i.status.substate == 'blower_cooldown'){
                    i.status.substate = "BLOWER COOLDOWN"
                  }
                  if (i.status.ov){
                    i.status.ov.dur = moment.utc(i.status.ov.dur*1000).format('HH:mm:ss');
                  }
                  i.status.state = i.status.state.toUpperCase().replace("_", " ");
                  if (i.status.sched){
                    i.status.sched.mode_name = i.status.sched.mode_name.toUpperCase();
                  }

                  if (i.status.dur){
                    i.status.dur = moment.utc(i.status.dur*1000).format('HH:mm:ss');
                  }

                  //
                  // if (i.status.sp){
                  //   i.csp = i.status.sp.c
                  //   i.hsp = i.status.sp.h
                  //
                  // }



                  i.status.sockets.space = i.status.sockets.space.toFixed(1)

                  if (i.status.sockets.g){
                    if (i.status.sockets.g == '1'){
                      i.status.fan = "ON"
                    }
                    else {
                      i.status.fan = "OFF"
                    }
                  }

                  if (i.status.sockets.dmp){
                    i.status.sockets.dmp = parseFloat(i.status.sockets.dmp).toFixed(0)
                  }

                  if (i.status.sockets.humidity){
                    i.status.sockets.humidity = parseFloat(i.status.sockets.humidity).toFixed(1)
                  }

                  if (
                    this.contains(i.name,'cooler') ||
                    this.contains(i.name,'freezer') ||
                    (this.contains(i.name,'ice') && !this.contains(i.name, 'office'))
                  )
                  {
                    i.status.cooler = true
                    let state = this.getTempState(i);
                    console.log(state)
                    if (state == 2){
                      i.order = 2;
                      location.coolercolor = 'orange';
                      i.coolercolor = 'orange'
                    }
                    else{
                      i.order = 1;
                      // if (this.loc.coolercolor != 'orange') {
                      //     this.loc.coolercolor = 'lightblue';
                      // }
                      // i.coolercolor = '#0086b7'
                      i.coolercolor = 'lightblue'

                    }
                    console.log(i.coolercolor)




                    // switch (state) {
                    //   case 0:
                    //   case 1:
                    //     i.order = 1;
                    //     this.loc.coolercolor = 'lightblue';
                    //     i.coolercolor = '#0086b7'
                    //     // break;
                    //   case 2:
                    //     i.order = 2;
                    //     this.loc.coolercolor = 'orange';
                    //     i.coolercolor = 'orange'
                    //     // break;
                    // }
                    if (location.coolers){
                      let found = false
                      for (let hvac of location.coolers){
                        if (hvac.status.controller_id == i.status.controller_id ){
                          found = true
                          // if (hvac.modes){
                          //
                          //   for (let newmode of i.modes){
                          //     let modefound = false
                          //     for (let mode of hvac.modes){
                          //       if (mode.id == newmode.id ){
                          //         modefound = true
                          //
                          //         mode = newmode
                          //         // hvac.status.dur = nhvac.status.dur
                          //
                          //       }
                          //
                          //     }
                          //     if (!modefound){
                          //       hvac.modes.push(newmode)
                          //
                          //     }
                          //   }
                          // }
                          // else{
                          //   hvac.modes = []
                          //   hvac.modes = i.modes
                          //
                          // }
                          if (!hvac.changed){
                            hvac.status = i.status

                          }
                          // hvac.status = i.status
                        }

                      }
                      if (!found){
                        location.coolers.push(i)

                      }
                    }
                    else{
                      location.coolers = []
                      location.coolers.push(i)

                    }
                  }
                  else if (this.contains(i.name,'water')) {
                    // let state = this.getTempState(i)
                    // switch (state) {
                    //   case 2:
                    //     i.order = 3;
                    //     i.hvaccolor = '#F45151';
                    //     location.hvaccolor = '#F45151';
                    //     break;
                    //   case 1:
                    //     i.order = 2;
                    //     i.hvaccolor = '#FEFE83';
                    //     if (location.hvaccolor != '#F45151') {
                    //         location.hvaccolor = '#FEFE83';
                    //     }
                    //     break;
                    //   case 0:
                    //   default:
                    //     i.order = 1;
                    //     i.hvaccolor = 'lightgreen';
                    //     break;
                    //
                    // }
                    newsensors.push(i)
                  }
                  else if (this.contains(i.name,'dehu')) {
                    newsensors.push(i)
                  } else {

                    // i.hvaccolor = 'lightgrey'
                    let state = this.getTempState(i)
                    console.log(state)
                    if (state == 2){
                      i.order = 3;
                      i.hvaccolor = '#F45151';
                      location.hvaccolor = '#F45151';
                    }
                    else if(state == 1){
                      i.order = 2;
                      i.hvaccolor = '#FEFE83';
                      // if (this.loc.hvaccolor == 'lightgreen') {
                      //     this.loc.hvaccolor = '#FEFE83';
                      // }
                    }
                    else{
                      i.order = 1;
                      i.hvaccolor = 'lightgreen';
                      // if (this.loc.hvaccolor != '#F45151' && this.loc.hvaccolor != '#FEFE83' ) {
                      //   this.loc.hvaccolor = 'lightgreen'
                      //
                      // }
                    }

                    console.log(i.hvaccolor)



                    if (location.hvacs){
                      let found = false
                      for (let hvac of location.hvacs){
                        if (hvac.status.controller_id == i.status.controller_id ){
                          found = true
                          if (!hvac.changed){
                            hvac.status = i.status

                          }
                          // hvac.status = i.status
                        }

                      }
                      if (!found){
                        location.hvacs.push(i)

                      }
                    }
                    else{
                      location.hvacs = []
                      location.hvacs.push(i)

                    }


                  }

                }
              }
            }
          }

          if (i.map_entries){
            for (let entry of i.map_entries){
              let entryFound = false
              if (!location.zones) {
                location.zones = []
              }
              for (let zone of location.zones){
                if (zone.name == entry.name) {
                  entryFound = true

                }
              }
              if (!entryFound){
                entry.upName = entry.name.charAt(0).toUpperCase() + entry.name.slice(1)
                location.zones.push(entry)
              }
            }
          }

          i.type = i.type.toUpperCase();
          i.subtype = i.subtype.toUpperCase();

        }


        location.hvacs = _.orderBy(location.hvacs, ['order'], ['desc']);
        if (location.hvacs.length == 0){
          location.hashvacs = false
        }
        else{
          location.hashvacs = true
        }
        // turn green location into yellow if there are any
        if (location.hvaccolor == 'lightgreen' ){
          for (let i of location.hvacs){
            if (i.hvaccolor == '#FEFE83'){
              location.hvaccolor = '#FEFE83'

            }
          }
        }
        console.log(location.hvaccolor)
        console.log(location.coolercolor)



        location.coolers = _.orderBy(location.coolers, ['order'], ['desc']);
        if (location.coolers.length == 0){
          location.hascoolers = false
        }
        else{
          location.hascoolers = true
        }
        location.others = _.orderBy(newothers, ['order'], ['desc']);


        location.sensors = newsensors

        location.power = newpower




        // location has already just been reset with new controllers.
        // what this does is give controllers to a global array for this service
        // this.controllerMergeIntegrate(location, data.controllers.result)
      }

      if (data.time.result){

        location.dst = data.time.result.dst


        let offset = data.time.result.utc_offset_sec

        let timezone = "(" + data.time.result.tz_code.toLowerCase() + ")"

        location.timezone = timezone
        location.timeOffset = offset
        let dt = moment.utc(moment.unix(Math.floor(new Date().getTime()/1000) + offset))
        location.hour = dt.format('h:mm')
        location.ampm = dt.format('a')
        location.day = dt.format('dddd, MMM D')
        let zonecord = offset/3600

        if (location.dst) {
          zonecord = zonecord - 1
        }

        let left = 50 + (zonecord/24)*100
        location.left = left.toString() + "%"

      }

      if (data.schedules.result){
        location.schedules = data.schedules.result

      }

    }
    location.initialized = true
    location.returned = true

    if (!this.locsubpaused){
      let complete = true

      for (let loc of this.locations){
        if (!loc.returned){
          complete = false
        }
      }
      if (complete){
        let timeElapsed = Date.now() - this.roundstart
        console.log(timeElapsed)
        if (timeElapsed < 30000){
          setTimeout(() =>
            {
              this.roundstart = null
              for (let loc of this.locations){
                  loc.returned = false
                  this.getLoc(loc)
              }
            },
            (30000 - timeElapsed))
        }
        else{
          this.roundstart = null
          for (let loc of this.locations){
              loc.returned = false
              this.getLoc(loc)
          }
        }

      }
    }


    // the reason this is here is so that it doesnt take pressing the filter button to
    // refresh the sites since they got hvac greeness back from their calls. just needed
    // a place where this would update continuously. possibly better to just have a timer.
    // as a result the homelocs array is changed everytime a site comes back with data

    if (this.homefiltertype == 'hvac'){
      this.homelocs = [];
      if (this.homefilter == 'lightgreen') {

        for (let i of this.locations) {
          if (i.hvacs){
            if (i.hvacs.length > 0 && i.hvaccolor == 'lightgreen' ){
              this.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.homelocs.push(i)
          }

        }
      }
      if (this.homefilter == '#FEFE83') {

        for (let i of this.locations) {
          if (i.hvacs){
            if (i.hvacs.length > 0 &&i.hvaccolor == '#FEFE83' ){
              this.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.homelocs.push(i)
          }


        }
      }
      if (this.homefilter == '#F45151') {

        for (let i of this.locations) {
          if (i.hvacs){
            if (i.hvacs.length > 0 && i.hvaccolor == '#F45151' ){
              this.homelocs.push(i)
            }
          }
          if (!i.initialized){

            this.homelocs.push(i)
          }

        }
      }
      if (this.homefilter == 'all') {
        this.homelocs = this.locations

      }
      if (this.homefilter == 'offline') {
        for (let i of this.locations) {
          if (!i.online){
            this.homelocs.push(i)
          }
        }
      }

    }
    if (this.homefiltertype == 'freezer'){
      this.homelocs = [];
      if (this.homefilter == 'lightblue') {

        for (let i of this.locations) {
          if (i.coolers){
            if ((i.coolers.length > 0 && i.coolercolor == 'lightblue' )){
              console.log(i.coolercolor)

              this.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.homelocs.push(i)
          }

        }
      }
      if (this.homefilter == 'orange') {

        for (let i of this.locations) {
          if (i.coolers){
            if ((i.coolers.length > 0 && i.coolercolor == 'orange' )){
              this.homelocs.push(i)
            }
          }
          if (!i.initialized){
            this.homelocs.push(i)
          }

        }
      }

      if (this.homefilter == 'all') {
        for (let i of this.locations) {
          if ((i.coolers && i.coolers.length > 0  )|| !i.initialized){
            this.homelocs.push(i)
          }
        }

        // for (let i of this.locations) {
        //   if (i.hascoolers){
        //     this.homelocs.push(i)
        //   }
        // }
      }
      if (this.homefilter == 'offline') {
        for (let i of this.locations) {
          if (!i.online){
            this.homelocs.push(i)
          }
        }
      }

    }
    if (this.homefiltertype == 'light'){
      this.homelocs = []
      for (let i of this.locations){
        if (!i.initialized || (i.lights && i.lights.length > 0)){
          this.homelocs.push(i)

        }
      }
    }
    this.homelocsloaded = true

  }

  runHvacUpdates(location: any, hvac: any){

    this.getControllerStatus(location, hvac, (this.getUTCTime() - (86400)), this.getUTCTime())
    .subscribe(

        data => {

          if (data.settings){
            hvac.overridesettings = {};
            for (let setting of data.settings) {
              hvac.overridesettings[setting.name]=setting.val;
            }
            //
            // if (!data.settings.error){
            //   console.log('setting override settings : '+JSON.stringify(data.settings));
            //   hvac.overridesettings = data.settings
            // }
          } else {
            console.log('override settings are null');
          }
          // if (data.history.result){
          //
          //   console.log(data.history)
          //   hvac.thing = data.history.result
          //   hvac.timearray = [];
          //   hvac.valuearray = [];
          //   hvac.minvalue = hvac.thing[0].sockets.space
          //   hvac.maxvalue = hvac.thing[0].sockets.space
          //
          //   for (let i of hvac.thing){
          //     let dt = moment.utc(moment.unix(Math.floor(i.ts) + location.timeOffset))
          //     let hour = dt.format('h:mm')
          //     let ampm = dt.format('a')
          //     let day = dt.format('MM/D')
          //     hvac.timearray.push(day + ', ' +hour + ' '+ ampm)
          //     hvac.valuearray.push(i.sockets.space)
          //
          //
          //     if ((i.sockets.space) < hvac.minvalue){
          //       hvac.minvalue = i.sockets.space
          //     }
          //     if ((i.sockets.space) < hvac.minvalue){
          //       hvac.maxvalue = i.sockets.space
          //
          //
          //     }
          //
          //   }
          //
          // }

          if (hvac.modes){
            for (let newmode of data.modes.result){
              let modefound = false
              for (let mode of hvac.modes){
                if (mode.id == newmode.id ){
                  modefound = true

                  mode = newmode
                  // hvac.status.dur = nhvac.status.dur

                }

              }
              if (!modefound){
                hvac.modes.push(newmode)

              }
            }
          }
          else{
            hvac.modes = []
            hvac.modes = data.modes.result

          }
          for (let j of hvac.modes){

            j.name = j.name.toUpperCase()
          }
          hvac.modes = _.orderBy(hvac.modes, ['order'], ['asc']);



        },
        error => {console.log(error);}
    )
    this.hvacinterval = setInterval(() => {

      this.getControllerStatus(location, hvac, (this.getUTCTime() - (86400)), this.getUTCTime())
      .subscribe(

          data => {
            if (data.settings){
              hvac.overridesettings = {};
              for (let setting of data.settings) {
                 hvac.overridesettings[setting.name]=setting.val;
              }
              //
              // if (!data.settings.error){
              //
              //   hvac.overridesettings = data.settings
              // }
            }

            // if (data.history.result){
            //
            //
            //   hvac.thing = data.history.result
            //   hvac.timearray = [];
            //   hvac.valuearray = [];
            //   hvac.minvalue = hvac.thing[0].sockets.space
            //   hvac.maxvalue = hvac.thing[0].sockets.space
            //
            //   for (let i of hvac.thing){
            //     let dt = moment.utc(moment.unix(Math.floor(i.ts) + location.timeOffset))
            //     let hour = dt.format('h:mm')
            //     let ampm = dt.format('a')
            //     let day = dt.format('MM/D')
            //     console.log(day)
            //     hvac.timearray.push(day + ', ' +hour + ' '+ ampm)
            //     hvac.valuearray.push(i.sockets.space)
            //
            //
            //     if ((i.sockets.space) < hvac.minvalue){
            //       hvac.minvalue = i.sockets.space
            //     }
            //     if ((i.sockets.space) < hvac.minvalue){
            //       hvac.maxvalue = i.sockets.space
            //
            //
            //     }
            //
            //   }
            //
            // }

            if (hvac.modes){

              for (let newmode of data.modes.result){
                let modefound = false
                for (let mode of hvac.modes){
                  if (mode.id == newmode.id ){
                    modefound = true

                    mode = newmode

                  }

                }
                if (!modefound){
                  hvac.modes.push(newmode)

                }
              }
            }
            else{
              hvac.modes = []
              hvac.modes = data.modes.result

            }
            for (let j of hvac.modes){

              j.name = j.name.toUpperCase()
              j.editable = true;
              j.validentry = true
            }
            hvac.modes = _.orderBy(hvac.modes, ['order'], ['asc']);


          },
          error => {console.log(error);}
      )

    }, 6000);
  }

  setHvacSetting(changes: any, hvac: any, location: any){

    return this.http.post<any>('http://go.unityesg.net/ng_api/set_hvac_setting/', {changes: changes, loc: location, con: hvac})
    .map(user => {


        return user;
    })
    .catch(this.handleErrorObservable);


  }

  getUTCTime(){

    // console.log(moment.utc(moment.unix(Math.floor(new Date().getTime()/1000))).format('h:mm'))
    return Math.floor(new Date().getTime()/1000)
  }

  getLocationData(location: any) {

      return this.http.get<any>('http://go.unityesg.net/ng_api/location_data/?secret=' + location.secret_key)
          .do(data => {
            console.log('getLocationData returns : '+JSON.stringify(data));
            if (data.offline){

              location.online = false;
              return data;
            }
            else {

              if (data.daily_logs_stuff){
                location.daily_logs_stuff = data.daily_logs_stuff

                for (let i of location.daily_logs_stuff.alarms){
                  i.alarmtime = moment.utc(moment.unix(i.ts.$date/1000)).format("lll");
                  for (let cb of this.codes) {
                    if (cb.code == i.code.trim()) {
                       i.prettycode = cb.display;

                    }
                  }
                }

              }
              if (data.controllers.result){
                // location.controllers = data.controllers.result
                location.hvaccolor = 'lightgreen' //green
                location.coolercolor = 'lightblue' //green

                // let newhvacs = [];
                // let newcoolers = [];
                let newothers = [];
                // let newlights = [];
                let newsensors = [];
                let newpower = [];

                if (!location.init){
                  for (let i of data.controllers.result){
                    if (i.status){
                      if (i.status.sockets){
                        if (i.status.sockets.space){
                          this.getControllerStatus(location, i, (this.getUTCTime() - (86400)), this.getUTCTime())
                          .subscribe(

                              data => {
                                if (data.settings){
                                  i.overridesettings = {};
                                  for (let setting of data.settings) {
                                     i.overridesettings[setting.name]=setting.val;
                                  }
                                  //
                                  // if (!data.settings.error){
                                  //
                                  //   i.overridesettings = data.settings
                                  // }
                                }


                                // if (data.history.result){
                                //
                                //
                                //   i.thing = data.history.result
                                //   i.timearray = [];
                                //   i.valuearray = [];
                                //   i.minvalue = i.thing[0].sockets.space
                                //   i.maxvalue = i.thing[0].sockets.space
                                //
                                //   for (let i of i.thing){
                                //     let dt = moment.utc(moment.unix(Math.floor(i.ts) + location.timeOffset))
                                //     let hour = dt.format('h:mm')
                                //     let ampm = dt.format('a')
                                //     let day = dt.format('MM/D')
                                //     console.log(day)
                                //     i.timearray.push(day + ', ' +hour + ' '+ ampm)
                                //     i.valuearray.push(i.sockets.space)
                                //
                                //
                                //     if ((i.sockets.space) < i.minvalue){
                                //       i.minvalue = i.sockets.space
                                //     }
                                //     if ((i.sockets.space) < i.minvalue){
                                //       i.maxvalue = i.sockets.space
                                //
                                //
                                //     }
                                //
                                //   }
                                //
                                // }

                                if (i.modes){

                                  for (let newmode of data.modes.result){
                                    let modefound = false
                                    for (let mode of i.modes){
                                      if (mode.id == newmode.id ){
                                        modefound = true

                                        mode = newmode

                                      }

                                    }
                                    if (!modefound){
                                      i.modes.push(newmode)

                                    }
                                  }
                                }
                                else{
                                  i.modes = []
                                  i.modes = data.modes.result

                                }
                                for (let j of i.modes){

                                  j.name = j.name.toUpperCase()
                                  j.editable = true;
                                  j.validentry = true
                                }
                                i.modes = _.orderBy(i.modes, ['order'], ['asc']);
                                location.init = true;



                              },
                              error => {console.log(error);}
                          )

                        }
                      }
                    }
                  }
                  location.init = true;

                }

                for (let i of data.controllers.result){

                  if (i.type == 'kw_meter'){

                    if (i.status){
                      i.capname = i.name.toUpperCase();
                      i.status.d = Math.round(i.status.d * 100) / 100

                      newpower.push(i)

                    }


                  }
                  if (i.type == 'map_icon'){

                    if (i.status){
                      i.capname = i.name.toUpperCase();

                      if (i.name.toLowerCase().indexOf('kw') > -1){
                        newpower.push(i)
                      }
                      else if (this.otherSensor(i.name)) {
                        newsensors.push(i)

                      }

                      if (this.contains(i.name, 'outdoor temp') || this.contains(i.name, 'od temp') || this.contains(i.name, 'outside temp')) {
                        if (i.status){

                          location.outtemp = parseFloat(i.status.sockets.input).toFixed(0);
                        }
                      }
                      if (i.name.toLowerCase() == 'pressure'){
                        if (i.status){

                          location.pressure = i.status.sockets.input;
                        }
                      }
                      if (this.contains(i.name, 'co2') || this.contains(i.name, 'c02')){
                        if (i.status){
                          if (i.status.sockets){
                            location.co2 = i.status.sockets.input;

                          }
                        }
                      }
                      if (i.name.toLowerCase() == 'light level'){
                        if (i.status){

                          location.outlight = i.status.sockets.input;
                        }
                      }


                    }


                  }
                  if (i.type == 'light'){
                    if (i.status){

                      if (i.status.ov){
                        i.status.ov.r = moment.utc(i.status.ov.r*1000).format('HH:mm:ss');
                        // i.status.addfalse = false
                        // i.status.subfalse = false

                      }

                      if (i.status.dur){
                        i.status.dur = moment.utc(i.status.dur*1000).format('HH:mm:ss');

                      }


                      if (i.status.level == 0){
                        i.status.color = "darkgrey";

                      }
                      else {
                        i.status.color = "#fffc66";
                      }
                      i.capname = i.name.toUpperCase();
                      if (!i.status.dimmable){
                        if (i.status.level == 100){
                          i.status.levelbool = true
                        }
                        else{
                          i.status.levelbool = false
                        }
                      }

                      if (location.lights){
                        let found = false
                        for (let light of location.lights){
                          if (light.status.controller_id == i.status.controller_id ){
                            if (light.ov && !i.status.ov){
                              //we're getting an update between when view changed and backend changed
                              i.status.ov = {}
                              i.status.ov.r = moment.utc((2700-2)*1000).format('HH:mm:ss');
                              // todo: calculate time since start

                            }
                            if (!light.changed){
                              light.status = i.status

                            }
                            found = true
                            // hvac.status.dur = nhvac.status.dur

                          }

                        }
                        if (!found){
                          location.lights.push(i)

                        }
                      }
                      else{
                        location.lights = []
                        location.lights.push(i)

                      }

                    }
                  }
                  if (i.type == 'hvac'){


                    if (i.status){
                      if (i.status.sockets){
                        if (i.status.sockets.space){
                          //only do stuff if its a real space-reading hvac


                          i.capname = i.name.toUpperCase();
                          // match performance data
                          if (data.daily_logs_stuff){
                            for (let h of location.daily_logs_stuff.hvacs){
                              if (h.controller_id == i._id.$oid) {
                                for (let a of h.alarms){
                                  a.alarmtime = moment.utc(moment.unix(a.ts.$date/1000)).format("lll");
                                  for (let cb of this.codes) {
                                    if (cb.code == a.code.trim()) {
                                       a.prettycode = cb.display;
                                    }
                                  }
                                }

                                i.status.perf = h
                              }
                            }
                          }
                          // formatting
                          if (i.status.substate == 'stage2'){
                            i.status.substate = "STAGE 2"
                          }
                          if (i.status.substate == 'stage1'){
                            i.status.substate = "STAGE 1"
                          }
                          if (i.status.substate == 'blower_cooldown'){
                            i.status.substate = "BLOWER COOLDOWN"
                          }
                          if (i.status.ov){
                            i.status.ov.dur = moment.utc(i.status.ov.dur*1000).format('HH:mm:ss');
                          }
                          i.status.state = i.status.state.toUpperCase();
                          i.status.sched.mode_name = i.status.sched.mode_name.toUpperCase();

                          if (i.status.dur){
                            i.status.dur = moment.utc(i.status.dur*1000).format('HH:mm:ss');
                          }

                          //
                          // if (i.status.sp){
                          //   i.csp = i.status.sp.c
                          //   i.hsp = i.status.sp.h
                          //
                          // }



                          i.status.sockets.space = i.status.sockets.space.toFixed(1)

                          if (i.status.sockets.g){
                            if (i.status.sockets.g == '1'){
                              i.status.fan = "ON"
                            }
                            else {
                              i.status.fan = "OFF"
                            }
                          }

                          if (i.status.sockets.dmp){
                            i.status.sockets.dmp = parseFloat(i.status.sockets.dmp).toFixed(0)
                          }

                          if (i.status.sockets.humidity){
                            i.status.sockets.humidity = parseFloat(i.status.sockets.humidity).toFixed(1)
                          }

                          if (
                            this.contains(i.name,'cooler') ||
                            this.contains(i.name,'freezer') ||
                            (this.contains(i.name,'ice') && !this.contains(i.name, 'office'))
                          )
                          {
                            i.status.cooler = true

                            let state = this.getTempState(i);
                            switch (state) {
                              case 0:
                              case 1:
                                i.order = 1;
                                location.coolercolor = 'lightblue';
                                i.coolercolor = '#0086b7'
                                break;
                              case 2:
                                i.order = 2;
                                location.coolercolor = 'orange';
                                i.coolercolor = 'orange'
                                break;
                            }
                            if (location.coolers){
                              let found = false
                              for (let hvac of location.coolers){
                                if (hvac.status.controller_id == i.status.controller_id ){
                                  found = true
                                  // if (hvac.modes){
                                  //
                                  //   for (let newmode of i.modes){
                                  //     let modefound = false
                                  //     for (let mode of hvac.modes){
                                  //       if (mode.id == newmode.id ){
                                  //         modefound = true
                                  //
                                  //         mode = newmode
                                  //         // hvac.status.dur = nhvac.status.dur
                                  //
                                  //       }
                                  //
                                  //     }
                                  //     if (!modefound){
                                  //       hvac.modes.push(newmode)
                                  //
                                  //     }
                                  //   }
                                  // }
                                  // else{
                                  //   hvac.modes = []
                                  //   hvac.modes = i.modes
                                  //
                                  // }
                                  if (!hvac.changed){
                                    hvac.status = i.status

                                  }
                                  // hvac.status = i.status
                                }

                              }
                              if (!found){
                                location.coolers.push(i)

                              }
                            }
                            else{
                              location.coolers = []
                              location.coolers.push(i)

                            }
                            console.log(i);
                          }
                          else if (this.contains(i.name,'water')) {
                            let state = this.getTempState(i)
                            switch (state) {
                              case 2:
                                i.order = 3;
                                i.hvaccolor = '#F45151';
                                location.hvaccolor = '#F45151';
                                break;
                              case 1:
                                i.order = 2;
                                i.hvaccolor = '#FEFE83';
                                if (location.hvaccolor != '#F45151') {
                                    location.hvaccolor = '#FEFE83';
                                }
                                break;
                              case 0:
                              default:
                                i.order = 1;
                                i.hvaccolor = 'lightgreen';
                                break;

                            }
                            newsensors.push(i)
                          }
                          else if (this.contains(i.name,'dehu')) {
                            newsensors.push(i)
                          } else {
                            // i.hvaccolor = 'lightgrey'
                            let state = this.getTempState(i)
                            switch (state) {
                              case 2:
                                i.order = 3;
                                i.hvaccolor = '#F45151';
                                location.hvaccolor = '#F45151';
                                break;
                              case 1:
                                i.order = 2;
                                i.hvaccolor = '#FEFE83';
                                if (location.hvaccolor != '#F45151') {
                                    location.hvaccolor = '#FEFE83';
                                }
                                break;
                              case 0:
                              default:
                                i.order = 1;
                                i.hvaccolor = 'lightgreen';
                                break;

                            }
                            if (location.hvacs){
                              let found = false
                              for (let hvac of location.hvacs){
                                if (hvac.status.controller_id == i.status.controller_id ){
                                  found = true
                                  if (!hvac.changed){
                                    hvac.status = i.status

                                  }
                                  // hvac.status = i.status
                                }

                              }
                              if (!found){
                                location.hvacs.push(i)

                              }
                            }
                            else{
                              location.hvacs = []
                              location.hvacs.push(i)

                            }


                          }

                        }
                      }
                    }
                  }

                  if (i.map_entries){
                    for (let entry of i.map_entries){
                      let entryFound = false
                      if (!location.zones) {
                        location.zones = []
                      }
                      for (let zone of location.zones){
                        if (zone.name == entry.name) {
                          entryFound = true

                        }
                      }
                      if (!entryFound){
                        entry.upName = entry.name.charAt(0).toUpperCase() + entry.name.slice(1)
                        location.zones.push(entry)
                      }
                    }
                  }

                  i.type = i.type.toUpperCase();
                  i.subtype = i.subtype.toUpperCase();

                }



                location.hvacs = _.orderBy(location.hvacs, ['order'], ['desc']);

                // location.hvacs = _.orderBy(newhvacs, ['order'], ['desc']);
                // location.hvacs = newhvacs;

                // console.log(location.hvacs);

                location.coolers = _.orderBy(location.coolers, ['order'], ['desc']);
                location.others = _.orderBy(newothers, ['order'], ['desc']);


                location.sensors = newsensors

                location.power = newpower




                // location has already just been reset with new controllers.
                // what this does is give controllers to a global array for this service
                // this.controllerMergeIntegrate(location, data.controllers.result)
              }

              if (data.time.result){

                location.dst = data.time.result.dst


                let offset = data.time.result.utc_offset_sec

                let timezone = "(" + data.time.result.tz_code.toLowerCase() + ")"

                location.timezone = timezone
                location.timeOffset = offset
                let dt = moment.utc(moment.unix(Math.floor(new Date().getTime()/1000) + offset))
                location.hour = dt.format('h:mm')
                location.ampm = dt.format('a')
                location.day = dt.format('dddd, MMM D')
                let zonecord = offset/3600

                if (location.dst) {
                  zonecord = zonecord - 1
                }

                let left = 50 + (zonecord/24)*100
                location.left = left.toString() + "%"

              }

              if (data.schedules.result){
                location.schedules = data.schedules.result

              }
              // if (data.things.result){
              //   location.things = data.things.result
              //
              // }


            }

            return data;

          })
          .catch(this.handleErrorObservable);
  }

  runLocationUpdates(){

    if (this.locations){
      for (let i of this.locations){
        i.capname = i.name.toUpperCase();
        this.getLocationData(i)
          .subscribe(

              data => {},
              error => {console.log(error);}
          )
      }

      this.datainterval = setInterval(() => {

        for (let i of this.locations){
          this.getLocationData(i)
            .subscribe(

                data => {},
                error => {console.log(error);}
            )
        }

      }, 6000);

    }



  }

  public getPhone(location: any) {

    return this.http.post<any>('http://go.unityesg.net/ng_api/google/', {loc: location})
    .map(user => {

        return user;
    })
    .catch(this.handleErrorObservable);


  }

  // public login(credentials) {
  //
  //   return this.http.post<any>('http://go.unityesg.net/ng_api/authenticate/', { username: credentials.username, password: credentials.password })
  //
  //       .map(user => {
  //           user.is_authenticated = true;
  //
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
  //
  //
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
  //
  // }

  public login(credentials) {

    return this.http.post<any>('http://go.unityesg.net/ng_api/authenticate/', { username: credentials.username, password: credentials.password })

        .map(user => {
            user.is_authenticated = true;

            // login successful if there's a jwt token in the response
            if (user && user.token) {
                this.user=user;


                if (user.locations == 'null') {

                  if (user.dealers){
                    this.client = user.dealers[0].clients[0]
                    this.locations = this.client.locations
                  }

                }
                if (user.locations != 'null') {
                  this.locations = user.locations
                  for (let loc of this.locations){
                    loc.init = false;
                  }
                }

            }


            for (let loc of this.locations){
              this.locationObservables.set(loc.secret_key, Observable);

            }
            return user;
        })
        .catch(this.handleErrorObservable);
        // .catch('hello');


    // if (credentials.email === null || credentials.password === null) {
    //   return Observable.throw("Please insert credentials");
    // } else {
    //   return Observable.create(observer => {
    //     // At this point make a request to your backend to make a real check!
    //     let access = (credentials.password === "pass" && credentials.email === "email");
    //     this.currentUser = new User('Simon', 'saimon@devdactic.com');
    //     observer.next(access);
    //     observer.complete();
    //   });
    // }

  }

    // get the cooling set point
    getCoolingSP(controller:any):number {
      let c_sp = 0.0;
      if (controller.status && controller.status.sp) {
          let sp:any = controller.status.sp;
          c_sp = (sp.c) ? sp.c : 0;
      }
      return c_sp;
    }

    // get the heating set point
    getHeatingSP(controller:any):number {
      let h_sp = 0.0;
      if (controller.status && controller.status.sp) {
          let sp:any = controller.status.sp;
          h_sp = (sp.h) ? sp.h : 0;
      }
      return h_sp;
    }

    getSpaceTemp(controller:any):number {
      let temp = 0.0;
      if (controller.status && controller.status.sockets) {
          let sockets:any = controller.status.sockets;
          temp = sockets.space;
      }
      return temp;
    }

    getTempStyle(controller:any) {

        let sp = this.getSpaceTemp(controller);
        let hsp = this.getHeatingSP(controller);
        let csp = this.getCoolingSP(controller);
        controller.hsp = hsp;
        controller.csp = csp;


        let myStyles = [
           'lightgreen',
           'yellow',
           '#F45151'

        ];

        if (sp <= ( hsp - 5))  {
            return myStyles[2];
        } else if (sp < (hsp -2)) {
            return myStyles[1];
        } else if (sp >= (csp + 5)) {
            return myStyles[2];
        } else if (sp > (csp + 2)) {
            return myStyles[1];
        }
        return myStyles[0];
    }

    getTempState(controller:any) {

        let sp = this.getSpaceTemp(controller);
        let hsp = this.getHeatingSP(controller);
        let csp = this.getCoolingSP(controller);
        controller.hsp = hsp;
        controller.csp = csp;

        if (controller.status.state == 'cooling'){
               controller.state = "Cooling"
               if (sp >= (csp + 5)) {
                   return 2;
               } else if (sp > (csp + 2)) {
                   return 1;
               }
        }
        if (controller.status.state == 'heating') {
          if (sp <= ( hsp - 5))  {
              return 2;
          } else if (sp < (hsp -2)) {
              return 1;
          }
        }
        return 0;
      }

      otherSensor(src) {

        // 1. Co2 - contains “Co2, CO2”
        // 2. Pressure - Contains “Pressure, BP”
        // 3. Door - Contains “Door”
        // 4. Humidity - Contains “Humidity, RH”
        // 5. Hot Water - Contains “Hot, Water”
        if (this.contains(src,'co2') ||
            this.contains(src,'dehu') ||
            this.contains(src,'pressure') ||
            this.contains(src,'bp') ||
            this.contains(src,' door') ||
            this.contains(src,'humidity') ||
            this.contains(src,'rh') ||
            this.contains(src,'water') ||
            this.contains(src,'c02')
        ){
          return true;
        }

        else
          return false;


        // if (!this.contains(src,'cooler') &&
        //     !this.contains(src,'freezer') &&
        //     !this.contains(src,'ice') &&
        //     !this.contains(src,'water') &&
        //     !this.contains(src,'rtu') &&
        //     !this.contains(src,'od temp')
        // )
        //   return true;
        // else
        //   return false;
      }

      contains(src, test) {
        if(src.toLowerCase().indexOf(test) >= 0)
          return true;
        else
          return false;
      }
    }
