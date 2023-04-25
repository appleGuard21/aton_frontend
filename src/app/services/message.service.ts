import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
// Сервис для уведомлений
export class MessageService {

  constructor(private toastr: ToastrService) {}

  // Показ уведомлений при успешной операции с данными
  dataSuccessMessage(method: string, elapsed: number){
    switch (method) {
      case 'GET':
        this.toastr.success('Data received in ' + elapsed + ' seconds', 'Success!');
        break;
      case 'POST':
        this.toastr.success('Data saved in ' + elapsed + ' seconds', 'Success!');
        break;
      case 'DELETE':
        this.toastr.success('Data deleted in ' + elapsed + ' seconds', 'Success!');
        break;
      case 'PUT':
        this.toastr.success('Data updated in ' + elapsed + ' seconds', 'Success!');
        break;
    }
  }
  // Показ уведомлений при успешной аутентификации
  authSuccessMessage(name: string){
    this.toastr.success('Welcome ' + name, 'Success!')
  }
  // Показ уведомлений при возникновении ошибок запросов
  errorMessage(error: HttpErrorResponse){
    if(error.error.error){
      this.toastr.error(error.error.error, 'Error!');
    } else {
      this.toastr.error(error.message, 'Error!');
    }
  }


}
