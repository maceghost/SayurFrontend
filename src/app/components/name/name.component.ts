import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent implements OnInit {

  @Input('item') item:any;
  @Input('parent') parent:any;
  @ViewChild('itemInput') itemInput:any;

  simpleKeyboard:Keyboard;
  keyboardControlPad: Keyboard;
  keyboardArrows: Keyboard;
  keyboardNumPad: Keyboard;
  keyboardNumPadEnd: Keyboard;
  value="";
  capslock = false;
  selectedSchedule:any;
  placeholder = 'Place Holder';

  commonKeyboardOptions = {
      onChange: (input: string) => this.onInputChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true
  };

  constructor(
    public viewCtrl: ModalController,

  ) { }

  ngOnInit() {

    // this.selectedSchedule = schedule;
    // this.editing = true;
    setTimeout(() => {
      this.simpleKeyboard = new Keyboard("#scheduleKeyboard",
            this.commonKeyboardOptions
      );
      this.commonKeyboardOptions
      this.value = this.item.name;
      console.log("editSchedule", this.simpleKeyboard);
    }, 200);

  }


  editNameField(event:any) {
    console.log('editing name : ');
    // this.value = this.item.name;
    // this.itemInput.nativeElement.focus();
  }

  onInputChange = (event: any) => {
    console.log('onInputChange : '+event.target.value);
    this.value = event.target.value;
    // this.keyboard.setInput(event.target.value);

  };

  onKeyPress = (button: string) => {

    console.log("onKeyPress pressed", button, this.value);
    if (button === "{enter}") {
       this.enterKey(this.value);
    }

     if (button === "{backspace}") {
       console.log('backspaced : ',this.value);
       this.simpleKeyboard.setInput(this.value);
     }


    if (button === "{capslock}") {
      this.capslock = !this.capslock;
      if (this.capslock) {
        this.simpleKeyboard.setOptions({
          layoutName: "shift"
        });
      } else {
        this.simpleKeyboard.setOptions({
          layoutName: "default"
        });
      }
    }
    if (button === "{shiftleft}") {
      if ('shift' === this.simpleKeyboard.options.layoutName) {
        this.simpleKeyboard.setOptions({
          layoutName: "default"
        });
      } else {
        this.simpleKeyboard.setOptions({
          layoutName: "shift"
        });
      }
    } else {
      console.log('not shiftleft');
      if ('shift' === this.simpleKeyboard.options.layoutName) {
          console.log('layout already shift');
          if (!this.capslock) {
            console.log('capslock not set');
            this.simpleKeyboard.setOptions({
              layoutName: "default"
            });
          }
      }
    }

    // } || button === "{capslock}") this.handleShift();


  };

  handleShift = () => {
    let currentLayout = this.simpleKeyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.simpleKeyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  enterKey(value) {
    console.log('enterKey : ',value);
    this.item.name = value;
    this.item.nameTouched = true;
    console.log('enterKey : ',this.value);
    this.parent.updateItem();
    this.viewCtrl.dismiss();
  }

  close() {
    this.parent.updateItem();
    this.viewCtrl.dismiss();
  }

  nameSelected() {

    if ( this.item ) {
        return true;
    }
    return false;
  }

}
