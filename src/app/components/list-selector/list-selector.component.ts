import { Component,ViewEncapsulation, OnInit, ViewChildren,Output, EventEmitter,Input, QueryList, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss'],
})
export class ListSelectorComponent implements OnInit {

  @Input() list: any;
  @Input() view: any;
  @Output() added = new EventEmitter<any>();

  constructor() { }


  ngOnInit() {
    console.log(this.list)
  }

  isOnMap(controller:any){
    if (controller.map_entries){
      for (let i of controller.map_entries){
        if (i.name == this.view){
          return true
        }
      }
    }

    return false
  }

  // add1(controller:any){
  //   this.dialogRef.close({event:'add',data:controller});
  // }

  add(controller:any){
    this.added.emit(controller)
    // this.auth.pausesubs = true;
    // if (!controller.map_entries){
    //   controller.map_entries = []
    //
    // }
    //
    // let pos = [0,0]
    // let newentry = {pos:pos,name:this.view}
    // controller.map_entries.push(newentry)
    //
    //
    // this.ds.update_controller_map_entry(controller._id.$oid, this.view).then((data:any) => {
    //     console.log('set_controller_setting : '+ JSON.stringify(data));
    //     this.auth.resumeSubscriptions()
    //     console.log(controller)
    //
    // }).catch((error) => {
    //     console.log(error);
    // });
    // console.log(controller)
  }


}
