import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MapPanelComponent } from '../map-panel/map-panel.component'
import { HvacPage } from '../hvac/hvac.page'
// import { MapIconComponent } from '../map-icon/map-icon.component'
// import { NavigationService } from '../navigation.service'
// import { }

@Component({
  selector: 'app-controller-detail',
  templateUrl: './controller-detail.component.html',
  styleUrls: ['./controller-detail.component.css']
})
export class ControllerDetailComponent implements OnInit, AfterViewInit {

  @Input() parent:MapPanelComponent;
  @Input() controller;

  // public ns:NavigationService
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      console.log('ControllerDetail : '+this.controller);
  }

  closeDetail() {
      // this.parent.closeDetail();
      // this.ns.closeDetail();
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
