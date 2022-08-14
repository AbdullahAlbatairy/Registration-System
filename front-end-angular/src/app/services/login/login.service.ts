import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseLoginUrl = "http://localhost:8080/user"
  private getUserInfo = "/login"

  constructor(private httpClient: HttpClient) { }

  public getUser(user: FormGroup): Observable<any> {
    const params = new HttpParams()
    
    
    .set('email', user.value.email)
      .set('password', user.value.password)
    
    return this.httpClient.get(this.baseLoginUrl+ this.getUserInfo, {params: params});


  }


}
