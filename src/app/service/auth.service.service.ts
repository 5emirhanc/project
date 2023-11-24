import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  loggedIn = false ;
  constructor(private httpClient : HttpClient) { }
  apiUrl = 'https://localhost:44307/User/';


    login(user:User):Observable<any>{
      return this.httpClient.post(this.apiUrl + "SignIn?username="+user.username+"&password="+user.password,null)
    }

    register(formData : any):Observable<any>{
      return this.httpClient.post(this.apiUrl+"SubmitChange",formData)
    }

    logOut() {
      localStorage.removeItem('token');
      this.loggedIn = false;
    }
    isAuthenticated(){
      if(localStorage.getItem("token")){
        return true;
      }
      else{
        return false;
      }
    }
}
