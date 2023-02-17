import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl = environment.baseUrl;
  userData= environment.userData
  constructor(private http: HttpClient) { }

  getAllDetails() {
    this.http.post(this.baseUrl+'?action=getAllDetails', this.userData).subscribe((res)=>{
      console.log(res);
      return res
    })
  }
}
