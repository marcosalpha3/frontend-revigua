import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Security } from '../utils/security.util';
import { Excecao } from '../models/excecao.model';

@Injectable()
export class ExcecaoDesignacaoDataService extends BaseService {

    constructor(private http: HttpClient
        ) { super() }
 
     create(data) {
        return this.http.post(`${this.UrlServiceV1}/v1/excecaodesignacao`, data, {headers: this.componeHeaders()})
    }

    delete(id) {
        return this.http.delete(`${this.UrlServiceV1}/v1/excecaodesignacao/${id}`, {headers: this.componeHeaders()})
    }

    get() {
        return this.http.get<Excecao[]>(`${this.UrlServiceV1}/v1/excecaodesignacao/congregacao/${Security.getUser().congregationId}`,  {headers: this.componeHeaders()});
    }

}