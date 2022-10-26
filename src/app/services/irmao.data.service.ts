import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security } from '../utils/security.util';
import { Irmao } from '../models/irmao.model';
import { BaseService } from './base.service';
import { GrupoIrmao } from '../models/grupoIrmao.model';

@Injectable()
export class IrmaoDataService extends BaseService {

    constructor(private http: HttpClient
        ) { super() }

 
     create(data) {
        return this.http.post(`${this.UrlServiceV1}/v1/irmao`, data, {headers: this.componeHeaders()})
    }

    change(data) {
        return this.http.put(`${this.UrlServiceV1}/v1/irmao`, data, {headers: this.componeHeaders()})
    }

    changePassword(data) {
        data.email = Security.getUser().email;
        return this.http.put(`${this.UrlServiceV1}/v1/irmao/alterarsenha`, data, {headers: this.componeHeaders()})
    }

    desactivate(id) {
        return this.http.put(`${this.UrlServiceV1}/v1/irmao/${id}/desativar`, null, {headers: this.componeHeaders()})
    }

    reactivate(id) {
        return this.http.put(`${this.UrlServiceV1}/v1/irmao/${id}/reativar`, null, {headers: this.componeHeaders()})
    }

    forgotPassword(login) {
        return this.http.get(`${this.UrlServiceV1}/v1/irmao/esquecersenha/${login}`)
        
    }  

     getIrmaos() {
        return this.http.get<Irmao[]>(`${this.UrlServiceV1}/v1/irmao/congregacao/${Security.getUser().congregationId}`,  {headers: this.componeHeaders()});
    }

    getGrupoCampo() {
        return this.http.get<GrupoIrmao[]>(`${this.UrlServiceV1}/v1/irmao/grupos/congregacao/${Security.getUser().congregationId}`,  {headers: this.componeHeaders()});
    }
}