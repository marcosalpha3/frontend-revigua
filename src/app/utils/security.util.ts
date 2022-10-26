import { User } from "../models/user.model";
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export class Security {

    constructor(private http: HttpClient,
        private router: Router, 
        private toastr: ToastrService                               
) { }    

    public static setUser(user: User) {
        const data = JSON.stringify(user);
        localStorage.setItem('jwuser', btoa(data));
    }

    public static getUser(): User {
        const data = localStorage.getItem('jwuser');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static hasToken(): boolean {
        if (this.getUser())
            return true;
        else
            return false;
    }

    public static clear() {
        localStorage.removeItem('jwuser');
    }
    
}