import { OnInit, OnDestroy, AfterViewInit, Component, ViewEncapsulation, Input, ViewChild, ElementRef } from "@angular/core";
import Keyboard from "simple-keyboard";


@Component({
  selector: 'keyboard-form',
  templateUrl: './keyboard-form.component.html',
  styleUrls: ['./keyboard-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KeyboardFormComponent implements OnInit, AfterViewInit, OnDestroy {

  value = "";
  commonKeyboardOptions = {
      onChange: (input: string) => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true
  };
  // keyboard: Keyboard;
  keyboardControlPad: Keyboard;
  keyboardArrows: Keyboard;
  keyboardNumPad: Keyboard;
  keyboardNumPadEnd: Keyboard;




  @Input('parent') parent:any;
  @Input('type') type:string;
  // @Input('keyboard') keyboard:Keyboard;
  keyboard:Keyboard;
  @Input('placeholder') placeholder:string;
  @ViewChild('keyboardDiv') keyboardDiv:ElementRef;

  constructor() { }

  ngOnInit() {
    // console.log("KeyboardForm ngOnInit ",parent);
    console.log("KeyboardForm ngOnInit ");
    this.value = '';
    // this.keyboard = new Keyboard(".simple-keyboard-main",
    //       this.commonKeyboardOptions
    // );
    // this.keyboard = new Keyboard({
    //   onChange: input => this.onChange(input),
    //   onKeyPress: button => this.onKeyPress(button)
    // });
  }

  ngOnDestroy() {
    console.log("KeyboardForm ngOnDestroy ...");
    this.value = '';
    delete this.keyboard;
  }

  ionViewDidLeave() {
    console.log("KeyboardForm ionViewDidLeave ...");
    this.value = '';
    delete this.keyboard;
  }
  ionViewWillLeave() {
    console.log("KeyboardForm ionViewWillLeave ...");
    this.value = '';
    delete this.keyboard;
  }

  ionViewWillEnter() {
    console.log("KeyboardForm ionViewWillEnter ...");
    this.value = '';
    // this.keyboard = new Keyboard({
    //   onChange: input => this.onChange(input),
    //   onKeyPress: button => this.onKeyPress(button)
    // });
    // this.keyboard = new Keyboard(".simple-keyboard-main",
    //       this.commonKeyboardOptions
    // );
  }

  ngAfterViewInit() {
      this.value = '';
      this.keyboard = new Keyboard("#keyboardDiv",
            this.commonKeyboardOptions
      );
      console.log("KeyboardForm ngAfterViewInit - keyboard : ",this.keyboard);

  }

  onChange = (input: string) => {
      // this.parent.onChange(input);
      this.value = input;
      console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
      console.log("Button pressed", button);
      // this.parent.onKeyPress(button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      // if (button === "{shift}" || button === "{lock}") this.handleShift();
      if (button === "{enter}") {
         this.parent.enterKey(this.value);
      }

  };

  onInputChange = (event: any) => {
      this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  destroy() {
    console.log("KeyboardForm destroy");
    this.keyboard.destroy();
    delete this.keyboard;
  }

  public clear() {
     this.value = "";
     if (this.keyboard) {
       this.keyboard.setInput(this.value);
       console.log('clear : '+this.value);
     }
  }

}
