import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { Congregacao } from 'src/app/models/congregacao.model';
import { Grupo } from 'src/app/models/grupo.model';
import { Irmao } from 'src/app/models/irmao.model';
import { ErrorService } from 'src/app/services/error.service';
import { IrmaoDataService } from 'src/app/services/irmao.data.service';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { QuadroDataService } from 'src/app/services/quadro.data.service';

@Component({
  selector: 'app-irmao-page',
  templateUrl: './irmao-page.component.html'
})
export class IrmaoPageComponent implements OnInit {
  public mode: string = 'list';  
  public form: FormGroup;
  public busy = false;
  public errors: any[] = [];  
  public congregacoes: Congregacao[];
  public irmaos: Irmao[];  
  public grupos: Grupo[];
  public user: User;    

  constructor(
    private service: DataService,
    private serviceIrmao: IrmaoDataService,    
    private serviceBase: ErrorService,    
    private serviceQuadro: QuadroDataService,        
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService            
  ) { 
  }

  configuraForm(){
    this.form = this.fb.group({
      codigo: [0, Validators.compose([

      ])],
      nome: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      telefone: ['', Validators.compose([
        Validators.maxLength(50)
      ])],
      sexo: ['', Validators.compose([
        Validators.required
      ])],
      grupoId: ['', Validators.compose([
        Validators.required
      ])],
      congregacaoId: ['', Validators.compose([
        Validators.required
      ])],
      leitorsentinela: [false, Validators.compose([

      ])],
      leitorestudolivro: [false, Validators.compose([

      ])],
      indicador: [false, Validators.compose([

      ])],
      oracaofinal: [false, Validators.compose([

      ])],
      microfonista: [false, Validators.compose([

      ])],
      sistemasonoro: [false, Validators.compose([

      ])],
      presidenteconferencia: [false, Validators.compose([

      ])],
      carrinho: [false, Validators.compose([

      ])],
      
      acessoadmin: [false, Validators.compose([

      ])],
      
      subirQuadro: [false, Validators.compose([

      ])],
      
      atualizarAssistencia: [false, Validators.compose([

      ])]      
      
      
      
    });    
  }

  ngOnInit() {
        this.getIrmaos();
        this.user = Security.getUser();        
        this.service.getCongregacoes()
        .subscribe(congregacoes => {
        this.congregacoes = congregacoes;
        this.busy = false;                  
        },
          fail =>{
            this.serviceBase.serviceError(fail);
            this.errors = fail.error.errors;     
            this.busy = false;                      
          });
  }

 regenerateBoardList()
 {
  this.busy = true;
  this
  .serviceQuadro
  .regerarQuadro()
  .subscribe(
    (data: any) => {
      this.busy = false;
      this.toastr.success("Quadro de designações mecânicas atualizado com sucesso!", 'Cadastro');
    },
    fail =>{
      this.serviceBase.serviceError(fail);
      this.errors = fail.error.errors;     
      this.busy = false;          
    }
  );    

 }

 getIrmaos(){
  this.busy = true; 
  this.serviceIrmao.getIrmaos()
  .subscribe(irmaos => {
    this.irmaos = irmaos;    
  },
    fail =>{
      this.serviceBase.serviceError(fail);
      this.errors = fail.error.errors;     
    });
 }

  clear() {
    this.form.reset();
  }  

  edit(irmao : Irmao){
    this.changeMode('edit');
    this.getGrupos(irmao.congregacaoId);
    this.form.patchValue({
      codigo: irmao.codigo,
      nome: irmao.nome,
      email: irmao.email,
      telefone: irmao.telefone,
      sexo: irmao.sexo,
      congregacaoId: irmao.congregacaoId,
      grupoId: irmao.grupoId,
      leitorsentinela: irmao.leitorSentinela,
      leitorestudolivro: irmao.leitorEstudoLivro,
      indicador: irmao.indicador,
      oracaofinal: irmao.oracaoFinal,
      microfonista: irmao.microfonista,
      sistemasonoro: irmao.sistemaSonoro,
      presidenteconferencia: irmao.presidenteConferencia,
      carrinho: irmao.carrinho,
      acessoadmin: irmao.acessoAdmin,
      subirQuadro: irmao.subirQuadro,
      atualizarAssistencia: irmao.atualizarAssistencia
    });
  }

  getGrupos(congregacao){
    this.busy = true; 
    this.service.getGrupos(congregacao)
      .subscribe(
        grupos => { 
          this.grupos = grupos;
          this.busy = false;                              
        },
        fail =>{
          this.busy = false;                    
          this.serviceBase.serviceError(fail);
          this.errors = fail.error.errors;               
        });
  }

  submit(){
    this.busy = true;
    if (this.mode == 'add')
     this.new();
    else
     this.change();
  }

  new(){
    this
    .serviceIrmao
    .create(this.form.value)
    .subscribe(
      (data: any) => {
        this.getIrmaos();
        this.busy = false;
        this.toastr.success("Irmão cadastrado com sucesso!", 'Cadastro');
        this.form.reset();
        this.mode='list';          
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }

  change(){
    this
    .serviceIrmao
    .change(this.form.value)
    .subscribe(
      (data: any) => {
        this.getIrmaos();
        this.busy = false;
        this.toastr.success("Irmão alterado com sucesso!", 'Cadastro');
        this.form.reset();
        this.mode='list';          
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }

  desactivate(id){
    this
    .serviceIrmao
    .desactivate(id)
    .subscribe(
      (data: any) => {
        this.getIrmaos();
        this.busy = false;
        this.toastr.success("Irmão desativado com sucesso!", 'Cadastro');
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }

  activate(id){
    this
    .serviceIrmao
    .reactivate(id)
    .subscribe(
      (data: any) => {
        this.getIrmaos();
        this.busy = false;
        this.toastr.success("Irmão reativado com sucesso!", 'Cadastro');
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }

  changeMode(mode:string){
    this.mode = mode;
    if (mode != 'list') 
     this.configuraForm();       
     this.errors =  [];
  }


}
