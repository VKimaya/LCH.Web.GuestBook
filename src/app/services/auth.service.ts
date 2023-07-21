import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

  constructor(private httpclient : HttpClient) { }

  getToken(): string {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  generateToken(): Observable<boolean> {
    let that = this;
    const apiUrl = environment.baseAuthApiUrl;
    let isSuccess = false;

    var settings = {
      "url": apiUrl,
      "method": "POST",
      "timeout": 0,
      "async": false,
      "headers": {
        "Authorization": "Basic bGNoX2FwaTpZdCVRNzRtNyYhWHhGdzk=",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "grant_type": "client_credentials",
        "scope": "System:SystemStatus"
      }
    };

    $.ajax(settings).done(function (response: any) {
      that.token = response.access_token;
      if (that.token == null || that.token == undefined) {
        isSuccess = false;
      }
      else {
        isSuccess = true;
      }
    })
    return of(isSuccess);
  }
}
