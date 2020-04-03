import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-controller-mode',
  templateUrl: './controller-mode.component.html',
  styleUrls: ['./controller-mode.component.scss'],
})
export class ControllerModeComponent implements OnInit {


    @Input('mode-data') data;

    h_sp: 68;
    c_sp: 72;
    fan: 15;
    fc_only: false;
    setback: false;
    order: 1;
    id : 1;

    constructor() { }

    ngOnInit() {
    }

    toggleSetback(data) {
       this.data.setback = !this.data.setback;
    }

    toggleFreeCool(data) {
       this.data.fc_only = !this.data.fc_only;
    }

}
