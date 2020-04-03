import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-searchkeyboard',
  templateUrl: './searchkeyboard.component.html',
  styleUrls: ['./searchkeyboard.component.scss'],
})
export class SearchkeyboardComponent implements OnInit {

  @Input('value') value:any;
  @Input('parent') parent:any;
  @Input('side') side:any;
  @ViewChild('itemInput') itemInput:any;

  simpleKeyboard:Keyboard;
  keyboardControlPad: Keyboard;
  keyboardArrows: Keyboard;
  keyboardNumPad: Keyboard;
  keyboardNumPadEnd: Keyboard;
  capslock = false;

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
    console.log(this.side, this.value, this.parent)
    // this.selectedSchedule = schedule;
    // this.editing = true;
    setTimeout(() => {
      this.simpleKeyboard = new Keyboard("#scheduleKeyboard",
            this.commonKeyboardOptions
      );
      this.commonKeyboardOptions
      // this.value = this.item.name;
      console.log("editSchedule", this.simpleKeyboard);
    }, 100);

  }


  editNameField(event:any) {
    console.log('editing name : ');
    // this.value = this.item.name;
    // this.itemInput.nativeElement.focus();
  }

  onInputChange = (event: any) => {
    console.log(event)
    if (this.side == 'controller'){
      this.parent.controllerQueryTxt = event
      this.parent.onControllerFilterChange(event)

    }
    else{
      this.parent.deviceQueryTxt = event
      this.parent.onDeviceFilterChange(event)


    }

    // this.keyboard.setInput(event.target.value);

  };

  onKeyPress = (button: string) => {

    console.log("onKeyPress pressed", button, this.parent.deviceQueryTxt);
    if (button === "{enter}") {
       this.enterKey();
    }

     if (button === "{backspace}") {
       if (this.side == 'controller'){

         this.simpleKeyboard.setInput(this.parent.controllerQueryTxt);

       }
       else{
         this.simpleKeyboard.setInput(this.parent.deviceQueryTxt);

       }
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

  enterKey() {
    // console.log('enterKey : ',value);
    // this.item.name = value;
    // this.item.nameTouched = true;
    // console.log('enterKey : ',this.parent.deviceQueryTxt);
    // this.parent.updateItem();
    // this.parent.keyboard = false;
    if (this.parent.devkeyboard){
      this.parent.devkeyboard = false;

    }
    else{
      this.parent.conkeyboard = false;
    }
  }

  close() {
    // this.parent.updateItem();
    // this.parent.keyboard = false;
    if (this.parent.devkeyboard){
      this.parent.devkeyboard = false;

    }
    else{
      this.parent.conkeyboard = false;
    }
  }
  //
  // nameSelected() {
  //
  //   if ( this.item ) {
  //       return true;
  //   }
  //   return false;
  // }

}
