import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { AddListeStagiaireElementsComponent } from './components/add-liste-stagiaire-elements/add-liste-stagiaire-elements.component';
import { MatDialog } from '@angular/material/dialog';
import { EditListeStagiaireElementsComponent } from './components/edit-liste-stagiaire-elements/edit-liste-stagiaire-elements.component';
import { DeleteListeStagiaireElementsComponent } from './components/delete-liste-stagiaire-elements/delete-liste-stagiaire-elements.component';
import { ShowStagiaiareDetailsComponent } from './components/show-stagiaiare-details/show-stagiaiare-details.component';

export interface Stagiaire {
  id: string;
  nomArabe: string;
  prenomArabe: string;
  cin: string;
  dateNaissance: string;
  adresse: string;
  telephone: string;
  mail: string;
}
@Component({
  selector: 'app-liste-stagiaires',
  templateUrl: './liste-stagiaires.component.html',
  styleUrls: ['./liste-stagiaires.component.css'],
})
export class ListeStagiairesComponent {
  isLoading = true;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Stagiaire>;
  getJsonList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sortedData!: Stagiaire;

  displayedColumns: string[] = [
    'prenomArabe',
    'nomArabe',
    'cin',
    'dateNaissance',
    'telephone',
    'adresse',
    'mail',
    'action',
  ];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getListeStagiaires();
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** get data from back-end */
  getListeStagiaires() {
    this.http.get('http://localhost:9000/stagiaire/find_all').subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort;
        this.dataSource.sort = this.sort;

        this.isLoading = false;
      },
      error: console.log,
    });
  }

  
 
  showDetails(row: any){
    let deleteDialogRef = this.dialog.open(ShowStagiaiareDetailsComponent, {
      autoFocus: false,
      data: { 
        // nomArabe:row.nomArabe,
        // prenomArabe: row.prenomArabe,
        // nomFr: row.nomFr,
        // prenomFr: row.prenomFr,
        // matricule: row.matricule,
        // telephone: row.telephone,
        // cin: row.cin,
        // siegeAdministratif: row.siegeAdministratif,
        // administration: row.administration,
        // fonction: row.fonction
      },
    });

  }


  addStage(){
    
      // this.dialog.open(EditDialogElements);
     let ajoutDialogRef = this.dialog.open(AddListeStagiaireElementsComponent, { autoFocus: false,});
     ajoutDialogRef.afterClosed().subscribe((res) => {
        if (res.event === 'add') {
          // refresh
          this.ngOnInit();
        }
      })
  
  }


  openEditDialog(row: any) {
    // this.dialog.open(EditDialogElements);
   let editDialogRef = this.dialog.open(EditListeStagiaireElementsComponent, {
    autoFocus: false,
      data: row
    });
    editDialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'edit') {
        // refresh
        this.ngOnInit();
      }
    })
}
openDeleteDialog(row: any) {
  let deleteDialogRef = this.dialog.open(DeleteListeStagiaireElementsComponent, {
    autoFocus: false,
    data: row
  });
  deleteDialogRef.afterClosed().subscribe(res => {
    if (res.event === 'delete') {
      // refresh
      this.ngOnInit();
    }
    else{
      
    }
  })
}

}
