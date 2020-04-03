import { Component,ViewEncapsulation, OnInit, ViewChildren, Input, QueryList, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Keyboard from "simple-keyboard";


@Component({
  selector: 'app-modenamekeyboard',
  templateUrl: './modenamekeyboard.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./modenamekeyboard.component.scss',
"../../../../node_modules/simple-keyboard/build/css/index.css"],
})
export class ModenamekeyboardComponent implements OnInit {
  // @Input('data') data:any;
  placeholder = '';

  @ViewChild('entry') entryInput:ElementRef;
  commonKeyboardOptions = {
      onChange: (input: string) => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true,
      layout: {
        'default': [
          '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . / {shift}',
          '.com @ {space}'
        ],
        'num': [
          '1 2 3',
          '4 5 6',
          '7 8 9',
          '0 {bksp} {enter}'

        ]
      },
      layoutName: 'default'

  };
  // commonKeyboardOptions = {
  //     onChange: (input: string) => this.onChange(input),
  //     onKeyPress: (button: string) => this.onKeyPress(button),
  //     layout: {
  //       default: ["1 2 3 -", "4 5 6 {backspace}", "7 8 9 {enter}", "{left} 0 . {right}"]
  //     },
  //     display: {
  //       "{down}": "▼",
  //       "{backspace}": "Del",
  //     },
  //     // theme: "hg-theme-default hg-layout-numeric numeric-theme",
  //     theme: "simple-keyboard hg-theme-default hg-layout-default",
  //     physicalKeyboardHighlight: true,
  //     syncInstanceInputs: true,
  //     mergeDisplay: true,
  //     debug: true
  // };

  simpleKeyboard:Keyboard;
  keyboardControlPad: Keyboard;
  keyboardArrows: Keyboard;
  keyboardNumPad: Keyboard;
  keyboardNumPadEnd: Keyboard;
  selectedSetting:any;
  selectedIndex:number;
  editing = false;
  value=""
  name="";
  ogvalue = null

  constructor(public dialogRef: MatDialogRef<ModenamekeyboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.dialogRef)
    console.log(this.data)
    this.name = this.data.name
    if (this.data.setting){
      if (this.data.setting.local){
        this.ogvalue = this.data.setting.local
      }
      else{
        this.ogvalue = this.data.setting.val
      }
    }
    this.value = this.ogvalue.toString()


    // if (!this.data.value){
    //   this.value
    //
    // }
    if (Object.prototype.toString.call(this.ogvalue) === "[object String]"){
      this.commonKeyboardOptions.layoutName = 'default'
    }
    else{
      this.commonKeyboardOptions.layoutName = 'num'
    }
    this.simpleKeyboard = new Keyboard('#keyboard',
          this.commonKeyboardOptions
    );
    this.entryInput.nativeElement.focus();
    this.simpleKeyboard.setInput(this.value);
      // console.log("editSetting", this.simpleKeyboard);
  }
  onInputChange = (event: any) => {
    // console.log(event)
    // if (event.data == null){
    //   if (this.value.length > 0 ){
    //     this.value.slice(0, -1)
    //   }
    // }
    // if (event.data){
    //   this.value = this.value + (event.data)
    // }
    this.value = event.target.value
    this.simpleKeyboard.setInput(event.target.value);
    console.log(this.value)
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
    if (button === "{enter}") {
      if (this.value != this.ogvalue && this.value.length > 0) {
        this.dialogRef.close({event:'save',data:this.value});

      }
    }
    // if (button === "{bksp}") {
    //   // console.log('backspaced : ',this.value);
    //   // this.simpleKeyboard.setInput(this.value);
    //   if (this.value && this.value.length > 0) {
    //       this.value = this.value.slice(0, -1);
    //       console.log('backspace updating value : ',this.value);
    //       this.simpleKeyboard.setInput(this.value);
    //       console.log('backspaced : ',this.value);
    //   }
    // }

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };
  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);

  };

}
