import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl='https://localhost:44307/User/';
  constructor(private httpClient :HttpClient) { }

  getUser():Observable<User[]>{
    let newPath = this.apiUrl + "GetList"
    return this.httpClient.get<User[]>(newPath)
  }

  add(user:User):Observable<any>{
      return this.httpClient.post(this.apiUrl+"SubmitChange",user)
  }
}
