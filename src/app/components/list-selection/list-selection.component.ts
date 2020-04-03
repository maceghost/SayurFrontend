import { Component,ViewEncapsulation, OnInit, ViewChildren, Input, QueryList, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  // encapsulation: ViewEncapsulation.None,

  styleUrls: ['./list-selection.component.scss'],
})
export class ListSelectionComponent implements OnInit {

  @Input() list: any;

  constructor(public dialogRef: MatDialogRef<ListSelectionComponent>) { }

  ngOnInit() {
    console.log(this.list)
  }

  // isOnMap(controller:any){
  //   if (controller.map_entries){
  //     for (let i of controller.map_entries){
  //       if (i.name == this.data.view){
  //         return true
  //       }
  //     }
  //   }
  //
  //   return false
  // }

  add(controller:any){
    this.dialogRef.close({event:'add',data:controller});
  }


}
