import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-icon-detail',
  templateUrl: './map-icon-detail.component.html',
  styleUrls: ['./map-icon-detail.component.css']
})
export class MapIconDetailComponent implements OnInit {

  @Input() controller;

  constructor() { }

  ngOnInit() {
  }

}
