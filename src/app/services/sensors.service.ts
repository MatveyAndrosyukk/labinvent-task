import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISensor} from "../model/Sensor";

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private http: HttpClient) { }

  getSensors(): Observable<ISensor[]>{
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`)

    return this.http.get<ISensor[]>("/api/sensors", {headers})
  }

  deleteSensor(sensor: ISensor): Observable<number>{
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`)

    return this.http.delete<number>(`/api/admin/sensors/${sensor.id}`, {headers})
  }

  saveSensor(sensor: ISensor): Observable<ISensor>{
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`)

    return this.http.post<ISensor>("/api/admin/sensors", sensor, {headers})
  }

  editSensor(sensor: ISensor): Observable<ISensor>{
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`)

    return this.http.put<ISensor>("/api/admin/sensors", sensor, {headers})
  }
}
