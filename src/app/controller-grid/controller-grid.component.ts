import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../providers/data.service';

var self;

@Component({
  selector: 'app-controller-grid',
  templateUrl: './controller-grid.component.html',
  styleUrls: ['./controller-grid.component.scss']
})
export class ControllerGridComponent implements OnInit, AfterViewInit {

  ds:DataService;

  greenDot="/assets/images/GreenDot.png";
  yellowDot="/assets/images/YellowDot3.png";
  redDot="/assets/images/RedDot.png";
  greyDot="/assets/images/GreyDot.png";
  blueDot="/assets/images/BlueDot.png";
  co2Dot="/assets/images/CO2.png";
  coolDot="/assets/images/cooler.png";
  heatDot="/assets/images/heat.png";
  idleDot="/assets/images/idle3.png";
  humidityDot="/assets/images/humidity.png";
  kwmeterDot="/assets/images/kwmeter.png";
  freezerDot="/assets/images/freezer3.png";


  heating="assets/images/heating.png";
  cooling="assets/images/cooling2.png";
  idle="assets/images/idle4.png";

  hvacs:any [] = [
    { name:'K1 RTU', type:'hvac',x:'33vh', y:'80vh',state:"FAN" },
    { name:'D1 RTU', x:'22vh', y:'25vh',type:'hvac',state:"IDLE" },
    { name:'D2 RTU', x:'65vh', y:'4vh',type:'hvac',state:"FAN" },
    { name:'P1 RTU', x:'44vh', y:'2vh',type:'hvac',state:"COOL" }
  ]
  freezers:any [] = [
    { name:'Freezer', type:'hvac',x:'33vh', y:'80vh',state:"COOLING" }
  ]
  coolers:any [] = [
    { name:'Cooler', type:'hvac',x:'98vh', y:'23vh',state:"IDLE" }
  ]
  lights:any [] = [
    { name:'Building Lights', x:'10vh', y:'10vh', type:'light',percentage:80 },
    { name:'Lot Lights', x:'10vh', y:'10vh', type:'light',percentage:0 },
    { name:'Signage', x:'10vh', y:'10vh', type:'light',percentage:40 },
    { name:'Support Lights', x:'10vh', y:'10vh', type:'light',percentage:70 },
    { name:'Dining Lights', x:'10vh', y:'10vh', type:'light',percentage:60 },
    { name:'Kitchen Lights', x:'10vh', y:'10vh', type:'light',percentage:20 }
  ]
  humidities:any [] = [
    { name:'Humidity #1', type:'humidity', x:'98vh', y:'38vh', percentage:15 },
    { name:'Humidity #2', type:'humidity', x:'98vh', y:'38vh', percentage:15 },
    { name:'Humidity #3', type:'humidity', x:'98vh', y:'38vh', percentage:15 },
    { name:'Humidity #4', type:'humidity', x:'98vh', y:'38vh', percentage:15 },
  ]
  co2s:any [] = [
    { name:'Co2 Meter #1', type:'co2', x:'42vh', y:'57vh', ppm:"150" },
    { name:'Co2 Meter #2', type:'co2', x:'42vh', y:'57vh', ppm:"150" },
    { name:'Co2 Meter #3', type:'co2', x:'42vh', y:'57vh', ppm:"150" },
    { name:'Co2 Meter #4', type:'co2', x:'42vh', y:'57vh', ppm:"150" }
  ]
  kwmeters:any [] = [
    { name:'K1 KW', type:'kwmeter',x:'98vh', y:'80vh', power:"25" },
    { name:'D1 KW', type:'kwmeter',x:'98vh', y:'80vh', power:"25" },
    { name:'D2 KW', type:'kwmeter',x:'98vh', y:'80vh', power:"25" },
    { name:'P1 KW', type:'kwmeter',x:'98vh', y:'80vh', power:"25" },
  ]
  amps:any [] = [

  ]
  // controllers:any [] = [
  //     { name:'Dining Room', x:'10vh', y:'10vh', type:'light',percentage:80 },
  //     { name:'Dining Room RTU', x:'22vh', y:'25vh',type:'hvac',state:"IDLE" },
  //     { name:'Grow Room #3',x:'80vh', y:'44vh', type:'lightbank',percentage:30 },
  //     { name:'Porch',x:'4vh', y:'29vh', type:'light',percentage:100 },
  //     { name:'Patio RTU', x:'80vh', y:'80vh',type:'hvac',state:"COOL" },
  //     { name:'Grow Room #4', x:'4vh', y:'50vh',type:'lightbank',percentage:10 },
  //     { name:'Dark Room', x:'15vh', y:'66vh',type:'lightbank',percentage:100 },
  //     { name:'Porch RTU', x:'65vh', y:'4vh',type:'hvac',state:"FAN" },
  //     { name:'Engine Room', x:'56vh', y:'81vh',type:'light',percentage:66 },
  //     { name:'Dance Hall RTU', x:'44vh', y:'2vh',type:'hvac',state:"COOL" },
  //     { name:'Dance Hall', x:'94vh', y:'4vh',type:'light',percentage:0 },
  //     { name:'Torpedo Room RTU', type:'hvac', x:'61vh', y:'61vh',state:"HEAT" },
  //     { name:'Kitchen RTU', type:'hvac',x:'98vh', y:'23vh',state:"HEAT" },
  //     { name:'Torpedo Room', type:'light',x:'98vh', y:'62vh',percentage:40 },
  //     { name:'Grow Room #1', type:'lightbank',x:'70vh', y:'25vh',percentage:60 },
  //     { name:'Basement', type:'light',x:'23vh', y:'44vh',percentage:55 },
  //     { name:'Grow Room #2', type:'lightbank',x:'44vh', y:'23vh',percentage:70 },
  //     { name:'Banquet Room RTU', type:'hvac',x:'33vh', y:'80vh',state:"FAN" },
  //
  //     { name:'Power Meter #1', type:'kwmeter',x:'98vh', y:'80vh', power:"25" },
  //     { name:'Co2 Meter #3', type:'co2', x:'42vh', y:'57vh', ppm:"150" },
  //     { name:'Humidity 15', type:'humidity', x:'98vh', y:'38vh', percentage:15 },
  //
  //     { name:'Smoke Room', type:'lightbank',x:'50vh', y:'40vh',percentage:15 }
  // ]

  constructor(_ds:DataService) {
    self = this;
    this.ds = _ds;
    console.log('app-controller-grid()');

  }

  ngOnInit() {
    console.log('app-controller-grid  ngOnInit()');
  }

  ngAfterViewInit() {
    console.log('app-controller-grid  ngAfterViewInit()');
  }

  getOpacity(controller:any) {
    return controller.percentage/100;
  }

  getHvacIcon() {
    return this.cooling;
  }

  getState(controller:any) {
    let state = "NO_STATE";
    if (controller.state) {
       state = controller.state;
    }
    return state;
  }

  getMapX(controller:any) {
    let xv = ((controller.map_entries[0].pos[0] * 100) / 20).toFixed(2)
    let x = xv+'vh';
    //+'vh'
    console.log('getMapX : '+x);
    return x;
  }

  getMapY(controller:any) {
    let yv = ((controller.map_entries[0].pos[1] * 100) / 20).toFixed(2)
    let y = yv+'vw';
    // let y = (controller.map_entries[0].pos[1] ).toFixed(2)+'vh'
    console.log('getMapY : '+y);
    return y;
  }
  getControllerType(controller) {
      if (controller.type) {
          console.log('getControllerType : '+controller.type);
          return controller.type.toLowerCase();
      }
      console.log('getControllerType : map-icon');
      return "map_icon";
  }
}
