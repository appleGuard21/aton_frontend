import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IRegistrationResponse} from "../interface/IRegistrationResponse";
import {IAuthRequest} from "../interface/IAuthRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'https://reqres.in/api/';

  // Поле для отслеживания статуса аутентификации компонентами
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  // Отправка запроса аутентификации на сервер,
  // вызов метода записи полученного токена в локальное хранилище,
  // изменение статуса аутентификации на true.
  // К запросу добавляется header 'auth' для обработки в интерсепторе
  login(request: IAuthRequest):Observable<string>{
    return this.http.post<string>(this.url+'login', request, {headers: {'auth':''}}).pipe(
      tap(token=>{
        this.setToken(token);
        this.setLoggedIn(true);
      })
    );
  }
  // Отправка запроса регмстрации на сервер,
  // вызов метода записи полученного токена в локальное хранилище,
  // изменение статуса аутентификации на true
  // К запросу добавляется header 'auth' для обработки в интерсепторе
  register(request: IAuthRequest):Observable<IRegistrationResponse>{
    return this.http.post<IRegistrationResponse>(this.url+'register', request, {headers: {'auth':''}}).pipe(
      tap(response=>{
        this.setToken(response.token)
        this.setLoggedIn(true);
      })
    );
  }

  // Проверка наличия токена
  isAuthenticated():boolean{
    return !!this.token;
  }
  // Получение токена из локального хранилища
  get token(){
    if (!localStorage.getItem('token')){
      return null;
    } else return localStorage.getItem('token');
  }
  // Запись токена в локальное хранилище
  private setToken(token: string){
    localStorage.setItem('token', token);
  }
  // Очистка локального хранилища,
  // изменение статуса аутентификации на false
  logout(){
    localStorage.clear();
    this.setLoggedIn(false);
  }
  // Установка значения поля отслеживания статуса аутентификации
  setLoggedIn(state: boolean){
    this.isLoggedIn.next(state);
  };
}
