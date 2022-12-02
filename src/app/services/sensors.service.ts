import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private http: HttpClient) { }

  getSensors(){
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + token)

    const options = {headers}
    return this.http.get("/api/sensors", {headers}).subscribe(res => console.log(res))
  }
}
