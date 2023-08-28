import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { AddDialogElements } from '../lieux-stage/components/add-dialog-elements/add-dialog-elements.component';
import { DeleteDialogElements } from '../lieux-stage/components/delete-dialog-elements/delete-dialog-elements.component';

import { ShowUserDialogElementsComponent } from './components/show-user-dialog-elements/show-user-dialog-elements.component';
import { EditUserDialogElements,  } from './components/edit-user-dialog-elements/edit-user-dialog-elements.component';
import { DeleteUserDialogElements } from './components/delete-user-dialog-elements/delete-user-dialog-elements.component';
import { AddUserDialogElements } from './components/add-user-dialog-elements/add-user-dialog-elements.component';

export interface Utilisateur {
  nomArabe: string;
  prenomArabe: string;
  nomFr: string;
  prenomFr: string;
  matricule: string;
  telephone: string;
  cin: string;
  siegeAdministratif: string;
  administration: string;
  fonction: string;
  photopath: string;

  action: string;
}
@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css'],
})
export class ListeUtilisateursComponent {
  isLoading = true;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Utilisateur>;
  getJsonList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sortedData!: Utilisateur;

  displayedColumns: string[] = ['matricule', 'nomPrenom', 'fonction','siegeAdministratif', 'action'];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getListeDesUtilisateurs();
  }
  ngOnchange() {
  }

  getListeDesUtilisateurs() {
    this.http
      .get(environment.BACKEND_URL + '/user/find_all')
      .subscribe({
        next: (data: any) => {
          console.log(data);
          
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

  showDetails(row: any){
    let deleteDialogRef = this.dialog.open(ShowUserDialogElementsComponent, {
      autoFocus: false,
      data: { 
        nomArabe:row.nomArabe,
        prenomArabe: row.prenomArabe,
        nomFr: row.nomFr,
        prenomFr: row.prenomFr,
        matricule: row.matricule,
        telephone: row.telephone,
        cin: row.cin,
        siegeAdministratif: row.siegeAdministratif,
        administration: row.administration,
        fonction: row.fonction
      },
    });

  }


  openEditDialog(row: any) {

    console.log(row.roles[0].name,);
    
    
    let editDialogRef = this.dialog.open(EditUserDialogElements, {
      autoFocus: false,
      data: { 
        
        nomArabe:row.nomArabe,
        prenomArabe: row.prenomArabe,
        nomFr: row.nomFr,
        prenomFr: row.prenomFr,
        matricule: row.matricule,
        telephone: row.telephone,
        cin: row.cin,
        siegeAdministratif: row.siegeAdministratif,
        administration: row.administration,
        fonction: row.fonction,
        role: row.roles[0].name,
      },
    });

      editDialogRef.afterClosed().subscribe(res => {
        if (res.event === 'edit') {
          // refresh
          this.ngOnInit();
        }
        this.ngOnInit();
      })
      this.ngOnInit();

    // }
    // (err)=>{
    //   this.ngOnInit();
    // }
    
    // );
    //  this.ngOnInit();
  }

  openDeleteDialog(row: any) {
    console.log(row.matricule);
    
    let deleteDialogRef = this.dialog.open(DeleteUserDialogElements, {
       autoFocus: false,
      data: {
        id: row.id,
       matricule: row.matricule,
      },
    });

    deleteDialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'delete') {
        // refresh
        this.ngOnInit();
      }
    });
  }

  addUser() {
    let addDialogRef = this.dialog.open(AddUserDialogElements, { autoFocus: false,});

    addDialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'add') {
        // refresh
        this.ngOnInit();
      }
    });
  }
}
