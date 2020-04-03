import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { DataService } from '../../providers/data.service';
import { AuthLocalProvider } from '../../providers/authenticate/authlocal';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ModenamekeyboardComponent } from '../../modals/modenamekeyboard/modenamekeyboard.component';

@Component({
  selector: 'app-controller-modes',
  templateUrl: './controller-modes.component.html',
  styleUrls: ['./controller-modes.component.scss'],
})
export class ControllerModesComponent implements OnInit {

  @Input('controller') controller:any;
  editable:boolean = true;

  constructor(
    public viewCtrl: ModalController,
    public ds: DataService,
    public auth: AuthLocalProvider,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  addMode(){
    this.auth.pausesubs = true;

    let newOps:any = {}
    for (let mode of this.controller.modes){
      if (mode.id == 1){
        for (let key of Object.keys(mode)){
          if (key == 'h_sp'){
            newOps.h_sp = mode.h_sp
          }
          if (key == 'c_sp'){
            newOps.c_sp = mode.c_sp
          }
          if (key == 'fan'){
            newOps.fan = mode.fan
          }
          if (key == 'fc_only'){
            newOps.fc_only = mode.fc_only
          }
          if (key == 'setback'){
            newOps.setback = mode.setback
          }
        }

      }
    }
    newOps.name = "New Mode"
    newOps.user = true
    this.ds.create_controller_mode(this.controller._id.$oid, newOps).then((data:any) => {
        console.log('create_controller_mode returns : ',data);

    }).catch((error) => {
        console.log(error);
    });
    newOps.editable = true
    this.controller.modes.unshift(newOps)

    this.auth.resumeSubscriptions()
  }

  close() {
    this.viewCtrl.dismiss();
  }
  public closeModal(){
      this.viewCtrl.dismiss();
  }

  deletemode(mode: any){
    this.auth.pausesubs = true;
    this.ds.remove_controller_mode(this.controller._id.$oid, mode.id).then((data:any) => {
        console.log(': ',data);

    }).catch((error) => {
        console.log(error);
    });

    for (let i in this.controller.modes){
      if (this.controller.modes[i].id == mode.id){
        this.controller.modes.splice(i,i+1)
      }
    }
    this.auth.resumeSubscriptions()




  }


  changename(mode:any){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {name:"Mode Name",value:mode.name}
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.dialog.open(ModenamekeyboardComponent, dialogConfig);
    this.auth.pausesubs = true;


    modalDialog.afterClosed().subscribe(result => {

      if (result){
        mode.name = result.data
        this.ds.set_controller_mode_property(this.controller._id.$oid, mode.id, 'name', mode.name).then((data:any) => {
            console.log('set_controller_schedule returns : ',data);

        }).catch((error) => {
            console.log(error);
        });

      }
    });

  }
  openDialog(name: string) {

  }
  editsp(mode: any){
    this.auth.pausesubs = true;
    mode.editable = false;
    mode.newhsp = mode.h_sp;
    mode.newcsp = mode.c_sp;
    mode.newfan = mode.fan;
    mode.newfc = mode.fc_only
    mode.newset = mode.setback

  }
  exitsp(mode:any){
    mode.editable = true;
    mode.tooclose = false;
    mode.negative = false

    this.auth.resumeSubscriptions()
  }
  savesp(mode:any){

    if (mode.newhsp > mode.newcsp || mode.newcsp - mode.newhsp <2 ){
      mode.tooclose = true

    }
    else if (mode.newhsp < 0 || mode.newcsp < 0 || mode.fan < 0 ){
      mode.negative = true

    }

    else{
      mode.tooclose = false
      mode.negative = false
      // let changes = {h_sp:'',c_sp:'',fan:'',fc_only:'',setback:'', mode:''}
      if (mode.h_sp != mode.newhsp){
        this.ds.set_controller_mode_property(this.controller._id.$oid, mode.id, 'h_sp', mode.newhsp).then((data:any) => {
            console.log('set_controller_schedule returns : ',data);

        }).catch((error) => {
            console.log(error);
        });
      }
      if (mode.c_sp != mode.newcsp){
        this.ds.set_controller_mode_property(this.controller._id.$oid, mode.id, 'c_sp', mode.newcsp).then((data:any) => {
            console.log('set_controller_schedule returns : ',data);

        }).catch((error) => {
            console.log(error);
        });
      }
      if (mode.fan != mode.newfan){
        this.ds.set_controller_mode_property(this.controller._id.$oid, mode.id, 'fan', mode.newfan).then((data:any) => {
            console.log('set_controller_schedule returns : ',data);

        }).catch((error) => {
            console.log(error);
        });
      }
      if (mode.fc_only != mode.newfc){
        this.ds.set_controller_mode_property(this.controller._id.$oid, mode.id, 'fc_only', mode.newfc).then((data:any) => {
            console.log('set_controller_schedule returns : ',data);

        }).catch((error) => {
            console.log(error);
        });
      }
      if (mode.setback != mode.newset){
        this.ds.set_controller_mode_property(this.controller._id.$oid, mode.id, 'setback', mode.newset).then((data:any) => {
            console.log('set_controller_schedule returns : ',data);

        }).catch((error) => {
            console.log(error);
        });
      }
      // changes.h_sp = mode.newhsp
      // changes.c_sp = mode.newcsp
      // if (mode.newfan){
      //   changes.fan = mode.newfan
      //
      // }
      // if (mode.newfc){
      //   changes.fc_only = mode.newfc
      //
      // }
      // if (mode.newset){
      //   changes.setback = mode.newset
      //
      // }
      // changes.mode = mode.id
      // if (changes.h_sp){
      //   this.ds.set_controller_mode_property(this.controller._id.$oid, changes.mode, 'h_sp', changes.h_sp).then((data:any) => {
      //       console.log('set_controller_schedule returns : ',data);
      //
      //   }).catch((error) => {
      //       console.log(error);
      //   });
      // }
      //
      // if (changes.c_sp){
      //   this.ds.set_controller_mode_property(this.controller._id.$oid, changes.mode, 'c_sp', changes.c_sp).then((data:any) => {
      //       console.log('set_controller_schedule returns : ',data);
      //
      //   }).catch((error) => {
      //       console.log(error);
      //   });
      // }
      // if (changes.fan){
      //   this.ds.set_controller_mode_property(this.controller._id.$oid, changes.mode, 'fan', changes.fan).then((data:any) => {
      //       console.log('set_controller_schedule returns : ',data);
      //
      //   }).catch((error) => {
      //       console.log(error);
      //   });
      // }
      //
      // clearTimeout(this.hvac.modetimer);
      // this.auth.unsubscribeController(this.hvac)
      // this.auth.setHvacSetting(changes, this.hvac, this.navParams.data[1])
      // .subscribe(
      //
      //     data => {
      //       this.hvac.modetimer = setTimeout(() =>
      //         {
      //           this.auth.subscribeController(this.navParams.data[1],this.hvac,(this.auth.getUTCTime() - (86400)), this.auth.getUTCTime())
      //
      //           // this.changed = false;
      //
      //         },
      //         5000)
      //
      //     },
      //     error => {console.log(error);}
      // )
      mode.h_sp = mode.newhsp
      mode.c_sp = mode.newcsp
      mode.fan = mode.newfan
      mode.fc_only = mode.newfc
      mode.setback = mode.newset
      mode.editable = true;

    }
    // this.editable = true;
    this.auth.resumeSubscriptions()

  }
  addval(mode: any, field: string){
    if (field == 'heat'){
      mode.newhsp += 1;
    }
    if (field == 'cool'){
      mode.newcsp += 1;
    }
    if (field == 'fan'){
      mode.newfan += 1;
    }

  }
  subval(mode: any, field: string){
    if (field == 'heat'){
      mode.newhsp -= 1;
    }
    if (field == 'cool'){
      mode.newcsp -= 1;
    }
    if (field == 'fan'){
      mode.newfan -= 1;
    }
  }

}
