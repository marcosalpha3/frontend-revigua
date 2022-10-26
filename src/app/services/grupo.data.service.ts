import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class GrupoDataService extends BaseService {

    constructor(private http: HttpClient
        ) { super() }
 
     create(data) {
        return this.http.post(`${this.UrlServiceV1}/v1/grupo`, data, {headers: this.componeHeaders()})
    }

    change(data) {
        return this.http.put(`${this.UrlServiceV1}/v1/grupo`, data, {headers: this.componeHeaders()})
    }

    delete(id, newGroup) {
        return this.http.delete(`${this.UrlServiceV1}/v1/grupo/${id}/novogrupo/${newGroup}`, {headers: this.componeHeaders()})
    }
}