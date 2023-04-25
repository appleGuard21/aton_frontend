import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITableDataResponse} from "../interface/ITableDataResponse";
import {IDataUserRequest} from "../interface/IDataUserRequest";
import {IDataUser} from "../interface/IDataUser";
import {IUpdateDataUserResponse} from "../interface/IUpdateDataUserResponse";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private url: string = 'https://reqres.in/api/users';

  getUsers(page: number):Observable<ITableDataResponse>{
    return this.http.get<ITableDataResponse>(this.url + '?page=' + page);
  }

  addData(request: IDataUserRequest):Observable<IDataUser>{
    return this.http.post<IDataUser>(this.url, request);
  }

  deleteData(id: number):Observable<unknown>{
    return this.http.delete(this.url + '/' + id);
  }

  updateData(id: number, request: IDataUserRequest):Observable<IUpdateDataUserResponse>{
    return this.http.put<IUpdateDataUserResponse>(this.url + '/' + id, request);
  }
}
