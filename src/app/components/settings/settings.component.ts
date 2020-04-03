import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(
    public ds: DataService,
    public viewCtrl: ModalController,

  ) { }

  ngOnInit() {}

  close() {
    // this.removeKeyboard();
    // this.loadScheduleData();
    this.viewCtrl.dismiss();

  }

}
