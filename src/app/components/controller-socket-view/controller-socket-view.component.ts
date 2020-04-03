import { Component, OnInit,  Input, ChangeDetectorRef, ViewChildren, ElementRef, QueryList } from '@angular/core';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DndDropEvent } from 'ngx-drag-drop';
import { SocketedViewComponent } from '../socketed-view/socketed-view.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-controller-socket-view',
  templateUrl: './controller-socket-view.component.html',
  styleUrls: ['./controller-socket-view.component.css']
})
export class ControllerSocketViewComponent implements OnInit {

  @Input() parent;
  @Input() controller;
  @ViewChildren('socketItem') items:QueryList<SocketedViewComponent>;

  effectAllowed = "copy";

  constructor(private cdr:ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  socketed(socket) {
    return true;
  }

  socketCount(socket) {
    let count = 0;
    if (socket.item && socket.item.usage) {
      count = socket.item.usage.length;
    }
    return count;
  }


  // dropped(event: CdkDragDrop<string[]>) {
  //   // moveItemInArray(
  //   //    this.items,
  //   //    event.previousIndex,
  //   //    event.currentIndex
  //   //   );
  //   console.log(' dropped : '+event);
  // }

  onDragover(event:DndDropEvent) {
    console.log('onDragover : '+event);
  }

  onDrop(event:DndDropEvent, socket:any) {
    let item:any = event.data;
    console.log('onDrop : '+JSON.stringify(event)+' , socket : '+JSON.stringify(socket));
    this.parent.addSocketItem(this.controller._id.$oid, socket.code,  item._id.$oid );
  }

  ejectSocket(socket:any) {
    this.parent.ejectSocket(this.controller._id.$oid, socket.code );

  }

  trashController(controller:any) {
    console.log('trashController : socket : '+JSON.stringify(controller));
    this.parent.removeController(this.controller._id.$oid)
  }

  loadStatus(controller:any) {
    this.parent.loadStatus(controller)
    // const dialogConfig = new MatDialogConfig();
    // // The user can't close the dialog by clicking outside its body
    // // dialogConfig.disableClose = true;
    // dialogConfig.id = "modal-component";
    // dialogConfig.height = "50vh";
    // dialogConfig.width = "50vw";
    // dialogConfig.data = {name:this.formatName(this.setting.name), value:null}
    // if (this.setting.local){
    //   dialogConfig.data.value = this.setting.local
    // }
    // else{
    //   dialogConfig.data.value = this.setting.val
    // }
    // // https://material.angular.io/components/dialog/overview
    // const modalDialog = this.dialog.open(ModenamekeyboardComponent, dialogConfig);
    // this.auth.pausesubs = true;
    //
    // modalDialog.afterClosed().subscribe(result => {
    //   console.log(result)
    //   if (result){
    //     let path = this.parent.controller.type.toLowerCase()+'.'+this.setting.name.toLowerCase();
    //
    //     if (result.data == this.setting.val){
    //       delete this.setting.local
    //       this.ds.remove_controller_setting(this.parent.controller._id.$oid, path).then((data:any) => {
    //           console.log('set_controller_setting : '+ JSON.stringify(data));
    //           this.auth.resumeSubscriptions()
    //           // this.loadControllerSetting(path);
    //           // this.loadControllerGroupSettings();
    //       }).catch((error) => {
    //           console.log(error);
    //       });
    //     }
    //     else{
    //       this.setting.local = result.data
    //       this.ds.set_controller_setting(this.parent.controller._id.$oid, path, result.data).then((data:any) => {
    //           console.log('set_controller_setting : '+ JSON.stringify(data));
    //           this.auth.resumeSubscriptions()
    //           // this.loadControllerSetting(path);
    //           // this.loadControllerGroupSettings();
    //       }).catch((error) => {
    //           console.log(error);
    //       });
    //
    //     }
    //     // let update = {
    //     //   id:this.controller._id.$oid,
    //     //   path:'hvac.'+this.selectedSetting.name.toLowerCase(),
    //     //   value:this.selectedSetting.val
    //     // };
    //
    //
    //
    //   }
    // });
    console.log('loadSettings : controller : '+JSON.stringify(controller));
  }

  closeController() {
      this.parent.collapseController();
  }

  update(c) {
      this.controller = c;
      this.refresh();
  }

  refresh() {
      let itemList: SocketedViewComponent[] = this.items.toArray();
      console.log('ControllerSocketViewComponent refresh all'+itemList.length);
      for (let item of itemList) {
              item.refresh();
      }
     setTimeout(() => {
       console.log('ControllerSocketViewComponent.refresh()');
       this.cdr.markForCheck();
       this.cdr.detectChanges();
     }, 500);
  }

  refreshItem(code) {
    let itemList: SocketedViewComponent[] = this.items.toArray();
    console.log('ControllerSocketViewComponent.refresh '+code+' , '+itemList.length);
    for (let item of itemList) {
        if (item['code'] == code) {
            item.refresh();
        }
    }
  }

}
