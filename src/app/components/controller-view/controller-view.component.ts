import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-controller-view',
  templateUrl: './controller-view.component.html',
  styleUrls: ['./controller-view.component.scss'],
})
export class ControllerViewComponent implements OnInit {

  @Input('parent') parent:any;
  @Input('controller') controller:any;

  constructor() { }

  ngOnInit() {}

}
