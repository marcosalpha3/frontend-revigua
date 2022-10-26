import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ErrorService } from '../../../services/error.service';
import { QuadroDataService } from '../../../services/quadro.data.service';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-designacoes-mecanicas-page',
  templateUrl: './designacoes-mecanicas-page.component.html'
})
export class DesignacoesMecanicasPageComponent implements OnInit {
  public busy = false;
  public errors: any[] = [];
  public designacoes: any[];
  public user: User;

  constructor(
    private service: DataService,
    private serviceQuadro: QuadroDataService,
    private serviceBase: ErrorService

  ) { }


  ngOnInit() {
    //console.log(this.user.congregationId);
    this.busy = true;
    this.user = Security.getUser();
    this.serviceQuadro.getDesignicacoes()
      .subscribe(any => {
        this.designacoes = any;
        this.busy = false;
      },
        fail => {
          this.serviceBase.serviceError(fail);
          this.errors = fail.error.errors;
          this.busy = false;
        });
  }

}
