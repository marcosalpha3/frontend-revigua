import { Component, OnInit } from '@angular/core';
import { QuadroDataService } from 'src/app/services/quadro.data.service';
import { ErrorService } from 'src/app/services/error.service';
import { QuadroPersonalizado } from 'src/app/models/quadropersonalizado.model';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quadro-page',
  templateUrl: './quadro-page.component.html'
})
export class QuadroPageComponent implements OnInit {
  public busy = false;
  public image ='';
  public quadros:  QuadroPersonalizado[];    
  public errors: any[] = [];      
  public user: User;    
  public timeStamp : any;
  public board: QuadroPersonalizado;

  constructor(
    private serviceQuadro: QuadroDataService,    
    private serviceBase: ErrorService,    
    private toastr: ToastrService                
  ) { }

  ngOnInit() {
    this.getQuadro();
  }

  setQuadro(quadro)
  {
    this.board = quadro;
  }

  getQuadro(){
    this.busy = true; 
    this.user = Security.getUser();
    this.serviceQuadro.getQuadroPersonalizadoAtivo()
      .subscribe( QuadroPersonalizado => {
       this.quadros =  QuadroPersonalizado;
       this.busy = false;                 
      },
        fail =>{
          this.serviceBase.serviceError(fail);
          this.errors = fail.error.errors;     
          this.busy = false;                    
        });
  }

  apagarQuadro(){
    this
    .serviceQuadro
    .apagar(this.board)
    .subscribe(
      (data: any) => {
        this.getQuadro();
        this.busy = false;
        this.toastr.success("Quadro Excluido com sucesso", 'Cadastro');
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }  

  
  setImage(image)
  {
    this.image = image;
    this.timeStamp = (new Date()).getTime();
  }

}
