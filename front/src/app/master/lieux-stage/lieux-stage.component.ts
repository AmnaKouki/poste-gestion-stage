import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {
  MatDialog,
} from '@angular/material/dialog';
import { EditDialogElements } from './components/edit-dialog-elements/edit-dialog-elements.component';
import { DeleteDialogElements } from './components/delete-dialog-elements/delete-dialog-elements.component';
import { AddDialogElements } from './components/add-dialog-elements/add-dialog-elements.component';
import { AuthentificationService } from 'src/app/services/authentification.service';

export interface LieuStage {
  id: string;
  adresse: string;
  adresseFr: string;
  codePostal: string;
  action: string;
}
@Component({
  selector: 'app-lieux-stage',
  templateUrl: './lieux-stage.component.html',
  styleUrls: ['./lieux-stage.component.css'],
})
export class LieuxStageComponent {
  isLoading = true;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<LieuStage>;
  getJsonList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sortedData!: LieuStage;

  displayedColumns: string[] = ['adresse', 'adresseFr', 'codePostal', 'action'];

  constructor(private http: HttpClient, public dialog: MatDialog, public authService: AuthentificationService) {}

  ngOnInit(): void {
    this.getListeDesLieuxDeStage();

  }
  ngOnchange() {
    console.log('main change');
  }

  getListeDesLieuxDeStage() {
    this.http
      .get(environment.BACKEND_URL + '/lieu-de-stage/find-all')
      .subscribe({
        next: (data: any) => {
          this.dataSource = new MatTableDataSource(data.reverse());
          this.isLoading = false;
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort;
          this.dataSource.sort = this.sort;
        },

        error: console.log,
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(row: any) {
    // this.dialog.open(EditDialogElements);
   let editDialogRef = this.dialog.open(EditDialogElements, {
    autoFocus: false,
      data: {
        id: row.id,
        adresse: row.adresse,
        adresseFr: row.adresseFr,
        codePostal: row.codePostal,
      },
    });

    editDialogRef.afterClosed().subscribe(res => {
      if (res.event === 'edit') {
        // refresh
        this.ngOnInit();
      }
    })
  }


  openDeleteDialog(row: any) {
    let deleteDialogRef = this.dialog.open(DeleteDialogElements, {
      autoFocus: false,
      data: {
        id: row.id,
        adresse: row.adresse,
        adresseFr: row.adresseFr,
        codePostal: row.codePostal,
      },
    });

    deleteDialogRef.afterClosed().subscribe(res => {
      if (res.event === 'delete') {
        // refresh
        this.ngOnInit();
      }
    })
  }

  addLieuStage(){
    let addDialogRef = this.dialog.open(AddDialogElements, {
      autoFocus: false,
    })

    addDialogRef.afterClosed().subscribe(res => {
      if (res.event === 'add') {
        // refresh
        this.ngOnInit();
      }
    })

    
  }
}


