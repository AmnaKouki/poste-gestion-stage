import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Utilisateur } from '../../liste-utilisateurs.component';

@Component({
  selector: 'app-show-user-dialog-elements',
  templateUrl: './show-user-dialog-elements.component.html',
  styleUrls: ['./show-user-dialog-elements.component.css']
})
export class ShowUserDialogElementsComponent {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ShowUserDialogElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Utilisateur,
    private toastService: HotToastService
  ) {
    this.data = data;
  }

  
  displayedColumns: string[] = ['matricule', 'nomPrenom', 'fonction'];


}
