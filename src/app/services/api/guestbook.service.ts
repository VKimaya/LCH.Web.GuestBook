import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrimCharPipe } from 'src/app/utilities/pipes/trim-char.pipe';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Guest } from 'src/app/interfaces/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestbookService {

  userName: string = '';
  private insertGuest: string = '/insert';
  private updateGuest: string = "/update";
  private getGuest: string = "/guestdetails";
  private convertGuest: string = "/enroll";
  private getAllInterests: string = "/interests";
  private getAllSources: string = "/acquisitionsources";

  constructor(private trimChar: TrimCharPipe, private datePipe: DatePipe, private authService: AuthService, private httpClient: HttpClient) { }

  getAdGroups(): Observable<any> {
    const apiUrl = this.trimChar.transform(environment.baseAdGroups, '/') + '/' + this.userName.split('@')[0];
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get(apiUrl, { headers: header });
  }

  PostInsertGuest(guest: Guest) : Observable<any> {
    const apiUrl = environment.baseGuestBookApiUrl + this.insertGuest;
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return  this.httpClient.post(apiUrl , guest,{headers: header});
  }
  PostUpdateGuest(guest: Guest) : Observable<any> {
    const apiUrl = environment.baseGuestBookApiUrl + this.updateGuest;
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return  this.httpClient.put(apiUrl , guest,{headers: header});
  }
  GetGuest(conversionDate: Date | '', acquisitionFromDate : Date | '', acquisitionToDate: Date | '', acquisitionScore: string) : Observable<any>{
    const conversionDateToSend = this.datePipe.transform(conversionDate, 'yyyy-MM-dd');
    const acquisitionFromDateToSend = this.datePipe.transform(acquisitionFromDate, 'yyyy-MM-dd')
    const acquisitionToDateToSend = this.datePipe.transform(acquisitionToDate, 'yyyy-MM-dd')
    let params = new HttpParams()
      .set('ConversionDate', conversionDateToSend ? conversionDateToSend : '')
      .set('AcquisitionDate', acquisitionFromDateToSend ? acquisitionFromDateToSend : '')
      .set('AcquisitionSource', acquisitionScore ? acquisitionScore : '');
    const apiUrl = environment.baseGuestBookApiUrl + this.getGuest;
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get(apiUrl, { headers: header, params: params });
  }

  GetAllGuest(nonconvertedonly: any) : Observable<any>{
    let params = new HttpParams()
      .set('nonconvertedonly', nonconvertedonly);
    const apiUrl = environment.baseGuestBookApiUrl + this.getGuest;
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get(apiUrl, { headers: header, params: params });
  }

  GetAllInterests() : Observable<any>{
    const apiUrl = environment.baseGuestBookApiUrl + this.getAllInterests;
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get(apiUrl, { headers: header});
  }
  GetAllSources() : Observable<any>{
    const apiUrl = environment.baseGuestBookApiUrl + this.getAllSources;
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get(apiUrl, { headers: header});
  }
  ConvertGuest(data: any): Observable<any> {
    const apiUrl = environment.baseLoyaltyDaoUrl + this.convertGuest;
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + this.authService.getToken());
    return  this.httpClient.post(apiUrl , data,{headers: header});
  }
}
