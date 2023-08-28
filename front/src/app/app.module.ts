import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MasterModule } from './master/master.module';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './components/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { ProvideCinService } from './provide-cin.service';
import { AuthentificationService } from './services/authentification.service';
import { JwtInterceptorInterceptor } from './services/jwt-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    MasterModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    
  ],
  providers: [ProvideCinService, AuthentificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true }
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
