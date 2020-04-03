import { Component, OnInit, Input } from '@angular/core';
import Keyboard from "simple-keyboard";
import { DataService } from '../../providers/data.service';
import { AuthLocalProvider } from '../../providers/authenticate/authlocal';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ModenamekeyboardComponent } from '../../modals/modenamekeyboard/modenamekeyboard.component';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
// import { KeyboardComponent } from '../../modals/keyboard/keyboard.component';

@Component({
  selector: 'app-controller-settings-item',
  templateUrl: './controller-settings-item.component.html',
  styleUrls: ['./controller-settings-item.component.scss'],
})
export class ControllerSettingsItemComponent implements OnInit {

  @Input('parent') parent:any;
  @Input('setting') setting:any;
  @Input('index') idx:number;
  touched = false;
  editing = false;

  constructor(
    public ds: DataService,
    public auth: AuthLocalProvider,
    public dialog: MatDialog



  ) { }

  ngOnInit(
  ) {
    // console.log(this.parent)
    // console.log(this.setting)
  }

  formatName(name:string) {
    let n = name.replace(/_/g," ").toUpperCase();
    return n;
  }

  // editSetting() {
  //   this.editing = true;
  //   this.parent.editSetting(this.setting, this.idx);
  // }
  editSetting() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";

    dialogConfig.data = {name:this.formatName(this.setting.name), value:null}
    dialogConfig.data.setting = this.setting

    const modalDialog = this.dialog.open(ModenamekeyboardComponent, dialogConfig);
    this.auth.pausesubs = true;

    modalDialog.afterClosed().subscribe(result => {
      console.log(result)
      if (result){
        let path = this.parent.controller.type.toLowerCase()+'.'+this.setting.name.toLowerCase();

        if (result.data == this.setting.val){
          delete this.setting.local
          this.ds.remove_controller_setting(this.parent.controller._id.$oid, path).then((data:any) => {
              console.log('set_controller_setting : '+ JSON.stringify(data));
              this.auth.resumeSubscriptions()
              // this.loadControllerSetting(path);
              // this.loadControllerGroupSettings();
          }).catch((error) => {
              console.log(error);
          });
        }
        else{
          this.setting.local = result.data
          this.ds.set_controller_setting(this.parent.controller._id.$oid, path, result.data).then((data:any) => {
              console.log('set_controller_setting : '+ JSON.stringify(data));
              this.auth.resumeSubscriptions()
              // this.loadControllerSetting(path);
              // this.loadControllerGroupSettings();
          }).catch((error) => {
              console.log(error);
          });

        }
        // let update = {
        //   id:this.controller._id.$oid,
        //   path:'hvac.'+this.selectedSetting.name.toLowerCase(),
        //   value:this.selectedSetting.val
        // };



      }
    });
  }


  revertSetting() {

    this.auth.pausesubs = true;


    let path = this.parent.controller.type.toLowerCase()+'.'+this.setting.name.toLowerCase();
    delete this.setting.local

    this.ds.remove_controller_setting(this.parent.controller._id.$oid, path).then((data:any) => {
        console.log('set_controller_setting : '+ JSON.stringify(data));
        this.auth.resumeSubscriptions()
        // this.loadControllerSetting(path);
        // this.loadControllerGroupSettings();
    }).catch((error) => {
        console.log(error);
    });


  }

  update(val) {
    this.setting.val = val;
    this.touched = true;
  }

  closeEdit() {
    this.editing = false;
  }

  getValue() {
    // console.log('yeah?')
    let toReturn = null;
    if (this.setting.local) {
      toReturn = this.setting.local;
    }
    else{
      toReturn = this.setting.val;

    }
    if (Object.prototype.toString.call(toReturn) === "[object String]"){
      return toReturn.toUpperCase()
    }
    else{
      return toReturn
    }
  }

}
