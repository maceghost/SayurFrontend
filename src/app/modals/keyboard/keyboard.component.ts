import { Component, OnInit, ViewChildren, Input, QueryList, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Keyboard from "simple-keyboard";


@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  // @Input('data') data:any;
  placeholder = '';
  
  @ViewChild('keyboard') keyboardInput:ElementRef;
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

  constructor(public dialogRef: MatDialogRef<KeyboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.dialogRef)
    console.log(this.data)
    this.value = this.data.value
    // if (!this.data.value){
    //   this.value
    //
    // }
    setTimeout(() => {
      this.simpleKeyboard = new Keyboard("#keyboard",
            this.commonKeyboardOptions
      );
      this.keyboardInput.nativeElement.focus();
      this.simpleKeyboard.setInput(this.value);
      console.log("editSetting", this.simpleKeyboard);
    }, 200);
  }
  onInputChange = (event: any) => {
    console.log('onInputChange : '+event.target.value);
    this.value = event.target.value;
    console.log(this.data.value)
    // this.keyboard.setInput(event.target.value);

  };
  close(){
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close({event:'save',data:this.value});


  }
  handleShift = () => {
    // let currentLayout = this.keyboard.options.layoutName;
    // let shiftToggle = currentLayout === "default" ? "shift" : "default";
    //
    // this.keyboard.setOptions({
    //   layoutName: shiftToggle
    // });
  };
  onKeyPress = (button: string) => {
    console.log("onKeyPress pressed", button, this.value);
    // if (button === "{enter}") {
    //    this.enterKey(this.value);
    // }
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

}
