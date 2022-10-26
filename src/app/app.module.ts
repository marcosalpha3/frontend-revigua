import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { IrmaoPageComponent } from './pages/quadro/irmao-page/irmao-page.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { FramePageComponent } from './pages/master/frame.page';
import { DesignacoesMecanicasPageComponent } from './pages/quadro/designacoes-mecanicas-page/designacoes-mecanicas-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthService } from './services/auth.service';
import { IrmaoDataService } from './services/irmao.data.service';
import { ChangePasswordPageComponent } from './pages/account/change-password-page/change-password-page.component';
import { QuadroDataService } from './services/quadro.data.service';
import { QuadroPageComponent } from './pages/quadro/quadro-page/quadro-page.component';
import { InserirQuadroPageComponent } from './pages/quadro/inserir-quadro-page/inserir-quadro-page.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalQuadroPageComponent } from './pages/quadro/modal-quadro-page/modal-quadro-page.component';
import { GrupoCampoPageComponent } from './pages/quadro/grupo-campo-page/grupo-campo-page.component';
import { GrupoDataService } from './services/grupo.data.service';
import { AssistenciaPageComponent } from './pages/quadro/assistencia-page/assistencia-page.component';
import { AssistenciaDataService } from './services/assistencia.service';
import { EventoDataService } from './services/evento.data.service';
import { EventoPageComponent } from './pages/quadro/evento-page/evento-page.component';

import { MonthlyAssistanceChartComponent } from './components/monthly-assistance-chart/monthly-assistance-chart.component';
import { GraficoAssistenciaPageComponent } from './pages/quadro/grafico-assistencia-page/grafico-assistencia-page.component';
import { MapasTerritorioPageComponent } from './pages/mapas-territorio-page/mapas-territorio-page.component';
import { ExcecaoDesignacaoDataService } from './services/excecaodesignacao.service';
import { ExcecaoDesignacaoPageComponent } from './pages/quadro/excecao-designacao-page/excecao-designacao-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    IrmaoPageComponent,
    FramePageComponent,    
    LoadingComponent, DesignacoesMecanicasPageComponent, ProfilePageComponent, ChangePasswordPageComponent, QuadroPageComponent, InserirQuadroPageComponent, 
    ModalQuadroPageComponent,
    GrupoCampoPageComponent,
    AssistenciaPageComponent,
    EventoPageComponent,
    MonthlyAssistanceChartComponent,
    GraficoAssistenciaPageComponent,
    MapasTerritorioPageComponent,
    ExcecaoDesignacaoPageComponent,

  ],
  imports: [
    BrowserModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    HttpClientModule,   
    BrowserAnimationsModule, // required animations module     
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    IrmaoDataService,
    QuadroDataService,
    AssistenciaDataService,
    GrupoDataService,
    EventoDataService,
    ExcecaoDesignacaoDataService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
