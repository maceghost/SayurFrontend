import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../providers/data.service';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-provision',
  templateUrl: './provision.page.html',
  styleUrls: ['./provision.page.scss'],
})
export class ProvisionPage implements OnInit {


  @ViewChild('nameInput') nameInput:ElementRef;

  username: string;
  password: string;
  remember: boolean = false;
  // registerCredentials = { username: '', password: '' };
  valueSet = false;
  value = "";
  // keyboard: Keyboard;
  entry_method = 1;
  type = "password";
  placeholder = 'Enter Site Name';
  active = true;
  capslock = false;

  commonKeyboardOptions = {
      onChange: (input: string) => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
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

  constructor(private ds:DataService) { }

  ngOnInit() {
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    // if (button === "{shift}" || button === "{lock}") this.handleShift();

    if (button === "{lock}") {
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
    if (button === "{shift}") {
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
      console.log('not shift');
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

    if (button === "{enter}") {
       this.valueSet = true;
       this.removeKeyboard();
       // this.register(this.value);
    }

  };

  handleShift = () => {
    // let currentLayout = this.keyboard.options.layoutName;
    // let shiftToggle = currentLayout === "default" ? "shift" : "default";
    //
    // this.keyboard.setOptions({
    //   layoutName: shiftToggle
    // });
  };

  inputFocus() {
    if (!this.simpleKeyboard) {
        setTimeout(() => {
          this.simpleKeyboard = new Keyboard("#keyboardDiv",
                this.commonKeyboardOptions
          );
          // this.nameInput.nativeElement.focus();
          // this.simpleKeyboard.setInput(item.val);
          console.log("editSetting", this.simpleKeyboard);
        }, 200);
    }
  }

  inputFocusOut() {

  }

  startKeyboard() {

  }

  register() {
    console.log('register...');
    this.ds.unity_setup(this.value).then(result => {
          console.log('register', result);
    })
    .catch(err => {
      console.log('register error : ',err);
    });
  }

  reRegister(name) {
  }

  removeKeyboard() {
    if (this.simpleKeyboard) {
      this.simpleKeyboard.destroy();
      delete this.simpleKeyboard;
    }
  }

}
