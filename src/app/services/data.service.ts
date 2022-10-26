import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security } from '../utils/security.util';
import { Congregacao } from '../models/congregacao.model';
import { Grupo } from '../models/grupo.model';
import { Irmao } from '../models/irmao.model';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class DataService extends BaseService {

    constructor(private http: HttpClient
        ) { super() }


    authenticate(data) {
        const body = `grant_type=${'password'}&username=${data.username}&password=${data.password}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(`${this.UrlServiceV1}/security/token`, body, {headers: headers});
    }

    getCongregacoes() {
        return this.http.get<Congregacao[]>(`${this.UrlServiceV1}/v1/congregacao`,  {headers: this.componeHeaders()});
    }

    getGrupos(congregacao) {
        return this.http.get<Grupo[]>(`${this.UrlServiceV1}/v1/grupo/congregacao/${congregacao}`,  {headers: this.componeHeaders()});
    }

}