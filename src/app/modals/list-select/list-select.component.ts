import { Component,ViewEncapsulation, OnInit, ViewChildren, Input, QueryList, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./list-select.component.scss'],
})
export class ListSelectComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ListSelectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.list)
  }

  isOnMap(controller:any){
    if (controller.map_entries){
      for (let i of controller.map_entries){
        if (i.name == this.data.view){
          return true
        }
      }
    }

    return false
  }

  add(controller:any){
    this.dialogRef.close({event:'add',data:controller});
  }


}
