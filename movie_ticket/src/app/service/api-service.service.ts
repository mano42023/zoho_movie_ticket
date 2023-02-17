import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl = environment.baseUrl;
  userData = environment.userData
  constructor(private http: HttpClient) { }

  getAllDetails() {
    return this.http.post(this.baseUrl + '?action=getAllDetails', this.userData);
  }

  bookSeats(data: any) {
    return this.http.post(this.baseUrl + '?action=bookSeats', data);
  }

}
