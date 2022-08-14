import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private loginService: LoginService) {}

  onLogin(){
    //this.loginService.getUser()
  }

  
}
