import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found.component';
import { AuthGaurdService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: "full"},
  { path: 'app', loadChildren: () => import('./master/master.module').then(m => m.MasterModule), canActivate:[AuthGaurdService] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),}, 
  { path: '**', component: NotFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
