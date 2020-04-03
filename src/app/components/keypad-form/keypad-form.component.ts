import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'keypad-form',
  templateUrl: './keypad-form.component.html',
  styleUrls: ['./keypad-form.component.scss']
})
export class KeypadFormComponent implements OnInit {

  numbersTyped:number[]=[];

  @Input('parent') parent:any;

  constructor() { }

  ngOnInit() {
    console.log("KeypadForm ngOnInit ...");
    this.numbersTyped = [];
  }

  ionViewWillEnter() {
    console.log("KeypadForm ionViewWillEnter ...");
    this.numbersTyped = [];
  }

  keypadPress(n:any) {
    console.log('keypadPress : '+n);
    switch (n) {
       case 'C':
          this.numbersTyped = [];
          break;
       case 'E':
          if (this.numbersTyped.length > 0) {
            this.parent.login(this.getPincodeRaw());
          }
          break;
       default:
          this.numbersTyped.push(parseInt(n));
          break;

    }
    if (n == 'Clear') {

    }
  }

  getPincode() {
    let pincode = "";
    if (this.numbersTyped.length > 0) {
        for (let code of this.numbersTyped) {
          if (pincode.length !=  0) {
              pincode = pincode + " ";
          }
          pincode = pincode + "*";
        }
    } else {
      pincode =  "<Enter Pincode>";
    }
    return pincode;
  }

  getPincodeRaw() {
    let pincode = "";
    if (this.numbersTyped.length > 0) {
        for (let code of this.numbersTyped) {
          pincode = pincode + code;
        }
    }
    return pincode;
  }
  public clear() {
     this.numbersTyped.length = 0;
     console.log('clear : '+this.numbersTyped.length);
  }
}
