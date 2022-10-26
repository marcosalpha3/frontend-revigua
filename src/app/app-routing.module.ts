import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { FramePageComponent } from './pages/master/frame.page';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { AuthService } from './services/auth.service';
import { DesignacoesMecanicasPageComponent } from './pages/quadro/designacoes-mecanicas-page/designacoes-mecanicas-page.component';
import { IrmaoPageComponent } from './pages/quadro/irmao-page/irmao-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChangePasswordPageComponent } from './pages/account/change-password-page/change-password-page.component';
import { QuadroPageComponent } from './pages/quadro/quadro-page/quadro-page.component';
import { InserirQuadroPageComponent } from './pages/quadro/inserir-quadro-page/inserir-quadro-page.component';
import { ModalQuadroPageComponent } from './pages/quadro/modal-quadro-page/modal-quadro-page.component';
import { GrupoCampoPageComponent } from './pages/quadro/grupo-campo-page/grupo-campo-page.component';
import { AssistenciaPageComponent } from './pages/quadro/assistencia-page/assistencia-page.component';
import { EventoPageComponent } from './pages/quadro/evento-page/evento-page.component';
import { GraficoAssistenciaPageComponent } from './pages/quadro/grafico-assistencia-page/grafico-assistencia-page.component';
import { MapasTerritorioPageComponent } from './pages/mapas-territorio-page/mapas-territorio-page.component';
import { ExcecaoDesignacaoPageComponent } from './pages/quadro/excecao-designacao-page/excecao-designacao-page.component';

const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    children: [
      {path: 'designacao', component: DesignacoesMecanicasPageComponent, canActivate: [AuthService]},
      {path: '', component: QuadroPageComponent, canActivate: [AuthService]},      
      {path: 'grupocampo', component: GrupoCampoPageComponent, canActivate: [AuthService]},            
      {path: 'evento', component: EventoPageComponent, canActivate: [AuthService]},                  
      {path: 'excecao', component: ExcecaoDesignacaoPageComponent, canActivate: [AuthService]},                        
      {path: 'assistencia', component: AssistenciaPageComponent, canActivate: [AuthService]},                  
      {path: 'grafico', component: GraficoAssistenciaPageComponent, canActivate: [AuthService]},                        
      {path: 'novoquadro', component: InserirQuadroPageComponent, canActivate: [AuthService]},      
      {path: 'modalquadro', component: ModalQuadroPageComponent, canActivate: [AuthService]},            
      {path: 'irmao', component: IrmaoPageComponent, canActivate: [AuthService]}
      //{path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthService]}      
    ]
  },
  {
    path: 'territorio',
    component: FramePageComponent,
    canActivate: [AuthService],
    children: [
      {path: '', component: MapasTerritorioPageComponent}
    ]
  },
  {
    path: 'account',
    component: FramePageComponent,
    canActivate: [AuthService],
    children: [
      {path: '', component: ProfilePageComponent },
      {path: 'changepassword', component: ChangePasswordPageComponent }      
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'reset-password', component: ResetPasswordPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
