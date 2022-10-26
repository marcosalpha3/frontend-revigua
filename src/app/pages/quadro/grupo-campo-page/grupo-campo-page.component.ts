import { Component, OnInit } from '@angular/core';
import { GrupoIrmao, IrmaoGrupo } from 'src/app/models/grupoIrmao.model';
import { IrmaoDataService } from 'src/app/services/irmao.data.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GrupoDataService } from 'src/app/services/grupo.data.service';
import { Irmao } from 'src/app/models/irmao.model';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-grupo-campo-page',
  templateUrl: './grupo-campo-page.component.html'
})
export class GrupoCampoPageComponent implements OnInit {
  
  public mode: string = 'list';  
  public form: FormGroup;
  public formDelete: FormGroup;  
  public busy = false;
  public grupos:  GrupoIrmao[];    
  public errors: any[] = [];   
  public irmaos: Irmao[];       
  public user: User;    
  public grupocampo: GrupoIrmao;

  constructor( private serviceIrmao: IrmaoDataService,    
    private serviceBase: ErrorService,    
    private serviceGrupo: GrupoDataService,   
    private fb: FormBuilder,         
    private fbDelete: FormBuilder,             
    private toastr: ToastrService      ) { }

  ngOnInit() {
    this.busy = true; 
    this.grupocampo = new GrupoIrmao();
    this.user = Security.getUser();
    if (this.user.admin)
     this.getIrmaos();    
    this.getGrupos();
    this.configuraFormDelete();
    this.configuraForm();    
  }

  getGrupos(){
    this.serviceIrmao.getGrupoCampo()
      .subscribe( GrupoIrmao => {
       this.grupos =  GrupoIrmao;
       this.busy = false;                 
      },
        fail =>{
          this.busy = false;                    
          this.serviceBase.serviceError(fail);
          this.errors = fail.error.errors;     
        });    
  }

  configuraForm(){
    this.form = this.fb.group({
      codigo: [0, Validators.compose([

      ])],
      nome: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required
      ])],
      dirigenteId: ['', Validators.compose([
        Validators.required
      ])],
      congregacaoId: [0, Validators.compose([

      ])],
      local: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required
      ])]
    });    
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
   
   edit(grupo : GrupoIrmao){
    this.changeMode('edit');
    this.form.patchValue({
      codigo: grupo.codigo,
      nome: grupo.nome,
      dirigenteId: grupo.dirigenteId,
      congregacaoId: this.user.congregationId,
      local: grupo.local
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
    this.form.value.congregacaoId = this.user.congregationId
    this
    .serviceGrupo
    .create(this.form.value)
    .subscribe(
      (data: any) => {
        this.getGrupos();
        this.busy = false;
        this.toastr.success("Grupo de campo cadastrado com sucesso!", 'Cadastro');
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
    .serviceGrupo
    .change(this.form.value)
    .subscribe(
      (data: any) => {
        this.getGrupos();
        this.busy = false;
        this.toastr.success("Grupo de campo alterado com sucesso!", 'Cadastro');
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
  
  delete(id){
    this
    .serviceGrupo
    .delete(id, this.formDelete.value.grupoId)
    .subscribe(
      (data: any) => {
        this.getGrupos();
        this.busy = false;
        this.formDelete.reset();
        this.toastr.success("Grupo de campo removido com sucesso!", 'Cadastro');
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }

   clear() {
    this.form.reset();
  }    

  configuraModelDelete(grupo)
  {
    this.grupocampo = grupo;
    this.configuraFormDelete();
  }

  configuraFormDelete()
  {
    this.formDelete = this.fbDelete.group({
      grupoId: ['', Validators.compose([
        Validators.required
      ])]
    });    
  }
  
  setIrmaos(grupo) {    
    this.grupocampo = grupo;
  }

  FilterGroupToDelete(groups): any[] {  
    return groups.filter(i => i.codigo !== this.grupocampo.codigo);
  }  

  checkIfExistsRegisters(grupo: GrupoIrmao)
  {
    console.log(grupo.irmaos.toString);
    if (grupo.irmaos.length > 0)
    {
      console.log('não é nulo');
      return true;
    }
    else
    {
      console.log('é nulo');
      return false;
    }

  }

  changeMode(mode:string){
    this.mode = mode;
    if (mode != 'list') 
     this.configuraForm();       
     this.errors =  [];
  }

}
