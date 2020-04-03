import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthLocalProvider } from '../../providers/authenticate/authlocal';
import { DataService } from '../../providers/data.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import * as lodash from 'lodash';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  @Input('controller') controller;
  @ViewChild('graphCanvas') graphCanvas;

  lineGraph:any;
  thing: any;
  timearray: any;
  valuearray: any;
  minvalue: any;
  maxvalue: any;
  selected: any = "24";
  loading: any = false;
  scale:any = 24;
  marker:any;
  daymarker:any = (this.marker + this.auth.time_offset)
  // loading: Loading;
  // hvac: any = this.navParams.data[1];
  // loc: any = this.navParams.data[0];

  constructor(
    private auth:AuthLocalProvider,
    private ds:DataService) { }

  changeTimeScale(event: any){
    this.auth.graphviewing = true;

    console.log(event)
    let newscale = event
    if (newscale == 24){
      this.marker = this.getSiteMidnightFromTime(this.marker)
    }
    else if (newscale == 6 && this.scale == 1){
      // get nearest 6 hour marker
      this.marker = (6*3600)*Math.floor((this.marker + this.auth.time_offset)/(6*3600)) - this.auth.time_offset

    }
    this.scale = event
    this.buildData()
    this.buildGraph()


  }
  buildData(){
    this.controller.timearray = [];
    this.controller.valuearray = [];
    this.controller.supplyarray = [];
    this.controller.minvalue = 1000
    this.controller.maxvalue = -1000
    console.log(this.controller.stathist)
    console.log(this.marker, this.marker + this.scale*3600)
    if (this.controller.stathist.length > 0){
      let hit = false
      for (let i of this.controller.stathist){
        // console.log(this.marker)
        // console.log(this.marker+this.scale*3600)
        // console.log(i.ts)

        if (i.ts >= this.marker && i.ts <= (this.marker + this.scale*3600)){
          console.log('yeah')
          // console.log(this.marker)
          // console.log(this.marker+this.scale*3600)
          // console.log(i.ts)
          // because we need it in utc because the client side code won't necessarily have the same timezone as
          // the source of the data, the site location, so we can't let it auto offset the time
          let dt = moment.utc(moment.unix(Math.floor(i.ts) + this.auth.time_offset))
          let hour = dt.format('h:mm')
          let ampm = dt.format('a')
          let day = dt.format('MM/D')
          this.controller.timearray.push(day + ', ' +hour + ' '+ ampm)
          if (this.controller.type == "hvac" || this.controller.type == "vpat4"){
            this.controller.valuearray.push(i.sockets.space)
            this.controller.supplyarray.push(i.sockets.supply)

            if ((i.sockets.space) < this.controller.minvalue){
              this.controller.minvalue = i.sockets.space
            }
            if ((i.sockets.space) > this.controller.maxvalue){
              this.controller.maxvalue = i.sockets.space
            }
            if ((i.sockets.supply) < this.controller.minvalue){
              this.controller.minvalue = i.sockets.supply
            }
            if ((i.sockets.supply) > this.controller.maxvalue){
              this.controller.maxvalue = i.sockets.supply
            }
          }
          if (this.controller.type == "light" ){
            this.controller.valuearray.push(i.lm)
            this.controller.supplyarray.push(i.level)

            if ((i.level) < this.controller.minvalue){
              this.controller.minvalue = i.level
            }
            if ((i.level) > this.controller.maxvalue){
              this.controller.maxvalue = i.level
            }
            if ((i.lm) < this.controller.minvalue){
              this.controller.minvalue = i.lm
            }
            if ((i.lm) > this.controller.maxvalue){
              this.controller.maxvalue = i.lm
            }
          }
          if (this.controller.type == "map_icon" ){
            this.controller.valuearray.push(i.sockets.input)

            if ((i.sockets.input) < this.controller.minvalue){
              this.controller.minvalue = i.sockets.input
            }
            if ((i.sockets.input) > this.controller.maxvalue){
              this.controller.maxvalue = i.sockets.input
            }
          }
          if (this.controller.type == "kw_meter" ){
            this.controller.valuearray.push(i.d)

            if ((i.d) < this.controller.minvalue){
              this.controller.minvalue = i.d
            }
            if ((i.d) > this.controller.maxvalue){
              this.controller.maxvalue = i.d
            }
          }

        }
        if (i.ts > (this.marker + this.scale*3600)){
          hit = true
        }


      }
      if (!hit){
        // if this status didn't fill up the full time slot
        console.log('i shouldnt be here ')
        // get the last timestamp and build empty data until end of time slot
        let ts = this.controller.stathist[this.controller.stathist.length - 1].ts
        while (ts <= (this.marker + this.scale*3600)){
          let dt = moment.utc(moment.unix(Math.floor(ts) + this.auth.time_offset))
          let hour = dt.format('h:mm')
          let ampm = dt.format('a')
          let day = dt.format('MM/D')
          this.controller.timearray.push(day + ', ' +hour + ' '+ ampm)
          ts = ts + 60

        }


      }
    }

    console.log(this.controller.timearray)
    // console.log(this.controller.timearray)
    console.log(this.controller.valuearray)

  }

  getSiteMidnightFromTime(unixtime:any){
    // let d = new Date((unixtime ) * 1000);
    // d.setHours(0,0,0,0)
    // let clientOffset = d.getTimezoneOffset()*60
    // console.log((d.getTime()/1000) - clientOffset )
    // console.log(d.getTime())
    // return Math.floor(d.getTime()/1000) - clientOffset - this.auth.time_offset

    // this just doing math to get the nearest 12am. need to offset the timestamp to do math tyhen add back in
    return Math.floor((unixtime + this.auth.time_offset)/(24*3600)) * 24*3600 - this.auth.time_offset

  }
  shift(direction:any){
    this.loading = true
    let change = 0;
    if (direction == 'left'){
      change = this.scale*3600*-1
    }
    else{
      change = this.scale*3600

    }
    let newmark = this.marker + change
    console.log(Math.floor((newmark + this.auth.time_offset)/(24*3600)))
    console.log(Math.floor((this.marker + this.auth.time_offset)/(24*3600)))
    // got to get rid of the time offset in order to do day calculations
    // if it's a new day
    if (Math.floor((newmark + this.auth.time_offset)/(24*3600)) != Math.floor((this.marker + this.auth.time_offset)/(24*3600))){
      console.log('here')
      this.marker = newmark

      let newday = this.getSiteMidnightFromTime(this.marker)
      console.log(this.marker)
      console.log(newday)
      let totime = newday + 86400
      let fromtime = totime - 172800
      this.ds.get_controller_status(this.controller,newday,totime).then((data:any) => {
          this.controller.stathist = data
          this.buildData()
          this.buildGraph()



      }).catch((error) => {
          console.log(error);
      });

    }
    else{
      this.marker = newmark
      this.buildData()
      this.buildGraph()

    }
    // console.log((newmark + this.auth.time_offset)/21600)
    // this.marker = this.marker - this.scale*3600


  }


  ngOnInit() {
    this.loading = true
    var d = new Date();

    this.marker = this.getSiteMidnightFromTime(d.getTime()/1000)

    console.log(this.marker)
    if (!this.controller.timearray){
      let totime = this.auth.getTodaySiteMidnightUTC() + 86400

      let fromtime = totime - 172800
      this.ds.get_controller_status(this.controller,this.marker,totime).then((data:any) => {
        this.controller.stathist = data
        this.buildData()
        this.buildGraph()
        // if (!this.auth.pausesubs) {
        //   this.auth.handleControllerStatHist(data, this.controller)
        //   console.log(this.controller)
        //   this.buildData()
        //   this.buildGraph()
        // }

      }).catch((error) => {
          console.log(error);
      });
    }
    else{
      console.log(this.controller)
      this.buildData()
      this.buildGraph()
    }

  }

  buildGraph(){
    let graphOpts = {

            type: 'line',
            data: {
                labels: this.controller.timearray,
                datasets: []
            },
            options: {
                maintainAspectRatio: false,
                // responsive: false,
                scales: {
                    yAxes: [],
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

        }
    if (this.controller.type == 'hvac' || this.controller.type == 'vpat4')
    {
      let space = {
          label: 'Space Temp.',
          yAxisID: 'A',
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          data: this.controller.valuearray,
          backgroundColor: [


          ],
          borderColor: 'black',
          borderWidth: 1
      }
      let supply = {
          label: 'Supply Temp.',
          yAxisID: 'B',
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          data: this.controller.supplyarray,
          backgroundColor: [


          ],
          borderColor: 'blue',
          borderWidth: 1
      }
      let yAxisA = {
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            maxTicksLimit: 24

          }
      }
      let yAxisB = {
          id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            maxTicksLimit: 24

          }
      }
      graphOpts.data.datasets.push(space,supply)
      graphOpts.options.scales.yAxes.push(yAxisA, yAxisB)
    }
    else if (this.controller.type == 'light'){
      let meter = {
          label: 'Light Meter Level',
          yAxisID: 'A',
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          data: this.controller.valuearray,
          backgroundColor: [


          ],
          borderColor: 'black',
          borderWidth: 1
      }
      let level = {
          label: 'Light Level',
          yAxisID: 'B',
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          data: this.controller.supplyarray,
          backgroundColor: [


          ],
          borderColor: 'blue',
          borderWidth: 1
      }
      let yAxisA = {
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            maxTicksLimit: 24

          }
      }
      let yAxisB = {
          id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            maxTicksLimit: 24

          }
      }
      graphOpts.data.datasets.push(meter,level)
      graphOpts.options.scales.yAxes.push(yAxisA,yAxisB)
    }
    else if (this.controller.type == 'map_icon'){
      let input = {
          label: 'Input Level',
          yAxisID: 'A',
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          data: this.controller.valuearray,
          backgroundColor: [


          ],
          borderColor: 'black',
          borderWidth: 1
      }
      let yAxisA = {
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            maxTicksLimit: 24

          }
      }
      graphOpts.data.datasets.push(input)
      graphOpts.options.scales.yAxes.push(yAxisA)
    }
    else if (this.controller.type == 'kw_meter'){
      let input = {
          label: 'KW Level',
          yAxisID: 'A',
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          data: this.controller.valuearray,
          backgroundColor: [


          ],
          borderColor: 'black',
          borderWidth: 1
      }
      let yAxisA = {
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            maxTicksLimit: 24

          }
      }
      graphOpts.data.datasets.push(input)
      graphOpts.options.scales.yAxes.push(yAxisA)
    }

    this.loading = false
    this.lineGraph = new Chart(this.graphCanvas.nativeElement, graphOpts);

  }

  getUTCTime(){
    return Math.floor(new Date().getTime()/1000)
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

          // not sure here... don't think data is returning settings
          if (data.settings){
            console.log('data returned settings : ',data.settings);
            if (!data.settings.error){

              this.controller.overridesettings = data.settings
            }
          }
          if (data.result){


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
                console.log(day)
                this.controller.timearray.push(day + ', ' +hour + ' '+ ampm)
                this.controller.valuearray.push(i.sockets.space)


                if ((i.sockets.space) < this.controller.minvalue){
                  this.controller.minvalue = i.sockets.space
                }
                if ((i.sockets.space) > this.controller.maxvalue){
                  this.controller.maxvalue = i.sockets.space


                }

              }

            }

            // controller already has modes here.
          // if (this.controller.modes){
          //
          //   for (let newmode of data.modes.result){
          //     let modefound = false
          //     for (let mode of this.controller.modes){
          //       if (mode.id == newmode.id ){
          //         modefound = true
          //
          //         mode = newmode
          //
          //       }
          //
          //     }
          //     if (!modefound){
          //       this.controller.modes.push(newmode)
          //
          //     }
          //   }
          // }
          // else{
          //   this.controller.modes = []
          //   this.controller.modes = data.modes.result
          //
          // }

          // for (let j of this.controller.modes){
          //
          //   j.name = j.name.toUpperCase()
          //   j.editable = true;
          //   j.validentry = true
          // }
          // this.controller.modes = lodash.orderBy(this.controller.modes, ['order'], ['asc']);

          // this.lineGraph = new Chart(this.graphCanvas.nativeElement, {
          //
          //         type: 'line',
          //         data: {
          //             labels: this.controller.timearray,
          //             datasets: [{
          //                 label: 'Space Temp.',
          //                 fill: false,
          //                 lineTension: 0,
          //                 pointRadius: 0,
          //                 data: this.controller.valuearray,
          //                 backgroundColor: [
          //
          //
          //                 ],
          //                 borderColor: 'black',
          //                 borderWidth: 1
          //             }]
          //         },
          //         options: {
          //
          //             scales: {
          //                 yAxes: [{
          //
          //                     ticks: {
          //                       maxTicksLimit: 24,
          //
          //                         // beginAtZero:true
          //                         // suggestedMin: (this.controller.minvalue - 1),
          //                         // suggestedMax: this.controller.maxvalue + 1
          //                     }
          //                 }],
          //                 xAxes: [{
          //                   gridLines: {
          //                     display:false
          //                   },
          //                     ticks: {
          //                         maxTicksLimit: 24
          //                     }
          //                 }]
          //             }
          //         }
          //
          //     });
        },
        error => {
          console.log('error retrieving history : ',error);
          // this.loading.dismiss()

        })

  }

}
