import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { MainComponent } from './components/main/main.component';
import { TestComponent } from './components/test/test.component';
import { AjoutStagiaireComponent } from './ajout-stagiaire/ajout-stagiaire.component';
import { ListeStagiairesComponent } from './liste-stagiaires/liste-stagiaires.component';
import { UpdateStagiaireComponent } from './update-stagiaire/update-stagiaire.component';
import { AjoutStageComponent } from './ajout-stage/ajout-stage.component';
import { LieuxStageComponent } from './lieux-stage/lieux-stage.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ListeStagesComponent } from './liste-stages/liste-stages.component';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'home',
        component: MainComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'ajout-stagiaire',
        component: AjoutStagiaireComponent,
      },
      {
        path: 'liste-stagiaires',
        component: ListeStagiairesComponent,
      },
      {
        path: 'update-stagiaire',
        component: UpdateStagiaireComponent,
      },
      {
        path: 'ajout-stage',
        component: AjoutStageComponent,
      },

      { path: 'lieux-de-stage', component: LieuxStageComponent },
      { path: 'liste-utilisateurs', component: ListeUtilisateursComponent },
      { path: 'liste-stages', component: ListeStagesComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '/app/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
