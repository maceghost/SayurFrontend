import { Component, OnInit, ViewChildren, Input, QueryList, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { DataService } from '../../providers/data.service';
import { ControllerSettingsItemComponent } from '../controller-settings-item/controller-settings-item.component';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-controller-settings',
  templateUrl: './controller-settings.component.html',
  styleUrls: ['./controller-settings.component.scss'],
})
export class ControllerSettingsComponent implements OnInit {

  @Input('controller') controller:any;
  @ViewChild('settingInput') settingInput:ElementRef;
  @ViewChildren(ControllerSettingsItemComponent) private settingsItems: QueryList<ControllerSettingsItemComponent>;

  settings:any [];
  dirty = false;
  commonKeyboardOptions = {
      onChange: (input: string) => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      layout: {
        default: ["1 2 3 -", "4 5 6 {backspace}", "7 8 9 {enter}", "{left} 0 . {right}"]
      },
      display: {
        "{down}": "▼",
        "{backspace}": "Del",
      },
      // theme: "hg-theme-default hg-layout-numeric numeric-theme",
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true
  };

  simpleKeyboard:Keyboard;
  keyboardControlPad: Keyboard;
  keyboardArrows: Keyboard;
  keyboardNumPad: Keyboard;
  keyboardNumPadEnd: Keyboard;
  selectedSetting:any;
  selectedIndex:number;
  editing = false;
  value="";

  constructor(
    public ds: DataService,
    public viewCtrl: ModalController

  ) {
  }

  ngOnInit() {
    // console.log('ControllerSettingsComponent() controller : ',this.controller);
    this.loadControllerGroupSettings();
    console.log('how many times')
  }

  loadControllerGroupSettings() {
    console.log(this.controller.type)
    this.ds.get_controller_settings_group(this.controller._id.$oid,this.controller.type).then((data:any) => {
        // console.log('get_controller_settings_group : ',data.length);
        this.controller.settings = data;
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

  loadControllerSetting(path) {
    this.ds.get_controller_setting(this.controller._id.$oid,'hvac.'+path).then((data:any) => {
        console.log('get_controller_setting : '+ JSON.stringify(data));
        if (this.controller.settings && this.controller.settings.hvac) {
          let hvacSettings = this.controller.settings.hvac;
          console.log('updating with controller setting : ',hvacSettings);
          hvacSettings[path] = data;
          this.settings[path] = data;
        }
    }).catch((error) => {
        console.log(error);
    });
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
    // if (this.editIndex) {
    //   switch (this.editIndex) {
    //     case -1:
    //       this.selectedSchedule.name = input;
    //       break;
    //     default:
    //       this.updateScheduleItem(input);
    //
    //
    //   }
    // }
  };

  onKeyPress = (button: string) => {
    console.log("onKeyPress pressed", button, this.value);
    if (button === "{enter}") {
       this.enterKey(this.value);
    }
    if (button === "{backspace}") {
      console.log('backspaced : ',this.value);
      this.simpleKeyboard.setInput(this.value);
      // if (this.value && this.value.length > 0) {
          // this.value = this.value.slice(0, -1);
          // console.log('backspace updating value : ',this.value);
          // this.simpleKeyboard.setInput(this.value);
          // console.log('backspaced : ',this.value);
      // }
    }

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    console.log('onInputChange : '+event.target.value);
    this.value = event.target.value;
    // this.keyboard.setInput(event.target.value);

  };

  handleShift = () => {
    // let currentLayout = this.keyboard.options.layoutName;
    // let shiftToggle = currentLayout === "default" ? "shift" : "default";
    //
    // this.keyboard.setOptions({
    //   layoutName: shiftToggle
    // });
  };

  enterKey(value) {
    console.log('enterKey : ',value);
    this.selectedSetting.val = value;
    this.selectedSetting.touched = true;
    let settingItem:ControllerSettingsItemComponent = this.getSettingForIndex(this.selectedIndex);
    if (settingItem) {
      settingItem.update(value);
    }
  }

  getSettingForIndex(idx) {
    let setting;
    let settings:any [] = this.settingsItems.toArray();
    for (let i=0; i < settings.length; i++) {
       let item = settings[i];
       if (item.idx == idx) {
         setting = item;
         break;
       }
    }
    return setting;
  }

  editSetting(item:any, idx:number) {

    // let setting = this.getSettingForIndex(idx);
    let setting = this.settings[idx];
    if (setting) {
      this.selectedSetting = setting;
      this.selectedIndex = idx;
      this.value = item.val;
      setTimeout(() => {
        this.simpleKeyboard = new Keyboard("#settingKeyboard",
              this.commonKeyboardOptions
        );
        this.settingInput.nativeElement.focus();
        this.simpleKeyboard.setInput(item.val);
        console.log("editSetting", this.simpleKeyboard);
      }, 200);
    }

  }

  saveSetting() {
    if (this.selectedSetting) {
      let val = this.selectedSetting.val;
      // let update = {
      //   id:this.controller._id.$oid,
      //   path:'hvac.'+this.selectedSetting.name.toLowerCase(),
      //   value:this.selectedSetting.val
      // };
      this.selectedSetting.local = val;
      let path = this.selectedSetting.name.toLowerCase();
      this.ds.set_controller_setting(this.controller._id.$oid, 'hvac.'+path, Number(val)).then((data:any) => {
          console.log('set_controller_setting : '+ JSON.stringify(data));
          // this.loadControllerSetting(path);
          // this.loadControllerGroupSettings();
      }).catch((error) => {
          console.log(error);
      });

      delete this.selectedSetting;
      this.removeKeyboard();

    }
  }

  updateWithControllerSettings() {
    if (this.controller.settings) {
      let hvacSettings = this.controller.settings.hvac;
      if (!hvacSettings) {
        let hvacSettings = this.controller.settings;
      }
      if (hvacSettings) {
        // let hvacSettings = this.controller.settings.hvac;
        console.log('updating with controller setting : ',hvacSettings);
        let keys:any [] = this.propertyKeys(hvacSettings);
        keys.forEach((key) => {
          let path = key.toLowerCase();
          // this.loadControllerSetting(key);
          this.ds.get_controller_setting(this.controller._id.$oid,'hvac.'+path).then((data:any) => {
              // console.log('get_controller_setting : '+ JSON.stringify(data));
              hvacSettings[path] = data;
              this.settings[path].local = data;
              console.log('new controller_setting : '+ JSON.stringify(this.settings[path]));
          }).catch((error) => {
              console.log(error);
          });
        });
      }
    }
  }

  removeKeyboard() {
    if (this.simpleKeyboard) {
      this.simpleKeyboard.destroy();
      delete this.simpleKeyboard;
    }
  }

  closeSelected() {
    delete this.selectedSetting;
    this.removeKeyboard();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  propertyKeys(data): any[] {
    var keys = Object.getOwnPropertyNames(data).sort();
    return keys;
  }

}
