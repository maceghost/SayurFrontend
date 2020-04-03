import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef,ViewEncapsulation } from '@angular/core';


import { IonicModule, ModalController, LoadingController } from '@ionic/angular';
import { Routes, Router, RouterModule } from '@angular/router';
import { ControllerSettingsItemComponent } from '../components/controller-settings-item/controller-settings-item.component';
import { MatTabChangeEvent } from '@angular/material';
import { ControllerSchedulesComponent } from '../components/controller-schedules/controller-schedules.component';

import { AuthLocalProvider } from '../providers/authenticate/authlocal';
import { DataService } from '../providers/data.service';

import { PopupService } from '../providers/popup.service';


import { TestmodalPage } from '../testmodal/testmodal'


import { ControllerSettingsComponent } from '../components/controller-settings/controller-settings.component'
import { ControllerModesComponent } from '../components/controller-modes/controller-modes.component'
import { AssignScheduleComponent } from '../components/assign-schedule/assign-schedule.component';
import { HistoryComponent } from '../components/history/history.component';

import { SpeditPage } from '../spedit/spedit';

const INFO = 0;
const SETTINGS = 1;
const SCHEDULES = 2;
const MODES = 3;


import { Chart } from 'chart.js';
import * as moment from 'moment';
import * as lodash from 'lodash';

const DAY = 24;
const QUAD = 6;
const HOUR = 1;




@Component({
  selector: 'page-map-icon',
  templateUrl: './map-icon.page.html',
  styleUrls: ['./map-icon.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapIconPage implements OnInit,AfterViewInit {

  controller:any;
  state:any;
  value = 0;
  settings:any [];
  lineGraph:any;
  thing: any;
  timearray: any;
  valuearray: any;
  minvalue: any;
  maxvalue: any;
  displayMode = INFO;

  @ViewChild('tabGroup') tabGroup;
  @ViewChild('graphCanvas') graphCanvas:ElementRef;

  constructor(
    public modalCtrl: ModalController,
    public loading: LoadingController,
    // public callNumber: CallNumber,
    // public launchNavigator: LaunchNavigator,
    public auth: AuthLocalProvider,
    public popup: PopupService,
    // public navCtrl: NavController,
    // public navParams: NavParams,
    public router: Router,
    public ds: DataService,

  ) {
    this.value = 0.0;
  }
  getDisplayType() {
    return this.displayMode;
  }
  selectView(v) {
      this.displayMode = v;
  }
  ionViewWillLeave() {

    this.auth.unsubscribeHvacPage(this.state.controller);
    this.auth.subscribeHomePage()

  }
  ionViewDidEnter(){
    this.controller = this.auth.currentController;
    this.auth.subscribeHvacPage(this.controller)
    this.auth.subscribeHomePage()
    // this.auth.currentpage = 'controller'
    // this.auth.currentcontroller = this.state.controller
    // if (!this.auth.pausesubs){
    //   this.auth.subscribeHvacPage(this.state.controller)
    //
    // }

  }
  ngOnInit() {
    console.log('running updates for hvac');
    // this.auth.runLocationUpdates()
    this.state = this.router.getCurrentNavigation().extras.state;

    console.log('got state from parent ... : '+JSON.stringify(this.state ));


    // this.hvac = this.state.controller;
    // this.perf = this.hvac.perf;
    console.log('MapIconPage controller : ',this.controller);
    // this.auth.subscribeHvacPage(this.controller)
    // this.loadHistoryData();
    // this.loadControllerGroupSettings();

  }

  ngAfterViewInit() {
    console.log('afterViewInit => ', this.displayMode);
    let interval;
    interval = setInterval(() =>  {
      if (this.graphCanvas) {
          clearInterval(interval);
          this.initializeGraph();
      }
    });
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
      console.log(tabChangeEvent);
  }

  initializeGraph() {

    this.lineGraph = new Chart(this.graphCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: this.controller.timearray,
            datasets: [{
                label: 'Space Temp.',
                fill: false,
                lineTension: 0,
                pointRadius: 0,
                data: this.controller.valuearray,
                backgroundColor: [
                ],
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {

            scales: {
                yAxes: [{
                    ticks: {
                      maxTicksLimit: 24,
                    }
                }],
                xAxes: [{
                  gridLines: {
                    display:false
                  },
                    ticks: {
                        maxTicksLimit: 24
                    }
                }]
            }
        }

    });
  }

  loadHistoryData() {

    let from_time = (this.auth.getUTCTime() - 86400);
    let to_time = (this.auth.getUTCTime());

    var mod = 5;
    // var mod = DAY;
    // filter = function(s) { return s % 3 == 0 };

    // if (d.scale == TimeRange.QUAD) {
    //   mod = 2;
    //   filter = null;
    // }
    // if (d.scale == TimeRange.HOUR) {
    //   mod = 1;
    //   filter = null;
    // }

    // model.getStatus(handleStatus, fromTime.valueOf()/1000, toTime.valueOf()/1000, ['active', 'sockets', 'ts'], mod);
    let fields = ['active', 'sockets', 'ts'];
    let params:any = {
      from_time:from_time,
      to_time:to_time,
      fields: fields,
      mod: mod
    };
    console.log('loadHistoryData ...');
    this.ds.get_controller_status(this.controller, from_time,to_time)
      .then(
        data =>{
          // this.loading.dismiss()
          console.log('loadHistoryData returned : ',data.result.length);
          // if (data.settings){
          //   if (!data.settings.error){
          //
          //     this.controller.overridesettings = data.settings
          //   }
          // }
          if (data.result){
              console.log('loadHistoryData found result : ',data.result);


              this.controller.history = data.result
              this.controller.timearray = [];
              this.controller.valuearray = [];
              this.controller.minvalue = 1000
              this.controller.maxvalue = -1000

              for (let i of this.controller.history){
                let dt = moment.utc(moment.unix(Math.floor(i.ts) + this.ds.server_time.utc_offset_sec))
                let hour = dt.format('h:mm')
                let ampm = dt.format('a')
                let day = dt.format('MM/D')
                // console.log('log date : ',day,hour,ampm, i.sockets.input);
                this.controller.timearray.push(day + ', ' +hour + ' '+ ampm)
                this.controller.valuearray.push(i.sockets.input)


                if ((i.sockets.input) < this.controller.minvalue){
                  this.controller.minvalue = i.sockets.input
                }
                if ((i.sockets.input) > this.controller.maxvalue){
                  this.controller.maxvalue = i.sockets.input
                }

              }

            }


          if (this.controller.modes){

            for (let newmode of data.modes.result){
              let modefound = false
              for (let mode of this.controller.modes){
                if (mode.id == newmode.id ){
                  modefound = true

                  mode = newmode

                }

              }
              if (!modefound){
                this.controller.modes.push(newmode)

              }
            }
          }
          else{
            this.controller.modes = []
            this.controller.modes = data.modes.result

          }
          for (let j of this.controller.modes){

            j.name = j.name.toUpperCase()
            j.editable = true;
            j.validentry = true
          }
          this.controller.modes = lodash.orderBy(this.controller.modes, ['order'], ['asc']);

          this.lineGraph = new Chart(this.graphCanvas.nativeElement, {

                  type: 'line',
                  data: {
                      labels: this.controller.timearray,
                      datasets: [{
                          label: 'Space Temp.',
                          fill: false,
                          lineTension: 0,
                          pointRadius: 0,
                          data: this.controller.valuearray,
                          backgroundColor: [


                          ],
                          borderColor: 'black',
                          borderWidth: 1
                      }]
                  },
                  options: {

                      scales: {
                          yAxes: [{

                              ticks: {
                                maxTicksLimit: 24,

                                  // beginAtZero:true
                                  // suggestedMin: (this.hvac.minvalue - 1),
                                  // suggestedMax: this.hvac.maxvalue + 1
                              }
                          }],
                          xAxes: [{
                            gridLines: {
                              display:false
                            },
                              ticks: {
                                  maxTicksLimit: 24
                              }
                          }]
                      }
                  }

              });
        }).catch(error => {
          // this.loading.dismiss()
        })
  }

  getValue() {
    if (this.controller.status.sockets) {
      // console.log('getValue setting value : '+this.controller.status);
      this.value = this.controller.status.sockets.input;
    }
    // console.log('getValue returning : '+this.value);
    return this.value;
  }

  loadControllerGroupSettings() {
    this.ds.get_controller_settings_group(this.controller._id.$oid,'map_icon').then((data:any) => {
        console.log('get_controller_settings_group : ',data.length);
        this.settings = data;
        // this.updateWithControllerSettings();
        // if (this.controller.settings && this.controller.settings.hvac) {
        //   let hvacSettings = this.controller.settings.hvac;
        //   let keys:any = this.propertyKeys(hvacSettings);
        //     keys.forEach((key)=> {
        //       this.settings[key] = hvacSettings[key];
        //     });
        // }

    }).catch((error) => {
        console.log(error);
    });
  }

  isTabSelected(idx) {
    if (this.tabGroup) {
      return this.tabGroup.selectedIndex == idx;
    }
    return false;
  }

  propertyKeys(data): any[] {
    var keys = Object.getOwnPropertyNames(data).sort();
    return keys;
  }


}
