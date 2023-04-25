import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {IAuthRequest} from "../interface/IAuthRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  // Создание текста ошибок валидатора поля "email"
  getEmailErrorMessage(){
    if (this.loginForm.controls.email.hasError('required')) {
      return 'The field must not be empty';
    }
    if (this.loginForm.controls.email.hasError('email')) {
      return 'Please enter a valid e-mail';
    }
    return '';
  }
  // Создание текста ошибок валидатора поля "password"
  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'The field must not be empty';
    }
    return '';
  }
  // Аутентификация осуществляется если форма валидна,
  // последующее перенаправление пользователя на страницу с табличными данными.
  //     "email": "eve.holt@reqres.in",
  //     "password": "cityslicka"
  onSubmit() {
    if (this.loginForm.valid){
      const request: IAuthRequest = this.loginForm.value as unknown as IAuthRequest;
      this.auth.login(request).subscribe(()=>{
        this.router.navigate(['table']);
      });
    }
  }

}
