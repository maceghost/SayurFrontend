import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthLocalProvider } from './authenticate/authlocal';


import { environment }  from  '../../environments/environment';

const INIT = 0;
const STARTED = 0;
const COMPLETE = 0;
const LOAD = 1;
const SAVE = 2;

const SETUP = "kl.unity_setup";
const SET_CONFIG_VALUE = "kl.set_config_value";
const GET_CONFIG_VALUE = "kl.get_config_value";
const SET_PROCESS_VALUE = "kl.set_process_value";
const ENFORCE_PROCESS_CONFIG = "kl.enforce_process_config";
const GET_SERVER_TIME = "kl.get_server_time";
const REBOOT_MACHINE = "kl.reboot_machine";
const IP_ADDRESS = "kl.ip_address";
const LOCATION_API = "kl.location_api";
const GET_LOCATION_CONFIG = "kl.get_location_config";
const GET_SETTING = "kl.get_setting";
const GET_SETTINGS = "kl.get_settings";
const GET_CONVERSIONS = "kl.get_conversions";
const GET_CONTROLLER_TYPES = "kl.get_controller_types";
const GET_MONTHLY_KW_TOTALS_FOR_YEAR = "kl.get_monthly_kw_totals_for_year";
const GET_USERS = "kl.get_users";
const CREATE_USER = "kl.create_user";
const SET_USER_NAME = "kl.set_user_name";
const SET_USER_PASSWORD = "kl.set_user_password";
const SET_USER_ROLE = "kl.set_user_role";
const GET_USER_BY_NAME = "kl.get_user_by_name";
const GET_USER_BY_PASSWORD = "kl.get_user_by_password";
const REMOVE_USER = "kl.remove_user";
const GET_SCHEDULES = "kl.get_schedules";
const CREATE_SCHEDULE = "kl.create_schedule";
const SET_SCHEDULE_NAME = "kl.set_schedule_name";
const SET_SCHEDULE_WEEKDAY_DEFAULTS = "kl.set_schedule_weekday_defaults";
const REMOVE_SCHEDULE = "kl.remove_schedule";
const GET_SCHEDULE_OVERRIDES = "kl.get_schedule_overrides";
const CREATE_SCHEDULE_OVERRIDE = "kl.create_schedule_override";
const SET_SCHEDULE_OVERRIDE_NAME = "kl.set_schedule_override_name";
const SET_SCHEDULE_OVERRIDE_START_DATE = "kl.set_schedule_override_start_date";
const SET_SCHEDULE_OVERRIDE_OVERRIDES = "kl.set_schedule_override_overrides";
const REMOVE_SCHEDULE_OVERRIDE = "kl.remove_schedule_override";
const GET_DEVICES = "kl.get_devices";
const SET_DEVICE_NAME = "kl.set_device_name";
const REMOVE_DEVICE = "kl.remove_device";
const GET_ITEM_CONTROLLER_USAGE = "kl.get_item_controller_usage";
const GET_ITEM_NAME = "kl.get_item_name";
const GET_ITEMS_BY_DEVICE_ID = "kl.get_items_by_device_id";
const GET_ITEMS_BY_CONTROLLER_ID = "kl.get_items_by_controller_id";
const SET_ITEM_CMD = "kl.set_item_cmd";
const SET_ITEM_NAME = "kl.set_item_name";
const TOGGLE_HARDWARE_FIELD = "kl.toggle_hardware_field";
const SET_ITEM_SWITCH = "kl.set_item_switch";
const SET_ITEM_REVERSED = "kl.set_item_reversed";
const SET_ITEM_CONVERSION = "kl.set_item_conversion";
const SET_ITEM_ADJUSTMENT = "kl.set_item_adjustment";
const SET_ITEM_DAMPING = "kl.set_item_damping";
const SET_ITEM_IDENT = "kl.set_item_ident";
const CREATE_CONTROLLER = "kl.create_controller";
const SET_CONTROLLER_ENABLED = "kl.set_controller_enabled";
const GET_CONTROLLERS = "kl.get_controllers";
const GET_CONTROLLER = "kl.get_controller";
const SET_CONTROLLER_NAME = "kl.set_controller_name";
const SET_CONTROLLER_SETTING = "kl.set_controller_setting";
const SET_CONTROLLER_MODE_PROPERTY = "kl.set_controller_mode_property"
const REMOVE_CONTROLLER_SETTING = "kl.remove_controller_setting";
const GET_CONTROLLER_SETTING = "kl.get_controller_setting";
const GET_CONTROLLER_SETTINGS_GROUP = "kl.get_controller_settings_group";
const GET_CONTROLLER_MODES = "kl.get_controller_modes";
const CREATE_CONTROLLER_MODE = "kl.create_controller_mode";
const STATE_FOR_CONTROLLER = "kl.state_for_controller";
const PRODIGY_COOLING = "kl.prodigy_cooling";
const PRODIGY_HEATING = "kl.prodigy_heating";
const UPDATE_PRODIGY_SP = "kl.update_prodigy_sp";
const REMOVE_CONTROLLER_MODE = "kl.remove_controller_mode";
const GET_CONTROLLER_SCHEDULE = "kl.get_controller_schedule";
const SET_CONTROLLER_SCHEDULE = "kl.set_controller_schedule";
const REMOVE_CONTROLLER = "kl.remove_controller";
const GET_SOCKETS_BY_CONTROLLER_ID = "kl.get_sockets_by_controller_id";
const CLEAR_CONTROLLER_SOCKET = "kl.clear_controller_socket";
const ASSIGN_CONTROLLER_SOCKET = "kl.assign_controller_socket";
const SET_CONTROLLER_OVERRIDE = "kl.set_controller_override";
const CLEAR_CONTROLLER_OVERRIDE = "kl.clear_controller_override";
const SET_CONTROLLER_CLEAR_ALARM = "kl.set_controller_clear_alarm";
const UPDATE_CONTROLLER_MAP_ENTRY = "kl.update_controller_map_entry";
const REMOVE_CONTROLLER_MAP_ENTRY = "kl.remove_controller_map_entry";
const GET_CURRENT_CONTROLLER_STATUS = "kl.get_current_controller_status";
const GET_CONTROLLER_STATUS = "kl.get_controller_status";
const GET_MAP = "kl.get_map";
const CREATE_MAP = "kl.create_map";
const GET_OR_CREATE_MAP = "kl.get_or_create_map";
const GET_MAIN_MAP = "kl.get_map";
const SET_MAP_BOXES = "kl.set_map_boxes";
const GET_LOGS_SINCE = "kl.get_logs_since";
const NOOP = "kl.noop";
const UPDATE_RPC_INFO = "server.update_rpc_info";
const PROXY_GATEWAY = "kl.proxy_gateway";
// const PROXY_GATEWAY_POST = "kl.proxy_gateway_post";

const GET_SYSTEM_STATUS = "kl.get_system_status";

var self;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  id:number = 1220;

  http: HttpClient;

  hostname: any;
  port: any;
  protocol: any;
  key: any;

  urlBase: string;
  apiUrl:  string;

  queryDataObservable: Observable<any>;
  system_status = {};

  rpc_info:any = {"username":"Installer","role":"administrator","user_id":"0" };

  items_by_device:any = {}

  locationConfig = {};

  // todo : make clientId random string;
  clientId = 'abcde';

  steps = [

    // {name:'Location Config',method:'get_location_config',promise:Promise, complete:false },
    // {name:'Get Server Time',method:'get_server_time',promise:Promise, complete:false },
    // {name:'Authorize User',method:'get_user_by_password',params:{ password:'kl' },promise:Promise, complete:false },
    // {name:'Update RPC Info',method:'update_rpc_info',promise:Promise, complete:false },
    // {name:'Create Map',method:'get_or_create_map',promise:Promise, complete:false },
    // {name:'Get Map',method:'get_main_map',promise:Promise, complete:false },
    // {name:'Get Controllers',method:'get_controllers',
    //   params:{
    //     fields: ["name","type","subtype","enabled","status","map_entries","schedule","settings"],
    //     sort: [["type",1],["subtype",1],["name",1]]
    //   }
    //   , promise:Promise, complete:false },
    {name:'Get Devices',method:'get_devices',promise:Promise, complete:false }
    // {name:'Get System Status',method:'get_system_status',promise:Promise, complete:false }

  ];

  locationSteps:any = [

    {name:'Get Controllers',method:'get_controllers',
      params:{
        fields: ["name","type","subtype","enabled","status","map_entries","schedule","modes"],
        sort: [["type",1],["subtype",1],["name",1]]
      }, promise:Promise, complete:false },
    {name:'Get Devices',method:'get_devices',promise:Promise, complete:false },
    {name:'Get System Status',method:'get_system_status',promise:Promise, complete:false },

    {name:'Get Schedules',method:'get_schedules',promise:Promise, complete:false },
    {name:'Get System Time',method:'get_server_time',promise:Promise, complete:false }


  ];




  reloadControllers(cb) {
    this.processUpdateSteps(this.locationSteps,()=>
      {
        console.log('locationBuilding Complete...');
        let data:any = {};

        console.log('...setting controllers: '+this.controllers.length);
        data.controllers = this.controllers;
        data.devices = this.devices;
        data.schedules = this.schedules;
        data.time = this.server_time;
        let settingsPromises = [];
        for (let controller of data.controllers) {
          let sp:Promise<any> = this.getLocalControllerStatusAsync(controller);
          settingsPromises.push(sp);
          // let sp:Promise<any> = this.populateControllerSettings(controller);
          // settingsPromises.push(sp);
        }
        Promise.all(settingsPromises).then(value => {
          this.controllers = value;
          data.controllers = value;
          cb();
        });
      })

      // this.locationQueryComplete.bind(this));

  }

  async getLocalControllerStatusAsync(controller:any):Promise<any> {
    let params = ["name","type","subtype","enabled","status","modes","schedule","map_entries"];
    try {
      const status = await this.get_controller(controller._id.$oid, params);
      const settings = await this.getControllerSettings(controller);
      status['settings'] = settings;
      // let type = controller.type.toLowerCase();
      // if (!status.settings) {
      //   status.settings = {};
      // }
      // status.settings[type] = settings;
      // console.log('getLocalControllerStatusAsync - settings : ',status.settings);
      // settings.forEach((setting) => {
      //     status.settings[type].push(setting);
      // });
      return status;
    } catch (error) {
    }
  }

  getControllerSettings(controller):Promise<any> {
    console.log('pop_cs : id : '+controller._id.$oid+' , type : '+controller.type.toLowerCase());
    let promise = new Promise((resolve, reject) => {
      console.log('pop_cs executing promise ...');
      // this.ds.get_controller_settings_group(controller._id.$oid, controller.type).then(settings => {
      this.get_controller_settings_group(controller._id.$oid, controller.type.toLowerCase()).then(settings => {
          //console.log('getControllerSettings settings : '+settings.length);
          resolve(<any>settings);
      }).catch(err =>{
          console.log('getControllerSettings error : '+err);
          reject(err);
      });
    });
    return promise;
  }


  stepCount:number = 0;
  // ds:DataService;
  initComplete:boolean = false;
  courierPage;

  constructor(_http: HttpClient,  public sanitizer:DomSanitizer) {
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
    // console.log('window.location : '+(<any>window).location);
    // this.hostname = (<any>window).location.hostname;
    // this.port = (<any>window).location.port;
    // this.protocol = (<any>window).location.protocol;
    // } else {
    //   this.hostname = 'maceghost.com';
    //   this.port = '4567';
    //   this.protocol = 'http';
    // }

    if (this.port) {
      this.urlBase = this.protocol + '//' + this.hostname + ':' + this.port;
    } else {
      this.urlBase = this.protocol + '//' + this.hostname;
    }
    // this.apiUrl = this.urlBase + '/api';
    this.apiUrl = this.urlBase + '/rpc_shim';

    // this.apiUrl = 'http://192.168.1.129:4567/api';
    // console.log('apiUrl : '+this.apiUrl);
    // self.initComplete = true;

    self.processSteps(() => {
        self.initComplete = true;
    })


  }

  // const getData = async (resource: string): Promise<IResourceData> => {
  //   const response = await fetch(`https://somedomain/${resource}`);
  //   const data: IResourceData = await response.json();
  //   return data;
  // }

  async handle(methodName:string):Promise<any> {
    try {
      // const response = await fetch(`https://somedomain/${resource}`);
      const response = await (self[methodName]());
      const data: any = await response;
      return data;
    } catch (ex) {
      // handle the error
      console.log('data.service handle() - exception : '+ex);
    }
    //
    //
    // return await (self[methodName]());
      // if(this[methodName]) {
      //    // method exists in the component
      //    // let param = event[methodName];
      //    console.log('calling method : '+methodName);
      //    return (self[methodName]());
      //    // this[methodName](); // call it
      // // } else {
      // //    console.log('method not supported : '+methodName);
      // //    Promise.reject('method not supported : '+methodName);
      // }
   }

   async handleStep(step:any):Promise<any> {
     try {
       // const response = await fetch(`https://somedomain/${resource}`);
       console.log('sending step')
       let response;
       if (step.params) {
         // console.log('handleStep : '+step.method+' , '+step.params);
         response = await (self[step.method](step.params));
       } else {
         // console.log('handleStep : '+step.method);
         response = await (self[step.method]());
       }
       const data: any = await response;
       // console.log('data.service handle() returns '+data);
       return data;
     } catch (ex) {
       // handle the error
       console.log('data.service handle() '+step.method+'- exception : '+ex);
     }
  }


  send_message(){
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.params = []
    if (this.key){
      map.key = this.key
    }
    map.method = UPDATE_RPC_INFO;
    map.id = self.id++;
    map.clientid = this.clientId;
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      map.params = [self.rpc_info];
      this.http.post<any>(url, map)
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
               self.rpc_info = json.result;
               console.log('update_rpc_info - result : '+JSON.stringify(self.rpc_info));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;
  }

  testApi() {
    console.log('testApi');
    let headers = new Headers();
    var url = this.apiUrl;
    console.log('testApi : '+url);
    var map: any = {};

    map.method = GET_SERVER_TIME;
    map.one = "two";
    map.hello = "goodbye";
    map.id = self.id++;
    map.clientid = this.clientId;
    // map.params = [{what:'not'},{can:'not'},{you:'not'}]
    // map.params = [{}]
        // map.token = self.auth.getToken();
        // var results = [];
    headers = new Headers({ 'Content-Type': "application/json" });

    // this.groupsObservable =
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4) {
    //
    //         if (xhr.status == 200) {
    //             console.log(xhr.response);
    //             // resolve(JSON.parse(xhr.response));
    //         } else {
    //             // reject(xhr.response);
    //         }
    //     }
    // }
    // xhr.open("POST", url);
    // xhr.setRequestHeader('Content-Type','multipart/form-data');
    // // xhr.setRequestHeader("authToken", this.auth.getToken());
    // xhr.setRequestHeader("url",url);
    // xhr.send(map);



    this.queryDataObservable = this.http.post<any>(url, map)

        .map(data => {
            // results = data;
            // this.energyData = data;
            console.log('result : '+JSON.stringify(data));
        }).catch(this.handleErrorObservable)
        .share();
    return this.queryDataObservable;
    // this.energyData.key = result;

  }

  handleErrorObservable(error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.status);
  }


  // SETUP
  unity_setup(name) {
    // console.log('update_rpc_info');
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.method = SETUP;
    map.id = self.id++;
    map.clientid = this.clientId;
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      // map.params = [self.rpc_info];
      map.params = [name];
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               self.rpc_info = json.result;
               console.log('unity_setup - result : '+JSON.stringify(self.rpc_info));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;

  }
  // SET_CONFIG_VALUE
  set_config_value(dotted_path, val) {
    // console.log('update_rpc_info');
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.method = SET_CONFIG_VALUE;
    map.id = self.id++;
    map.clientid = this.clientId;;
    headers = new Headers({ 'Content-Type': "application/json" });
    if (this.key){
      map.key = this.key
    }

    let promise = new Promise((resolve, reject) => {
      // map.params = [self.rpc_info];
      map.params = [dotted_path, val];
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               self.rpc_info = json.result;
               console.log('set_config_value - result : '+JSON.stringify(self.rpc_info));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;

  }
  // GET_CONFIG_VALUE
  get_config_value(dotted_path) {
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.method = GET_CONFIG_VALUE;
    map.id = self.id++;
    map.clientid = this.clientId;;
    headers = new Headers({ 'Content-Type': "application/json" });
    if (this.key){
      map.key = this.key
    }

    let promise = new Promise((resolve, reject) => {
      map.params = [dotted_path];
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               self.rpc_info = json.result;
               console.log('get_config_value - result : '+JSON.stringify(self.rpc_info));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;
  }
  // SET_PROCESS_VALUE
  set_process_value(name, key, val) {
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.method = SET_PROCESS_VALUE;
    map.id = self.id++;
    map.clientid = this.clientId;;
    headers = new Headers({ 'Content-Type': "application/json" });
    if (this.key){
      map.key = this.key
    }

    let promise = new Promise((resolve, reject) => {
      map.params = [name, key, val];
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               self.rpc_info = json.result;
               console.log('set_process_value - result : '+JSON.stringify(self.rpc_info));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;
  }
  // ENFORCE_PROCESS_CONFIG
  enforce_process_config() {
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.method = ENFORCE_PROCESS_CONFIG;
    map.id = self.id++;
    map.clientid = this.clientId;;
    headers = new Headers({ 'Content-Type': "application/json" });
    if (this.key){
      map.key = this.key
    }

    let promise = new Promise((resolve, reject) => {
      map.params = [self.rpc_info];
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               self.rpc_info = json.result;
               console.log('enforce_process_config - result : '+JSON.stringify(self.rpc_info));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;
  }

  update_rpc_info():Promise<any> {

    // console.log('update_rpc_info');
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.params = []
    if (this.key){
      map.key = this.key
    }
    map.method = UPDATE_RPC_INFO;
    map.id = self.id++;
    map.clientid = this.clientId;
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      map.params = [self.rpc_info];
      this.http.post<any>(url, map)
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
               self.rpc_info = json.result;
               // console.log('update_rpc_info - result : '+JSON.stringify(self.rpc_info));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;

  }
  // GET_SERVER_TIME
  get_server_time():Promise<any> {

    // console.log('get_server_time');
    let headers = new Headers();
    var url = this.apiUrl;
    // console.log('get_server_time : '+url);
    var map: any = {};
    if (this.key){
      map.key = this.key
    }

    map.method = GET_SERVER_TIME;
    map.one = "two";
    map.hello = "goodbye";
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = []
    // map.params = [{what:'not'},{can:'not'},{you:'not'}]
    // map.params = [{}]
        // map.token = self.auth.getToken();
        // var results = [];
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
    this.http.post<any>(url, map)
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
             // console.log('get_server_time - result : '+JSON.stringify(json));
             self.server_time = json.result;
             resolve(json.result);
           }
         );
     });
     return promise;

  }
  // REBOOT_MACHINE
  reboot_machine() {
    // console.log('get_server_time');
    let headers = new Headers();
    var url = this.apiUrl;
    // console.log('get_server_time : '+url);
    var map: any = {};

    map.method = REBOOT_MACHINE;
    map.one = "two";
    map.hello = "goodbye";
    map.id = self.id++;
    map.clientid = this.clientId;
    // map.params = [{what:'not'},{can:'not'},{you:'not'}]
    // map.params = [{}]
        // map.token = self.auth.getToken();
        // var results = [];
    headers = new Headers({ 'Content-Type': "application/json" });
    if (this.key){
      map.key = this.key
    }

    let promise = new Promise((resolve, reject) => {
    this.http.post<any>(url, map)
         .toPromise()
         .then(
           res => { // Success
             let json = JSON.parse(res);
             // console.log('reboot_machine - result : '+JSON.stringify(json));
             self.server_time = json.result;
             resolve(self.location_config);
           }
         );
     });
     return promise;

  }
  // IP_ADDRESS
  ip_address() {

  }
  // LOCATION_API
  location_api() {

  }

  location_config:any;
  server_time:any; // looks like :   time, tz_code, utc_offset_sec, dst
  user_info:any;
  mainMap:any;
  controllers:any;
  schedules:any;
  devices:any;

  // GET_LOCATION_CONFIG
  get_location_config():Promise<any> {
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    if (this.key){
      map.key = this.key
    }
    map.method = GET_LOCATION_CONFIG;
    // map.one = "two";
    // map.hello = "goodbye";
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = []
    // map.params = [{what:'not'},{can:'not'},{you:'not'}]
    // map.params = [{}]
        // map.token = self.auth.getToken();
        // var results = [];
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {

      this.http.post<any>(url, map)
      // this.http.get<any>('http://go.unityesg.net/rpc_shim')

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
               self.location_config = json.result;
               resolve(self.location_config);
             }
           ).catch(error => {

             console.log(error)
           });
       });
       return promise;

  }
  // GET_SETTING
  get_setting(path) {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_SETTING;
    map.id = self.id++;
    map.params = [path];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               // console.log('get_setting - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_SETTINGS
  get_settings(paths) {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_SETTINGS;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [paths];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               // console.log('get_settings - res: '+JSON.stringify(res));
               let json = JSON.parse(res);
               // console.log('get_settings - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // GET_CONVERSIONS
  get_conversions() {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_CONVERSIONS;
    map.id = self.id++;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               // console.log('get_conversions - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_CONTROLLER_TYPES
  get_controller_types() {

    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_CONTROLLER_TYPES;
    map.params = [];

    map.id = self.id++;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               console.log('get_controller_types result : ',res);
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               // console.log('get_controller_types - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // GET_MONTHLY_KW_TOTALS_FOR_YEAR
  get_monthly_kw_totals_for_year(year) {

    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_MONTHLY_KW_TOTALS_FOR_YEAR;
    map.id = self.id++;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               // console.log('get_monthly_kw_totals_for_year - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // GET_USERS
  get_users() {

    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_USERS;
    map.id = self.id++;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               // console.log('get_users - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // CREATE_USER
  create_user() {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = CREATE_USER;
    map.id = self.id++;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               // console.log('create_user - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // SET_USER_NAME
  set_user_name(uid, name) {

    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = SET_USER_NAME;
    map.id = self.id++;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      map.params = [uid, name]

      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_user_name - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // SET_USER_PASSWORD
  set_user_password(uid, password) {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = SET_USER_PASSWORD;
    map.id = self.id++;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      map.params = [uid, password]

      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_user_password - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_USER_ROLE
  set_user_role(uid, role) {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = SET_USER_ROLE;
    map.id = self.id++;

    headers = new Headers({ 'Content-Type': "application/json" });
    if (this.key){
      map.key = this.key
    }

    let promise = new Promise((resolve, reject) => {
      map.params = [uid, role]

      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_user_role - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // GET_USER_BY_NAME
  get_user_by_name(name) {

    console.log('get_user_by_name');
    let headers = new Headers();
    var url = this.apiUrl;
    console.log('get_user_by_name : '+url);
    var map: any = {};
    if (this.key){
      map.key = this.key
    }

    map.method = GET_USER_BY_NAME;
    // map.one = "two";
    // map.hello = "goodbye";
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [name]
    // map.params = [{}]
        // map.token = self.auth.getToken();
        // var results = [];
    headers = new Headers({ 'Content-Type': "application/json" });

    this.queryDataObservable = this.http.post<any>(url, map)

        .map(data => {
            // results = data;
            // this.energyData = data;
            console.log('get_user_by_name - result : '+JSON.stringify(data));
            return data;
        }).catch(this.handleErrorObservable)
        .share();
    return this.queryDataObservable;

  }
  // GET_USER_BY_PASSWORD
  get_user_by_password(mparms:any):Promise<any> {

    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    if (this.key){
      map.key = this.key
    }

    map.method = GET_USER_BY_PASSWORD;
    // map.one = "two";
    // map.hello = "goodbye";
    map.id = self.id++;
    map.clientid = 'abcdefg'
    // map.params = [{}]
        // map.token = self.auth.getToken();
        // var results = [];
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      map.params = [mparms.password];
      // console.log('get_user_by_password - url : '+url+' , mparams : '+JSON.stringify(mparms));
      // console.log('get_user_by_password - params : '+mparms);
      this.http.post<any>(url, map)
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
               self.rpc_info = json.result;
               // console.log('get_user_by_password - result : '+JSON.stringify(self.rpc_info));
               resolve(self.rpc_info);
             }
           ).catch((error: any) => {
             console.log('get_user_by_password err : '+error);
           });
       });
       return promise;

  }
  // REMOVE_USER
  remove_user(uid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_USER;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [uid];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('remove_user - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_SCHEDULES
  get_schedules() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_SCHEDULES;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = []
    map.key = this.key

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               // console.log('get_schedules - result: '+JSON.stringify(json.result));
               this.schedules = json;
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // CREATE_SCHEDULE
  create_schedule() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = CREATE_SCHEDULE;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('create_schedule - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // SET_SCHEDULE_NAME
  set_schedule_name(sid, name) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_SCHEDULE_NAME;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [sid,name]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_schedule_name - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_SCHEDULE_WEEKDAY_DEFAULTS
  set_schedule_weekday_defaults(sid, ary) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_SCHEDULE_WEEKDAY_DEFAULTS;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [sid, ary]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_schedule_weekday_defaults - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // REMOVE_SCHEDULE
  remove_schedule(sid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_SCHEDULE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [sid]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('remove_schedule - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_SCHEDULE_OVERRIDES
  get_schedule_overrides() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_SCHEDULE_OVERRIDES;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_schedule_overrides - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // CREATE_SCHEDULE_OVERRIDE
  create_schedule_override() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = CREATE_SCHEDULE_OVERRIDE;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('create_schedule_override - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_SCHEDULE_OVERRIDE_NAME
  set_schedule_override_name(oid,name) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_SCHEDULE_OVERRIDE_NAME;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_schedule_override_name - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_SCHEDULE_OVERRIDE_START_DATE


  public set_schedule_override_start_date(oid, date) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_SCHEDULE_OVERRIDE_NAME;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_schedule_override_name - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }


  // SET_SCHEDULE_OVERRIDE_OVERRIDES
  set_schedule_override_overrides(oid,ary) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_SCHEDULE_OVERRIDE_OVERRIDES;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_schedules_overide_overrides - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // REMOVE_SCHEDULE_OVERRIDE
  remove_schedule_override(oid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_SCHEDULE_OVERRIDE;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('remove_schedule_override - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_DEVICES
  get_devices() {
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};
    map.params = []

    map.method = GET_DEVICES;
    map.id = self.id++;
    map.clientid = this.clientId;
    // console.log('get_devices loading rpc_info : '+JSON.stringify(self.rpc_info));
    // map.params = [self.rpc_info];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {

      this.http.post<any>(url, map)
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
               self.devices = json.result;
               // console.log(JSON.stringify('get_devices : '+JSON.stringify(self.devices)));
               // for (let idx=0; idx < self.devices.length; idx++) {
               //    let device = self.devices[idx];
               //    if (controller.map_entries) {
               //        let map_entries = controller.map_entries;
               //        controller.x = controller.map_entries[0].pos[0];
               //        controller.y = controller.map_entries[0].pos[1];
               //    } else {
               //
               //    }
               //    console.log('device : '+JSON.stringify(device));
               //    console.log('controller type: '+JSON.stringify(self.controllers[idx].Type));
               // }
               resolve(self.devices);

               // self.user_info = res;
               // console.log(JSON.stringify(res));
               // resolve(res);
             }
           );
       });
       return promise;
    //
    // this.queryDataObservable = this.http.post<any>(url, map)
    //
    //     .map(data => {
    //         // results = data;
    //         // this.energyData = data;
    //         console.log('result : '+JSON.stringify(data));
    //     }).catch(this.handleErrorObservable)
    //     .share();
    // return this.queryDataObservable;

  }
  // SET_DEVICE_NAME
  set_device_name(did,name) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_DEVICE_NAME;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [did,name]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_device_name - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // REMOVE_DEVICE
  remove_device(did) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_DEVICE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [did]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('remove_device - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_ITEM_CONTROLLER_USAGE
  get_item_controller_usage(item_id) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_ITEM_CONTROLLER_USAGE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_item_controller_usage - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_ITEM_NAME
  get_item_name(item_id) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_ITEM_NAME;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_item_name - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_ITEMS_BY_DEVICE_ID
  get_items_by_device_id(did) {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_ITEMS_BY_DEVICE_ID;
    map.id = self.id++;
    map.params = [did];

    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('get_items_by_device_id - result: '+JSON.stringify(json.result));
               let items = json.result;
               self.items_by_device.did = items;
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // GET_ITEMS_BY_CONTROLLER_ID
  get_items_by_controller_id(cid) {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_ITEMS_BY_CONTROLLER_ID;
    map.id = self.id++;
    map.params = [cid];

    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('get_or_create_map - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // SET_ITEM_CMD
  set_item_cmd(item_id, cmd) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_CMD;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, cmd]

    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('set_item_cmd - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_ITEM_NAME
  set_item_name(item_id,name) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_NAME;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id,name]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_item_name - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // TOGGLE_HARDWARE_FIELD
  toggle_hardware_field(item_id, field_name, val) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = TOGGLE_HARDWARE_FIELD;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, field_name, val]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('toggle_hardware_field - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_ITEM_SWITCH
  set_item_switch(item_id, num) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_SWITCH;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, num]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_item_switch - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_ITEM_REVERSED
  set_item_reversed(item_id, num) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_REVERSED;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, num]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_item_reversed - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_ITEM_CONVERSION
  set_item_conversion(item_id, cnv) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_CONVERSION;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, cnv]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_item_conversion - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_ITEM_ADJUSTMENT
  set_item_adjustment(item_id, adj) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_ADJUSTMENT;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, adj]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_item_adjustment - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_ITEM_DAMPING
  set_item_damping(item_id, num) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_DAMPING;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, num]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_item_damping - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_ITEM_IDENT
  set_item_ident(item_id, num) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_ITEM_IDENT;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [item_id, num]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_item_ident - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // CREATE_CONTROLLER
  create_controller(class_name) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = CREATE_CONTROLLER;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [class_name]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               console.log('create_controller result : ',res);

               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               console.log('create_controller - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_CONTROLLER_ENABLED
  set_controller_enabled(cid,val) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_CONTROLLER_ENABLED;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid,val]
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_controller_enabled - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_CONTROLLERS
  // looks like this
  // {"ts":1546811437,"level":"debug","source":"CloudClient","fun":"get_controllers","mod":"kl","args":[{"username":"Installer","role":"administrator","user_id":"0"},
  // ["name","type","subtype","enabled","status","settings","modes","map_entries"],[["type",1],["subtype",1],["name",1]]]}

  get_controllers(mparms:any):Promise<any> {
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};

    map.method = GET_CONTROLLERS;
    map.id = self.id++;
    map.clientid = this.clientId;
    if (this.key){
      map.key = this.key
    }

    // map.params = [
    //   ["name","type","subtype","enabled","status","map_entries"],
    //   [["type",1],["subtype",1],["name",1]]
    // ];

    map.params = [mparms.fields, mparms.sort]
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {

      this.http.post<any>(url, map)
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
               self.controllers = json.result;
               // console.log('get_controllers : ',self.controllers);
               // for (let idx=0; idx < self.controllers.length; idx++) {
               //    let controller = self.controllers[idx];
               //  }
               // for (let idx=0; idx < self.controllers.length; idx++) {
               //    let controller = self.controllers[idx];
               //    // if (controller.map_entries) {
               //    //     let map_entries = controller.map_entries;
               //    //     controller.x = controller.map_entries[0].pos[0];
               //    //     controller.y = controller.map_entries[0].pos[1];
               //    // } else {
               //    //
               //    // }
               //    console.log('controller : '+JSON.stringify(self.controllers[idx]));
               //    // console.log('controller type: '+JSON.stringify(self.controllers[idx].Type));
               // }
               resolve(self.controllers);

               // this.user_info = res;
               // console.log(JSON.stringify(res));
               // resolve(res);
             }
           );
       });
       return promise;
  }

  build_get_controller_status(controller:any,fromtime:any,totime:any){
    let map: any = {};

    map.method = GET_CONTROLLER_STATUS;
    map.id = self.id++;
    map.clientid = this.clientId;

    let cid = controller._id.$oid
    let fields = []
    // if (controller.type.toLowerCase() == 'hvac'){
      fields = ["active","state","2c3s","sockets","ts"]
    // }
    map.params = [cid,fromtime,totime,fields]
    map.key = this.key
    return map
  }

  get_controller_status(controller:any,fromtime:any,totime:any):Promise<any> {
    let headers = new Headers();
    var url = this.apiUrl;
    let obj = this.build_get_controller_status(controller,fromtime,totime)
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {

      this.http.post<any>(url, obj)
           .toPromise()
           .then(
             res => { // Success
               // console.log('get_controller returns : '+JSON.stringify(res));
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               console.log('get_controller_status returns : '+json);

               resolve(json.result);
             }
           );
       });
       return promise;
  }


  get_controller(cid:string, fields:any):Promise<any> {
    let headers = new Headers();
    var url = this.apiUrl;
    var map: any = {};

    map.method = GET_CONTROLLER;
    map.id = self.id++;
    map.clientid = this.clientId;

    map.params = [cid, fields]
    map.key = this.key
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {

      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               // console.log('get_controller returns : '+JSON.stringify(res));
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               console.log('get_controller returns : '+json);

               resolve(json.result);
             }
           );
       });
       return promise;
  }

  // async get_controllera(cid:string, fields:any):Promise<any> {
  //   let headers = new Headers();
  //   var url = this.apiUrl;
  //   var map: any = {};
  //
  //   map.method = GET_CONTROLLER;
  //   map.id = self.id++;
  //   map.clientid = this.clientId;
  //
  //   map.params = [cid, fields]
  //   headers = new Headers({ 'Content-Type': "application/json" });
  //
  //   let promise = new Promise((resolve, reject) => {
  //
  //     this.http.post<any>(url, map)
  //          .toPromise()
  //          .then(
  //            res => { // Success
  //              // console.log('get_controller returns : '+JSON.stringify(res));
  //              let json = JSON.parse(res);
  //              resolve(json.result);
  //            }
  //          );
  //      });
  //      return promise;
  // }

  // SET_CONTROLLER_NAME
  set_controller_name(cid, value) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_CONTROLLER_NAME;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, value];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               // console.log('get_controller returns : '+JSON.stringify(res));
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               console.log('set_controller_name returns : '+json);

               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // SET_CONTROLLER_SETTING
  // aka ["5c5a68d61a8745040c439d59","map_icon.icon_type","co2"]
  set_controller_setting(cid, stype, value) {

    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_CONTROLLER_SETTING;
    map.id = self.id++;
    map.clientid = this.clientId;
    // let update = {
    //   id:cid,
    //   path:stype,
    //   value:value
    // };
    if (this.key){
      map.key = this.key
    }

    map.params = [cid, stype, value];

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               // console.log('get_controller returns : '+JSON.stringify(res));
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               console.log('get_controller returns : '+json);

               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // REMOVE_CONTROLLER_SETTING
  remove_controller_setting(cid, path) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_CONTROLLER_SETTING;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, path];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               // console.log('get_controller returns : '+JSON.stringify(res));
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               console.log('get_controller returns : '+json);

               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_CONTROLLER_SETTING
  get_controller_setting(cid, path) {

    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_CONTROLLER_SETTING;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, path];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_controller_setting - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_CONTROLLER_SETTINGS_GROUP
  get_controller_settings_group(cid, group):Promise<any> {
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_CONTROLLER_SETTINGS_GROUP;
    map.id = self.id++;
    map.params = [cid, group];
    map.key=this.key
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise<any[]>((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               // console.log('get_controller_settings_group - return '+res);
               let json = null;
               if (typeof res !== 'string'){
                 json = res
               }
               else{
                 json = JSON.parse(res);
               }
               // console.log('get_controller_settings_group - result: '+JSON.stringify(json));
               resolve(json.result);
             }
           );
       }).catch(err=>{
         console.log('get_controller_settings_group error : '+err);
       });
       return promise;
  }
  // GET_CONTROLLER_MODES
  get_controller_modes(cid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_CONTROLLER_MODES;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid];
    map.key = this.key

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               // console.log('get_controller_settings_group - result: '+JSON.stringify(json));
               resolve(json.result);

             }
           );
       });
       return promise;

  }
  // CREATE_CONTROLLER_MODE
  create_controller_mode(cid, template) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = CREATE_CONTROLLER_MODE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, template];
    map.key = this.key

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               // console.log('get_controller_settings_group - result: '+JSON.stringify(json));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // STATE_FOR_CONTROLLER
  state_for_controller(cid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = STATE_FOR_CONTROLLER;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('state_for_controller - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // // PRODIGY_COOLING
  // prodigy_cooling() {
  //
  // }
  // // PRODIGY_HEATING
  // prodigy_heating() {
  //
  // }
  // // UPDATE_PRODIGY_SP
  // update_prodigy_sp() {
  //
  // }

  set_controller_mode_property(cid,mid,key,val) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_CONTROLLER_MODE_PROPERTY;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, mid, key, val];
    map.key = this.key

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('set_controller_schedule - result: '+JSON.stringify(json.result));
               resolve(json.result);

             }
           );
       });
       return promise;

  }
  // REMOVE_CONTROLLER_MODE
  remove_controller_mode(cid,mid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_CONTROLLER_MODE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, mid];
    map.key = this.key

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('set_controller_schedule - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_CONTROLLER_SCHEDULE
  get_controller_schedule(cid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_CONTROLLER_SCHEDULE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_controller_schedule - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_CONTROLLER_SCHEDULE
  set_controller_schedule(cid,schedule) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_CONTROLLER_SCHEDULE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, schedule];
    map.key = this.key

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('set_controller_schedule - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // REMOVE_CONTROLLER
  remove_controller(cid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_CONTROLLER;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               // let json = JSON.parse(res);
               console.log('get_sockets_by_controller_id - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_SOCKETS_BY_CONTROLLER_ID
  get_sockets_by_controller_id(cid) {

    console.log('get_sockets_by_controller_id --> : '+cid);
    let headers = new Headers();
    var url = this.apiUrl;

    let map: any = {};
    map.method = GET_SOCKETS_BY_CONTROLLER_ID;
    map.id = self.id++;
    map.params = [cid];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               // let json = JSON.parse(res);
               console.log('get_sockets_by_controller_id - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // CLEAR_CONTROLLER_SOCKET
  clear_controller_socket(cid,socket_id) {

    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = CLEAR_CONTROLLER_SOCKET;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, socket_id];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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

               // let json = JSON.parse(res);
               console.log(' - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // ASSIGN_CONTROLLER_SOCKET
  assign_controller_socket(cid, socket_code, item_id) {

    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = ASSIGN_CONTROLLER_SOCKET;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, socket_code, item_id];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               //
               // console.log('assign_controller_socket - result: '+JSON.stringify(res));
               // let json = JSON.parse(res);
               // console.log('assign_controller_socket - result: '+JSON.stringify(json.result));
               resolve(json.result);
               // resolve(res);
             }
           );
       });
       return promise;

  }
  // SET_CONTROLLER_OVERRIDE
  set_controller_override(cid, o) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.key = this.key
    map.method = SET_CONTROLLER_OVERRIDE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid, o];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
           );
       });
       return promise;

  }
  // CLEAR_CONTROLLER_OVERRIDE
  clear_controller_override(cid) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.key = this.key
    map.method = CLEAR_CONTROLLER_OVERRIDE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log(' - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // SET_CONTROLLER_CLEAR_ALARM
  set_controller_clear_alarm() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_CONTROLLER_CLEAR_ALARM;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = ["main"];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('set_controller_clear_alarm - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // UPDATE_CONTROLLER_MAP_ENTRY
  update_controller_map_entry(cid,view) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = UPDATE_CONTROLLER_MAP_ENTRY;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid,view,[0,0]];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log(' - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // REMOVE_CONTROLLER_MAP_ENTRY
  remove_controller_map_entry(cid,view) {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = REMOVE_CONTROLLER_MAP_ENTRY;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [cid,view];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log(' - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_CURRENT_CONTROLLER_STATUS
  get_current_controller_status(params):Promise<any> {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_CURRENT_CONTROLLER_STATUS;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = ["main"];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_current_controller_status - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }
  // GET_CONTROLLER_STATUS
  // get_controller_status(controller_id, params):Promise<any> {
  //   // rpc_info, controller_id, from_time, to_time=nil, fields=nil, mod=nil
  //   let headers = new Headers();
  //   var url = this.apiUrl;
  //
  //   var map: any = {};
  //   map.method = GET_CONTROLLER_STATUS;
  //   map.id = self.id++;
  //   map.clientid = this.clientId;
  //   // map.params = ["main"];
  //   map.params = [];
  //
  //   headers = new Headers({ 'Content-Type': "application/json" });
  //
  //   let promise = new Promise((resolve, reject) => {
  //     console.log('calling get_controller_status : ',self.rpc_info);
  //     // map.params = [self.rpc_info, controller_id];
  //     map.params = [controller_id];
  //     if (params.from_time) {
  //       map.params.push(params.from_time);
  //     }
  //     if (params.to_time) {
  //       map.params.push(params.to_time);
  //     }
  //     if (params.fields) {
  //       map.params.push(params.fields);
  //     }
  //     if (params.mod) {
  //       map.params.push(params.mod);
  //     }
  //
  //     this.http.post<any>(url, map)
  //          .toPromise()
  //          .then(
  //            res => { // Success
  //              // console.log('get_controller_status - result: ',res.result);
  //              let json = JSON.parse(res);
  //              // console.log('get_controller_status - result: ',json);
  //              resolve(json);
  //            }
  //          ).catch(err => {
  //            reject(err);
  //          });
  //      });
  //      return promise;
  // }
  // GET_MAP
  get_map() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_MAP;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = ["main"];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_map - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // CREATE_MAP
  create_map() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = CREATE_MAP;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = ["main"];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('create_map - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }

  // GET_OR_CREATE_MAP
  async get_or_create_map():Promise<any> {

    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};

    if (this.key){
      map.key = this.key
    }
    map.method = GET_OR_CREATE_MAP;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = ["main"];

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('get_or_create_map - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }


  async get_main_map():Promise<any> {
    // {"ts":1546877872,"level":"debug","source":"CloudClient","fun":"get_or_create_map","mod":"kl","args":[{"username":"Installer","role":"administrator","user_id":"0"},"main"]}

    // console.log('get_or_create_map');
    let headers = new Headers();
    var url = this.apiUrl;
    // console.log('get_or_create_map : '+url);
    var map: any = {};
    if (this.key){
      map.key = this.key
    }
    map.method = GET_MAIN_MAP;
    map.id = self.id++;
    map.clientid = this.clientId;
    // console.log('get_or_create_map - rpc_info : '+self.rpc_info);
    map.params = ["main"];

    headers = new Headers({ 'Content-Type': "application/json" });


    let promise = new Promise((resolve, reject) => {

      this.http.post<any>(url, map)
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
               // console.log('get_main_map - raw result : '+JSON.stringify(json));
               self.mainMap = json.result;
               // console.log('get_main_map - result: '+JSON.stringify(self.mainMap));
               resolve(self.mainMap);

               // self.mainMap = res;
               // console.log(JSON.stringify(res));
               // resolve(res);
             }
           );
       });
       return promise;
  }

  // SET_MAP_BOXES
  set_map_boxes() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = SET_MAP_BOXES;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = ["main"];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_or_create_map - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // GET_LOGS_SINCE
  get_logs_since(ts):Promise<any> {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = GET_LOGS_SINCE;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = [ts];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
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
               console.log('get_or_create_map - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;

  }
  // NOOP
  noop() {
    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    map.method = NOOP;
    map.id = self.id++;
    map.clientid = this.clientId;
    map.params = ["main"];
    if (this.key){
      map.key = this.key
    }

    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               console.log('get_or_create_map - result: '+JSON.stringify(json.result));
               resolve(json.result);
             }
           );
       });
       return promise;
  }



  private dataStorage: string = null;
  private retrieveDataResolver;

  displayData(): void {
    // your display code goes here
    console.log("2. DISPLAYING DATA", this.dataStorage);
  }
  retrieveData(): void {
    // your async retrieval data logic goes here
    console.log("1. GETTING DATA FROM SERVER");
    setTimeout(() => { // <--- Change it - your service data retrieval
      this.dataStorage = '++DATA++';
      this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
    }, 1000);
  }

  retrieveDataPromise(): Promise<any> {
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.retrieveData();
    })
  }
  initializeRPCClient() {
    this.retrieveDataPromise().then(() => {this.displayData()});
  }

  getTempForLocation(lat,lon) {
    // 46.8267,-122.4233
    let url = 'https://api.darksky.net/forecast/4058b389cf2baacb74c8d4ebed61cec5/'+lon+','+lat;


    let headers = new Headers();
    // var url = this.apiUrl;
    var map: any = {};
    map.method = SET_CONFIG_VALUE;
    map.id = self.id++;
    map.clientid = this.clientId;;
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      // map.params = [self.rpc_info];
      this.http.post<any>(url, map)
           .toPromise()
           .then(
             res => { // Success
               let json = JSON.parse(res);
               self.currentTemp = json.currently.temperature;
               // self.rpc_info = json.result;
               console.log('currently : '+JSON.stringify(json.currently));
               // console.log(JSON.stringify(res.result));
               resolve(self.rpc_info);
             }
           );
       });
       return promise;

  }

  get_system_status() {

    let headers = new Headers();
    var url = this.apiUrl;

    var map: any = {};
    if (this.key){
      map.key = this.key
    }
    map.method = GET_SYSTEM_STATUS;
    map.params = []

    // var url = this.apiUrl;
    headers = new Headers({ 'Content-Type': "application/json" });

    let promise = new Promise((resolve, reject) => {
      // map.params = [self.rpc_info];
      this.http.post<any>(url, map)
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
               self.system_status = json.result;
               // self.rpc_info = json.result;
               console.log('system_status : '+JSON.stringify(json));
               // console.log(JSON.stringify(res.result));
               resolve(self.system_status);
             }
           );
       });
       return promise;

  }

proxy_gateway(path) {

  let headers = new Headers();
  var url = this.apiUrl;

  var body: any = {};
  body.method = PROXY_GATEWAY;

  let map:any = {};
  map.path = path;
  map.method = "GET";
  body.params = [map];

  // if (body) {
  //   map.body = body;
  // map.params.push(body);
  // }
  if (this.key){
    body.key = this.key
  }

  // var url = this.apiUrl;
  headers = new Headers({ 'Content-Type': "application/json" });

  let promise = new Promise((resolve, reject) => {
    // map.params = [self.rpc_info];
    this.http.post<any>(url, body)
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
             // self.rpc_info = json.result;
             console.log('proxy_gateway : ',json);
             // console.log(JSON.stringify(res.result));
             resolve(json);
           }
         );
     });
     return promise;

}

proxy_gateway_post(path,body) {

  let headers = new Headers();
  var url = this.apiUrl;

  var body: any = {};
  body.method = PROXY_GATEWAY;

  let map:any = {};
  map.path = path;
  map.method = "POST";
  map.body = body;
  body.params = [map];

  // if (body) {
  //   map.body = body;
  // map.params.push(body);
  // }
  if (this.key){
    body.key = this.key
  }

  // var url = this.apiUrl;
  headers = new Headers({ 'Content-Type': "application/json" });

  let promise = new Promise((resolve, reject) => {
    // map.params = [self.rpc_info];
    this.http.post<any>(url, body)
         .toPromise()
         .then(
           res => { // Success
             // let json = null;
             // if (typeof res !== 'string'){
             //   json = res
             // }
             // else{
             //   json = JSON.parse(res);
             // }
             // // self.rpc_info = json.result;
             // console.log('proxy_gateway_post : ',json);
             console.log('proxy_post result: ',res);
             resolve(res);
           }
         ).catch(error => {

           console.log('gateway_post error : ',error)
         });
     });
     return promise;
}

setupInitSteps():Promise<any> [] {
  let promises = [];
  for (let idx = 0; idx < self.steps.length; idx++) {

     let step:any = self.steps[idx];
     promises.push(self.handleStep(step));
  }
  console.log('returning promises');
  return promises;
}

public processUpdateSteps(steps, cb) {
    let promises = [];
    for (let idx = 0; idx < steps.length; idx++) {

       let step:any = steps[idx];
       promises.push(self.handleStep(step));
    }
    console.log('start promise all');
    Promise.all(promises).then(value => cb());
}

processControllerSteps(steps, controller, cb) {
  let promises = [];
  for (let idx = 0; idx < steps.length; idx++) {

     let step:any = steps[idx];
     step.params = controller.id;
     promises.push(self.handleStep(step));
  }
  console.log('start promise all');
  Promise.all(promises).then(value => cb());
}

processSteps(cb) {
    let promises = [];
    for (let idx = 0; idx < self.steps.length; idx++) {

       let step:any = self.steps[idx];
       promises.push(self.handleStep(step));
    }
    // console.log('start promise all');
    Promise.all(promises).then(value => cb());
}

// switchTab(tabName) {
//   this.ns.switchTab(tabName);
// }

getCleanUrl(content) {
  // console.log('getCleanUrl : '+content);
  return  this.sanitizer.bypassSecurityTrustResourceUrl(content);
}

}
