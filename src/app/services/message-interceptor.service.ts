import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {finalize, Observable, tap} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class MessageInterceptorService implements HttpInterceptor{

  constructor(private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let status: number;
    let errorResponse: HttpErrorResponse;

    return next.handle(req)
      .pipe(
        tap({
          // Установка статуса 1 при успешном запросе
          next: (event) => (status = event instanceof HttpResponse ? 1 : 0),
          // Установка статуса -1 при ошибке запроса
          error: (error) => {
            status = -1;
            errorResponse = error;
          }
        }),
        // Вызов методов сервиса уведомлений для их демонстрации в зависимости от статуса запроса и заголовков
        finalize(() => {
          const elapsed = (Date.now() - started)/1000;
          if (status === 1){
            if(req.headers.has('auth')){
              this.messageService.authSuccessMessage(req.body.email);
            } else {
              this.messageService.dataSuccessMessage(req.method, elapsed);
            }
          } else if (status === -1){
            this.messageService.errorMessage(errorResponse);
          }
        })
      );
  }
}
