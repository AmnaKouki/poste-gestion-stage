import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';


import { MasterRoutingModule } from './master-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { TestComponent } from './components/test/test.component';
import { AjoutStagiaireComponent } from './ajout-stagiaire/ajout-stagiaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ListeStagiairesComponent } from './liste-stagiaires/liste-stagiaires.component';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateStagiaireComponent } from './update-stagiaire/update-stagiaire.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AjoutStageComponent } from './ajout-stage/ajout-stage.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TopWidgetComponent } from './components/top-widget/top-widget.component';
import { LieuxStageComponent } from './lieux-stage/lieux-stage.component';
import { AddDialogElements } from './lieux-stage/components/add-dialog-elements/add-dialog-elements.component';
import { EditDialogElements } from './lieux-stage/components/edit-dialog-elements/edit-dialog-elements.component';
import { DeleteDialogElements } from './lieux-stage/components/delete-dialog-elements/delete-dialog-elements.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';

import { EditUserDialogElements } from './liste-utilisateurs/components/edit-user-dialog-elements/edit-user-dialog-elements.component';
import { ShowUserDialogElementsComponent } from './liste-utilisateurs/components/show-user-dialog-elements/show-user-dialog-elements.component';
import { DeleteUserDialogElements } from './liste-utilisateurs/components/delete-user-dialog-elements/delete-user-dialog-elements.component';
import { MatChipsModule } from '@angular/material/chips';
import { AddUserDialogElements } from './liste-utilisateurs/components/add-user-dialog-elements/add-user-dialog-elements.component';
import { ListeStagesComponent } from './liste-stages/liste-stages.component';
import { DeleteStageElementsComponent } from './liste-stages/components/delete-stage-elements/delete-stage-elements.component';
import { EditStageElementsComponent } from './liste-stages/components/edit-stage-elements/edit-stage-elements.component';
import { ShowStageComponent } from './liste-stages/components/show-stage/show-stage.component';
import { AddStageElementsComponent } from './liste-stages/components/add-stage-elements/add-stage-elements.component';
import { EditListeStagiaireElementsComponent } from './liste-stagiaires/components/edit-liste-stagiaire-elements/edit-liste-stagiaire-elements.component';
import { DeleteListeStagiaireElementsComponent } from './liste-stagiaires/components/delete-liste-stagiaire-elements/delete-liste-stagiaire-elements.component';
import { AddListeStagiaireElementsComponent } from './liste-stagiaires/components/add-liste-stagiaire-elements/add-liste-stagiaire-elements.component';
import { ShowStagiaiareDetailsComponent } from './liste-stagiaires/components/show-stagiaiare-details/show-stagiaiare-details.component';





@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    SideNavComponent,
    TopWidgetComponent,
    MasterLayoutComponent,

    TestComponent,
    AjoutStagiaireComponent,
    ListeStagiairesComponent,
    UpdateStagiaireComponent,
    AjoutStageComponent,

    AdminLayoutComponent,
    LieuxStageComponent,
    AddDialogElements,
    EditDialogElements,
    DeleteDialogElements,
    ListeUtilisateursComponent,

    EditUserDialogElements,
    DeleteUserDialogElements,
    ShowUserDialogElementsComponent,
    AddUserDialogElements,
    ListeStagesComponent,
    DeleteStageElementsComponent,
    EditStageElementsComponent,
    ShowStageComponent,
    AddStageElementsComponent,
    EditListeStagiaireElementsComponent,
    DeleteListeStagiaireElementsComponent,
    AddListeStagiaireElementsComponent,
    ShowStagiaiareDetailsComponent,

  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    QRCodeModule,
    MatChipsModule,
    
    
  ],
  exports: [
    
    HeaderComponent,
    MainComponent,
    SideNavComponent,

    TopWidgetComponent,
    MasterLayoutComponent,
    TestComponent,
    AjoutStagiaireComponent,
    ListeStagiairesComponent,
    UpdateStagiaireComponent,
    AjoutStageComponent,
    

    AdminLayoutComponent,
    LieuxStageComponent,
    AddDialogElements,
    EditDialogElements,
    DeleteDialogElements,
    ListeUtilisateursComponent,
    
    EditUserDialogElements,
    DeleteUserDialogElements,
    ShowUserDialogElementsComponent,
    AddUserDialogElements,
    ListeStagesComponent,
    ShowStageComponent,
    DeleteStageElementsComponent,
    EditStageElementsComponent,
    AddStageElementsComponent,
    EditListeStagiaireElementsComponent,
    DeleteListeStagiaireElementsComponent,
    AddListeStagiaireElementsComponent,
    ShowStagiaiareDetailsComponent,
    
    
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],

  bootstrap: [AjoutStageComponent],
})
export class MasterModule {
 
}
