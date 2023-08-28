import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HotToastService } from "@ngneat/hot-toast";
import { environment } from "src/environments/environment";
import { LieuStage } from "../../lieux-stage.component";
import { EditDialogElements } from "../edit-dialog-elements/edit-dialog-elements.component";

@Component({
    selector: 'DeleteDialogElements',
    templateUrl: 'DeleteDialogElements.html',
    styleUrls: ['./delete-dialog-elements.component.css'],
   
  })
  export class DeleteDialogElements {
    // id !:string;
  
    constructor(
      private http: HttpClient,
      public dialogRef: MatDialogRef<DeleteDialogElements>,
      @Inject(MAT_DIALOG_DATA) public data: LieuStage,
      private toastService: HotToastService
    ) {
      this.data = data;
      console.log(this.data.adresse);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    ngOnchange() {
    }
    deleteLieuStage() {
      console.log(this.data.adresse);
  
      this.http
        .delete(`${environment.BACKEND_URL}/lieu-de-stage/delete/` + this.data.id)
        .subscribe(
          (data) => {
            this.toastService.success('تم الحذف بنجاح ');
            this.dialogRef.close({
              event: 'delete'
            });
            
            this.ngOnchange();
          },
          (err) => {
            console.warn(err);
            this.toastService.error('لقد حدث خطأ ما ');
          }
        );
    }
  }
  